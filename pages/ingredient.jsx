import PageLayout from '../layouts/page';
import 'isomorphic-unfetch';

const Ingredient = ({ name, type, description, imgUrl }) => {
  return (
    <PageLayout>
      <div className="container">
        <h1>{ name }</h1>
        { type && name !== type && <h4 className="text-muted">Type of { type }</h4> }
        <div className="row mt-5">
          <div className="col-md-4 d-flex align-items-center">
          <img src={imgUrl} alt={name}/>
          </div>
          <div className="col-md-8">
            <h4>Description</h4>
            <p className="description mt-4">{ description }</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .description {
          text-indent: 3em;
        }
      `}</style>
    </PageLayout>
  );
};


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
    type: ingredient.strType,
    imgUrl: `https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`
  };
};

export default Ingredient;
