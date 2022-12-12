import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";
import "./navbar_pizza.css";

export function NavigationBarHeader(props) {
    return (<header>
        <Link to="/"><Logo/></Link>
        <nav>
            <Link to="/pizzas" className="pizzas nav_element">Pizzas</Link>
            <Link to="/plats_a_emporter" className="emporter nav_element">Plats à Emporter</Link>
            <Link to="/cocktail_dinatoires" className="cocktails nav_element">Cocktails Dinatoires</Link>
            <Link to="/fournisseurs" className="fournisseurs nav_element">Fournisseurs</Link>
        </nav>
    </header>);
}