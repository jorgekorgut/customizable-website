import { ReactComponent as Logo } from "images/logo.svg";

import Transitions from "utils/transition.js";
import "./icons_animation.css";
import "./loading.css";

export function Loading() {
    return <Transitions className="transition">
        <div className="circular_wrapper">
            <Logo></Logo>
            <h1>Chargement en cours ...</h1>
        </div>
    </Transitions>

}