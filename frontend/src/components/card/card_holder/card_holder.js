import "./card_holder.css";
export function CardHolder(props) {
    return (<div className='card_holder'>
        {props.children}
    </div>);;
}