import '../styles/SicParvisMagnaPill.css';

export default function SicParvisMagnaPill({ className = '' }) {
  return (
    <div className={`spm-pill ${className}`} aria-hidden="true">
      <span className="spm-pill__text">Sic Parvis Magna</span>
    </div>
  );
}
