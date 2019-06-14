import Router from 'next/router';

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
      <div>
        <button>Hamburger</button>
        <div className="row">
          <input type="text" value={searchQuery} onChange={this.updateQuery}/>
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <style jsx>{`
          div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
        `}</style>
      </div>
    );
  }
}

export default NavBar;