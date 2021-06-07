import Logo from '../Logo/Logo';
import './Header.css';

function Header() {
  return (
    <header className='header'>
    <Logo />
    
            <div className='header__sign'>
                <h2 title='Регистрация' className='header__sign-link'>Регистрация</h2>
                <h2  title='Войти' className='header__sign-link'>Войти</h2>
            </div>
        
   
</header>
  );
}

export default Header;