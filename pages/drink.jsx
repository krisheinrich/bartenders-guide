import Link from 'next/link';
import PageLayout from '../layouts/page';
import * as apiHelper from '../helpers/api';
import * as drinkHelper from '../helpers/drink';
import 'isomorphic-unfetch';

const Drink = (props) => (
  <PageLayout>
    <div className="container">
      <h1>{ props.name }</h1>
      <h4 className="text-muted mt-1">{ props.glass }</h4>
      <div className="row mt-4">
        <div className="col-md-5 order-md-2 d-flex align-items-center">
          <img src={props.thumbUrl} className="img-fluid mw-100" alt={props.name}/>
        </div>
        <div className="col-md-7 order-md-1">
          <h4>{ props.category }</h4>
          <div className="mt-4">
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
            <p className="pr-3 pl-3">{ props.instructions }</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

Drink.getInitialProps = async (ctx) => {
  const { id: drinkId } = ctx.query;
  const data = await apiHelper.getDrinkData(drinkId);
  if (data.drinks == null) {
    return {};
  }

  const drink = data.drinks[0];
  return {
    name: drink.strDrink,
    category: drink.strCategroy,
    glass: drink.strGlass,
    thumbUrl: drink.strDrinkThumb,
    ingredients: drinkHelper.assembleIngredientList(drink),
    instructions: drink.strInstructions
  };
};

export default Drink;
