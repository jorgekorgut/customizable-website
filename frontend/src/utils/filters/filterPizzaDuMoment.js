export function filterPizzaDuMoment(map){
    map = map.filter((value)=>{
        return value.attributes.Pizza_Du_Moment;
    });
    return map[0];
}