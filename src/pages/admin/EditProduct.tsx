import { useNavigate, useParams } from "react-router-dom";
import { DoGet } from "../../helpers/DoGet";
import { useEffect, useState } from "react";
import type { Product } from "../../models/product";
import type { Category } from "../../models/category";
import { ToastContainer, toast } from "react-toastify";

function EditProduct() {
  // Reacti Hook --> Reacti erikood
  // 1. alati algab use- eesliidesega
  // 2. alati tuleb importida
  // 3. alati tuleb käima tõmmata (ehk sulud on lõpus)
  // 4. ei tohi olla funktsiooni sees käivitada (luua)
  // 5. ei tohi tingimuslikult käivitada (luua)

  // renderdamine -> HTMLi esmakordne väljakuvamine
  // re-renderdamine -> HTMLi uuendamine useState setteri abil

  // Reacti Hooki mõte on see, et teda luuakse täpselt 1x
  // ja kui re-renderdatakse (HTMLi uuendatakse), siis teda ei looda
  //   kui re-renderdatakse, siis kõik muu peale hookide käivitub
  const defaultProduct = {
    name: "",
    price: 0,
    stock: 0,
    active: false,
    category: {
      id: 1,
      name: "",
    },
  };

  const { product_id } = useParams();
  const [product, setProduct] = useState<Product>();

  const [changedProduct, setChangedProduct] = useState<Product>(defaultProduct);

  const [categories, setCategories] = useState<Category[]>();

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    DoGet(
      import.meta.env.VITE_HOST_URL + `/products/` + product_id,
      3,
      setProduct,
      "GET PRODUCT: "
    ).then((json) => {
      setChangedProduct(json);
      setLoading(false);
    });

    DoGet(
      import.meta.env.VITE_HOST_URL + `/categories`,
      3,
      setCategories,
      "GET CATEGORIES: "
    );
  }, [product_id]);

  function saveProduct() {
    if (changedProduct?.name === "") {
      toast.error("Need a product name!");
      return;
    }
    if (changedProduct?.price <= 0) {
      toast.error("Price needs to be > 0!");
      return;
    }
    fetch(import.meta.env.VITE_HOST_URL + `/products`, {
      method: "PUT",
      body: JSON.stringify(changedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        toast("Product saved");
        navigate("/admin/halda-tooteid");
      });
  }

  if (loading) {
    return <div></div>;
  }

  if (product === undefined) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      EditProduct
      <br />
      <div>
        <label>Name</label>
        <input
          onChange={(e) =>
            setChangedProduct({ ...changedProduct, name: e.target.value })
          }
          defaultValue={product.name}
          type="text"
        ></input>
        <br />

        <label>Price</label>
        <input
          onChange={(e) =>
            setChangedProduct({
              ...changedProduct,
              price: Number(e.target.value),
            })
          }
          defaultValue={product.price}
          type="number"
        ></input>
        <br />

        <label>Stock</label>
        <input
          onChange={(e) =>
            setChangedProduct({
              ...changedProduct,
              stock: Number(e.target.value),
            })
          }
          defaultValue={product.stock}
          type="number"
        ></input>
        <br />

        <label>Active</label>
        <input
          onChange={(e) =>
            setChangedProduct({ ...changedProduct, active: e.target.checked })
          }
          defaultChecked={product.active}
          type="checkbox"
        ></input>
        <br />

        <label>Category</label>
        <select
          defaultValue={product.category?.id}
          onChange={(e) => {
            setChangedProduct({
              ...changedProduct,
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

        <button onClick={() => saveProduct()}>Edit product</button>
        <ToastContainer />
        <br />
      </div>
    </div>
  );
}

export default EditProduct;
