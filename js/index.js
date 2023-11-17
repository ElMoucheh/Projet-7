import recipes from "../datas/recipes.js";
import { recipeCard } from "./templates/recipeCard.js";
import { filter } from "./templates/filter.js";
import { dataFilter } from "./searching/dataFilter.js";
import { lineOption } from "./templates/lineOption.js";
import { optionSelected } from "./templates/optionSelected.js";
import { parseFilterId } from "./modules/parseFIlterId.js";

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
    initGlobalSearch();

    loadingOptionsFilter("ingredients", listIngredients);   // Add filter options in ingredient filter
    loadingOptionsFilter("appliance", listAppliances);      // Add filter options in appliances filter
    loadingOptionsFilter("ustensils", listUstensils);       // Add filter options in ustensils filter

    activeSearchFilter("ingredients");
    activeSearchFilter("appliance");
    activeSearchFilter("ustensils");

    counterRecipe(recipes); // Count of Recipes displayed 
}

function initGlobalSearch(){
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const searchTerm = document.getElementById("searchInputForm").value.toLowerCase();
        globalSearch(searchTerm);
    });
}

function globalSearch(searchTerm) {
    const cards = Array.from(document.querySelectorAll(".card"));

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const h2Element = card.querySelector(".card_main h2");
        const descriptionElement = card.querySelector(".card_main .steps p");

        if (h2Element.textContent.toLowerCase().includes(searchTerm) || descriptionElement.textContent.toLowerCase().includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }

    countDisplayedCards()
}

function loadingRecipe(r) {
    const cards = document.getElementById("list_cards");
    cards.innerHTML = "";

    for (let i = 0; i < r.length; i++) {
        cards.appendChild(recipeCard(r[i])); // Display recipe cards
    }
}

function activeSearchFilter(key) {
    const searchInput = document.getElementById("input_" + key);

    searchInput.addEventListener("input", () => {
        let searchTerm = searchInput.value;

        const listOptions = document.getElementById("list_" + key);
        const options = Array.from(listOptions.children);

        searchTerm = searchTerm.toLowerCase();

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const optionText = option.textContent.toLowerCase();
            if (optionText.includes(searchTerm)) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        }
    });
}

function initEventFilter() {
    const filters = document.querySelectorAll(".list_");

    for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
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
    }
}

function loadingOptionsFilter(key, list) {
    const listOptions = document.getElementById("list_" + key);

    for (let i = 0; i < list.length; i++) {
        const option = list[i];
        const line = lineOption(option, key);
        listOptions.appendChild(line);

        line.addEventListener("click", () => {
            eventClickFilter(key, line.id);
        });
    }
}

function countDisplayedCards() {
    const cards = document.querySelectorAll(".card");
    const counter = document.getElementById("counter");

    let count = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const style = card.style;
        if (style.display !== 'none') {
            count++;
        }
    }

    if (count > 1) {
        counter.innerHTML = count + " Recettes";
    } else {
        counter.innerHTML = count + " Recette";
    }
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

    console.log(elementId);

    if (optionRemove) {
        optionRemove.parentNode.removeChild(optionRemove);
    }
    researchRecipes();
    optionsSelected.appendChild(optionSelected(key, elementId, eventClickFilter, removeFilterInArray, researchRecipes));
}

function removeFilterInArray(key, elementId){
    filterSelected[key].delete(elementId);
}

function filterRecipesByCategory(recipes, selectedFilters) {
    if (selectedFilters.length === 0) {
        return recipes;
    }

    let filteredRecipes = recipes.filter(recipe => {
        return selectedFilters.every(filter => {
            const { key, id } = parseFilterId(filter);
            const list = getListByKey(key);
            return list.find(item => item.name === id && item.recipes.has(recipe.id));
        });
    });

    return filteredRecipes;
}

function getListByKey(key) {
    switch (key) {
        case "ingredients":
            return listIngredients;
        case "appliance":
            return listAppliances;
        case "ustensils":
            return listUstensils;
        default:
            return [];
    }
}

function researchRecipes() {
    const selectedFilters = Array.from(filterSelected.ingredients)
        .concat(Array.from(filterSelected.appliance))
        .concat(Array.from(filterSelected.ustensils));

    const recipesList = filterRecipesByCategory(recipes, selectedFilters);

    loadingRecipe(recipesList);
    counterRecipe(recipesList);
}

init();