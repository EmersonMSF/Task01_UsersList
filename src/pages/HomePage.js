import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./homePage.css";
import Logout from "./Logout";
import UpdateDataForm from "./UpdateDataForm";
export default function HomePage() {
  const roleList = ["admin", "user"];
  let JSON_DATA = JSON.parse(localStorage["users"]);

  const location = useLocation();

  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [isLogoutFormOpen, setlogoutFormOpen] = useState(false);
  const [selectedUserIdForEdit, setSelectedUserIdForEdit] = useState(null);

  const filterName = useRef(null);
  const filterRole = useRef(null);

  function getupdateData(id) {
    return JSON_DATA.filter((item) => {
      if (item.userDetails.id === id) return item;
    });
  }

  const [tableData, setTableData] = useState(JSON_DATA);

  useEffect(() => {
    setTableData(JSON_DATA);
  }, []);

  const filterByName = () => {
    setTableData(
      JSON_DATA.filter((item) => {
        if (
          item.userDetails.username.includes(filterName.current.value) &&
          item.userDetails.role === filterRole.current.value
        ) {
          return item;
        }
      })
    );
  };

  return (
    <div className="homepage_container">
      <div className="top_holder">
        <p className="heading">
          Welcome, <b>{location.state.name} </b>
        </p>
        <button
          className="btn btn2"
          onClick={() => {
            setlogoutFormOpen(true);
          }}
        >
          Logout
        </button>
      </div>

      <div className="filter_container">
        <input placeholder="Search by Name" type="text" ref={filterName} />
        <select ref={filterRole}>
          {roleList.map((item, index) => {
            return (
              <option selected={index === 0} key={index}>
                {item}
              </option>
            );
          })}
        </select>
        <button className="btn btn1" onClick={filterByName}>
          Search
        </button>
        <button
          className="btn"
          onClick={() => {
            filterName.current.value = null;
            filterRole.current.value = null;
            // filterByName();
            setTableData(JSON_DATA);
          }}
        >
          Clear filters
        </button>
      </div>

      <table className="table_container">
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Email ID</th>
          <th>DOB</th>
          <th>Role</th>
          {
            location.state.role === "admin" ? <th>View/Edit</th> : null
            // <th>{location.state.role}</th>
          }
        </tr>

        {tableData.map((item, index) => {
          return (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{item.userDetails.username}</td>
              <td>{item.userDetails.email}</td>
              <td>{item.userDetails.dob}</td>
              <td>{item.userDetails.role}</td>

              {
                location.state.role === "admin" ? (
                  <td>
                    <button
                      className="btn btn1"
                      onClick={() => {
                        setUpdateFormOpen(true);
                        setSelectedUserIdForEdit(item.userDetails.id);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                ) : null
                // <th>{location.state.role}</th>
              }
            </tr>
          );
        })}
      </table>

      {isUpdateFormOpen ? (
        <>
          <div
            className="overlay"
            onClick={() => {
              setUpdateFormOpen(false);
              setSelectedUserIdForEdit(null);
            }}
          ></div>
          <UpdateDataForm
            id={selectedUserIdForEdit}
            getupdateData={getupdateData}
          />
        </>
      ) : null}

      {isLogoutFormOpen ? (
        <>
          <div
            className="overlay"
            onClick={() => {
              setlogoutFormOpen(false);
            }}
          ></div>
          <Logout setlogoutFormOpen={setlogoutFormOpen} />
        </>
      ) : null}

      {/* <Logout />   */}
    </div>
  );
}
