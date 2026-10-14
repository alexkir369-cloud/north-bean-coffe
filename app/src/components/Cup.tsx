import { useId } from 'react';

export type CupLayer = { color: string; share: number };

// Geometry follows the Figma "Cup" illustration (124 × 120): 96 × 104 body with
// 6 px top / 40 px bottom corners, 3 px outline, and a half-ring handle.
const BODY = 'M10 9.5H94A4.5 4.5 0 0 1 98.5 14V72A38.5 38.5 0 0 1 60 110.5H44A38.5 38.5 0 0 1 5.5 72V14A4.5 4.5 0 0 1 10 9.5Z';
const HANDLE = 'M105 33A14.5 17 0 0 1 105 67';
const LIQUID_TOP = 25;
const LIQUID_BOTTOM = 112;

/** Layers are listed bottom-up; shares add up to 100. */
export default function Cup({ layers, animate, className }: { layers: CupLayer[]; animate: boolean; className?: string }) {
  const clipId = `cup-${useId().replace(/:/g, '')}`;
  const total = LIQUID_BOTTOM - LIQUID_TOP;
  let y = LIQUID_BOTTOM;

  return (
    <svg viewBox="0 0 124 120" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d={BODY} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <g className={animate ? 'cup-fill' : undefined}>
          {layers.map((layer, i) => {
            const height = (total * layer.share) / 100;
            y -= height;
            // Overlap by half a pixel so no hairline shows between layers.
            const overlap = i < layers.length - 1 ? 0.5 : 0;
            return <rect key={i} x="0" y={y - overlap} width="124" height={height + overlap} fill={layer.color} />;
          })}
        </g>
      </g>
      <path d={BODY} fill="none" stroke="#2B1D17" strokeWidth="3" />
      <path d={HANDLE} fill="none" stroke="#2B1D17" strokeWidth="5" />
    </svg>
  );
}
