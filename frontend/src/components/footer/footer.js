import "./footer.css";

export function Footer(props) {
	return <div className={"footer color_" + props.color}>
		{
			props.contact !== undefined &&
			<div className="content_holder">
				<p><strong>Pour nous contacter : </strong></p> <a href={"tel:" + props.contact.replace(/\s+/g, '')}>{props.contact}</a>
			</div>
		}
		{
			props.adress !== undefined &&
			<div className="content_holder">
				<p><strong>Adresse : </strong></p> <a href={"http://maps.google.com/?q="+props.adress} target="_blank">{props.adress}</a>
			</div>
}
	</div >
}