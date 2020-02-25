import Link from 'next/link';
import SearchBar from './searchbar';

const NavBar = () => (
  <>
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container">
      <Link href="/">
        <a className="navbar-brand">BG</a>
      </Link>
      <SearchBar className="form-inline"/>
    </div>
  </nav>
  <style jsx>{`
    .navbar-brand {
      font-family: 'Playball';
      font-size: 24px;
    }
  `}</style>
  </>
);

export default NavBar;
