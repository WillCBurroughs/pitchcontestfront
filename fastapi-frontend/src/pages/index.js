// Main file to be edited
"use client";
import React, { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import { useRouter } from "next/navigation";
import authService from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import styles from "../styles/home.module.css";
import Link from "next/link";
import axios, { Axios } from "axios";
import Htag from "../components/atoms/Htag";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/button";
import Icon from "@/components/atoms/icon";
import CustomNavbar from "@/components/organisms/CustomNavbar";
import { ToggleSlider } from "react-toggle-slider";
import Competition from "@/components/organisms/Competitions";

export default function Home() {
  let [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [selectedEquity, setSelectedEquity] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  const [hovercomp, sethovercomp] = useState(false);
  const [hoverfund, sethoverfund] = useState(false);


  const [filterbyUser, setFilterbyUser] = useState(false);
  const [getfiltered, setfiltered] = useState();

  const [getUserInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/users/4"
        );
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  console.log(getUserInfo);

  const handleFilterByUserChange = () => {
    setFilterbyUser((prev) => !prev); // Update by click
  };

  useEffect(() => {
    let fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/funding/"
        );
        setData(response.data.reverse()); // Assuming the data is in response.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let getFiltered = async () => {
      try {
        const getFilter = await axios.get(
          "http://127.0.0.1:8000/api/v1/funding/19/"
        );
        setData(getFilter.data);
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };
  });

  const amounts = [
    { label: "All Competitions", value: 0 },
    { label: "$1000 +", value: 1000 },
    { label: "$5000 +", value: 5000 },
    { label: "$10000 +", value: 10000 },
    { label: "$50000 +", value: 50000 },
    { label: "$100000 +", value: 100000 },
  ];

  const equities = [
    { label: "All Competitions", value: "all" },
    { label: "Equity Not Taken", value: "notTaken" },
  ];

  const handleAmountChange = (value) => {
    setSelectedAmount(value);
  };

  const handleEquityChange = (value) => {
    setSelectedEquity(value);
  };

  useEffect(() => {
    if (data) {
      const filtered = data.filter(
        (item) =>
          item.fund_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedAmount || item.fund_amount >= Number(selectedAmount)) &&
          (selectedEquity === "all" ||
            (selectedEquity === "notTaken" && !item.equity_taken))
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm, selectedAmount, selectedEquity]);

  console.log("Data:", data);

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = jwtDecode(userData);
        console.log("User data:", user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    };
    getUserFromLocalStorage();
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT_USER" });
    router.push("/");
  };

  useEffect(() => {
    const fetchHostId = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/users/get_user_id_api_v1_users_user_id_get"
        );
        setHostId(response.data.id); //
      } catch (error) {
        console.error("Error fetching hostId:", error);
      }
    };

    fetchHostId();
  }, []);

  const handleButtonClick = async () => {
    try {
      const requestBody = {
        fund_name: "Your Fund Name",
        fund_contact_email: "contact@example.com",
        fund_type: 0,
        fund_amount: 0,
        equity_taken: true,
        amount_equity_taken: 0,
        fund_host_id: state.user.sub,
      };
      // Change this above if have time
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/funding/",
        requestBody
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const router = useRouter();

  const handleMakeCompetitionClick = () => {
    console.log("printed");
    // Navigate to makeCompetition.js in the same folder
    router.push("/makeCompetition");
  };

  return (
    <>
      <CustomNavbar activeLink="home" />
      <main className={`${styles.main} container`}>
        <div className="row">
          <form className="d-flex me-0 p-0">
            <input
              className="form-control me-2 ps-4"
              style={{ minWidth: "1000px", borderRadius: "40px" }}
              type="search"
              placeholder="Find Opportunities"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          <div
            className="d-flex pb-4 justify-content-between"
            style={
              {
                // position: "absolute",
                // top: "130px",
                // display: "flex",
                // justifyContent: "space-between",
                // alignItems: "center",
              }
            }
          >
            <div className="row mt-2" style={{ display: "flex" }}>
              <div className="col">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    placeholder="All Comps"
                    onMouseEnter={() => sethovercomp(true)}
                    onMouseLeave={() => sethovercomp(false)}

                    style={{
                      backgroundColor: hovercomp ? 'gray' : '#3178e4',
                      transition: 'background-color 0.3s ease-in-out',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      minWidth: "70px",
                      float: "right",
                      border: 'none',
                    }}
                  >
                    <span className="ms-auto">
                      {" "}
                      {selectedEquity === ""
                        ? "Select Equity"
                        : selectedEquity == "all"
                        ? "All Competitions"
                        : "Equity Not Taken"}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    {equities.map((equities, index) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleEquityChange(equities.value)}
                        >
                          {equities.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col pb-5">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-primary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    placeholder="All Comps"
                    onMouseEnter={() => sethoverfund(true)}
                    onMouseLeave={() => sethoverfund(false)}
                    
                    style={{
                      backgroundColor: hoverfund ? 'gray' : '#3178e4',
                      transition: 'background-color 0.3s ease-in-out',
                      boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                      minWidth: "70px",
                      float: "right",
                      border: "none",
                    }}
                  >
                    <span className="ms-auto">
                      {" "}
                      {selectedAmount === ""
                        ? "Fund Amount"
                        : selectedAmount === 0
                        ? "Fund Amount"
                        : "$" + selectedAmount}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    {amounts.map((amount, index) => (
                      <li key={index}>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleAmountChange(amount.value)}
                        >
                          {amount.value == 0 ? "All" : amount.label}
                          {console.log("Display")}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    checked={filterbyUser}
                    onChange={handleFilterByUserChange}
                  />
                  <label
                    className="form-check-label"
                    for="flexSwitchCheckDefault"
                  >
                    Filter Competitions
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {!filterbyUser && (
            <>
              {filteredData.map((item, index) => (
                <>
                  <div className="col-1"></div>
                  <Competition
                    key={index}
                    backgroundColor={
                      item.fund_type === 1
                        ? "#000000"
                        : item.fund_type === 2
                        ? "#3178E4"
                        : item.fund_type === 3
                        ? "#17c27e"
                        : "#ffffff"
                    }
                    imageSrc={
                      item.fund_type === 1
                        ? "https://www.uiw.edu/hebsba/_imgs/events/pitch-competition-2020-promo-in-body-aligned.jpg"
                        : item.fund_type === 2
                        ? "https://aofund.org/app/uploads/2023/06/pexels-sora-shimazaki-5668858-1024x683.jpg"
                        : "https://ssir.org/images/blog/Abby-Davidson-Matt-Guttentag-entrepreneur-accelerators-592x392.jpg"
                    }
                    competitionTitle={
                      item.fund_name != "" ? item.fund_name : "New Contest"
                    }
                    fundingAmount={item.fund_amount}
                    equityTaken={item.equity_taken ? "True" : "False"}
                    competitionType={
                      item.fund_type === 1
                        ? "Pitch"
                        : item.fund_type === 2
                        ? "Grant"
                        : item.fund_type === 3
                        ? "Accelerator"
                        : "Default Type"
                    }
                    equityPercentage={item.amount_equity_taken}
                  />
                </>
              ))}
            </>
          )}
          {filterbyUser && (
            <div>
              {filteredData.map((item, index) => {
                let passesAllRequirements = true;

                item.requirements.forEach((requirement) => {
                  const firstWord =
                    requirement.data.length !== 0
                      ? requirement.data.split(":")[0].toLowerCase().trim()
                      : "";
                  const passesRequirement = requirement.data
                    .toLowerCase()
                    .includes(getUserInfo[firstWord].toLowerCase());

                  if (!passesRequirement) {
                    passesAllRequirements = false;
                  }
                });

                if (passesAllRequirements) {
                  return (
                    <div key={index}>
                      <div className="col-1"></div>
                      <Competition
                        key={index}
                        backgroundColor={
                          item.fund_type === 1
                            ? "#000000"
                            : item.fund_type === 2
                            ? "#3178E4"
                            : item.fund_type === 3
                            ? "#17c27e"
                            : "#ffffff"
                        }
                        imageSrc={
                          item.fund_type === 1
                            ? "https://www.uiw.edu/hebsba/_imgs/events/pitch-competition-2020-promo-in-body-aligned.jpg"
                            : item.fund_type === 2
                            ? "https://aofund.org/app/uploads/2023/06/pexels-sora-shimazaki-5668858-1024x683.jpg"
                            : "https://ssir.org/images/blog/Abby-Davidson-Matt-Guttentag-entrepreneur-accelerators-592x392.jpg"
                        }
                        competitionTitle={
                          item.fund_name !== "" ? item.fund_name : "New Contest"
                        }
                        fundingAmount={item.fund_amount}
                        equityTaken={item.equity_taken ? "True" : "False"}
                        competitionType={
                          item.fund_type === 1
                            ? "Pitch"
                            : item.fund_type === 2
                            ? "Grant"
                            : item.fund_type === 3
                            ? "Accelerator"
                            : "Default Type"
                        }
                        equityPercentage={item.amount_equity_taken}
                      />
                    </div>
                  );
                }

                return null; // Return null for items that don't meet requirements
              })}
            </div>
          )}
        </div>

        <></>

        {/* 
        <div className={styles.grid}>
          {state.user ? (
            <li className="nav-item">
              <Link href="/" className={styles.logout} onClick={handleLogout}>
                Logout
              </Link>
              {console.log(state.user.sub)}
            </li>
          ) : (
            <li className="nav-item">
              <Link href="/login">LoginNow</Link>
            </li>
          )}
        </div> */}

        {/* <button
          className={styles["button-81"]}
          onClick={handleMakeCompetitionClick}
          role="button"
        >
          Go to Make Competition
        </button> */}
      </main>
    </>
  );
}
