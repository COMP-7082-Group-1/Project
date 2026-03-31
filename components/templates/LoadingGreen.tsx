import "./loader.css";
export default function LoadingGreen() {
  return (
    <div className="loading-container">
      <div className="leaf-ring">
        <svg viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="44"
            cy="44"
            r="38"
            stroke="#b1bf93"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          <ellipse cx="44" cy="6" rx="3" ry="5" fill="#5b7343" opacity="0.7" />
          <ellipse cx="82" cy="44" rx="5" ry="3" fill="#b1bf93" opacity="0.7" />
          <ellipse cx="44" cy="82" rx="3" ry="5" fill="#5b7343" opacity="0.7" />
          <ellipse cx="6" cy="44" rx="5" ry="3" fill="#b1bf93" opacity="0.7" />
          <circle cx="70" cy="18" r="2" fill="#d6d989" opacity="0.8" />
          <circle cx="70" cy="70" r="2" fill="#d6d989" opacity="0.8" />
          <circle cx="18" cy="70" r="2" fill="#d6d989" opacity="0.8" />
          <circle cx="18" cy="18" r="2" fill="#d6d989" opacity="0.8" />
        </svg>
        <div className="leaf-center" />
      </div>

      <div className="stem" />

      <div className="petals">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="petal" />
        ))}
      </div>

      <span className="loading-label">Loading event</span>
    </div>
  );
}
