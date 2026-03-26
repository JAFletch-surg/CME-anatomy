import { useState } from 'react';
import { ChevronDown, Circle, Droplet, Droplets, Layers, Layers3, Pill } from 'lucide-react';
import { ANATOMY_PARTS } from '../constants';
import type { AnatomyPartState } from '../types';
import AnatomyButton from './AnatomyButton';
import OpacitySlider from './OpacitySlider';
import StomachIcon from './StomachIcon';
import type { ReactNode } from 'react';

const PART_ICONS: Record<string, ReactNode> = {
  colon: <Circle className="w-full h-full" />,
  mesentery: <Layers className="w-full h-full" />,
  fascia: <Layers3 className="w-full h-full" />,
  arteries: <Droplet className="w-full h-full" />,
  veins: <Droplets className="w-full h-full" />,
  stomach: <StomachIcon className="w-full h-full" />,
  pancreas: <Pill className="w-full h-full" />,
};

interface Props {
  anatomyStates: Record<string, AnatomyPartState>;
  viewerReady: boolean;
  onCycleState: (partKey: string) => void;
  onAdjustOpacity: (partKey: string, value: number) => void;
}

export default function ControlPanel({ anatomyStates, viewerReady, onCycleState, onAdjustOpacity }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="
        flex flex-col gap-1.5 z-[1000] bg-black/75 p-2.5
        pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))]
        flex-shrink-0 max-h-[45vh] overflow-y-auto
        md:absolute md:right-5 md:top-1/2 md:-translate-y-1/2
        md:gap-3 md:p-4 md:rounded-xl md:bg-black/55
        md:backdrop-blur-lg md:max-h-none md:overflow-y-visible
      "
    >
      {/* Mobile toggle */}
      <button
        className="
          flex items-center justify-center w-full py-2 px-3
          border-none bg-white/15 text-white text-sm font-semibold
          rounded-md cursor-pointer touch-manipulation
          active:bg-white/25
          md:hidden
        "
        onClick={() => setCollapsed(!collapsed)}
        aria-expanded={!collapsed}
        aria-controls="controls-grid"
      >
        Anatomy Controls
        <ChevronDown
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Controls grid */}
      <div
        id="controls-grid"
        className={`
          grid grid-cols-2 gap-1.5 w-full
          md:flex md:flex-col md:gap-3
          ${collapsed ? 'hidden md:flex' : ''}
        `}
      >
        {ANATOMY_PARTS.map((part) => {
          const partState = anatomyStates[part.key];
          return (
            <div key={part.key} className="w-full">
              <AnatomyButton
                label={part.label}
                state={partState.state}
                disabled={!viewerReady}
                icon={PART_ICONS[part.key]}
                onCycle={() => onCycleState(part.key)}
              />
              <OpacitySlider
                partKey={part.key}
                value={partState.opacity}
                visible={partState.state === 'transparent'}
                onChange={(value) => onAdjustOpacity(part.key, value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
