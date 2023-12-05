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


export default function Competition() {

//   if (userId) {
//     const filtered = response.data
//       .filter((item) => item.host_id === userId)
//       .map((item) => item.fund_name);
//     setPitchCompetitions(filtered);
//   }

  const handleCompetitionSelect = (event) => {
    setSelectedCompetition(event.target.value);
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
            const competitions = filteredComp.map((item) => item.fund_name);
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

    const updatedResponse = await axios.get("http://127.0.0.1:8000/api/v1/funding/");
    const updatedCompetitions = updatedResponse.data
        .filter((item) => item.host_id == state.user.sub)
        .map((item) => item.fund_name);

    setPitchCompetitions(updatedCompetitions);

      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/funding/',
        requestBody
      );
  
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

  return (
    <>
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
        </div>

        <div className='col-md-6'>
        <div>
        <h1>Pitch Competitions</h1>
              <select value={selectedCompetition} onChange={handleCompetitionSelect}>
                <option value="">Select a Pitch Competition</option>
                {pitchCompetitions.map((competition, index) => (
                  <option key={index} value={competition}>{competition}</option>
                ))}
              </select>

        </div>
        </div>

        </div>


        <Button onClick={handleButtonClick} text="Create Funding Opportunity" />
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