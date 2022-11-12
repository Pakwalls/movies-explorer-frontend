import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Logo({ className }) {
  return (
    <Link to="/" className={className}>
      <img src={logo} alt="логотип" />
    </Link>
  );
}

export default Logo;
