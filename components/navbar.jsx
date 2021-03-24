import Link from 'next/link';
import SearchBar from './searchbar';

const NavBar = () => (
  <>
  <nav className="navbar navbar-expand-md navbar-dark">
    <div className="container">
      <Link href="/">
        <img className="logo-icon" src="cocktail.png"/>
      </Link>
      <SearchBar className="form-inline"/>
    </div>
  </nav>
  <style jsx>{`
    .navbar {
      flex: 0 0 auto;
      background: rgba(52, 58, 64, 0.3);
      box-shadow: 0 1px 8px #444;
    }
    .logo-icon {
      width: 44px;
      cursor: pointer;
      margin: 6px 0;
    }
  `}</style>
  </>
);

export default NavBar;
