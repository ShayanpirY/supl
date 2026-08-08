"use client";

import { useEffect, useState } from "react";

interface PriceSliderProps {
  min: number;
  max: number;
  valueMin?: number;
  valueMax?: number;
  onCommit: (min: number, max: number) => void;
}

export default function PriceSlider({
  min,
  max,
  valueMin,
  valueMax,
  onCommit,
}: PriceSliderProps) {
  const [lo, setLo] = useState(valueMin ?? min);
  const [hi, setHi] = useState(valueMax ?? max);

  useEffect(() => {
    setLo(valueMin ?? min);
    setHi(valueMax ?? max);
  }, [valueMin, valueMax, min, max]);

  const commit = (nextLo: number, nextHi: number) => {
    if (
      nextLo === (valueMin ?? min) &&
      nextHi === (valueMax ?? max)
    ) {
      return;
    }
    onCommit(nextLo, nextHi);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] font-bold text-gray-500">
        <span>از {lo} AED</span>
        <span>تا {hi} AED</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={lo}
        aria-label="حداقل قیمت"
        onChange={(e) => setLo(Math.min(Number(e.target.value), hi))}
        onPointerUp={() => commit(lo, hi)}
        onKeyUp={() => commit(lo, hi)}
        className="w-full cursor-pointer accent-red-600"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={hi}
        aria-label="حداکثر قیمت"
        onChange={(e) => setHi(Math.max(Number(e.target.value), lo))}
        onPointerUp={() => commit(lo, hi)}
        onKeyUp={() => commit(lo, hi)}
        className="w-full cursor-pointer accent-red-600"
      />
    </div>
  );
}
