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

export default function Home() {
  const [selectedIdentity, setSelectedIdentity] = useState("");

  const [columnValueGender, setColumnValueGender] = useState("");

  const [selectedMilitaryStatus, setSelectedMilitaryStatus] = useState("");

  const [selectedStudentStatus, setStudentStatus] = useState("");

  const [hoveridentity, sethoveridentity] = useState(false);

  const [hoverveteran, sethoverveteran] = useState(false);

  const [hoverstudent, sethoverstudent] = useState(false);

  const handleSelectedStudentChange = (event) => {
    setStudentStatus(event.target.value);
  }

  const handleMilitaryStatusChange = (event) => {
    setSelectedMilitaryStatus(event.target.value);
  };



  const handleIdentityChange = (event) => {
    setSelectedIdentity(event.target.value);
  };

  const handleSave = () => {
    setColumnValueGender(selectedIdentity);

    // Perform an action to save the selected identity
    console.log("Selected identity:", columnValueGender);
    // Add your logic here to save the selected identity
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSaveUserClick = async () => {
    try {
      const requestBody = {
        // user_id: state.user.sub,
        // column_name: "gender",
        // column_value: selectedIdentity,
        accept: "application/json",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/userscolumn/${state.user.sub}?column_name=gender&column_value=${selectedIdentity}`,
        requestBody
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSaveUserVeteranClick = async () => {
    try {
      const requestBody = {
        // user_id: state.user.sub,
        // column_name: "gender",
        // column_value: selectedIdentity,
        accept: "application/json",
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/v1/userscolumn/${state.user.sub}?column_name=is_veteran&column_value=${selectedMilitaryStatus}`,
        requestBody
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // We will user university_name for this 
  const handleSaveUserStudentClick = async () => {
    try {
      const requestBody = {
        // user_id: state.user.sub,
        // column_name: "gender",
        // column_value: selectedIdentity,
        accept: "application/json",
      };

      const response = await axios.put(

        `http://127.0.0.1:8000/api/v1/userscolumn/${state.user.sub}?column_name=university_name&column_value=${selectedStudentStatus}`,
        requestBody
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const amounts = [
    { label: "$0", value: 0 },
    { label: "$1000", value: 1000 },
    { label: "$5000", value: 5000 },
    { label: "$10000", value: 10000 },
    { label: "$50000", value: 50000 },
    { label: "$100000", value: 100000 },
  ];

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

  const router = useRouter();

  return (
    <>
      <CustomNavbar activeLink="none" />
      <main className={`${styles.main}`}>
        <div class="container">
          <div className="container">
            <div
              className="row justify-content-center"
              style={{ width: "100%" }}
            >
              <div className="col text-center">
                <h1 style={{fontWeight: '700'}}>Filter Your Searches</h1>
              </div>
            </div>
          </div>

          <div class="row justify-content-center" style = {{marginTop: "10%"}}>
            <div class="input-group" style={{ width: "51%" }}>
              <select
                class="form-select"
                value={selectedIdentity}
                onChange={handleIdentityChange}
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                style={{ width: "40%", boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
              >
                <option value="">Select Gender Status</option>
                <option value="male">Man</option>
                <option value="women">Woman</option>
                <option value="other">Other</option>
              </select>
              <button
                onMouseEnter={() => sethoveridentity(true)}
                onMouseLeave={() => sethoveridentity(false)}
                onClick={handleSaveUserClick}
                class="btn text-white btn-outline-secondary "
                type="button"
                style={{ width: "30%", background: hoveridentity ? "gray" : "#3077e4", transition: 'background-color 0.3s ease-in-out', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', border: 'none'}}
              >
                Save Chosen Identity
              </button>
            </div>

            <div class="input-group" style={{ width: "51%" }}>
              <select
                class="form-select mt-4"
                value={selectedMilitaryStatus}
                onChange={handleMilitaryStatusChange}
                id="inputGroupSelect05"
                aria-label="Example select with button addon"
                style={{ width: "40%", boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'}}
              >
                <option value="">Select Military Status</option>
                <option value="Veteran">Veteran</option>
                <option value="Non-Veteran">Non-Veteran</option>
              </select>
              <button
                onClick={handleSaveUserVeteranClick}
                onMouseEnter={() => sethoverveteran(true)}
                onMouseLeave={() => sethoverveteran(false)}
                class="btn text-white btn-outline-secondary mt-4"
                type="button"
                style={{ width: "30%", background: hoverveteran ? "gray" : '#3077e4', transition: 'background-color 0.3s ease-in-out', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', border: 'none'}}
              >
                Save Service 
              </button>
            </div>

            <div class="input-group" style={{ width: "51%" }}>
              <select
                class="form-select mt-4"
                value={selectedStudentStatus}
                onChange={handleSelectedStudentChange}
                id="inputGroupSelect06"
                aria-label="Example select with button addon"
                style={{ width: "40%", boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
              >
                <option value="">Select Student Status</option>
                <option value="Student">Student</option>
                <option value="Non-Student">Non-Student</option>
              </select>
              <button
                onMouseEnter={() => sethoverstudent(true)}
                onMouseLeave={() => sethoverstudent(false)}
                onClick={handleSaveUserStudentClick}
                class="btn text-white btn-outline-secondary mt-4"
                type="button"
                style={{ width: "30%", background: hoverstudent ? "gray" : '#3077e4', border: 'none', boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease-in-out',}}
              >
                Save Student Status
              </button>
            </div>

          </div>
        </div>

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
