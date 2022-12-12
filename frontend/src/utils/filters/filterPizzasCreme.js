
export function filterPizzasCreme(map) {
    return map.filter((value) => {
        return value.attributes.Base_Creme;
    });
}
