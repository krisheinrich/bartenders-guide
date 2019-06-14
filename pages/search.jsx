import NavBar from '../components/navbar';

const Search = (props) => (
  <div>
    <NavBar />
    List for query { props.query }
  </div>
);

Search.getInitialProps = async (ctx) => {
  const query = ctx.query.q;
  // const res = await fetch('https://api.github.com/repos/zeit/next.js');
  // const json = await res.json();
  return { query };
};

export default Search;