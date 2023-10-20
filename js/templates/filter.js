export function filter(name, key){

    const div = document.createElement("div");

    const filter = document.createElement("div");
    filter.setAttribute("class", "list_");
    filter.setAttribute("id", "filter_" + key);

    const open = document.createElement("div");
    open.setAttribute("class", "header_list");
    open.setAttribute("id", "open_" + key);

    const p = document.createElement("p");
    p.innerHTML = name;

    const chevronD = document.createElement("i");
    chevronD.setAttribute("class", "fa-solid fa-chevron-down");

    const chevronU = document.createElement("i");
    chevronU.setAttribute("class", "fa-solid fa-chevron-up disabled");

    open.appendChild(p);
    open.appendChild(chevronD);
    open.appendChild(chevronU);
    filter.appendChild(open);

    const extension = document.createElement("div");
    extension.setAttribute("class", "extension_filter");

    const wrapSearch = document.createElement("div");
    wrapSearch.setAttribute("class", "wrap_srch");

    const inputSearch = document.createElement("div");
    inputSearch.setAttribute("class", "input_search");

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "input_" + key);

    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-magnifying-glass");

    inputSearch.appendChild(input);
    inputSearch.appendChild(icon);
    wrapSearch.appendChild(inputSearch);
    extension.appendChild(wrapSearch);

    const options = document.createElement("div");
    options.setAttribute("class", "list_options");
    options.setAttribute("id", "list_" + key);

    extension.appendChild(options);

    filter.appendChild(extension);

    div.appendChild(filter);

    return div;
}

