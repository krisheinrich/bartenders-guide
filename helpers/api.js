export function assembleIngredientList(result) {
  const list = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = result[`strIngredient${i}`] || '';
    const measure = result[`strMeasure${i}`] || '';
    const item = `${measure} ${ingredient}`.trim();
    if (item) {
      list.push(item);
    }
  }
  return list;
}
