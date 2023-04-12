import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";
import { Loading } from "pages/loading/loading.js";
import { useFetch } from "utils/communication.js";
import "./navbar_pizza.css";

export function NavigationBarHeader(props) {

    [window.loadingEmporter, window.errorEmporter, window.dataEmporter] = useFetch("api/plats-a-emporter?populate=*",window.dataEmporter);

    if (window.errorEmporter) {
        return <p>Error.</p>;
    }
    
    if (window.loadingEmporter) {
        return <Loading/>;
    }

    let emporter = window.dataEmporter.data;
    let titre = emporter.attributes.Titre;

    return (<header>
        <Link to="/"><Logo/></Link>
        <nav>
            <Link to="/pizzas" className="pizzas nav_element">Pizzas</Link>
            <Link to="/plats_a_emporter" className="emporter nav_element">{titre}</Link>
            <Link to="/cocktail_dinatoires" className="cocktails nav_element">Cocktails Dinatoires</Link>
            <Link to="/fournisseurs" className="fournisseurs nav_element">Fournisseurs</Link>
        </nav>
    </header>);
}