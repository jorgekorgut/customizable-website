import Transitions from "../../utils/transition";
import "./distributeur.css";

//New Imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardWideImageTilteText } from "components/card/card_wide_image_title_text/card_wide_image_title_text.js";
import { CardWideImageTilteTextDate } from "components/card/card_wide_image_title_text_date/card_wide_image_title_text_date";
import { Footer } from "components/footer/footer.js";
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading";
import { baseURL, useFetch } from "utils/communication.js";

export function Distributeur() {
  [
    window.loadingEtablissement,
    window.errorEtablissement,
    window.dataEtablissement,
  ] = useFetch("api/etablissement", window.dataEtablissement);
  [
    window.loadingDistributeurs,
    window.errorDistributeurs,
    window.dataDistributeurs,
  ] = useFetch("api/distributeurs?populate=*", window.dataDistributeurs);
  [
    window.loadingDistributeurInfo,
    window.errorDistributeurInfo,
    window.dataDistributeurInfo,
  ] = useFetch("api/distributeur-info?populate=*", window.dataDistributeurInfo);
  // Distributeur_boisson_info
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
    window.errorDistributeurs ||
    window.errorDistributeurInfo
  ) {
    return <p className="no-information">Distributeur des pizzas Oloron</p>;
  }

  if (
    window.loadingEtablissement ||
    window.loadingDistributeurs ||
    window.loadingDistributeurInfo ||
    window.loadingDistributeurBoissonInfo
  ) {
    return <Loading />;
  }

  let etablissement = window.dataEtablissement.data;
  let distributeurs = window.dataDistributeurs.data;

  let informations = window.dataDistributeurInfo.data;
  let boisson = window.dataDistributeurBoissonInfo.data;

  let phone = etablissement.attributes.Telephone;
  let adress = etablissement.attributes.Adresse;

  console.log(window.dataDistributeurBoissonInfo)

  return (
    <>
      <Transitions>
        <NavigationBarHeader />
        <CardHolder>
          <CardWideImageTilteText
            title={informations.attributes.Titre}
            description={informations.attributes.Description}
            src={
              informations.attributes.Photo.data != null
                ? baseURL + informations.attributes.Photo.data.attributes.url
                : null
            }
            footer={
              informations.attributes.Adresse != null
                ? informations.attributes.Adresse
                : null
            }
          ></CardWideImageTilteText>
          <CardWideImageTilteTextDate
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
          ></CardWideImageTilteTextDate>
        </CardHolder>

        <CardHolder>
          {distributeurs?.map((value) => {
            return (
              <CardWideImageTilteText
                key={value.id}
                title={value.attributes.Titre}
                description={value.attributes.Detaille}
                src={
                  value.attributes.Photo.data != null
                    ? baseURL + value.attributes.Photo.data.attributes.url
                    : null
                }
                footer={
                  value.attributes.Prix != null ? value.attributes.Prix : null
                }
              ></CardWideImageTilteText>
            );
          })}
          {!distributeurs && (
            <p className="no-pizzas">
              Actuellement, aucune pizza n'est disponible.
            </p>
          )}
        </CardHolder>
        <Footer adress={adress} contact={phone} />
      </Transitions>
    </>
  );
}
