import Transitions from "../../utils/transition";
import "./information.css"

//New Imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { CardWideImageTilteTextDate } from "components/card/card_wide_image_title_text_date/card_wide_image_title_text_date";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading";
import { baseURL, useFetch } from "utils/communication.js";

function formatDateTime(date) {
    if(date == null) return "";
    let d = new Date(date);
    return d.toLocaleTimeString("fr") + " " + d.toLocaleDateString("fr");
}

export function Informations() {

    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
    [window.loadingInformation, window.errorInformation, window.dataInformations] = useFetch("api/informations?populate=*", window.dataInformations);

    if (window.errorEtablissement || window.errorInformation) {
        return <p className="no-information">Informations</p>;
    }

    if (window.loadingEtablissement || window.loadingInformation) {
        return <Loading />;
    }

    let etablissement = window.dataEtablissement.data;
    let informations = window.dataInformations.data;

    if(informations){
        informations.sort((a, b) => {
            return new Date(b.attributes.Date) - new Date(a.attributes.Date);
        })
    }

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;



    return <>
        <Transitions>
            <NavigationBarHeader />

            <CardHolder>
                {
                    informations?.map((value) => {
                        return <CardWideImageTilteTextDate
                            key={value.id}
                            title={value.attributes.Titre}
                            description={value.attributes.Detaille}
                            footer={formatDateTime(value.attributes.Date)}
                            src={(value.attributes.Photo.data != null) ? (baseURL + value.attributes.Photo.data.attributes.url) : null
                            }>

                        </CardWideImageTilteTextDate>
                    })
                }
                {
                    !informations && 
                    <p className="no_information">
                        Actuellement, aucune information n'est disponible.
                    </p>
                }
            </CardHolder>
            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}
