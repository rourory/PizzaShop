import React from 'react';
import { Link } from 'react-router-dom';
import image from './empty-cart.png'

export const EmptyCart: React.FC = () => {
   return (
      <div className="wrapper">
         <div className="content">
            <div className="container container--cart">
               <div className="cart cart--empty">
                  <h2>
                     Корзина пустая <span>😕</span>
                  </h2>
                  <p>
                     Вероятней всего, вы не заказывали ещё пиццу.
                     <br />
                     Для того, чтобы заказать пиццу, перейди на главную страницу.
                  </p>
                  <img src={image} alt="Empty cart" />
                  <Link to="/" className="button button--outline button--add go-back-btn">
                     <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M7 13L1 6.93015L6.86175 1"
                           stroke="#D3D3D3"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>

                     <span>Вернуться назад</span>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};
