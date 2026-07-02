export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
