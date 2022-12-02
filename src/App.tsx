import Content from '@src/pages/Content';
import Home from '@src/pages/Home';
import { BrowserRouter as Routers, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Routers>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Content />} />
      </Routes>
    </Routers>
  );
}
