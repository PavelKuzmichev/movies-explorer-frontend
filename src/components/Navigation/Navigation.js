import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router';

function Navigation() {
  const { pathname } = useLocation();

  if (pathname === '/') {
  return (
    <nav className='header__navigation'>
        <NavLink to='/movies' title='Фильмы' className='header__link header__link_films ' activeClassName='header__link_active'>Фильмы</NavLink>
        <NavLink to='/saved-movies' title='Сохранённые фильмы' className='header__link header__link_saved-films' activeClassName='header__link_active'>Сохранённые фильмы</NavLink>
    </nav>
  );
} return (
  <nav className='header__navigation'>
      <NavLink to='/movies' title='Фильмы' className='header__link header__link_films header__link_black ' activeClassName='header__link_active'>Фильмы</NavLink>
      <NavLink to='/saved-movies' title='Сохранённые фильмы' className='header__link header__link_saved-films header__link_black' activeClassName='header__link_active'>Сохранённые фильмы</NavLink>
  </nav>
);}
export default Navigation