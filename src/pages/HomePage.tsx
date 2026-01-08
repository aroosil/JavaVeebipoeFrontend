import { useEffect, useState } from "react";
import type { Product } from "../models/product";
import type { Category } from "../models/category";
import CategoryDropdown from "../components/CategoryDropdown";
import { DoGet } from "../helpers/DoGet";
import { Link } from "react-router-dom";
import type { PageInfo } from "../models/pageInfo";
import PageControls from "../components/PageControls";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selected, setSelected] = useState<Product[]>([]);

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 0,
    size: 5,
    sortKey: "id",
    order: "asc",
  });
  const [activeCategory, setActiveCategory] = useState<number>(0);
  // const [_totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  function filterByCategoryName(category: Category): void {
    // if (category.name == "ALL") {
    //   setSelected(products);
    //   return;
    // }
    const newSelection: Product[] = [];

    products.forEach((product) => {
      if (product.category.name == category.name) {
        newSelection[newSelection.length] = product;
      }
    });

    setActiveCategory(Number(category.id));

    // setSelected(newSelection);
  }

  function incrementPage(value: number) {
    let current = pageInfo.page;
    current += value;
    if (current <= 0) {
      current = 0;
    }
    setPageInfo({ ...pageInfo, page: current });
  }

  // onLoad funktsioon - > l2heb 1x k2ima
  // TODO: promise handling? retry 3 times
  useEffect(() => {
    const productsPromise = DoGet(
      `http://localhost:8080/products?categoryId=${activeCategory}&page=${pageInfo.page}&size=${pageInfo.size}&sort=${pageInfo.sortKey},${pageInfo.order}`,
      3,
      setProducts,
      "GET PRODUCTS: "
    ).then((json) => {
      // setTotalElements(json.totalElements);
      setTotalPages(Number(json.totalPages));

      return json.content;
    });

    productsPromise.then((result) => {
      setSelected(result);
    });
  }, [pageInfo, activeCategory]);

  useEffect(() => {
    const categoryPromise = DoGet(
      "http://localhost:8080/categories",
      3,
      setCategories,
      "GET CATEGORIES: "
    );
    categoryPromise.then((result) => {
      const newList = [];

      newList[0] = { id: 0, name: "ALL" }; // add an option to select all

      result.forEach((element: Category) => {
        newList[newList.length] = element;
      });

      setCategories(newList);
    });
  }, []);

  function addToCart(product: Product) {
    const productsInCart: Product[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    productsInCart.push(product);
    localStorage.setItem("cart", JSON.stringify(productsInCart));
  }

  return (
    <>
      <div>HomePage</div>
      <div>
        <b>Categories</b>
        <br></br>
        {CategoryDropdown(categories, filterByCategoryName)}

        <br></br>
        <b>Products</b>
        <PageControls
          pageInfo={pageInfo}
          totalPages={totalPages}
          pageIncrement={incrementPage}
          setPageInfo={setPageInfo}
        />
        {selected.map((product) => (
          <div key={product.id}>
            <div>{product.name}</div>
            <div>{product.price}€</div>
            <button onClick={() => addToCart(product)}>Lisa ostukorvi</button>
            <Link to={"/toode/" + product.id}>
              <button>Vaata lähemalt</button>
            </Link>
          </div>
        ))}
        {/* Page controls */}
        <PageControls
          pageInfo={pageInfo}
          totalPages={totalPages}
          pageIncrement={incrementPage}
          setPageInfo={setPageInfo}
        />
        <label>Sorteeri</label>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "id", order: "asc" })
          }
        >
          Vanemad ees
        </button>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "id", order: "desc" })
          }
        >
          Uuemad ees
        </button>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "name", order: "asc" })
          }
        >
          Nimi A-Z
        </button>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "name", order: "desc" })
          }
        >
          Nimi Z-A
        </button>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "price", order: "asc" })
          }
        >
          Hind kasvavalt
        </button>
        <button
          onClick={() =>
            setPageInfo({ ...pageInfo, sortKey: "price", order: "desc" })
          }
        >
          Hind kahanevalt
        </button>
      </div>
    </>
  );
}

export default HomePage;
