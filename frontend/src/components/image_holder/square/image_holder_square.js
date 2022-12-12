import "./image_holder_square.css";
export function ImageHolderSquare(props){
    return  <div className="image_holder_square">
        <img src={props.src} alt={props.alt} />
        {props.children}
    </div>
}