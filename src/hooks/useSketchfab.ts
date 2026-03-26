import { useCallback, useEffect, useRef, useState } from 'react';
import { ANATOMY_PARTS, DEFAULT_OPACITY, MODEL_ID, STATES } from '../constants';
import type { AnatomyPartState, AnatomyState, SketchfabApi, SketchfabMaterial, SketchfabNode } from '../types';

declare global {
  interface Window {
    Sketchfab: new (iframe: HTMLIFrameElement) => {
      init: (modelId: string, options: {
        success: (api: SketchfabApi) => void;
        error: () => void;
      }) => void;
    };
  }
}

function buildInitialStates(): Record<string, AnatomyPartState> {
  const states: Record<string, AnatomyPartState> = {};
  for (const part of ANATOMY_PARTS) {
    states[part.key] = { state: 'normal', opacity: DEFAULT_OPACITY };
  }
  return states;
}

function findNodeIdsByName(
  patterns: string[],
  nodesMap: Record<string, SketchfabNode>,
): number[] {
  const ids: number[] = [];
  const upperPatterns = patterns.map((p) => p.toUpperCase());

  function traverse(node: SketchfabNode) {
    if (node.name) {
      const upper = node.name.toUpperCase();
      if (upperPatterns.some((p) => upper.includes(p))) {
        ids.push(node.instanceID);
      }
    }
    if (node.children) {
      for (const childId of node.children) {
        const child = nodesMap[childId];
        if (child) traverse(child);
      }
    }
  }

  for (const nodeId in nodesMap) {
    const node = nodesMap[nodeId];
    if (node) traverse(node);
  }

  return ids;
}

export function useSketchfab(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const [viewerReady, setViewerReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [anatomyStates, setAnatomyStates] = useState<Record<string, AnatomyPartState>>(buildInitialStates);

  const apiRef = useRef<SketchfabApi | null>(null);
  const materialsRef = useRef<Record<string, SketchfabMaterial[]>>({});
  const originalMaterialsRef = useRef<Record<string, SketchfabMaterial[]>>({});
  const nodesRef = useRef<Record<string, number[]>>({});

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !window.Sketchfab) return;

    const client = new window.Sketchfab(iframe);

    client.init(MODEL_ID, {
      success: (api) => {
        apiRef.current = api;
        api.start();

        api.addEventListener('viewerready', () => {
          api.getMaterialList((err, materialList) => {
            if (err) {
              setError('Failed to load materials');
              return;
            }

            // Map materials by part
            for (const part of ANATOMY_PARTS) {
              const upperPatterns = part.materialPatterns.map((p) => p.toUpperCase());
              materialsRef.current[part.key] = materialList.filter(
                (mat) => mat.name && upperPatterns.some((p) => mat.name.toUpperCase().includes(p)),
              );
              originalMaterialsRef.current[part.key] = materialsRef.current[part.key].map(
                (mat) => structuredClone(mat),
              );
            }

            api.getNodeMap((nodeErr, nodesMap) => {
              if (nodeErr) {
                setError('Failed to load node map');
                return;
              }

              for (const part of ANATOMY_PARTS) {
                nodesRef.current[part.key] = findNodeIdsByName(part.nodePatterns, nodesMap);
              }

              setViewerReady(true);
            });
          });
        });
      },
      error: () => {
        setError('Failed to initialize 3D viewer');
      },
    });
  }, [iframeRef]);

  const applyTransparentMaterial = useCallback((partKey: string, opacityValue: number) => {
    const api = apiRef.current;
    const mats = materialsRef.current[partKey];
    if (!api || !mats) return;

    const factor = opacityValue / 100;

    for (const material of mats) {
      material.channels.Opacity = {
        ...(material.channels.Opacity || {}),
        enable: true,
        factor,
        texture: null,
        mode: 'BLEND',
        ior: 0.0,
        refractive: true,
      };
      material.channels.AlbedoPBR = {
        ...(material.channels.AlbedoPBR || {}),
        enable: true,
        factor: 0.5,
      };
      material.channels.RoughnessPBR = {
        ...(material.channels.RoughnessPBR || {}),
        enable: true,
        factor: 0.1,
      };
      material.channels.MetalnessPBR = {
        ...(material.channels.MetalnessPBR || {}),
        enable: true,
        factor: 0.0,
      };
      material.channels.SubsurfaceScattering = { enable: false };
      material.transparent = true;

      api.setMaterial(material);
    }
  }, []);

  const setMaterialState = useCallback((partKey: string, state: AnatomyState, opacity: number) => {
    const api = apiRef.current;
    const mats = materialsRef.current[partKey];
    const originals = originalMaterialsRef.current[partKey];
    const nodeIds = nodesRef.current[partKey];
    if (!api || !mats) return;

    switch (state) {
      case 'normal':
        mats.forEach((_, index) => {
          const restored = structuredClone(originals[index]);
          materialsRef.current[partKey][index] = restored;
          api.setMaterial(restored);
        });
        if (nodeIds) {
          nodeIds.forEach((id) => api.show(id));
        }
        break;

      case 'transparent':
        if (nodeIds) {
          nodeIds.forEach((id) => api.show(id));
        }
        applyTransparentMaterial(partKey, opacity);
        break;

      case 'hidden':
        if (nodeIds) {
          nodeIds.forEach((id) => api.hide(id));
        }
        break;
    }
  }, [applyTransparentMaterial]);

  const cycleState = useCallback((partKey: string) => {
    if (!apiRef.current || !materialsRef.current[partKey]?.length) return;

    setAnatomyStates((prev) => {
      const current = prev[partKey];
      const currentIndex = STATES.indexOf(current.state);
      const nextState = STATES[(currentIndex + 1) % STATES.length];

      setMaterialState(partKey, nextState, current.opacity);

      return {
        ...prev,
        [partKey]: { ...current, state: nextState },
      };
    });
  }, [setMaterialState]);

  const adjustOpacity = useCallback((partKey: string, value: number) => {
    if (!apiRef.current) return;

    setAnatomyStates((prev) => {
      const current = prev[partKey];
      applyTransparentMaterial(partKey, value);
      return {
        ...prev,
        [partKey]: { ...current, opacity: value },
      };
    });
  }, [applyTransparentMaterial]);

  return {
    viewerReady,
    error,
    anatomyStates,
    cycleState,
    adjustOpacity,
  };
}
