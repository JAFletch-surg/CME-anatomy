import type { AnatomyState } from '../types';
import type { ReactNode } from 'react';

interface Props {
  label: string;
  state: AnatomyState;
  disabled: boolean;
  icon: ReactNode;
  onCycle: () => void;
}

const STATE_STYLES: Record<AnatomyState, string> = {
  normal: 'bg-green-600 hover:bg-green-700',
  transparent: 'bg-blue-600 hover:bg-blue-700',
  hidden: 'bg-red-600 hover:bg-red-700',
};

const STATE_LABELS: Record<AnatomyState, string> = {
  normal: 'Visible',
  transparent: 'Transparent',
  hidden: 'Hidden',
};

export default function AnatomyButton({ label, state, disabled, icon, onCycle }: Props) {
  return (
    <button
      onClick={onCycle}
      disabled={disabled}
      aria-label={`${label}: ${STATE_LABELS[state]}. Click to change.`}
      className={`
        flex items-center w-full px-3 py-2 rounded-md text-white font-semibold text-sm
        transition-all duration-200 min-h-[44px] touch-manipulation
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black
        active:scale-[0.97]
        md:px-4 md:py-2.5 md:text-[15px] md:min-w-[200px] md:justify-center md:hover:-translate-y-0.5
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${STATE_STYLES[state]}
      `}
    >
      <span className="w-5 h-5 mr-2 flex-shrink-0 flex items-center justify-center">{icon}</span>
      <span className="flex-1 text-left md:text-center">{label}</span>
      <span className="text-[10px] font-normal opacity-75 ml-2 uppercase tracking-wide">
        {STATE_LABELS[state]}
      </span>
    </button>
  );
}
