interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-1 rounded-lg bg-gray-200 relative">
      <span
        className="absolute h-full rounded-lg bg-secondary"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
