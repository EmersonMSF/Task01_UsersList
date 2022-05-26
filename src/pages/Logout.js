import { useNavigate } from "react-router-dom";
import "./logout.css";

export default function Logout(props) {
  const navigate = useNavigate();
  return (
    <div className="logout_container">
      <p className="heading">Logout</p>
      <p>You will be returned to the login screen.</p>

      <div className="action_btns">
        <button
          className="btn btn1"
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </button>
        <button
          className="btn "
          onClick={() => {
            props.setlogoutFormOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
