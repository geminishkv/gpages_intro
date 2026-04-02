import { forwardRef } from 'react';
import '../styles/BrandColumn.css';
import '../styles/LogoGlow.css';
import SicParvisMagnaPill from './SicParvisMagnaPill';

const BrandColumn = forwardRef(function BrandColumn(_, ref) {
  return (
    <div ref={ref} className="brand-col" aria-hidden="true">

      <div className="brand-col__shapes">
        <div className="brand-col__circle brand-col__circle--gradient logo-glow logo-glow--brand">
          <span className="logo-glow__blur logo-glow__blur--1" />
          <span className="logo-glow__blur logo-glow__blur--2" />
          <div className="logo-glow__inner">
            <img
              src="/img/logotype/logo_white.svg"
              alt=""
              className="brand-col__logo-img"
            />
          </div>
        </div>

        <div className="brand-col__diamond-wrap">
          <div className="brand-col__diamond">
            <span className="brand-col__num">0</span>
          </div>
        </div>

        <div className="brand-col__circle brand-col__circle--outline">
          <span className="brand-col__num brand-col__num--dark">1</span>
        </div>
      </div>

      <SicParvisMagnaPill />
    </div>
  );
});

export default BrandColumn;
