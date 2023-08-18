import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function CustomBox({ content, isDark, name }) {

    const location = useLocation();

    const search = location.state?.search || "";

    const boxContent = content === "Back" ? 
                        (<Link to={`..${search}`} className={`custom-box back ${isDark ? "dark" : "light"}`}>
                            <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                            {content}
                        </Link>) :
                        (<Link 
                            to={`/${name}`} 
                            className={`custom-box border ${isDark ? "dark" : "light"}`}
                        >
                            {content}
                        </Link>)

    return boxContent;
}
