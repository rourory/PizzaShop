import React from 'react';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Categories from '../../components/categories';
import Sort from '../../components/sort';
import PizzaBlock from '../../components/pizzaBlock';
import { sortTypes } from '../../components/sort';
import PizzaBlockSkeleton from '../../components/pizzaBlock/PizzaBlockSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryIndex,
  setFullState,
  setPage,
  filterSelector,
} from '../../redux/slices/filterSlice';
import { searchValueSelector } from '../../redux/slices/searchSlice';
import { fetchPizzas, pizzaSelector, FetchingStatus } from '../../redux/slices/pizzaSlice';
import { AppDispatch } from '../../redux/store';
import QueryString from 'qs';
import { types } from 'sass';

const Home = () => {
  //VARIABLES
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categories = React.useMemo(
    () => ['Все', 'Мясные', 'Вегетерианская', 'Гриль', 'Острые', 'Закрытые'],
    [],
  );

  const fetchData = (query: string) => {
    dispatch(fetchPizzas(query));
  };

  //VARIABLES_FROM_REDUX
  const dispatch = useDispatch<AppDispatch>();
  const { categoryIndex, selectedSortType, page, ascendingSort } = useSelector(filterSelector);
  const searchValue = useSelector(searchValueSelector);
  const { data, fetchStatus } = useSelector(pizzaSelector);

  //LIFECYCLE_METHODS
  React.useEffect(() => {
    if (window.location.search) {
      const params = QueryString.parse(window.location.search.substring(1));
      dispatch(
        setFullState({
          categoryIndex: Number(params.category ? params.category : 0),
          selectedSortType: sortTypes.find((obj) => obj.title === params.sortBy),
          ascendingSort: params.order === 'asc' ? true : false,
          page: Number(params.page),
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      const query: string = QueryString.stringify({
        page,
        limit: 4,
        sortBy: selectedSortType.title,
        order: ascendingSort ? 'asc' : 'desc',
        category: categoryIndex > 0 ? categoryIndex : undefined,
        title: searchValue ? searchValue : undefined,
      });
      if (isMounted.current) {
        navigate(`?${query}`);
      }
      fetchData(query);
      isMounted.current = true;
    }
    isSearch.current = false;
  }, [categoryIndex, selectedSortType, ascendingSort, searchValue, page]);

  const onChangeCategory = React.useCallback((type: number) => {
    dispatch(setCategoryIndex(type));
  }, []);

  //RENDER_METHOD
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categories={categories}
          categoryInd={categoryIndex}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">
        {searchValue ? `Поиск по запросу: "${searchValue}"` : `Все пиццы`}
      </h2>
      <div className="content__items">
        {fetchStatus === FetchingStatus.SUCCESS
          ? data.map((object) => <PizzaBlock key={object.id} {...object} />)
          : fetchStatus === FetchingStatus.LOADING
          ? [...new Array(4)].map((item, i) => <PizzaBlockSkeleton key={i} />)
          : data.map((object) => <PizzaBlock key={object.id} {...object} />)}
      </div>
      <Pagination
        defaultPage={1}
        page={page}
        size="large"
        count={3}
        onChange={(event, pageNumber) => {
          dispatch(setPage(pageNumber));
        }}
      />
    </div>
  );
};

export default Home;
