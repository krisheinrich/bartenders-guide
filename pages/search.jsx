import NavBar from '../components/navbar';
import 'isomorphic-unfetch';

const Search = (props) => (
  <div>
    <NavBar />
    <h2>List for query { props.query }</h2>
    <h3>{ props.results.length } results</h3>
    <ul>
      { props.results.map(({ idDrink, strDrink }) => (
        <li key={idDrink}>{ strDrink }</li>
      )) }
    </ul>
  </div>
);

Search.getInitialProps = async (ctx) => {
  const query = ctx.query.q;
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const json = await res.json();
  return { query, results: json.drinks };
};

export default Search;
