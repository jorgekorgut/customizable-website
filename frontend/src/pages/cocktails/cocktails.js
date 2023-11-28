import Transitions from "../../utils/transition";

//new imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardTitlePasserCommande } from "components/card/card_title/passer_commande/passer_commande";
import { CardTitleText } from "components/card/card_title_text/card_title_text";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading.js";
import { baseURL, useFetch } from "utils/communication.js";

export function Cocktails() {
    [window.loadingOuverture, window.errorOuverture, window.dataOuverture] = useFetch("api/ouvertures", window.dataOuverture);
    [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*", window.dataPizza);
    [window.loadingCocktails, window.errorCocktails, window.dataCocktails] = useFetch("api/cocktails-dinatoire?populate=*", window.dataCocktails);
    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);

    if (window.errorCocktails || window.errorEtablissement || window.errorOuverture || window.errorPizza) {
        return <p>Cocktails Dinatoires Oloron</p>;
    }

    if (window.loadingCocktails || window.loadingEtablissement || window.loadingOuverture || window.loadingPizza) {
        return <Loading />;
    }

    let cocktail = window.dataCocktails.data;
    let etablissement = window.dataEtablissement.data;
    let pizzas = window.dataPizza.data;
    let openingTime = window.dataOuverture.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;

    let disponibiliteList = cocktail.attributes.Balise_Gauche_Contenue;
    if(disponibiliteList !== null && disponibiliteList !== undefined)
    {
        disponibiliteList = disponibiliteList.split('\n');
    }
    let titreBaliseGauche = cocktail.attributes.Titre_Balise_Gauche;

    let photoContactData = cocktail.attributes.Photo.data;

    return <>
        <Transitions>
            <NavigationBarHeader />
            {
                cocktail.attributes !== undefined &&
                <CardHolder>
                    <CardWideImageTilteText title="Cocktails Dinatoires" description={cocktail.attributes.Description_Grande} footer={cocktail.attributes.Description_Petite} src={(cocktail.attributes.Photo.data != undefined) ? (baseURL + cocktail.attributes.Photo.data?.attributes.url) : null}></CardWideImageTilteText>
                </CardHolder>
            }
            <div className="card_holder">
                {
                    titreBaliseGauche !== null &&
                    titreBaliseGauche !== undefined &&
                    <CardTitleText title={titreBaliseGauche}>
                        {
                            disponibiliteList !== undefined &&
                            disponibiliteList !== null &&
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
                }
                <CardTitlePasserCommande pizzas={pizzas} openingTime={openingTime} etablissement={etablissement} showOpening={false} imageContact={photoContactData?.attributes.url} />
            </div>
            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}
