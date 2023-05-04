export function filterNotPizzasEnfant(map) {
    return map.filter((value) => {
        return !value.attributes.Menu_Enfant;
    });
}
