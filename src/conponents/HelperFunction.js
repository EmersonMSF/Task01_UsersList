import { useState } from "react";

export function ValidateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

// export function ShowErrorMessage(messageContent) {
//   const [errorMessage, setErrorMessage] = useState({
//     active: false,
//     message: null,
//   });

//   let errorMessageInterval = setInterval(() => {
//     setErrorMessage({
//       ...errorMessage,
//       active: false,
//     });

//     clearInterval(errorMessageInterval);
//   }, 3000);

//   setErrorMessage({
//     active: true,
//     message: messageContent,
//   });
// }
