import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";
import { Loading } from "pages/loading/loading.js";
import { useFetch } from "utils/communication.js";
import "./navbar_pizza.css";

export function NavigationBarHeader(props) {

    [window.loadingPage1, window.errorPage1, window.dataPage1] = useFetch("api/page-1?populate=*",window.dataPage1);
    [window.loadingPage2, window.errorPage2, window.dataPage2] = useFetch("api/page-2?populate=*",window.dataPage2);

    if (window.errorPage1 || window.errorPage2) {
        return <p>Navigation</p>;
    }
    
    if (window.loadingPage1 || window.loadingPage2) {
        return <Loading/>;
    }

    let page1 = window.dataPage1.data;
    let titrePage1 = page1.attributes.Titre_navigation ?? "";
    let showPage1 = page1.attributes.Visible;

    let page2 = window.dataPage2.data;
    let titrePage2 = page2.attributes.Titre_navigation ?? "";
    let showPage2 = page2.attributes.Visible;

    let countPages = 0
    if(showPage1){
        countPages++;
    }
    if(showPage2){
        countPages++;
    }

    const isPairAddPages = countPages % 2 === 0;

    return (<header>
        <Link to="/"><Logo className="h-96"/></Link>
        <nav className="text-6xl">
            <Link to="/pizzas" className="pizzas nav_element color-red">Pizzas</Link>
            {
                showPage1 &&
                <Link to="/page-1" className={`page1 nav_element color-green`}>{titrePage1}</Link>
            }
            {
                showPage2 &&
                <Link to="/page-2" className={`page2 nav_element ${showPage1 ? 'color-red' : 'color-green'}`}>{titrePage2}</Link>
            }
            <Link to="/fournisseurs" className={`fournisseurs nav_element ${isPairAddPages ? 'color-green' : 'color-red'}`}>Fournisseurs</Link>
            <Link to="/informations" className={`informations nav_element ${isPairAddPages ? 'color-red'   : 'color-green'}`}>Informations</Link>
            <Link to="/distributeur-pizza" className={`distributeur nav_element ${isPairAddPages ? 'color-green' : 'color-red'}`}>Distributeur à Pizzas</Link>
            <Link to="/distributeur-boisson" className={`distributeur nav_element ${isPairAddPages ? 'color-red' : 'color-green'}`}>Distributeur à Boissons</Link>
        </nav>
    </header>);
}