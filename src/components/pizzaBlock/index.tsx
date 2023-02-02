import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, cartSelector } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

export const pastryTypes: string[] = ['традиционное', 'тонкое'];

type PizzaBlockType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type ThisItemType = {
  count: number;
  id: number;
  imageUrl: string;
  pastryType: number;
  price: number;
  size: number;
  title: string;
};

const PizzaBlock: React.FC<PizzaBlockType> = ({
  id,
  title = 'Без названия',
  price = 0,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector(cartSelector);
  const [sizeSelected, setSizeSelected] = React.useState<number>(0);
  const [pastryTypeSelected, setPastryTypeSelected] = React.useState<number>(0);

  const thisItems: ThisItemType[] = [];
  let totalCount: number = 0;

  items.forEach((item) => {
    if (item.id === id) {
      thisItems.push(item);
      totalCount = totalCount + item.count;
    }
  });

  const onAddItemToCart = () => {
    const size = sizes[sizeSelected];
    const pastryType = types[pastryTypeSelected];
    const count = 1;
    dispatch(addItem({ id, title, price, imageUrl, size, pastryType, count }));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setPastryTypeSelected(type)}
                className={pastryTypeSelected === index ? 'active' : ''}>
                {pastryTypes[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setSizeSelected(index)}
                className={index === sizeSelected ? 'active' : ''}>
                {size} см
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button onClick={onAddItemToCart} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {thisItems.length > 0 && <i>{totalCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
