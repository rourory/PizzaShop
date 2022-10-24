import React from 'react';
import styles from './Sort.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedSortType,
  setAscendingSort,
  selectedSortTypeFilterSelector,
  ascendingSortFilterSelector,
} from '../../redux/slices/filterSlice';

export const sortTypes = [
  { name: 'популярности', title: 'rating' },
  { name: 'цене', title: 'price' },
  { name: 'названию', title: 'title' },
];

export default function Sort() {
  //VARIABLES_FROM_REDUX
  const dispatch = useDispatch();
  const sortRef = React.useRef();
  const selectedSortType = useSelector(selectedSortTypeFilterSelector);
  const ascendingSort = useSelector(ascendingSortFilterSelector);

  //OTHER_VARIAVBLES
  const [visible, setVisible] = React.useState(false);

  const onClickAscendingSort = () => {
    console.log(ascendingSort);
    dispatch(setAscendingSort(!ascendingSort));
  };

  const onSortListItemClick = (type) => {
    dispatch(setSelectedSortType(type));
    setVisible(false);
  };

  const onClickOutOfSortPopup = (event) => {
    if (!event.composedPath().includes(sortRef.current)) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', (event) => {
      onClickOutOfSortPopup(event);
    });
    return document.body.removeEventListener('click', onClickOutOfSortPopup);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={ascendingSort ? styles.rotate_icon_ascending : styles.rotate_icon_descending}
          onClick={() => onClickAscendingSort()}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setVisible(!visible)}>{selectedSortType.name}</span>
      </div>
      {visible && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((type, index) => (
              <li
                key={index}
                onClick={() => onSortListItemClick(type)}
                className={selectedSortType === type ? 'active' : ''}>
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
