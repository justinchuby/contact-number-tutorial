import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { Home, Chapter, Chapter1, Chapter2, Chapter5 } from './chapters';
import './i18n';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chapter/1" element={<Chapter1 />} />
          <Route path="chapter/2" element={<Chapter2 />} />
          <Route path="chapter/5" element={<Chapter5 />} />
          <Route path="chapter/:id" element={<Chapter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
