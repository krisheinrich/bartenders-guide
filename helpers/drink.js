export function assembleIngredientList(result) {
  const list = [];
  for (let i = 1; i <= 15; i++) {
    // Handle case when API returns spaces
    const ingredient = (result[`strIngredient${i}`] || '').trim();
    const measure = (result[`strMeasure${i}`] || '').trim();
    if (ingredient || measure) {
      list.push([measure, ingredient]);
    }
  }
  return list;
}
