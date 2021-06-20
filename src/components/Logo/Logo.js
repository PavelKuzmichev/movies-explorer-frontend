import { Link } from "react-router-dom";
import logo from '../../images/header-logo.svg'
import './Logo.css'
function Logo() {
  return (
    <Link to='/' title='Вернуться на главную' className='logo'>
    <img src={logo} alt='Логотип'/>
    </Link>
  );
}

export default Logo;

