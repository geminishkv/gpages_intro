import { forwardRef } from 'react';
import '../styles/BrandColumn.css';
import SicParvisMagnaPill from './SicParvisMagnaPill';

const BrandColumn = forwardRef(function BrandColumn(_, ref) {
  return (
    <div ref={ref} className="brand-col" aria-hidden="true">

      <div className="brand-col__shapes">
        <div className="brand-col__circle brand-col__circle--gradient">
          <img
            src="/img/logotype/symbol_gradient_black_red.png"
            alt=""
            className="brand-col__logo-img"
          />
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
