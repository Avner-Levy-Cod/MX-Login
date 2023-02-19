import icon from "../assets/codere_icon.svg";
import { NavLink } from "react-bootstrap";

export default function Header(props) {
  return (
    <div className="header">
      <NavLink href={props.back_url}>
        {/* <img
          className="arrow"
          src="https://www.codere.mx/library/left-arrow.png"
        /> */}
        <i className="pi pi-arrow-left" />
      </NavLink>
      <NavLink href={props.homepage_url}>
        <img src="https://www.codere.mx/library/.customization/logo.svg" />
      </NavLink>
    </div>
  );
}
