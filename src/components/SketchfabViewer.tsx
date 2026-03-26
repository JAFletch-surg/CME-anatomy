import { forwardRef } from 'react';
import { MODEL_ID } from '../constants';

interface Props {
  className?: string;
}

const SketchfabViewer = forwardRef<HTMLIFrameElement, Props>(({ className }, ref) => {
  return (
    <iframe
      ref={ref}
      id="api-frame"
      src={`https://sketchfab.com/models/${MODEL_ID}/embed`}
      allow="autoplay; fullscreen; xr-spatial-tracking"
      allowFullScreen
      className={className}
      title="3D Anatomical Model"
    />
  );
});

SketchfabViewer.displayName = 'SketchfabViewer';

export default SketchfabViewer;
