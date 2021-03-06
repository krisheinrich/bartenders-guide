import Link from 'next/link';
import PageLayout from '../layouts/page';
import LazyImage from '../components/lazy-image';
import * as apiHelper from '../helpers/api';
import 'isomorphic-unfetch';

const Ingredient = ({ name, type, description, imgUrl, drinkList }) => {
  return (
    <PageLayout>
      <div className="container">
        <h1>{ name }</h1>
        { type && name !== type && <h4 className="text-muted">Type of { type }</h4> }
        <div className="row mt-3 mb-5">
          <div className="col-lg-4 d-flex align-items-center">
          <LazyImage className="mw-100" src={imgUrl} alt={name} withPlaceholder={false}/>
          </div>
          <div className="col-lg-8 mt-4">
            <h4>Description</h4>
            <p className={`mt-4 description ${description ? 'indented' : ''}`}>
              { description || <span className="missing-data">No information available</span> }
            </p>
          </div>
        </div>
        <div className="mt-5">
          <h4>Cocktails with {name}</h4>
          <div className="d-flex flex-wrap mt-3">
            { (drinkList && drinkList.length
              ? drinkList.map(drink => (
                <div key={drink.id} className="drink-thumb col-sm-4 col-md-3 col-lg-2 mb-2">
                  <Link href={`/drink?id=${drink.id}`}>
                    <div className="position-relative">
                      <img className="mw-100 rounded" src={drink.imgUrl} alt={name}/>
                      <div className="name-overlay">
                        { drink.name }
                      </div>
                    </div>
                  </Link>
                </div>
              ))
              : <span className="missing-data">No drinks found</span>
            ) }
          </div>
        </div>
      </div>
      <style jsx>{`
        .missing-data {
          font-style: italic;
        }
        .description.indented {
          text-indent: 3em;
        }
        .drink-thumb {
          cursor: pointer;
        }
        .name-overlay {
          height: 100%;
          width: 100%;
          background: rgba(0,0,0,0.4);
          position: absolute;
          top: 0;
          text-align: center;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
          color: white;
          font-size: 2rem;
          display: flex;
        }
        @media screen and (min-width: 576px) {
          .name-overlay {
            font-size: 1.25rem;
          }
        }
        @media screen and (min-width: 770px) {
          .name-overlay {
            display: none;
          }
          .drink-thumb:hover .name-overlay {
            display: flex;
          }
        }
      `}</style>
    </PageLayout>
  );
};


Ingredient.getInitialProps = async (ctx) => {
  const { name: ingredientName } = ctx.query;

  try {
    const [ingredientData, drinksData] = await Promise.all([
      apiHelper.getIngredientData(ingredientName),
      apiHelper.getIngredientDrinks(ingredientName)
    ]);

    if (ingredientData.ingredients == null) {
      return {
        name: ingredientName
      };
    }

    const ingredient = ingredientData.ingredients[0];
    let initProps = {
      name: ingredient.strIngredient,
      description: ingredient.strDescription,
      type: ingredient.strType,
      imgUrl: apiHelper.getIngredientImageUrl(ingredientName)
    };

    if (drinksData && drinksData.drinks.length > 0) {
      const drinkList = drinksData.drinks.map(drink => ({
        id: drink.idDrink,
        name: drink.strDrink,
        imgUrl: drink.strDrinkThumb
      }));
      initProps.drinkList = drinkList;
    }

    return initProps;
  } catch (e) {
    console.error('There was a problem fetching data for ' + ingredientName);
    console.error(e);
    return { name: ingredientName };
  }
};

export default Ingredient;
