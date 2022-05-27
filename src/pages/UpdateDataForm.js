import { useEffect, useState } from "react";
import "./loginPage.css";
import "./updateDataForm.css";
import { ValidateEmail } from "../conponents/HelperFunction";
import ErrorModalBox from "../conponents/ErrorModalBox";

export default function UpdateDataForm(props) {
  const roleList = ["admin", "user"];
  const JSON_DATA = JSON.parse(localStorage["users"]);

  const [userDetails, setUserDetails] = useState({
    id: null,
    username: null,
    dob: null,
    role: "admin",
    email: null,
  });

  const { id, username, email, dob, role } = props.getupdateData(props.id)[0]
    .userDetails;

  useEffect(() => {
    setUserDetails({
      id: id,
      username: username,
      dob: dob,
      role: role,
      email: email,
    });
  }, []);

  const [errorMessage, setErrorMessage] = useState({
    active: false,
    message: null,
  });
  function ShowErrorMessage(messageContent) {
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

  const updateData = () => {
    let usersData = JSON.parse(localStorage.getItem("users"));

    console.log(usersData);

    if (userDetails.username == "" || userDetails.username == null) {
      ShowErrorMessage("Please enter username");
      return;
    } else if (userDetails.dob == "" || userDetails.dob == null) {
      ShowErrorMessage("Please enter DOB");
      return;
    } else if (userDetails.email == "" || userDetails.email == null) {
      ShowErrorMessage("Please enter email");
      return;
    } else if (!ValidateEmail(userDetails.email)) {
      ShowErrorMessage("Please enter valid email id");
      return;
    }

    usersData.filter((item) => {
      if (item.userDetails.id === id) {
        item.userDetails.username = userDetails.username;
        item.userDetails.dob = userDetails.dob;
        item.userDetails.role = userDetails.role;
        item.userDetails.email = userDetails.email;
      }
    });

    console.log("usersData", usersData);

    localStorage.setItem("users", JSON.stringify(usersData));

    ShowErrorMessage("Updated successfully");
  };

  return (
    <div className="login_container registration_container updateform_container">
      <p className="heading">Update Form</p>

      <span className="input_elements_holder">
        <label htmlFor="userNameID">Name</label>
        <input
          autoFocus
          id="userNameID"
          type="text"
          value={userDetails.username}
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, username: newValue.target.value })
          }
        />
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userDOB">DOB</label>
        <input
          id="userDOB"
          type="date"
          defaultValue={userDetails.dob}
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
            return (
              <option selected={item === userDetails.role} key={index}>
                {item}
              </option>
            );
          })}

          {/* <option value="user">User</option> */}
        </select>
      </span>

      <span className="input_elements_holder">
        <label htmlFor="userMailID">Email</label>
        <input
          id="userMailID"
          type="email"
          value={userDetails.email}
          onChange={(newValue) =>
            setUserDetails({ ...userDetails, email: newValue.target.value })
          }
        />
      </span>

      <div className="action_btns" style={{ justifyContent: "center" }}>
        <button className="btn btn1" onClick={updateData}>
          Update
        </button>
      </div>

      <ErrorModalBox
        message={errorMessage.message}
        activeStatus={errorMessage.active}
      />
    </div>
  );
}
