import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: "p1", title: "product-1" },
  { id: "p2", title: "product-2" },
  { id: "p3", title: "product-3" },
];

export default function ProductPage() {
  return (
    <>
      <h1>Welcome to my Product page!</h1>
      <ul>
        {PRODUCTS.map((item) => {
          return (
            <li key={item.id}>
              <Link to={item.id}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
