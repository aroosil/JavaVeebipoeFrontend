import Dropdown from "react-bootstrap/Dropdown";
import type { Category } from "../models/category";

function CategoryDropdown(
  categories: Category[],
  selectFunc: (arg: Category) => void
) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categories.map((category) => (
          <Dropdown.Item
            key={category.id}
            onClick={() => {
              selectFunc(category);
            }}
          >
            {category.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CategoryDropdown;
