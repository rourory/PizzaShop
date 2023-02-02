import React from 'react';

type CategoriesType = {
  categories: string[];
  categoryInd: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesType> = React.memo(
  ({ categories = ['Все'], categoryInd, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                onClick={() => onChangeCategory(index)}
                className={categoryInd === index ? 'active' : ''}>
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

export default Categories;
