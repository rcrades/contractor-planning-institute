interface ProgressBarProps {
  percentage: number
}

export default function ProgressBar({ percentage }: ProgressBarProps) {
  return (
    <div className="w-full h-1 bg-neutral-800">
      <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: `${percentage}%` }} />
    </div>
  )
}
