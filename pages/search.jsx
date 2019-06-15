import MainLayout from '../layouts/main';
import DrinkCard from '../components/drink-card';
import 'isomorphic-unfetch';

const renderList = (results) => {
  let cards = results.map((result) => {
    // Prepare API data for DrinkCard props
    const {
      idDrink: id,
      strDrink: name,
      strDrinkThumb: thumbUrl,
      strIngredient1,
      strIngredient2
    } = result;

    let preview = strIngredient1;
    if (strIngredient2) {
      preview += `, ${strIngredient2}...`;
    }

    const cardProps = { id, name, thumbUrl, preview };

    return (
      <DrinkCard key={id} {...cardProps} />
    );
  });

  return (
    <div className="card-deck d-flex">
      { cards }
    </div>
  );
};

const Search = (props) => (
  <MainLayout>
    <h2>List for query '{ props.query }'</h2>
    <h3>{ props.results.length } results</h3>
    { renderList(props.results) }
  </MainLayout>
);

Search.getInitialProps = async (ctx) => {
  const query = ctx.query.q;
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const json = await res.json();
  return { query, results: json.drinks || [] };
};

export default Search;
