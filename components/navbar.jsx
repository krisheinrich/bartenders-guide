import Router from 'next/router';
import SearchIcon from './icons/search';

class NavBar extends React.Component {
  state = {
    searchQuery: ''
  };

  updateQuery = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery) {
      Router.push(`/search?q=${searchQuery}`);
    }
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <nav class="navbar navbar-expand-md navbar-dark bg-primary">
        <div class="container">
        <a class="navbar-brand" href="#">BG</a>
          <form className="form-inline flex-nowrap" onSubmit={(e) => { e.preventDefault(); }}>
            <input class="form-control" type="search" placeholder="Search"
              value={searchQuery} onChange={this.updateQuery} aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit"
              onClick={this.handleSearch}>
              <SearchIcon width="16" height="16"/>
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default NavBar;