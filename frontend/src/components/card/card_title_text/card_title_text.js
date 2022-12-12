import "./card_title_text.css";
export function CardTitleText(props) {
    return (
        <div className="card_title_text">
            <div className="title_holder">
                <h1>{props.title}</h1>
            </div>
            <div className="content_holder">
                {props.children}
            </div>
        </div>
    );
}
