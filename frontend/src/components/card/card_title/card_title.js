import "./card_title.css";
export function CardTitle(props) {
    return <div className={"card_title text-6xl  " + props.className}>
        <div className="h1_holder py-6 ">
            <h1>
                {props.title}
            </h1>
        </div>
        {props.children}
    </div>
}