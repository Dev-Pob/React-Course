import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>Welcome to my HomePage!</h1>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
}
