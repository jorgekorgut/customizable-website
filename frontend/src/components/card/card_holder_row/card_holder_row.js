import "./card_holder_row.css";
export function CardHolderRow(props) {
    return (<div className='card_holder_row'>
        {props.children}
    </div>);;
}