import { lineOption } from "./lineOption.js";

export function optionSelected(key, elementId, eventClickFilter, removeFilterInArray, researchRecipes){

    var splitPart = elementId.split("_"); // Divise la chaîne en utilisant le caractère "_"
    var name = splitPart[splitPart.length - 1];

    const div = document.createElement("div");
    const p = document.createElement("p");
    const span = document.createElement("span");

    div.setAttribute("class", "option");
    div.setAttribute("id", elementId);
    p.innerHTML = name;
    span.setAttribute("class", "cross");

    span.addEventListener('click', () => {

        let element = {
            "name": name
        }

        const optionRemove = document.getElementById(elementId);
        const listOptions = document.getElementById("list_" + key); 

        if (optionRemove) {
            optionRemove.parentNode.removeChild(optionRemove);
            removeFilterInArray(key, elementId);
            researchRecipes();
        }

        let p = lineOption(element);
        p.addEventListener("click", () => {
            eventClickFilter(key, elementId);
        });

        listOptions.appendChild(p);
    });

    div.appendChild(p);
    div.appendChild(span);

    return div;
}