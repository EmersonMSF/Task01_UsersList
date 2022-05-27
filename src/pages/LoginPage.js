import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModalBox from "../conponents/ErrorModalBox";
import "./loginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  let JSON_DATA = JSON.parse(localStorage?.getItem("users"));

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    active: false,
    message: null,
  });

  function showErrorMessage(messageContent) {
    let errorMessageInterval = setInterval(() => {
      setErrorMessage({
        ...errorMessage,
        active: false,
      });

      clearInterval(errorMessageInterval);
    }, 3000);

    setErrorMessage({
      active: true,
      message: messageContent,
    });
  }

  // const [errorMessage, setErrorMessage] = useState({});

  return (
    <div className="login_container">
      <p className="heading">Login Now</p>

      <span className="input_elements_holder">
        <label htmlFor="userMailID">Email ID</label>
        <input
          autoFocus
          id="userMailID"
          type="email"
          onInput={(newValue) => {
            setLoginDetails({
              ...loginDetails,
              username: newValue.target.value,
            });
          }}
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userPwd">Password</label>
        <input
          id="userPwd"
          type="password"
          onInput={(newValue) => {
            setLoginDetails({
              ...loginDetails,
              password: newValue.target.value,
            });
          }}
        />
      </span>

      <div className="action_btns">
        <button
          className="btn btn1 loginBtn"
          onClick={() => {
            if (loginDetails.username == "") {
              console.log("details are empty");
              showErrorMessage("Please enter username");
              return;
            } else if (loginDetails.password == "") {
              showErrorMessage("Please enter password");
              return;
            } else if (loginDetails.password.length < 8) {
              showErrorMessage("Password is short");
              return;
            }
            console.log("details are empty 2");

            JSON_DATA.filter((item) => {
              if (item.userDetails.email === loginDetails.username) {
                console.log(true);

                item.userDetails.password === loginDetails.password
                  ? navigate("home", {
                      state: {
                        name: item.userDetails.username,
                        role: item.userDetails.role,
                      },
                    })
                  : showErrorMessage("Username or password is wrong!");

                return;
              } else {
                showErrorMessage("Username or password is wrong!");
                return;
              }
            });
          }}
        >
          Login Now
        </button>

        <button
          onClick={() => {
            navigate("create_account");
          }}
          className="btn"
        >
          Create Account
        </button>
      </div>

      <ErrorModalBox
        message={errorMessage.message}
        activeStatus={errorMessage.active}
      />
      {/* <h1>Error message</h1> */}
    </div>
  );
}

export default LoginPage;
