import Content from './components/content';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Content />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
