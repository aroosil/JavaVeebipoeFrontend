// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import Menu from "./components/Menu";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import ManageCategories from "./pages/admin/ManageCategories";
import SingleProduct from "./pages/SingleProduct";
import EditProduct from "./pages/admin/EditProduct";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage></HomePage>} />
        <Route path="/ostukorv" element={<Cart></Cart>} />

        <Route path="/admin/lisa-toode" element={<AddProduct></AddProduct>} />
        <Route
          path="/admin/halda-tooteid"
          element={<ManageProducts></ManageProducts>}
        />
        <Route
          path="/admin/halda-kategooriaid"
          element={<ManageCategories></ManageCategories>}
        />
        <Route path="admin/muuda-toode/:product_id" element={<EditProduct />} />

        <Route path="toode/:product_id" element={<SingleProduct />} />

        <Route path="/*" element={<NotFound></NotFound>} />
      </Routes>

      {/* 




      */}

      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onMouseDown={() => setCount((count) => count + 2)}
          onMouseUp={() => setCount((count) => count - 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
