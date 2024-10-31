import './App.css';
import { useEffect, useState } from 'react';
import { useTelegram } from './components/hooks/useTelegram';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Form from './components/Form/Form';
import { Categories } from './components/Categories/Categories';

function App() {
  const { tg } = useTelegram();
  const [activeCategory, setActiveCategory] = useState('Все');

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <>
              <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
              <ProductList activeCategory={activeCategory} />
            </>
          }
        />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;