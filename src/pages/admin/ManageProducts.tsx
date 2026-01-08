import { useEffect, useState } from "react";
import type { Product } from "../../models/product";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { DoGet } from "../../helpers/DoGet";
import { useNavigate } from "react-router-dom";

function ManageProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    DoGet("http://localhost:8080/admin-products", 3, setProducts);
  }, []);

  function deleteProduct(productId: number) {
    fetch("http://localhost:8080/products/" + productId, { method: "DELETE" });
  }

  return (
    <div>
      <Table responsive="sm" hover bordered striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Active</th>
            <th>Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.active ? "Aktiivne" : "Mitteaktiivne"}</td>
              <td>{product.stock}</td>
              <td>{product.category?.name}</td>
              {/* TODO: create a confirmation modal */}
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(Number(product.id))}
                >
                  🗑
                </Button>
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/admin/muuda-toode/${product.id}`)}
                >
                  Muuda
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageProducts;
