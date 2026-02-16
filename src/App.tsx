import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { 
  Home, Chapter, NotFound,
  Chapter1, Chapter2, Chapter3, Chapter4, Chapter5, Chapter6,
  Chapter7, Chapter8, Chapter9, Chapter10, Chapter11, Chapter12 
} from './chapters';
import './i18n';

// Get base path from Vite config
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chapter/1" element={<Chapter1 />} />
          <Route path="chapter/2" element={<Chapter2 />} />
          <Route path="chapter/3" element={<Chapter3 />} />
          <Route path="chapter/4" element={<Chapter4 />} />
          <Route path="chapter/5" element={<Chapter5 />} />
          <Route path="chapter/6" element={<Chapter6 />} />
          <Route path="chapter/7" element={<Chapter7 />} />
          <Route path="chapter/8" element={<Chapter8 />} />
          <Route path="chapter/9" element={<Chapter9 />} />
          <Route path="chapter/10" element={<Chapter10 />} />
          <Route path="chapter/11" element={<Chapter11 />} />
          <Route path="chapter/12" element={<Chapter12 />} />
          <Route path="chapter/:id" element={<Chapter />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
