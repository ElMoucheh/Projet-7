import { normalizeText } from '../modules/normalizeText.js'

export function dataFilter(key ,recipes){
    let dataObject = new Set();

    switch (key) {
        case "ingredients":
            recipes.forEach(recipe => {
                recipe[key].forEach(ingredient => {
                    const ingredientName = normalizeText(ingredient.ingredient);
                    const recipeId = recipe.id;

                    if (!dataObject[ingredientName]) {
                        dataObject[ingredientName] = {
                            "name": ingredientName,
                            "recipes": new Set([recipeId])
                        };
                    } else {
                        dataObject[ingredientName].recipes.add(recipeId);
                    }
                });
            });
            break;

        case "appliance":
            recipes.forEach(recipe => {
                const applianceName = normalizeText(recipe[key]);
                const recipeId = recipe.id;

                if (!dataObject[applianceName]) {
                    dataObject[applianceName] = {
                        "name": applianceName,
                        "recipes": new Set([recipeId])
                    };
                } else {
                    dataObject[applianceName].recipes.add(recipeId);
                }
            });
            break;

        case "ustensils":
            recipes.forEach(recipe => {
                recipe[key].forEach(ustensil => {
                    const utensilName = normalizeText(ustensil);
                    const recipeId = recipe.id;

                    if (!dataObject[utensilName]) {
                        dataObject[utensilName] = {
                            "name": utensilName,
                            "recipes": new Set([recipeId])
                        };
                    } else {
                        dataObject[utensilName].recipes.add(recipeId);
                    }
                });
            });
            break;
    
        default:
            break;
    }
    return Array.from(Object.values(dataObject));;
}