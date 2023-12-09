// Main file to be edited 
"use client";
import React, { useState, useEffect } from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import styles from '../styles/home.module.css';
import Link from 'next/link';
import axios, { Axios } from "axios";
import Htag from '../components/atoms/Htag';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/button';
import CustomNavbar from '@/components/organisms/CustomNavbar';



export default function Competition() {

//   if (userId) {
//     const filtered = response.data
//       .filter((item) => item.host_id === userId)
//       .map((item) => item.fund_name);
//     setPitchCompetitions(filtered);
//   }

const handleCompetitionSelect = (event) => {
    setSelectedCompetition(event.target.value);
    console.log('Selected Competition:', event.target.value); // Log the selected competition
    // Assuming certain competitions trigger the display of business and applicant requirements
    if (event.target.value !== '') {
      setShowBusinessRequirements(true);
      setShowApplicantRequirements(true);
      console.log('Business and Applicant Requirements should display.'); // Log to verify conditions are met
    } else {
      setShowBusinessRequirements(false);
      setShowApplicantRequirements(false);
      console.log('Business and Applicant Requirements should hide.'); // Log to verify conditions are met
    }
  };




  const [pitchCompetitions, setPitchCompetitions] = useState([]);


  const [competitionName, setCompetitionName] = useState('');
  const [selectedCompetition, setSelectedCompetition] = useState('');

  const handleNameInputChange = (event) => {
    setCompetitionName(event.target.value);
  };

  const [fundContactEmail, setFundContactEmail] = useState('');

  const handleEmailInputChange = (event) => {
    setFundContactEmail(event.target.value);
  };

  const [selectedFundType, setSelectedFundType] = useState('1');

  const handleFundTypeChange = (event) => {
    setSelectedFundType(event.target.value);
  };

  const [fundAmount, setFundAmount] = useState(0);

  const handleAmountChange = (event) => {
    const inputAmount = parseFloat(event.target.value); 
    setFundAmount(isNaN(inputAmount) ? 0 : inputAmount); 
  };

  const { state, dispatch } = useGlobalState();
  const [u, updateU] = useState(null)

  const [equityTaken, setEquityTaken] = useState(false);
  const [amountEquityTaken, setAmountEquityTaken] = useState(0);

  const handleEquityTakenChange = (event) => {
    setEquityTaken(event.target.value === 'true');
  };
  
  const handleAmountEquityTakenChange = (event) => {
    setAmountEquityTaken(event.target.value);
  };
  
  useEffect( () => {
    const getUserFromLocalStorage = async () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = jwtDecode(userData);
        console.log('User data:', user);
        updateU(user)
        dispatch({
          type: 'SET_USER',
          payload: user
        });
      }
    };
    
    
    getUserFromLocalStorage();
    
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/funding/");
          console.log('Fetched data:', response.data);
  
          // Check if state.user exists and has the sub property
          if (u != null && u.sub != undefined) {
            console.log(u.sub);
            const filteredComp = response.data.filter((item) => {
                console.log(item);
                    if(item.fund_host_id == u.sub){
                        return item;
                    }
                }
            );
            console.log(filteredComp);
            // const competitions = filteredComp.map((item) => item.fund_name);
            const competitions = filteredComp
            console.log(competitions);
            setPitchCompetitions(competitions);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    fetchData();
  }, [u])

  const handleLogout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT_USER' });
    router.push('/');
  };
  
    //   Edit below to fix error 
    const handleButtonClick = async () => {
      try {
        const requestBody = {
          fund_name: competitionName,
          fund_contact_email: fundContactEmail,
          fund_type: selectedFundType,
          fund_amount: fundAmount,
          equity_taken: equityTaken,
          amount_equity_taken: amountEquityTaken,
          fund_host_id: state.user.sub 
        };
     
  // Change this above if have time 


      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/funding/',
        requestBody
      );

      const updatedResponse = await axios.get("http://127.0.0.1:8000/api/v1/funding/");
      console.log(updatedResponse)

      const updatedCompetitions = updatedResponse.data
          .filter((item) => item.host_id == state.user.sub)
          .map((item) => item.fund_name);
  
      setPitchCompetitions(updatedResponse.data);
    
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const router = useRouter();

  const handleMakeCompetitionClick = () => {
    console.log('printed');
    // Navigate to makeCompetition.js in the same folder
    router.push('/');
  };

  const [showBusinessRequirements, setShowBusinessRequirements] = useState(false);
  const [showApplicantRequirements, setShowApplicantRequirements] = useState(false);

  const [businessRequirement, setBusinessRequirement] = useState('');
  const [applicantRequirement, setApplicantRequirement] = useState('');

  const handleBusinessRequirementChange = (event) => {
    setBusinessRequirement(event.target.value);
  };

  const handleApplicantRequirementChange = (event) => {
    const selectedRequirement = event.target.value;
    setApplicantRequirement(event.target.value);

    if (selectedRequirement === 'Gender') {
        setRequirementSelected(3); // Gender requirement ID
      } else if (selectedRequirement === 'Veteran') {
        setRequirementSelected(4);
      }
  };

  const [genderRequirements, setGenderRequirements] = useState([]);

  const handleGenderRequirementChange = (event) => {
    const selectedGender = event.target.value;
    if (event.target.checked) {
      setGenderRequirements([...genderRequirements, selectedGender]);
    } else {
      const updatedGenderRequirements = genderRequirements.filter((gender) => gender !== selectedGender);
      setGenderRequirements(updatedGenderRequirements);
    }
  };

  const [requirementSelected, setRequirementSelected] = useState(0);

  const handleRequirementSelectedChange = (event) => {
    setRequirementSelected(event.target.value);
  };

  const [veteranStatus, setVeteranStatus] = useState('');

  const handleVeteranStatusChange = (event) => {
    setVeteranStatus(event.target.value);
  };
  
  const requirementHandlers = {
    Gender: () => ({ requirement_id: 3, data: "gender:" + genderRequirements.join(',') }),
    Veteran: () => ({ requirement_id: 4, data: "is_veteran:" + handleVeteranStatus() }),
    // Add more requirement handlers as needed
  };

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
        'http://127.0.0.1:8000/api/v1/funding-opp-req/',
        requirementsBody
      );

    //   http://127.0.0.1:8000/api/v1/funding/
  
      console.log('Funding Opportunity Requirement Response:', requirementResponse.data);
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <>
      <CustomNavbar activeLink="competition" />
      <main className={`${styles.main}`}>
        
      
        <div className="row">
        <div className='col-md-6'>
        <Input value={competitionName} onChange={handleNameInputChange} holder = {"Competition Name"}/>
        <Input value={fundContactEmail} onChange={handleEmailInputChange} holder= {"Fund Contact Email"}/>
        <select value={selectedFundType} onChange={handleFundTypeChange}>
          <option value="1">Pitch Competition</option>
          <option value="2">Grant</option>
          <option value="3">Accelerator</option>
        </select>

        <input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={fundAmount}
            onChange={handleAmountChange}
            placeholder="Fund Amount"
        />

        <select value={equityTaken} onChange={handleEquityTakenChange}>
            <option value={false}>Equity Not Taken</option>
            <option value={true}>Equity Taken</option>
        </select>

        {equityTaken && (
        <input
            type="number"
            value={amountEquityTaken}
            onChange={handleAmountEquityTakenChange}
            placeholder="Amount of Equity (0-100)"
            min={0}
            max={100}
        />
        )}

        <br/>

        <Button onClick={handleButtonClick} text="Create Funding Opportunity" />

        </div>

        <div className='col-md-6'>
        <div>
        <h1>Pitch Competitions</h1>
              <select value={selectedCompetition} onChange={handleCompetitionSelect}>
                <option value="">Select a Pitch Competition</option>
                {pitchCompetitions.map((competition, index) => (
                  <option key={index} value={competition.id}>{competition.fund_name}</option>
                ))}
              </select>

              {showBusinessRequirements && (
              <select value={businessRequirement} onChange={handleBusinessRequirementChange}>
                <option value="">Select a Business Requirement</option>
                {/* Populate business requirements options */}
              </select>
            )}

            {showApplicantRequirements && (
              <select value={applicantRequirement} onChange={handleApplicantRequirementChange}>
                <option value="">Select an Applicant Requirement</option>
                {/* Populate applicant requirements options */}
                <option value="Gender">Gender Requirement</option>
                {/* Add 'Gender Requirement' option */}
                <option value="Veteran">Veteran Requirement</option>
              </select>
            )}

            {showApplicantRequirements && applicantRequirement === 'Gender' && (
              <div>
                <p>Competition is open to:</p>
                <label>
                  <input
                    type="checkbox"
                    value="Male"
                    onChange={handleGenderRequirementChange}
                  /> Men
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Women"
                    onChange={handleGenderRequirementChange}
                  /> Women
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Other"
                    onChange={handleGenderRequirementChange}
                  /> Other
                </label>
              </div>
            )}

            {showApplicantRequirements && applicantRequirement === 'Veteran' && (
            <div>
                <p>Veteran Status:</p>
                <select value={veteranStatus} onChange={handleVeteranStatusChange}>
                <option value="">Select Veteran Status</option>
                <option value="Veteran">Only Veterans</option>
                <option value="Non-Veteran">All aplicants</option>
                </select>
            </div>
            )}

            <br/>
            <Button onClick={handleRequirementsClick} text="Set Requirements" />

        </div>
        </div>

        </div>


        <Button onClick={handleMakeCompetitionClick} text="Go Back to Competitions" />

        <div className={styles.grid}>
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
        </div>
      </main>
    </>
  )
}