import { useRef } from 'react';
import { useSketchfab } from './hooks/useSketchfab';
import SketchfabViewer from './components/SketchfabViewer';
import LoadingOverlay from './components/LoadingOverlay';
import ControlPanel from './components/ControlPanel';

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { viewerReady, error, anatomyStates, cycleState, adjustOpacity } = useSketchfab(iframeRef);

  return (
    <div className="relative w-full h-dvh flex flex-col">
      <SketchfabViewer ref={iframeRef} className="w-full flex-1 border-0 block min-h-0" />
      <LoadingOverlay viewerReady={viewerReady} error={error} />
      <ControlPanel
        anatomyStates={anatomyStates}
        viewerReady={viewerReady}
        onCycleState={cycleState}
        onAdjustOpacity={adjustOpacity}
      />
    </div>
  );
}
