import { AiFillPhone } from "react-icons/ai";
import { baseURL } from "utils/communication.js";
import { filterPizzaDuMoment } from "utils/filters/filterPizzaDuMoment.js";
import { CardTitle } from "../card_title.js";
import "./passer_commande.css";


export function CardTitlePasserCommande(props) {

    let pizzas = props.pizzas;
    let openingTime = props.openingTime;
    let etablissement = props.etablissement;

    pizzas = filterPizzaDuMoment(pizzas);

    let imageContact = props.imageContact;

    let phone = etablissement.attributes.Telephone;

    return (
        <CardTitle className="card_title_passer_commande" title="Passer commande">
            <div className='phone'>
                <AiFillPhone />
                <a href={"tel:"+phone.replace(/\s+/g,'')}>{phone}</a>
            </div>
            <div className='descritpion_holder'>
                {
                    imageContact != undefined &&
                    <div className={props.showOpening ? 'image_holder_square' : 'image_holder_wide'}>
                        <img src={baseURL + imageContact} alt={props.alt}></img>
                    </div>
                }
                {
                    props.showOpening &&
                    <div className='opening'>
                        <div className='title_holder'>
                            <h1>Ouverture</h1>
                        </div>
                        {
                            openingTime.map((value, index) => {
                                return (
                                    <div key={value.id} className="opening_holder">
                                        <p>{value.attributes.Jour + " "}</p> <p>:</p> <p>{" " + value.attributes.Horaire_Ouverture} - {value.attributes.Horaire_Fermeture}</p>
                                    </div>);
                            }
                            )
                        }
                    </div>
                }
            </div>
        </CardTitle>);
}