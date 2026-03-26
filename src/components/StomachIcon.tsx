// Custom stomach SVG from the original design
export default function StomachIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 430 430"
      fill="none"
    >
      <g strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={18}>
        <path stroke="currentColor" d="M166.8 55v58.3c0 8.2 6.7 14.9 14.9 14.9H208" />
        <path stroke="currentColor" d="M129.1 55v62.2c0 27 21.9 48.9 48.9 48.9h27.4" />
        <path stroke="currentColor" d="M208 128.1c8.2-27.2 32.9-46.9 62.8-46.9 27.1 0 50.4 16.1 60.9 39.2 0 .1 1.3 3.1 1.3 3.1 7.9 19 12.2 39.9 12 61.8-.6 87.6-71.3 158-159 158-18 0-35.4-3-51.5-8.5-5.2-1.8-10.7 2.1-10.7 7.7v32.4" />
        <path stroke="currentColor" d="M85 374.8V307c0-16.1 11.6-28.1 25.7-34.2l29.3-12.7c53.6-24.3 63.8-69 65.3-94" />
        <path stroke="#08a88a" d="M314.6 166.7s8 48-16 80" />
      </g>
    </svg>
  );
}
