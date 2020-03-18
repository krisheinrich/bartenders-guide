
const API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1';

const fetchJsonSafe = async path => {
  try {
    const res = await fetch(`${API_BASE}/${path}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export const getDrinkData = async drinkId => await fetchJsonSafe(`lookup.php?i=${drinkId}`);

export const getIngredientData = async ingredientName => await fetchJsonSafe(`search.php?i=${ingredientName}`);

export const getIngredientDrinks = async ingredientName => await fetchJsonSafe(`filter.php?i=${ingredientName}`);

export const getIngredientImageUrl = ingredientName => `https://www.thecocktaildb.com/images/ingredients/${ingredientName}.png`;
