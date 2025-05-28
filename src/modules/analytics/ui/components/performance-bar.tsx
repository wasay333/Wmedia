interface PerformanceBarProps {
  label: string;
  value: number;
  color: string;
}

export const PerformanceBar = ({
  label,
  value,
  color,
}: PerformanceBarProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500 ease-in-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};
