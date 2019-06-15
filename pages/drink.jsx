import MainLayout from '../layouts/main';
import * as apiHelper from '../helpers/api';
import 'isomorphic-unfetch';

const Drink = (props) => (
  <MainLayout>
    <h1>{ props.name }</h1>
    <div className="row">
      <div className="col-sm-7">
        <h4 className="text-muted">{ props.glass }</h4>
        <h4>{ props.category }</h4>
        <div>
          <h5>Ingredients</h5>
          <ul>
            { props.ingredients.map((entry, i) => (
              <li key={i}>{ entry }</li>
            )) }
          </ul>
        </div>
        <div>
          <h5>Instructions</h5>
          <p>{ props.instructions }</p>
        </div>
      </div>
      <div className="col-sm-5">
        <img src={props.thumbUrl} class="img-fluid mw-100" alt={props.name}/>
      </div>
    </div>
  </MainLayout>
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
