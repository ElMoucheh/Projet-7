export function recipeCard(recipe){

    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const divHeader = document.createElement("div");
    divHeader.setAttribute("class", "card_header");

    const divTimer = document.createElement("div");
    divTimer.setAttribute("class", "timer");
    divTimer.textContent = recipe.time + " min";

    const img = document.createElement("img");
    img.setAttribute("src", `assets/recipe_pictures/${recipe.image}`);
    img.setAttribute("alt", "Photo de " + recipe.name);

    divHeader.appendChild(divTimer);
    divHeader.appendChild(img);

    const divMain = document.createElement("div");
    divMain.setAttribute("class", "card_main");

    const h2 = document.createElement("h2");
    h2.textContent = recipe.name;

    divMain.appendChild(h2);

    const divSteps = document.createElement("div");
    divSteps.setAttribute("class", "steps");

    const h3Recette = document.createElement("h3");
    h3Recette.textContent = "RECETTE";

    const pDescription = document.createElement("p");
    pDescription.textContent = recipe.description;

    divSteps.appendChild(h3Recette);
    divSteps.appendChild(pDescription);

    divMain.appendChild(divSteps);

    const divIngredients = document.createElement("div");
    divIngredients.setAttribute("class", "ingredients");

    const h3Ingredients = document.createElement("h3");
    h3Ingredients.textContent = "INGRÉDIENTS";

    divIngredients.appendChild(h3Ingredients);

    const divListIngredients = document.createElement("div");
    divListIngredients.setAttribute("class", "list_ingredient");

    recipe.ingredients.forEach(i => {
        const divIngredient = document.createElement("div");
        divIngredient.setAttribute("class", "ingredient");

        const h4 = document.createElement("h4");
        h4.textContent = i.ingredient;

        const p = document.createElement("p");
        p.textContent = i.quantity + "/" + i.unit;

        divIngredient.appendChild(h4);
        divIngredient.appendChild(p);

        divListIngredients.appendChild(divIngredient);
    });

    divIngredients.appendChild(divListIngredients);
    divMain.appendChild(divIngredients);
    card.appendChild(divHeader);
    card.appendChild(divMain);

    return card;
}