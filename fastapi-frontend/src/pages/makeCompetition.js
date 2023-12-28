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
import CustomNavbar from "@/components/organisms/CustomNavbar";

export default function Competition() {
  //   if (userId) {
  //     const filtered = response.data
  //       .filter((item) => item.host_id === userId)
  //       .map((item) => item.fund_name);
  //     setPitchCompetitions(filtered);
  //   }

  const handleCompetitionSelect = (event) => {
    setSelectedCompetition(event.target.value);
    console.log("Selected Competition:", event.target.value); // Log the selected competition
    // Assuming certain competitions trigger the display of business and applicant requirements
    if (event.target.value !== "") {
      setShowBusinessRequirements(true);
      setShowApplicantRequirements(true);
      console.log("Business and Applicant Requirements should display."); // Log to verify conditions are met
    } else {
      setShowBusinessRequirements(false);
      setShowApplicantRequirements(false);
      console.log("Business and Applicant Requirements should hide."); // Log to verify conditions are met
    }
  };

  const [pitchCompetitions, setPitchCompetitions] = useState([]);

  const [competitionName, setCompetitionName] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState("");

  const handleNameInputChange = (event) => {
    setCompetitionName(event.target.value);
  };

  const [fundContactEmail, setFundContactEmail] = useState("");

  const handleEmailInputChange = (event) => {
    setFundContactEmail(event.target.value);
  };

  const [selectedFundType, setSelectedFundType] = useState("1");

  const handleFundTypeChange = (event) => {
    setSelectedFundType(event.target.value);
  };

  const [fundAmount, setFundAmount] = useState(0);

  const handleAmountChange = (event) => {
    const inputAmount = parseFloat(event.target.value);
    setFundAmount(isNaN(inputAmount) ? 0 : inputAmount);
  };

  const { state, dispatch } = useGlobalState();
  const [u, updateU] = useState(null);

  const [equityTaken, setEquityTaken] = useState(false);
  const [amountEquityTaken, setAmountEquityTaken] = useState(0);

  const handleEquityTakenChange = (event) => {
    setEquityTaken(event.target.value === "true");
  };

  const handleAmountEquityTakenChange = (event) => {
    setAmountEquityTaken(event.target.value);
  };

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = jwtDecode(userData);
        console.log("User data:", user);
        updateU(user);
        dispatch({
          type: "SET_USER",
          payload: user,
        });
      }
    };

    getUserFromLocalStorage();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/funding/"
        );
        console.log("Fetched data:", response.data);

        // Check if state.user exists and has the sub property
        if (u != null && u.sub != undefined) {
          console.log(u.sub);
          const filteredComp = response.data.filter((item) => {
            console.log(item);
            if (item.fund_host_id == u.sub) {
              return item;
            }
          });
          console.log(filteredComp);
          // const competitions = filteredComp.map((item) => item.fund_name);
          const competitions = filteredComp;
          console.log(competitions);
          setPitchCompetitions(competitions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [u]);

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT_USER" });
    router.push("/");
  };

  //   Edit below to fix error
  const handleButtonClick = async () => {
    try {
      const requestBody = {
        fund_name: competitionName !== "" ? competitionName : "New Contest",
        fund_contact_email: fundContactEmail,
        fund_type: selectedFundType,
        fund_amount: fundAmount,
        equity_taken: equityTaken,
        amount_equity_taken: amountEquityTaken,
        fund_host_id: state.user.sub,
      };

      // Change this above if have time

      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/funding/",
        requestBody
      );

      const updatedResponse = await axios.get(
        "http://127.0.0.1:8000/api/v1/funding/"
      );
      console.log(updatedResponse);

      const updatedCompetitions = updatedResponse.data
        .filter((item) => item.host_id == state.user.sub)
        .map((item) => item.fund_name);

      setPitchCompetitions(updatedResponse.data);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const router = useRouter();

  const handleMakeCompetitionClick = () => {
    console.log("printed");
    // Navigate to makeCompetition.js in the same folder
    router.push("/");
  };

  const [showBusinessRequirements, setShowBusinessRequirements] =
    useState(false);
  const [showApplicantRequirements, setShowApplicantRequirements] =
    useState(false);

  const [businessRequirement, setBusinessRequirement] = useState("");
  const [applicantRequirement, setApplicantRequirement] = useState("");

  const handleBusinessRequirementChange = (event) => {
    setBusinessRequirement(event.target.value);
  };

  const handleApplicantRequirementChange = (event) => {
    const selectedRequirement = event.target.value;
    setApplicantRequirement(event.target.value);

    if (selectedRequirement === "Gender") {
      setRequirementSelected(3); // Gender requirement ID
    } else if (selectedRequirement === "Veteran") {
      setRequirementSelected(19);
    } else if (selectedRequirement === "Student"){
      setRequirementSelected(5);
    }
  };

  const [genderRequirements, setGenderRequirements] = useState([]);

  const handleGenderRequirementChange = (event) => {
    const selectedGender = event.target.value;
    if (event.target.checked) {
      setGenderRequirements([...genderRequirements, selectedGender]);
    } else {
      const updatedGenderRequirements = genderRequirements.filter(
        (gender) => gender !== selectedGender
      );
      setGenderRequirements(updatedGenderRequirements);
    }
  };


  const [requirementSelected, setRequirementSelected] = useState(0);

  const handleRequirementSelectedChange = (event) => {
    setRequirementSelected(event.target.value);
  };

  const [veteranStatus, setVeteranStatus] = useState("");

  const handleVeteranStatusChange = (event) => {
    setVeteranStatus(event.target.value);
  };

  const [studentStatus, setStudentRequirements] = useState([]);

  const handleStudentStatusChange = (event) => {
    setStudentRequirements(event.target.value)
  }

  const requirementHandlers = {
    Gender: () => ({
      requirement_id: 3,
      data: "gender:" + genderRequirements.join(","),
    }),
    Veteran: () => ({
      requirement_id: 19,
      data: "is_veteran:" + handleVeteranStatus(),
    }),
    Student: () => ({
      requirement_id: 5,
      data: "university_name:" + handleStudentStatus()
    }),
  };

  const handleStudentStatus = () => {
    return studentStatus;
  }

  const handleVeteranStatus = () => {
    return veteranStatus;
  };

  const handleRequirementsClick = async () => {
    try {
      //   const requirementsBody = {
      //     fund_id: selectedCompetition,
      //     requirement_id: requirementSelected,
      //     data: genderRequirements.join(','),
      //   };
      const selectedHandler = requirementHandlers[applicantRequirement];

      if (selectedHandler) {
        const requirementData = selectedHandler();
        const requirementsBody = {
          fund_id: selectedCompetition,
          ...requirementData,
        };

        // Make a POST request to save the gender requirements for the selected competition
        const requirementResponse = await axios.post(
          "http://127.0.0.1:8000/api/v1/funding-opp-req/",
          requirementsBody
        );

        //   http://127.0.0.1:8000/api/v1/funding/

        console.log(
          "Funding Opportunity Requirement Response:",
          requirementResponse.data
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <CustomNavbar activeLink="competition" />
      <main
        className={`${styles.home} container m-5`}
        style={{ alignItems: "initial" }}
      >
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-5" style={{fontWeight: '700'}}>Upload Opportunity</h2>

            <label>
              {" "}
              <b>Competition Name </b>
            </label>
            <div class="input-group mb-3">
              <input
                type="text"
                value={competitionName}
                onChange={handleNameInputChange}
                class="form-control"
                placeholder="Funding Opportunity Name"
                aria-label="Competition Name"
              />
            </div>

            <label>
              {" "}
              <b>Funding Available </b>
            </label>
            <div>
              <input
                type="number"
                value={fundAmount}
                onChange={handleAmountChange}
                class="form-control"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
            </div>

            <label>
              <b>Opportunity Type</b>
            </label>
            <div class="input-group mb-3">
              {/* <label class="input-group-text" for="inputGroupSelect01">Opportunity Type</label> */}
              <select
                class="form-select"
                id="inputGroupSelect01"
                value={selectedFundType}
                onChange={handleFundTypeChange}
              >
                <option selected>Choose...</option>
                <option value="1">Pitch Contest</option>
                <option value="2">Grant</option>
                <option value="3">Accelerator</option>
              </select>
            </div>

            <label
              class="form-label"
              value={fundContactEmail}
              onChange={handleEmailInputChange}
              placeholder="Fund Amount"
            >
              <b>Upload Contact for opportunity</b>
            </label>

            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Email"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
              />
              {/* <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload Image for Competition</button> */}
            </div>

            <label class="mt-2">
              <b>Equity Taken?</b>
            </label>
            <div class="input-group mb-2 mt-2">
              <select
                value={equityTaken}
                onChange={handleEquityTakenChange}
                class="form-select"
                id="inputGroupSelect02"
              >
                <option selected>Choose...</option>
                <option value={false}>Equity Not Taken</option>
                <option value={true}>Equity Taken</option>
              </select>
            </div>

            {/* <Input value={competitionName} onChange={handleNameInputChange} holder = {"Competition Name"}/> */}

            {/* <select value={equityTaken} onChange={handleEquityTakenChange}>
            <option value={false}>Equity Not Taken</option>
            <option value={true}>Equity Taken</option>
            </select> */}

            {equityTaken && (
              <>
                <label>
                  <b>Max Percent Equity Taken?</b>
                </label>
                <div class="input-group mb-3">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={amountEquityTaken}
                    onChange={handleAmountEquityTakenChange}
                    class="form-control"
                  />
                </div>
              </>
            )}

            <br />


            <Button
              onClick={handleButtonClick}
              text="Create Funding Opportunity"
              className={"mb-1 "}
            />

            <div className="col-12" style={{ height: "50px" }}></div>
          </div>

          {/* <label>
              <b>Equity Taken?</b>
            </label>
            <div class="input-group mb-5">
              <select
                value={equityTaken}
                onChange={handleEquityTakenChange}
                class="form-select"
                id="inputGroupSelect02"
              >
                <option selected>Choose...</option>
                <option value={false}>Equity Not Taken</option>
                <option value={true}>Equity Taken</option>
              </select>
            </div> */}

          <div className="col-md-6">
            <div>
              <h2 className="mb-5 ms-5" style={{fontWeight: '700'}} >Opportunity Requirements</h2>
              <label className="ms-5">
                <b>Select Funding Opportunity?</b>
              </label>
              <div>
                <select
                  value={selectedCompetition}
                  onChange={handleCompetitionSelect}
                  class="form-select ms-5 mb-3"
                >
                  <option value="">Select a Competition</option>
                  {pitchCompetitions.reverse().map((competition, index) => (
                    <option key={index} value={competition.id}>
                      {competition.fund_name}
                    </option>
                  ))}
                </select>
              </div>
              {showBusinessRequirements && (
                <>
                  <label class="ms-5">
                    <b>Select Business Requirement</b>
                  </label>

                  <select
                    class = "form-select ms-5 mb-2"
                    value={businessRequirement}
                    onChange={handleBusinessRequirementChange}
                  >
                    <option value="">Select a Business Requirement</option>
                    {/* Populate business requirements options */}
                  </select>
                </>
              )}

              {showApplicantRequirements && (
                <>
                  <label class="ms-5">
                    <b>Select Applicant Requirement</b>
                  </label>
                  <select
                    class = "form-select ms-5 mb-3"
                    value={applicantRequirement}
                    onChange={handleApplicantRequirementChange}
                  >
                    <option value="">Select an Applicant Requirement</option>
                    {/* Populate applicant requirements options */}
                    <option value="Gender">Gender Requirement</option>
                    {/* Add 'Gender Requirement' option */}
                    <option value="Veteran">Veteran Requirement</option>
                    <option value="Student">Student Requirement</option>
                  </select>
                </>
              )}

              {showApplicantRequirements &&
                applicantRequirement === "Gender" && (
                  <div>
                  <label class="ms-5 me-5">
                    <b>Competition is open to?</b>
                  </label>
                    <label class = "me-3">
                      <input
                        type="checkbox"
                        value="Male"
                        onChange={handleGenderRequirementChange}
                      />{" "}
                      Men
                    </label>
                    <label class = "me-3">
                      <input
                        type="checkbox"
                        value="Women"
                        onChange={handleGenderRequirementChange}
                      />{" "}
                      Women
                    </label>
                    <label class = "me-3">
                      <input
                        type="checkbox"
                        value="Other"
                        onChange={handleGenderRequirementChange}
                      />{" "}
                      Other
                    </label>
                  </div>
                )}

              {showApplicantRequirements &&
                applicantRequirement === "Veteran" && (
                  <div>
                  <label class="ms-5 me-5">
                    <b>Competition is open to?</b>
                  </label>
                    <select
                      class = "form-select ms-5"
                      value={veteranStatus}
                      onChange={handleVeteranStatusChange}
                    >
                      <option value="">Select Veteran Status</option>
                      <option value="Veteran">Only Veterans</option>
                      <option value="Non-Veteran">All aplicants</option>
                    </select>
                  </div>
                )}

              {showApplicantRequirements &&
                applicantRequirement === "Student" && (
                  <div>
                  <label class="ms-5 me-5">
                    <b>Competition is open to?</b>
                  </label>
                    <select
                      class = "form-select ms-5"
                      value={studentStatus}
                      onChange={handleStudentStatusChange}
                    >
                      <option value="">Select Student Status</option>
                      <option value="Student">Only Students</option>
                      <option value="Non-Student">All aplicants</option>
                    </select>
                  </div>
                )}

              <br />
              <div className="ms-5">
                <Button
                  onClick={handleRequirementsClick}
                  text="Set Requirements"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleMakeCompetitionClick}
          text="← Back to Competitions"
        />

        {/* <div className={styles.grid}>
          {state.user ? (
            <li className="nav-item">
              <Link href="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
              {console.log(state.user.sub)}
            </li>
          ) : (
            <li className="nav-item">
              <Link href="/login">LoginNow</Link>
            </li>
          )}
        </div> */}
      </main>
    </>
  );
}
