import { Link } from "react-router-dom";

function StartPage() {
  return (
    <><Link to="loginPage">
      <button>HejHej</button>
    </Link>
    <Link to="productPage">
        <button>HejHej product</button>
      </Link></>
  );
}

export default StartPage;
