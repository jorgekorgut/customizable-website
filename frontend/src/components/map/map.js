import { MapContainer, TileLayer } from "react-leaflet";
import "./external/leaflet.css";
import "./map.css";

export function Map(props) {
	let center = props.center;
	let zoom = props.zoom;
	return (center.lat !== undefined || center.lng !== undefined)?
		<MapContainer id="map" center={[center.lat, center.lng]} zoom={zoom} scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{props.children}
			
		</MapContainer>:undefined;
}