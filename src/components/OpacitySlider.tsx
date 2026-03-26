interface Props {
  partKey: string;
  value: number;
  visible: boolean;
  onChange: (value: number) => void;
}

export default function OpacitySlider({ partKey, value, visible, onChange }: Props) {
  if (!visible) return null;

  const sliderId = `${partKey}-opacity-slider`;

  return (
    <div className="flex items-center w-full mt-1">
      <label htmlFor={sliderId} className="text-white text-[11px] mr-2 min-w-[40px] md:text-[13px] md:min-w-[50px]">
        Opacity:
      </label>
      <input
        id={sliderId}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={`${partKey} opacity`}
      />
    </div>
  );
}
