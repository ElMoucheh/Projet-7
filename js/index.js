import recipes from "../datas/recipes.js";
import { recipeCard } from "./templates/recipeCard.js";
import { filter } from "./templates/filter.js";
import { dataFilter } from "./searching/dataFilter.js";
import { lineOption } from "./templates/lineOption.js";
import { optionSelected } from "./templates/optionSelected.js";

const listIngredients = dataFilter("ingredients", recipes); // List of Ingredients 
const listAppliances = dataFilter("appliance", recipes);    // List of Appliances
const listUstensils = dataFilter("ustensils", recipes);     // List of Ustensils

let idRecipes = new Set();

let filterSelected = {
    "ingredients" : new Set(),
    "appliance" : new Set(),
    "ustensils" : new Set(),
};

function init() {
    const sect_filters = document.getElementById("filter");

    sect_filters.appendChild(filter("Ingrédients", "ingredients")); // Init the the filter ingredients
    sect_filters.appendChild(filter("Appareils", "appliance"));     // Init the the filter appliances
    sect_filters.appendChild(filter("Ustensils", "ustensils"));     // Init the the filter ustensils

    loadingRecipe(recipes);
    initEventFilter();

    loadingOptionsFilter("ingredients", listIngredients);   // Add filter options in ingredient filter
    loadingOptionsFilter("appliance", listAppliances);      // Add filter options in appliances filter
    loadingOptionsFilter("ustensils", listUstensils);       // Add filter options in ustensils filter

    counterRecipe(recipes); // Count of Recipes displayed 
}

function loadingRecipe(r) { // r is an array of objects
    const cards = document.getElementById("list_cards");
    cards.innerHTML = "";

    r.forEach(e => {
        cards.appendChild(recipeCard(e));                   // Display recipe cards
    });

}

function initEventFilter(){
    const filters = document.querySelectorAll(".list_");

    filters.forEach(filter => {
        const header = filter.querySelector(".header_list");
        const ext = filter.querySelector(".extension_filter");

        header.addEventListener("click", () => {
            const downIcon = header.querySelector(".fa-chevron-down");
            const upIcon = header.querySelector(".fa-chevron-up");

            if (downIcon.classList.contains("disabled")) {
                ext.style.display = "none";
                downIcon.classList.remove("disabled");
                upIcon.classList.add("disabled");
            } else {
                ext.style.display = "block";
                upIcon.classList.remove("disabled");
                downIcon.classList.add("disabled");
            }
        });
    });
}

function loadingOptionsFilter(key, list) { // the key has 3 variants "ingredients | appliance | ustensils" corresponding to its list
    const listOptions = document.getElementById("list_" + key);

    list.forEach(option => { // browse the list of options
        const line = lineOption(option, key);
        listOptions.appendChild(line);          // Add line built in lineOption
        
        line.addEventListener("click", () => {
            eventClickFilter(key, line.id);
        });
    });
}

function counterRecipe(list){
    const counter = document.getElementById("counter");
    if(list.length > 1){
        counter.innerHTML = list.length + " Recettes";
    } else {
        counter.innerHTML = list.length + " Recette";
    }
}

function eventClickFilter(key, elementId){
    const optionRemove = document.getElementById(elementId);
    const optionsSelected = document.getElementById("optionsSelected");
    filterSelected[key].add(elementId);

    if (optionRemove) {
        optionRemove.parentNode.removeChild(optionRemove);
    }
    researchRecipes();
    optionsSelected.appendChild(optionSelected(key, elementId, eventClickFilter, removeFilterInArray, researchRecipes));
}

function removeFilterInArray(key, elementId){
    filterSelected[key].delete(elementId);
}

function researchRecipes(){

    let recipesList = [];

    if(filterSelected.ingredients.size == 0 && filterSelected.appliance.size == 0 && filterSelected.ustensils.size == 0){
        loadingRecipe(recipes);
        idRecipes = new Set();
    } else {

        if (filterSelected.ingredients.size > 0) {
            filterSelected.ingredients.forEach(ingredient => {
                let splitIngredient = ingredient.split("_");
                let rewriteIngredient = splitIngredient[1];

                listIngredients.forEach(ingerdient => {
                    if(rewriteIngredient === ingerdient.name){
                        idRecipes = new Set([...idRecipes, ...ingerdient.recipes]);
                    }
                });
                
            });
        }

        if (filterSelected.appliance.size > 0) {
            filterSelected.appliance.forEach(appliance => {
                let splitAppliance = appliance.split("_");
                let rewriteAppliance = splitAppliance[1];

                listAppliances.forEach(appilance => {
                    if(rewriteAppliance === appilance.name){
                        idRecipes = new Set([...idRecipes, ...appilance.recipes]);
                    }
                });
            });
        }

        if (filterSelected.ustensils.size > 0) {
            filterSelected.ustensils.forEach(ustensil => {
                let splitUstensil = ustensil.split("_");
                let rewriteUstensil = splitUstensil[1];

                listUstensils.forEach(sustensil => {
                    if(rewriteUstensil === sustensil.name){
                        idRecipes = new Set([...idRecipes, ...sustensil.recipes]);
                    }
                });
            });
        }

        idRecipes.forEach(id => {
            recipes.forEach(recipe => {
                if (recipe.id == id) {
                    recipesList.push(recipe);
                }
            })
        });

        loadingRecipe(recipesList);
        counterRecipe(recipesList);
    }
}

init();