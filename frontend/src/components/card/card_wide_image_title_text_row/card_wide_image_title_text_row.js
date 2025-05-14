import "./card_wide_image_title_text_row.css";
export function CardWideImageTilteTextRow(props) {
    return (<div className="card_wide_row">
        <div className="image_holder_wide">
            {
                props.src &&
                <img src={props.src} alt={props.alt} />
            }
        </div>
        <div className="content_holder">
            <h1 style={{fontWeight:"bold"}}>{props.title}</h1>
            <div className="description">
                {
                    props.description != null &&
                    props.description.split('\n').map((value, index) => {
                        return <p key={index}>{value}</p>
                    })
                }
            </div>
            <div className="content_footer"><p>{props.footer}</p></div>
        </div>
    </div>);
}