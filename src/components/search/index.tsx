import styles from './Search.module.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue as setToDispatch } from '../../redux/slices/searchSlice';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import QueryString from 'qs';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  /**
   * Если при первом рендере в строке URl есть ключ title и он имеет значение, заполнить input значением из title
   */
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      if (params.title) {
        console.log(params);
        /* @ts-ignore */
        inputRef.current.value = params.title;
      }
    }
  }, []);

  const onClickClear = (event) => {
    dispatch(setToDispatch(''));
    setSearchValue('');
    inputRef.current.focus();
  };

  const updateData = React.useCallback(
    debounce((event) => {
      dispatch(setToDispatch(event.target.value));
    }, 300),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.search_icon}
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50">
        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z" />
      </svg>
      <input
        ref={inputRef}
        onChange={(event) => {
          setSearchValue(event.target.value);
          updateData(event);
        }}
        value={searchValue}
        placeholder="Поиск пиццы..."
        type="text"
      />
      {searchValue && (
        <svg
          onClick={(event) => onClickClear(event)}
          xmlns="http://www.w3.org/2000/svg"
          className={styles.clear_icon}
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
