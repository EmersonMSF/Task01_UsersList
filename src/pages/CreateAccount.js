import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";
export default function CreateAccount() {
  const navigate = useNavigate();
  const roleList = ["Admin", "User"];

  let JSON_DATA = JSON.parse(localStorage?.getItem("users"));

  const [userDetails, setUserDetails] = useState({
    id: JSON_DATA?.length > 0 ? JSON_DATA?.length : 0,
    username: null,
    dob: null,
    role: "admin",
    email: null,
    password: null,
    re_password: null,
  });

  const [localStorageValues, setLocalStorageValues] = useState(JSON_DATA);

  const submitBtn = () => {
    console.log("submit btn");
    console.log(userDetails);

    // setLocalStorageValues((oldArray) => [...oldArray, { userDetails }]);

    // if (localStorage.myList === undefined) {
    // console.log("calling useEffect");

    if (JSON_DATA === null) {
      JSON_DATA = [];
    }
    JSON_DATA.push({ userDetails: userDetails });

    console.log(JSON_DATA);

    localStorage.setItem("users", JSON.stringify(JSON_DATA));
    // }
  };

  // useEffect(() => {
  //   if (!localStorage?.myList === undefined) {
  //     console.log("calling first useEffect");
  //     setLocalStorageValues(JSON.parse(localStorage?.myList));
  //   }
  // }, []);

  return (
    <div className="login_container registration_container">
      <p className="heading">Create Account</p>

      <span className="input_elements_holder">
        <label htmlFor="userNameID">Name</label>
        <input
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, username: newValue.target.value })
          }
          autoFocus
          id="userNameID"
          type="email"
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userDOB">DOB</label>
        <input
          id="userDOB"
          type="date"
          onInput={(newValue) =>
            setUserDetails({ ...userDetails, dob: newValue.target.value })
          }
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userRole">Role</label>
        <select
          id="userRole"
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, role: newValue.target.value })
          }
        >
          {roleList.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
          {/* <option value="admin">Admin</option> */}
          {/* <option value="user">User</option> */}
        </select>
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userMailID">Email</label>
        <input
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, email: newValue.target.value })
          }
          id="userMailID"
          type="email"
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userPwd">Password</label>
        <input
          id="userPwd"
          type="password"
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, password: newValue.target.value })
          }
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userRepeatPwd">Repeat Password</label>
        <input
          id="userRepeatPwd"
          type="password"
          onChange={(newValue) =>
            setUserDetails({
              ...userDetails,
              re_password: newValue.target.value,
            })
          }
        />
      </span>

      <div className="action_btns">
        <button
          className="btn btn1 loginBtn"
          onClick={() => {
            submitBtn();
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          className="btn"
        >
          Login
        </button>
      </div>
    </div>
  );
}
