import { ReactComponent as Logo } from "images/logo.svg";
import { Link } from "react-router-dom";
import { Loading } from "pages/loading/loading.js";
import { useFetch } from "utils/communication.js";
import "./navbar_pizza.css";

export function NavigationBarHeader(props) {

    [window.loadingPage1, window.errorPage1, window.dataPage1] = useFetch("api/page-1?populate=*",window.dataPage1);
    [window.loadingPage2, window.errorPage2, window.dataPage2] = useFetch("api/page-2?populate=*",window.dataPage2);
    [window.loadingPage3, window.errorPage3, window.dataPage3] = useFetch("api/page-3?populate=*",window.dataPage3);
    [window.loadingPage4, window.errorPage4, window.dataPage4] = useFetch("api/page-4?populate=*",window.dataPage4);

    if (window.errorPage1 || window.errorPage2 || window.errorPage3 || window.errorPage4) {
        return <p>Navigation</p>;
    }

    if (window.loadingPage1 || window.loadingPage2 || window.loadingPage3 || window.loadingPage4) {
        return <Loading/>;
    }

    let page1 = window.dataPage1.data;
    let titrePage1 = page1.attributes.Titre_navigation ?? "";
    let showPage1 = page1.attributes.Visible;

    let page2 = window.dataPage2.data;
    let titrePage2 = page2.attributes.Titre_navigation ?? "";
    let showPage2 = page2.attributes.Visible;

    let page3 = window.dataPage3.data;
    let titrePage3 = page3?.attributes.Titre_navigation ?? "";
    let showPage3 = page3?.attributes.Visible;

    let page4 = window.dataPage4.data;
    let titrePage4 = page4?.attributes.Titre_navigation ?? "";
    let showPage4 = page4?.attributes.Visible;

    let countPages = 0

    let customPages = [];
    if (showPage1) {
        countPages++;
        customPages.push(<Link to="/page-1" className={`page1 nav_element ${(countPages % 2 == 0) ? 'color-red' : 'color-green'}`}>{titrePage1}</Link>);
    }
    if (showPage2) {
        countPages++;
        customPages.push(<Link to="/page-2" className={`page2 nav_element ${(countPages % 2 == 0) ? 'color-red' : 'color-green'}`}>{titrePage2}</Link>);
    }
    if (showPage3) {
        countPages++;
        customPages.push(<Link to="/page-3" className={`page3 nav_element ${(countPages % 2 == 0) ? 'color-red' : 'color-green'}`}>{titrePage3}</Link>);
    }
    if (showPage4) {
        countPages++;
        customPages.push(<Link to="/page-4" className={`page4 nav_element ${(countPages % 2 == 0) ? 'color-red' : 'color-green'}`}>{titrePage4}</Link>);
    }

    return (<header>
        <Link to="/"><Logo className="h-96"/></Link>
        <nav className="text-6xl">
            <Link to="/pizzas" className="pizzas nav_element color-red">La Carte</Link>
            {
                customPages
            }
            <Link to="/fournisseurs" className={`fournisseurs nav_element ${(countPages % 2 == 0) ? 'color-green' : 'color-red'}`}>Fournisseurs</Link>
            <Link to="/informations" className={`informations nav_element ${(countPages % 2 == 0) ? 'color-red'   : 'color-green'}`}>Informations</Link>
            <Link to="/distributeur-pizza" className={`distributeur nav_element ${(countPages % 2 == 0) ? 'color-green' : 'color-red'}`}>Distributeur à Pizzas</Link>
            <Link to="/distributeur-boisson" className={`distributeur nav_element ${(countPages % 2 == 0) ? 'color-red' : 'color-green'}`}>Distributeur à Boissons</Link>
        </nav>
    </header>);
}