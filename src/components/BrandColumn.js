import '../styles/BrandColumn.css';
import SicParvisMagnaPill from './SicParvisMagnaPill';

export default function BrandColumn() {
  return (
    <div className="brand-col" aria-hidden="true">

      {/* Top group — 3 shapes, tight spacing like Figma Group 6 */}
      <div className="brand-col__shapes">

        {/* Ellipse 1 — 124.8×124.8, gradient logo */}
        <div className="brand-col__circle brand-col__circle--gradient">
          <img
            src="/img/logotype/symbol_gradient_black_red.png"
            alt=""
            className="brand-col__logo-img"
          />
        </div>

        {/* Rectangle 8 rotated 45° — 164.18×164.18, gradient + "0" */}
        <div className="brand-col__diamond-wrap">
          <div className="brand-col__diamond">
            <span className="brand-col__num">0</span>
          </div>
        </div>

        {/* Ellipse 2 — 124.8×124.8, white + red stroke + "1" */}
        <div className="brand-col__circle brand-col__circle--outline">
          <span className="brand-col__num brand-col__num--dark">1</span>
        </div>

      </div>

      {/* Sic Parvis Magna pill — fills remaining height */}
      <SicParvisMagnaPill />

    </div>
  );
}
