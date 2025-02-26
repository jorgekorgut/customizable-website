import { AnimatePresence } from "framer-motion";
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter, Route,
  Routes
} from "react-router-dom";

import Transitions from "utils/transition";

//New Imports
import { CardHolder } from "components/card/card_holder/card_holder.js";
import { CardTitle } from "components/card/card_title/card_title.js";
import { CardTitlePasserCommande } from "components/card/card_title/passer_commande/passer_commande";
import { CardUnderline } from 'components/card/card_underline/card_underline.js';
import { Carousel } from "components/carousel/carousel.js";
import { Footer } from 'components/footer/footer.js';
import 'components/general/background.css';
import 'components/general/clean.css';
import 'components/general/colors.css';
import 'components/general/positions.css';
import 'components/general/sizes.css';
import { ImageHolderSquare } from "components/image_holder/square/image_holder_square.js";
import { Map } from "components/map/map";
import { NavigationBarHeader } from 'components/navbar/navbar_pizza.js';
import Pin from "images/pin.svg";
import Leaflet from "leaflet";
import { SurCommande } from 'pages/commande/commande.js';
import { Fournisseurs } from 'pages/fournisseurs/fournisseurs.js';
import { Loading } from 'pages/loading/loading.js';
import { Pizzas } from 'pages/pizzas/pizzas.js';
import { Marker } from 'react-leaflet';
import { baseURL, useFetch } from 'utils/communication';
import { filterFournisseursMainPage } from "utils/filters/filterFournisseursMainPage";
import { filterMainPagePizzas } from "utils/filters/filterMainPagePizzas";
import { filterPizzaDuMoment } from "utils/filters/filterPizzaDuMoment";
import './index.css';
import { Informations } from "pages/information/information";
import { Distributeur } from "pages/distributeur/distributeur";
import { CustomPage } from "pages/custom-page/custom-page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AnimatePresence mode="wait">
    <BrowserRouter>
      <Routes>
        <Route key="1" path="/" element={<Index />} />
        <Route key="2" path="pizzas" element={<Pizzas />} />
        <Route key="3" path="page-1" element={<CustomPage name={"page-1"}/>} />
        <Route key="4" path="page-2" element={<CustomPage name={"page-2"}/>} />
        <Route key="5" path="pizza_du_moment" element={<SurCommande />} />
        <Route key="6" path="fournisseurs" element={<Fournisseurs />} />
        <Route key="7" path="informations" element={<Informations />} />
        <Route key="8" path="distributeur" element={<Distributeur />} />
      </Routes>
    </BrowserRouter>
  </AnimatePresence>
);

function Index() {

  [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);
  [window.loadingOuverture, window.errorOuverture, window.dataOuverture] = useFetch("api/ouvertures", window.dataOuverture);
  [window.loadingSuppliers, window.errorSuppliers, window.dataSuppliers] = useFetch("api/fournisseurs?populate=*", window.dataSuppliers);
  [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*", window.dataPizza);
  [window.loadingParameters, window.errorParameters, window.dataParameters] = useFetch("api/parametre", window.dataParameters);

  if (window.errorEtablissement || window.errorOuverture || window.errorSuppliers || window.errorPizza || window.errorParameters) {
    return <p>Okiosque à pizzas Oloron</p>;
  }

  if (window.loadingEtablissement || window.loadingOuverture || window.loadingSuppliers || window.loadingPizza || window.loadingParameters) {
    return <Loading />;
  }

  let pizzas = window.dataPizza.data;
  let fournisseurs = window.dataSuppliers.data;
  let etablissement = window.dataEtablissement.data
  let parameters = window.dataParameters.data;
  let openingTime = window.dataOuverture.data

  fournisseurs = filterFournisseursMainPage(fournisseurs);
  let pizzasMainPage = filterMainPagePizzas(pizzas);

  let pizzaMomentUrl = filterPizzaDuMoment(pizzas)?.attributes.image.data.attributes.url;

  let phone = etablissement.attributes.Telephone;
  let adress = etablissement.attributes.Adresse;
  let deliveryRadius = etablissement.attributes.Rayon_De_Livraison_En_Km;
  let latInput = etablissement.attributes.Latitude;
  let lngInput = etablissement.attributes.Longitude;
  let interval = parameters.attributes.Temps_Pour_Changer_Photo_Pizza_Accueil_En_Secondes * 1000;
  let transitionTime = parameters.attributes.Temps_Pour_Realiser_Transition_Accueil_En_Secondes * 1000;

  let center = {
    lat: latInput,
    lng: lngInput
  };

  let zoomInput = 15;

  let pinIcon = Leaflet.icon({
    iconUrl: Pin,
    iconRetinaUrl: Pin,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [50, 50],
  });

  return <>
    <Transitions className={"transition"}>
      <NavigationBarHeader />
      <Carousel urlImages={pizzasMainPage} timeToChangeMs={interval} transitionTimeMs={transitionTime} />
      <CardHolder>
        <CardTitle title="Où sommes nous">
          <Map zoom={zoomInput} center={center}>
            <Marker
              position={[latInput, lngInput]}
              icon={pinIcon}
            >
            </Marker>
          </Map>
          {
            deliveryRadius !== null &&
            <p>Livraison assuré dans un rayon de {deliveryRadius} km.</p>
          }
          
        </CardTitle>
        <CardTitlePasserCommande pizzas={pizzasMainPage} openingTime={openingTime} etablissement={etablissement} showOpening={true} imageContact={pizzaMomentUrl} />
      </CardHolder>
      {
        fournisseurs.length !== 0 &&
        <>
            <div className='title_underline_holder'>
            <h1 className='color_third'>
              Produits du terroir
            </h1>
            </div>
            <CardHolder>
              {
                fournisseurs.map((value) => {
                  return ((value.attributes !== undefined) ? (
                    <CardUnderline key={value.id} title={value.attributes.Nom}>
                      <div className="description_holder">
                        <div className='description'>{value.attributes.Description_Courte}</div>
                        <ImageHolderSquare src={baseURL + value.attributes.Photo.data?.attributes.url} />
                      </div>
                    </CardUnderline>) : undefined);
                })
              }
            </CardHolder>
        </>
      }
      <Footer adress={adress} contact={phone} />
    </Transitions>
  </>
}
