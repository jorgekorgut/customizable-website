import "./card_underline.css";
export function CardUnderline(props) {
    return (
        <div className="card_underline">
            <div className="underline_title">
                <h1>{props.title}</h1>
            </div>
            {props.children}
        </div>);
}