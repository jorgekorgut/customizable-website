import "./card_wide_image_title_text.css";
export function CardWideImageTilteText(props) {
    return (<div className="card_wide">
        <div className="image_holder_wide">
            <img src={props.src} alt={props.alt}/>
        </div>
        <div className="content_holder">
            <h1>{props.title}</h1>
            <div className="description">{props.description.split('\n').map((value,index) => {
                return <p key={index}>{value}</p>
            })}</div>
            <div className="content_footer"><p>{props.footer}</p></div>
        </div>
    </div>);
}