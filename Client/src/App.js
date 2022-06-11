
import './App.css';
import NavBar from './components/Nav';
import Packs from './containers/Packs';
import Dashboard from './containers/Dashboard';
import Categories from './containers/Categories';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";


function App() {
  return (
    <div >
      <NavBar />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="packs" element={<Packs />} />
            <Route path="categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
