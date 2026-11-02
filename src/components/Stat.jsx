export default function Stat({ value, label }) {
  return (
    <div className="stat">
      <span>{value}</span>
      <p>{label}</p>
    </div>
  );
}
