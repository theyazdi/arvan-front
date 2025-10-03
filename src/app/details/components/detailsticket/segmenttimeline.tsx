interface SegmentTimelineProps {
  showVerticalBorder?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

function SegmentTimeline({ isFirst, isLast }: SegmentTimelineProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center h-[120px] w-8 relative">
        <div className="w-3 h-3 border border-red-500 rounded-full bg-white z-10" />

        <div className="w-px flex-1 bg-red-300 rounded-full" />

        <div
          className={`w-4 h-4 rounded-full z-10 ${
            isLast
              ? "bg-red-500"
              : isFirst
              ? "border border-red-500 bg-white"
              : "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
}

export { SegmentTimeline };
