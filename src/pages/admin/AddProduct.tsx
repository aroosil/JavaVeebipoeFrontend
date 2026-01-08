import { useEffect, useState } from "react";
import type { Product } from "../../models/product";
import { ToastContainer, toast } from "react-toastify";
import type { Category } from "../../models/category";
import { DoGet } from "../../helpers/DoGet";

function AddProduct() {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    active: false,
    category: {
      id: 1,
      name: "",
    },
  });
  const [categories, setCategories] = useState<Category[]>();

  useEffect(() => {
    DoGet(
      "http://localhost:8080/categories",
      3,
      setCategories,
      "GET CATEGORIES: "
    );
  }, []);

  function addProduct() {
    fetch("http://localhost:8080/products", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        toast.success("Product added!");
      });
  }

  return (
    <div>
      <label>Name</label>
      <input
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
        type="text"
      ></input>
      <br />

      <label>Image</label>
      <input
        type="text"
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <br />

      <label>Price</label>
      <input
        onChange={(e) =>
          setProduct({ ...product, price: Number(e.target.value) })
        }
        type="number"
      ></input>
      <br />

      <label>Stock</label>
      <input
        onChange={(e) =>
          setProduct({ ...product, stock: Number(e.target.value) })
        }
        type="number"
      ></input>
      <br />

      <label>Active</label>
      <input
        onChange={(e) => setProduct({ ...product, active: e.target.checked })}
        type="checkbox"
      ></input>
      <br />

      <label>Category</label>
      <select
        defaultValue={product.category?.id}
        onChange={(e) => {
          setProduct({
            ...product,
            category: { id: Number(e.target.value), name: "" },
          });
        }}
      >
        {categories?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />

      <button onClick={() => addProduct()}>Add product</button>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
