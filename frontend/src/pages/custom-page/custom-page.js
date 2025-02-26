import { CardHolder } from "components/card/card_holder/card_holder";
import { CardTitlePasserCommande } from "components/card/card_title/passer_commande/passer_commande";
import { CardTitleText } from "components/card/card_title_text/card_title_text";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading.js";
import { baseURL, useFetch } from "utils/communication.js";
import Transitions from "utils/transition.js";

import "./custom-page.css";


export function CustomPage(props) {

    [window.loadingOuverture, window.errorOuverture, window.dataOuverture] = useFetch("api/ouvertures", window.dataOuverture);
    [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*", window.dataPizza);
    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
    [window.loadingPageCustom, window.errorPageCustom, window.dataPageCustom] = useFetch(`api/${props.name}?populate=*`, window.dataPageCustom);

    if (window.errorPageCustom || window.errorEtablissement || window.errorPizza || window.errorOuverture) {
        return <p>Okiosque à pizzas Oloron</p>;
    }

    if (window.loadingPageCustom || window.loadingEtablissement || window.loadingPizza || window.loadingOuverture) {
        return <Loading />;
    }

    let pageCustom = window.dataPageCustom.data;
    let etablissement = window.dataEtablissement.data;
    let pizzas = window.dataPizza.data;
    let openingTime = window.dataOuverture.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;
    
    let titre = pageCustom.attributes.Titre;

    return <>
        <Transitions>
            <NavigationBarHeader />
            {
                pageCustom.attributes !== undefined &&
                <CardHolder>
                    <CardWideImageTilteText title={titre} description={pageCustom.attributes.Description_Grande} footer={pageCustom.attributes.Description_Petite} src={(pageCustom.attributes.Photo.data != null) ? baseURL + pageCustom.attributes.Photo.data.attributes.url : null}></CardWideImageTilteText>
                </CardHolder>
            }
            <div className="card_holder">
                <CardTitlePasserCommande pizzas={pizzas} openingTime={openingTime} etablissement={etablissement} showOpening={false} imageContact={pageCustom.attributes.Photo.data?.attributes.url} />
            </div>
            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}
