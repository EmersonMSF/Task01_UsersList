import { useEffect, useState } from "react";
import "./loginPage.css";
import "./updateDataForm.css";

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

  const updateData = () => {
    let usersData = JSON.parse(localStorage.getItem("users"));

    console.log(usersData);

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

      <div className="action_btns">
        <button className="btn btn1" onClick={updateData}>
          Update
        </button>
      </div>
    </div>
  );
}
