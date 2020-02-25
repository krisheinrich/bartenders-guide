import React, { Component } from 'react';
import SearchIcon from '../components/icons/search';
import { goToSearchResults } from '../helpers/search';

class SearchBar extends Component {
  state = {
    searchQuery: ''
  };

  handleSearch = () => {
    const { searchQuery } = this.state;
    if (searchQuery) {
      goToSearchResults(searchQuery);
    }
  };

  updateQuery = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  render() {
    const { placeholder = "Search", className = '' } = this.props;
    const { searchQuery } = this.state;
    let formCls = "flex-nowrap";
    if (className) formCls = `${formCls} ${className}`;
    return (
      <form className={formCls} onSubmit={(e) => { e.preventDefault(); }}>
        <div className="px-2 py-1 bg-light rounded rounded-pill shadow-sm">
          <div className="input-group">
            <input type="search" className="form-control border-0 bg-light"
              value={searchQuery} onChange={this.updateQuery}
              placeholder={placeholder} aria-label="Search"/>
            <div className="input-group-append">
              <button type="submit" className="btn btn-link" onClick={this.handleSearch}>
                <SearchIcon width="20" height="20"/>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
