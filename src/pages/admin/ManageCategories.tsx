import { useEffect, useState } from "react";
import { DoGet } from "../../helpers/DoGet";
import type { Category } from "../../models/category";
import { Button } from "react-bootstrap";

function ManageCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({ name: "" });

  useEffect(() => {
    DoGet(
      "http://localhost:8080/categories",
      3,
      setCategories,
      "GET CATEGORIES: "
    );
  }, []);

  function deleteCategory(categoryId: number) {
    fetch("http://localhost:8080/categories/" + categoryId, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.status) {
          alert(json.message);
          return;
        }
        setCategories(json);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addCategory() {
    fetch("http://localhost:8080/categories", {
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message && json.timestamp && json.status) {
          alert(json.message);
          return;
        }
        setCategories(json);
      });
  }

  return (
    <div>
      Kategooriad {categories.length}
      <br />
      <label>Kategooria nimi</label>
      <br />
      <input
        type="text"
        onChange={(event) => {
          setNewCategory({
            name: event.target.value,
          });
        }}
      ></input>
      <br />
      <button onClick={addCategory}> Lisa uus kategooria</button>
      {categories.map((category) => (
        <div key={category.id}>
          {category.name}
          <Button
            variant="danger"
            onClick={() => deleteCategory(Number(category.id))}
          >
            🗑
          </Button>
          <br />
        </div>
      ))}
    </div>
  );
}

export default ManageCategories;
