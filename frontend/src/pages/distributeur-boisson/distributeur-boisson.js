import Transitions from "../../utils/transition";
import "./distributeur-boisson.css";

//New Imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { Footer } from "components/footer/footer.js";
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading";
import { baseURL, useFetch } from "utils/communication.js";

export function DistributeurBoisson() {
  [
    window.loadingEtablissement,
    window.errorEtablissement,
    window.dataEtablissement,
  ] = useFetch("api/etablissement", window.dataEtablissement);
  
  [
    window.loadingDistributeurBoissonInfo,
    window.errorDistributeurBoissonInfo,
    window.dataDistributeurBoissonInfo,
  ] = useFetch(
    "api/distributeur-boisson-info?populate=*",
    window.dataDistributeurBoissonInfo
  );

  if (
    window.errorEtablissement ||
    window.errorInformation ||

    window.errorDistributeurInfo
  ) {
    return <p className="no-information">Distributeur des pizzas Oloron</p>;
  }

  if (
    window.loadingEtablissement ||
    window.loadingDistributeurs ||

    window.loadingDistributeurBoissonInfo
  ) {
    return <Loading />;
  }

  let etablissement = window.dataEtablissement.data;

  let boisson = window.dataDistributeurBoissonInfo.data;

  let phone = etablissement.attributes.Telephone;
  let adress = etablissement.attributes.Adresse;

  return (
    <>
      <Transitions>
        <NavigationBarHeader />
        <CardHolder>
          <CardWideImageTilteText
            title={boisson.attributes.Titre}
            description={boisson.attributes.Description}
            src={
              boisson.attributes.Photo.data != null
                ? baseURL + boisson.attributes.Photo.data.attributes.url
                : null
            }
            footer={
              boisson.attributes.Adresse != null
                ? boisson.attributes.Adresse
                : null
            }
          ></CardWideImageTilteText>
        </CardHolder>

        <Footer adress={adress} contact={phone} />
      </Transitions>
    </>
  );
}
