export function parseFilterId(filterId) {
    const [key, id] = filterId.split("_");
    return { key, id };
}