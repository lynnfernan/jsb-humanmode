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
      <div className="progress-text">
        <span className="progress-current">{current}</span>
        <span className="progress-slash">/</span>
        <span className="progress-total">{total}</span>
      </div>
    </div>
  )
}
