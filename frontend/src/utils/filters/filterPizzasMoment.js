
export function filterPizzasMoment(map) {
    return map.filter((value) => {
        return value.attributes.Pizza_Du_Moment;
    });
}
