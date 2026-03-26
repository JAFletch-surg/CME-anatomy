export type AnatomyState = 'normal' | 'transparent' | 'hidden';

export interface AnatomyPartConfig {
  key: string;
  label: string;
  materialPatterns: string[];
  nodePatterns: string[];
}

export interface AnatomyPartState {
  state: AnatomyState;
  opacity: number;
}

// Sketchfab API types (minimal typing for what we use)
export interface SketchfabMaterial {
  name: string;
  channels: Record<string, Record<string, unknown>>;
  transparent?: boolean;
  [key: string]: unknown;
}

export interface SketchfabNode {
  name?: string;
  instanceID: number;
  children?: number[];
}

export interface SketchfabApi {
  start: () => void;
  addEventListener: (event: string, callback: () => void) => void;
  getMaterialList: (callback: (err: unknown, materials: SketchfabMaterial[]) => void) => void;
  getNodeMap: (callback: (err: unknown, nodeMap: Record<string, SketchfabNode>) => void) => void;
  setMaterial: (material: SketchfabMaterial, callback?: () => void) => void;
  show: (nodeId: number, callback?: (err: unknown) => void) => void;
  hide: (nodeId: number, callback?: (err: unknown) => void) => void;
}
