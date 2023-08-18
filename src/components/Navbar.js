import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ isDark, switchMode }) {

  return (
    <header className={`navbar ${isDark ? "dark" : "light"}`}>
      <div className="container">
        <div className="logo">Where in the world?</div>
        <div className="switch-mode">
          <FontAwesomeIcon 
            className="icon" 
            icon={faMoon} 
            onClick={switchMode}
          />
          {isDark ? "Dark" : "Light"} Mode
        </div>
      </div>
    </header>
  );
}