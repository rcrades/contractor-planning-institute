interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full h-2 bg-neutral-800">
      <div
        className="h-full bg-yellow-400 transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      />
    </div>
  )
} 