import PageLayout from '../layouts/page';
import 'isomorphic-unfetch';

const Ingredient = ({ name, type, description }) => (
  <PageLayout>
    <div className="container">
      <h1>{ name }</h1>
      { type && name !== type && <h4 className="text-muted">Type of { type }</h4> }
      <div>
        <h4>Description</h4>
        <p>{ description }</p>
      </div>
    </div>
  </PageLayout>
);


Ingredient.getInitialProps = async (ctx) => {
  const { name: ingredientName } = ctx.query;
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`);
  const json = await res.json();

  if (json.ingredients == null) {
    return {
      name: ingredientName
    };
  }

  const ingredient = json.ingredients[0];
  return {
    name: ingredient.strIngredient,
    description: ingredient.strDescription || 'No information available.',
    type: ingredient.strType
  };
};

export default Ingredient;
