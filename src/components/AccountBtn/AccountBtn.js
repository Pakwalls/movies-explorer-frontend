import { Link } from "react-router-dom";
import btnIcon from "../../images/btn-icon.svg";

function AccountBtn() {
  return (
    <Link to="/profile" className="account-btn hovered-item">
      Аккаунт
      <img src={btnIcon} alt="иконка кнопки" className="account-btn__icon" />
    </Link>
  );
}

export default AccountBtn;
