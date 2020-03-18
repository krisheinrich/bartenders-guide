import Link from 'next/link';
import PageLayout from '../layouts/page';
import * as apiHelper from '../helpers/api';
import 'isomorphic-unfetch';

const Drink = (props) => (
  <PageLayout>
    <div className="container">
      <h1>{ props.name }</h1>
      <div className="row">
        <div className="col-sm-7">
          <h4 className="text-muted mt-1">{ props.glass }</h4>
          <h4>{ props.category }</h4>
          <div className="mt-5">
            <h5>Ingredients</h5>
            <ul>
              { props.ingredients.map(([measure, name], i) => (
                <li key={i}>
                  { measure }
                  { ` ` }
                  <Link href={`/ingredient?name=${name}`}>
                    <a>{ name }</a>
                  </Link>
                </li>
              )) }
            </ul>
          </div>
          <div className="mt-5">
            <h5>Instructions</h5>
            <p>{ props.instructions }</p>
          </div>
        </div>
        <div className="col-sm-5">
          <img src={props.thumbUrl} className="img-fluid mw-100" alt={props.name}/>
        </div>
      </div>
    </div>
  </PageLayout>
);

Drink.getInitialProps = async (ctx) => {
  const { id: drinkId } = ctx.query;
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
  const json = await res.json();
  if (json.drinks == null) {
    return {};
  }

  const drink = json.drinks[0];
  return {
    name: drink.strDrink,
    category: drink.strCategroy,
    glass: drink.strGlass,
    thumbUrl: drink.strDrinkThumb,
    ingredients: apiHelper.assembleIngredientList(drink),
    instructions: drink.strInstructions
  };
};

export default Drink;
