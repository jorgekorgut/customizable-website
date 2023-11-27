
import Transitions from "../../utils/transition";

//new imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardTitlePasserCommande } from "components/card/card_title/passer_commande/passer_commande";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading.js";
import { baseURL, useFetch } from "utils/communication.js";


export function SurCommande() {

    [window.loadingOuverture, window.errorOuverture, window.dataOuverture] = useFetch("api/ouvertures",window.dataOuverture);
    [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*",window.dataPizza);
    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
    [window.loadingCommande, window.errorCommande, window.dataCommande] = useFetch("api/pizza-sur-commande?populate=*",window.dataCommande);

    if (window.errorCommande || window.errorEtablissement || window.errorOuverture || window.errorPizza) {
        return <p>Commandes</p>;
    }
    
    if (window.loadingCommande || window.loadingEtablissement || window.loadingOuverture || window.loadingPizza) {
        return <Loading/>;
    }

    let etablissement = window.dataEtablissement.data;
    let surCommande = window.dataCommande.data;
    let openingTime = window.dataOuverture.data;
    let pizzas = window.dataPizza.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;

    return <>
        <Transitions>
            <NavigationBarHeader />
            <CardHolder>
            {
                <CardWideImageTilteText title={surCommande.attributes.Titre} description={surCommande.attributes.Description_Longue} footer={surCommande.attributes.Produit} src={(surCommande.attributes.Photo.data !=null ) ? (baseURL + surCommande.attributes.Photo.data?.attributes.url) : null}></CardWideImageTilteText>
            }
            </CardHolder>
            <CardHolder>
            <CardTitlePasserCommande pizzas={pizzas} openingTime={openingTime} etablissement={etablissement}/>
            </CardHolder>

            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}
