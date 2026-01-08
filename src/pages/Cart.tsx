import { useState } from "react";
import type { Product } from "../models/product";
import ParcelMachines from "../components/ParcelMachines";

function Cart() {
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const [selectedPM, setSelectedPM] = useState("");

  function order() {
    fetch(`http://localhost:8080/orders?personId=1&pmName=${selectedPM}`, {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => (window.location.href = json.link));
  }

  function removeProduct(index: number) {
    cart.splice(index, 1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function empty() {
    setCart([]);
    localStorage.setItem("cart", "[]");
  }

  function cartSum(): number {
    let sum = 0;
    cart.forEach((product) => {
      sum += product.price;
    });
    return sum;
  }

  return (
    <div>
      <button onClick={empty}>Empty cart</button>

      {cart.map((product, index) => (
        <div key={product.id + "" + index}>
          <span>{product.name} - </span>
          <span>{product.price.toFixed(2)}€</span>
          <button onClick={() => removeProduct(index)}>X</button>
        </div>
      ))}

      <div>Sum: {cartSum().toFixed(2)} €</div>
      <br />

      <ParcelMachines setSelectedPM={setSelectedPM} />
      <br />

      <button onClick={order} disabled={cartSum() >= 7000}>
        Order
      </button>
      {cartSum() >= 7000 && (
        <div>Ostukorvi summa liiga suur! Jaota tellimus mitmesse osasse!</div>
      )}
    </div>
  );
}

export default Cart;
