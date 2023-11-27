import Transitions from "../../utils/transition";

//New Imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from 'components/footer/footer.js';
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading";
import { baseURL, useFetch } from "utils/communication.js";


export function Fournisseurs() {

    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
    [window.loadingSuppliers, window.errorSuppliers, window.dataSuppliers] = useFetch("api/fournisseurs?populate=*", window.dataSuppliers);

    if (window.errorEtablissement || window.errorSuppliers) {
        return <p>Fournisseurs Oloron</p>;
    }

    if (window.loadingEtablissement || window.loadingSuppliers) {
        return <Loading />;
    }

    let etablissement = window.dataEtablissement.data;
    let fournisseurs = window.dataSuppliers.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;



    return <>
        <Transitions>
            <NavigationBarHeader />

            <CardHolder>
                {
                    fournisseurs.map((value) => {
                        return <CardWideImageTilteText key={value.id} title={value.attributes.Nom} description={value.attributes.Description_Longue} footer={value.attributes.Produit} src={(value.attributes.Photo.data != null) ? (baseURL + value.attributes.Photo.data.attributes.url) : null}></CardWideImageTilteText>
                    })
                }
            </CardHolder>
            <Footer adress={adress} contact={phone} />
        </Transitions>
    </>
}
