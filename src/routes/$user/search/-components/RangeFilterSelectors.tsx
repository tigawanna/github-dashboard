import { DualRangeSlider } from "@/components/shadcn/custom/dual-range";

interface RangeFilterSelectorsProps {
  values: number[];
  setValues: React.Dispatch<React.SetStateAction<number[]>>;
}

export function RangeFilterSelectors({values,setValues}:RangeFilterSelectorsProps){
return (
  <div className="w-full px-10">
    <DualRangeSlider
      label={(value) => value}
      value={values}
      onValueChange={setValues}
      min={0}
      max={100}
      step={1}
    />
  </div>
);
}
