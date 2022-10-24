import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { pastryTypes } from '../../components/pizzaBlock';
import PizzaBlockSkeleton from '../../components/pizzaBlock/PizzaBlockSkeleton';

export const FullPizzaInfo = () => {
  const params = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    types: [];
    sizes: [];
  }>();
  const [sizeSelected, setSizeSelected] = React.useState<number>(0);
  const [pastryTypeSelected, setPastryTypeSelected] = React.useState<number>(0);

  React.useEffect(() => {
    async function getPizza(id) {
      await axios
        .get(`https://63303d64591935f3c88c4fed.mockapi.io/pizzas?id=${id}`)
        .then((response) => console.log(setPizza(response.data[0])))
        .catch((err) => console.log(err));
    }
    getPizza(params.id);
  }, []);

  return pizza ? (
    <div className="container">
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
          <img className="pizza-block__image" src={pizza.imageUrl} alt="pizza" />
          <h4 className="pizza-block__title__info">{pizza.title}</h4>
          <div className="pizza-block__selector">
            <ul>
              {pizza.types.map((type, index) => (
                <li
                  key={index}
                  onClick={() => setPastryTypeSelected(type)}
                  className={pastryTypeSelected === index ? 'active' : ''}>
                  {pastryTypes[type]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, index) => (
                <li
                  key={index}
                  onClick={() => setSizeSelected(index)}
                  className={index === sizeSelected ? 'active' : ''}>
                  {size} см
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PizzaBlockSkeleton />
  );
};

export default FullPizzaInfo;
