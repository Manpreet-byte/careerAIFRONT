import Card from './Card'
import ProgressBar from './ProgressBar'

export default function ScoreCard({ title, value, description, progress }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate">{title}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">{value}</p>
          {description ? <p className="mt-2 text-sm text-slate">{description}</p> : null}
        </div>
      </div>
      {typeof progress === 'number' ? <ProgressBar value={progress} /> : null}
    </Card>
  )
}