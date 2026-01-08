import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Product } from "../models/product";
import { DoGet } from "../helpers/DoGet";

function SingleProduct() {
  const { product_id } = useParams(); // <Route path="toode/:product_id" element={<SingleProduct />} />
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    DoGet(
      import.meta.env.VITE_HOST_URL + `/products/` + product_id,
      3,
      setProduct,
      "GET PRODUCT: "
    );
  }, [product_id]);
  // useEffecti dependency array kuhu l2hevad k6ik v2lised muutujad
  // kui see muutuja muutub l2heb useEffect uuesti k2ima

  if (product === undefined) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div>Name: {product.name}</div>
      <div>Price: {product.price}€</div>
      <div>Kategooria: {product.category?.name || "Puudub"}</div>
      <div>Kogus: {product.stock}</div>
      <div>{product.active ? "Aktiivne" : "Mitteaktiivne"}</div>
    </div>
  );
}

export default SingleProduct;
