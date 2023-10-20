export function lineOption(option, key){
    const p = document.createElement("p");
    p.innerHTML = option.name;
    p.id = key + "_" + option.name;
    
    return p;
}