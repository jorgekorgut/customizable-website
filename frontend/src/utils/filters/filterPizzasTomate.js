
export function filterPizzasTomate(map) {
    return map.filter((value) => {
        return value.attributes.Base_Tomate;
    });
}
