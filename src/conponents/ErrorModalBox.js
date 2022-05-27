import "./errorModalBox.css";

export default function ErrorModalBox(props) {
  // if (!props.activeStatus) {
  //   clearInterval(props.errorMessageInterval);
  // }

  return (
    <div
      className={
        props.activeStatus
          ? "errorModalBox_container active"
          : "errorModalBox_container"
      }
    >
      <p className="message">{props.message}</p>
    </div>
  );
}
