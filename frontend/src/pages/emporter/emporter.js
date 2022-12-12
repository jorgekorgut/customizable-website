import { CardHolder } from "components/card/card_holder/card_holder";
import { CardTitlePasserCommande } from "components/card/card_title/passer_commande/passer_commande";
import { CardTitleText } from "components/card/card_title_text/card_title_text";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading.js";
import { baseURL, useFetch } from "utils/communication.js";
import Transitions from "utils/transition.js";

import "./emporter.css";


export function Emporter(props) {

    [window.loadingOuverture, window.errorOuverture, window.dataOuverture] = useFetch("api/ouvertures",window.dataOuverture);
    [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*",window.dataPizza);
    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
    [window.loadingEmporter, window.errorEmporter, window.dataEmporter] = useFetch("api/plats-a-emporter?populate=*",window.dataEmporter);

    if (window.errorEmporter || window.errorEtablissement || window.errorPizza || window.errorOuverture) {
        return <p>Error.</p>;
    }
    
    if (window.loadingEmporter || window.loadingEtablissement || window.loadingPizza || window.loadingOuverture) {
        return <Loading/>;
    }

    let emporter = window.dataEmporter.data;
    let etablissement = window.dataEtablissement.data;
    let pizzas = window.dataPizza.data;
    let openingTime = window.dataOuverture.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;

    let disponibiliteList = emporter.attributes.Disponibilite.split('\n');

    return <>
        <Transitions>
            <NavigationBarHeader />
            {
                emporter.attributes !== undefined &&
                <CardHolder>
                    <CardWideImageTilteText title="Plats à emporter" description={emporter.attributes.Description_Grande} footer={emporter.attributes.Description_Petite} src={baseURL + emporter.attributes.Photo.data.attributes.url}></CardWideImageTilteText>
                </CardHolder>
            }
            <div className="card_holder">
                <CardTitleText title="Disponibilités">
                    {
                        disponibiliteList !== undefined &&
                        disponibiliteList.map((value, index) => {
                            return (
                                value !== "" &&
                                <div key={index} className="text_holder">
                                    <div className="start"></div>
                                    <p >
                                        {value}
                                    </p>
                                </div>
                            );
                        })
                    }
                </CardTitleText>
                <CardTitlePasserCommande pizzas={pizzas} openingTime={openingTime} etablissement={etablissement} showOpening={false} imageContact={emporter.attributes.Photo_Contact.data?.attributes.url}/>
            </div>
            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}