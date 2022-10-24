import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.center}>
      <h1>
        <span>Ничего не найдено :(</span>
      </h1>
      <p className={styles.para}>На нашем веб сайте отсутствует запрашиваемая ваши страница</p>
    </div>
  );
};

export default NotFound;
