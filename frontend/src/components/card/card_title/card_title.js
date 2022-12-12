import "./card_title.css";
export function CardTitle(props) {
    return <div className={"card_title " + props.className}>
        <div className="h1_holder ">
            <h1>
                {props.title}
            </h1>
        </div>
        {props.children}
    </div>
}