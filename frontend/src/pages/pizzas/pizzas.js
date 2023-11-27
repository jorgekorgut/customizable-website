import Transitions from "../../utils/transition";

//new imports
import { CardHolder } from "components/card/card_holder/card_holder";
import { CardImage } from "components/card/card_image/card_image";
import { Footer } from "components/footer/footer";
import { NavigationBarHeader } from "components/navbar/navbar_pizza";
import { Loading } from "pages/loading/loading";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { baseURL, useFetch } from "utils/communication.js";
import { filterPizzasCreme } from "utils/filters/filterPizzasCreme";
import { filterPizzasEnfant } from "utils/filters/filterPizzasEnfant";
import { filterNotPizzasEnfant } from "utils/filters/filterNotPizzasEnfant";
import { filterPizzasMoment } from "utils/filters/filterPizzasMoment";
import { filterPizzasTomate } from "utils/filters/filterPizzasTomate";
import "./pizzas.css";

var navigate;
export function OnClickCommande() {
    navigate("/sur_commande");
}

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
};

Array.prototype.intersection = function (b) {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        let isUnique = true;
        for (var j = 0; j < b.length; ++j) {
            if (a[i] === b[j])
                isUnique = false;
        }
        if (isUnique) {
            a.splice(i--, 1);
        }
    }

    return a;
};

export function Pizzas() {
    navigate = useNavigate();

    const [isCremeActive, onCremeUpdate] = useState(false);
    const [isTomateActive, onTomateUpdate] = useState(false);
    const [isEnfantActive, onEnfantUpdate] = useState(false);
    const [isMomentActive, onMomentUpdate] = useState(false);

    [window.loadingPizza, window.errorPizza, window.dataPizza] = useFetch("api/pizzas?populate=*", window.dataPizza);
    [window.loadingEtablissement, window.errorEtablissement, window.dataEtablissement] = useFetch("api/etablissement", window.dataEtablissement);

    if (window.errorEtablissement || window.errorPizza) {
        return <p>Pizzeria Oloron</p>;
    }

    if (window.loadingEtablissement || window.loadingPizza) {
        return <Loading />;
    }

    let etablissement = window.dataEtablissement.data;
    let pizzasDefault = window.dataPizza.data;

    let phone = etablissement.attributes.Telephone;
    let adress = etablissement.attributes.Adresse;

    let pizzasBase = [];
    let hasMomentResults = false;

    if (isCremeActive) {
        pizzasBase = pizzasBase.concat(filterPizzasCreme(pizzasDefault)).unique();
    }
    if (isTomateActive) {
        pizzasBase = pizzasBase.concat(filterPizzasTomate(pizzasDefault)).unique();
    }

    let pizzasMenu = [];

    if (isEnfantActive) {
        pizzasMenu = pizzasMenu.concat(filterPizzasEnfant(pizzasDefault)).unique();
    }
    if (isMomentActive) {
        let pizzaMomentList = filterPizzasMoment(pizzasDefault);
        if (pizzaMomentList.length !== 0) {
            hasMomentResults = true;
            pizzasMenu = pizzasMenu.concat(pizzaMomentList).unique();
        }
    }

    let pizzas = [];
    if (pizzasBase.length !== 0) {
        pizzas = pizzasBase;
    }
 
    if (pizzasMenu.length !== 0) {
        pizzas = pizzasMenu;
    }

    // We didnt find any pizza maching the filters buttons.
    if (pizzas.length === 0 && !isMomentActive) {
        pizzas = filterNotPizzasEnfant(pizzasDefault);
    }

    return (
        <>
            <Transitions className="transition">
                <NavigationBarHeader />
                <div className="filters_holder">
                    <div className="filter">
                        <p>Selectionnez la base de la pizza </p>
                        <div className="filter_buttons">
                            <button id="creme_button" onClick={() => { onCremeUpdate(!isCremeActive); if (isMomentActive) onMomentUpdate(!isMomentActive); if (isTomateActive) onTomateUpdate(!isTomateActive); if (isEnfantActive) onEnfantUpdate(!isEnfantActive); }} className={(isCremeActive) ? "active" : "inactive"}>Crème</button>
                            <button id="tomate_button" onClick={() => { onTomateUpdate(!isTomateActive); if (isMomentActive) onMomentUpdate(!isMomentActive); if (isCremeActive) onCremeUpdate(!isCremeActive); if (isEnfantActive) onEnfantUpdate(!isEnfantActive); }} className={(isTomateActive) ? "active" : "inactive"}>Tomate</button>
                        </div>
                    </div>
                    <div className="filter">
                        <p>Selectionnez le menu </p>
                        <div className="filter_buttons">
                            <button id="enfant_button" onClick={() => { onEnfantUpdate(!isEnfantActive); if (isMomentActive) onMomentUpdate(!isMomentActive); if (isCremeActive) onCremeUpdate(!isCremeActive); if (isTomateActive) onTomateUpdate(!isTomateActive); }} className={(isEnfantActive) ? "active" : "inactive"}>Pizza enfant</button>
                            <button id="moment_button" onClick={() => { onMomentUpdate(!isMomentActive); if (isEnfantActive) onEnfantUpdate(!isEnfantActive); if (isCremeActive) onCremeUpdate(!isCremeActive); if (isTomateActive) onTomateUpdate(!isTomateActive); }} className={(isMomentActive) ? "active" : "inactive"}>Pizza dessert</button>
                            <button onClick={OnClickCommande} className="commande">Sur commande</button>
                        </div>
                    </div>
                </div>
                {
                    !hasMomentResults && isMomentActive &&
                    <div className="filter_response_holder">
                        <p><strong>Les pizzas du moment ne sont pas disponible actuellement...</strong></p>
                    </div>
                }
                <CardHolder>
                    {
                        pizzas.map((value) => {
                            return (
                                <CardImage key={value.id} title={value.attributes.Nom} src={baseURL + value.attributes.image.data.attributes.url}>
                                    <p>{value.attributes.Ingredients}</p>
                                    <div className="content_footer">{"Prix : " + value.attributes.Prix + " Euros"}</div>
                                </CardImage>
                            );
                        })
                    }

                </CardHolder>
                <Footer adress={adress} contact={phone} />
            </Transitions>
        </>);
}
