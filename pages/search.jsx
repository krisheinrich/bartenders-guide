import PageLayout from '../layouts/page';
import DrinkCard from '../components/drink-card';
import 'isomorphic-unfetch';

const uniqBy = (arr, fn, set = new Set) => {
  return arr.filter(el => (v => !set.has(v) && set.add(v))(typeof fn === "function" ? fn(el) : el[fn]));
};

const renderList = (results) => {
  let cards = results.map((result) => {
    // Prepare API data for DrinkCard props
    const {
      idDrink: id,
      strDrink: name,
      strDrinkThumb: thumbUrl
    } = result;

    const cardProps = { id, name, thumbUrl };

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
  <PageLayout>
    <div className="container">
      { props.results.length
        ? <h2>Found { props.results.length } results for '{ props.query }'</h2>
        : <>
            <h2>No results found for '{ props.query }'</h2>
            <h5 className="font-italic">Try simplifying your search term or using another keyword</h5>
          </>
      }
      { renderList(props.results) }
    </div>
  </PageLayout>
);

Search.getInitialProps = async (ctx) => {
  const query = ctx.query.q;
  const resDrinksByName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`);
  const jsonDrinksByName = await resDrinksByName.json();
  const drinks = jsonDrinksByName.drinks || [];
  const resDrinksByIngredient = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`);
  const drinksByIngredient = await resDrinksByIngredient.text();
  if (drinksByIngredient) {
    const moreDrinks = JSON.parse(drinksByIngredient);
    if (moreDrinks && moreDrinks.drinks) {
      drinks.push(...moreDrinks.drinks)
    }
  }

  return { query, results: uniqBy(drinks, 'idDrink') };
};

export default Search;
