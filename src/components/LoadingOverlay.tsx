interface Props {
  viewerReady: boolean;
  error: string | null;
}

export default function LoadingOverlay({ viewerReady, error }: Props) {
  if (viewerReady) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70">
      {error ? (
        <div className="text-center px-6">
          <div className="text-red-400 text-lg font-semibold mb-2">Error</div>
          <p className="text-white/80 text-sm">{error}</p>
          <p className="text-white/50 text-xs mt-2">Try refreshing the page</p>
        </div>
      ) : (
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/80 text-sm">Loading 3D model...</p>
        </div>
      )}
    </div>
  );
}
