import "./card_image.css";
export function CardImage(props) {
    return (
        <div className="card_image">
            <div className="image_holder_square">
                <img src={props.src} alt={props.alt}/>
            </div>
            <div className="content_holder">
                <div className="title">
                    <h1>{props.title}</h1>
                </div>
                {props.children}
            </div>
        </div>);
}