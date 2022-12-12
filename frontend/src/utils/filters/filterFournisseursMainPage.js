export function filterFournisseursMainPage(map){
    return map.filter((value)=>{
        return value.attributes.Exposer_En_Page_Principal;
    });
}