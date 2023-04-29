import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

const handleSignOut = () => {
  sessionStorage.removeItem("Token");
  window.location.href = "/";
};

export default function Header() {
  return <><div className="w-full h-16 bg-white flex justify-end px-5">
      <button onClick={handleSignOut}><FontAwesomeIcon icon={faRightFromBracket} /></button>
    </div></>;
}