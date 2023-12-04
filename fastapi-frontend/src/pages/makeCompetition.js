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

export default function Home() {

    let [data, setData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAmount, setSelectedAmount] = useState('');
    const [selectedEquity, setSelectedEquity] = useState('all'); // Set default value to 'all'
    const [filteredData, setFilteredData] = useState([]);
  
    useEffect(() => {
      let fetchData = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/v1/funding/");
          setData(response.data); // Assuming the data is in response.data
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const amounts = [
      { label: '$0', value: 0 },
      { label: '$1000', value: 1000 },
      { label: '$5000', value: 5000 },
      { label: '$10000', value: 10000 },
      { label: '$50000', value: 50000 },
      { label: '$100000', value: 100000 },
    ];
  
    const equities = [
      { label: 'All Competitions', value: 'all' },
      { label: 'Equity Not Taken', value: 'notTaken' },
    ];
  
    const handleAmountChange = (event) => {
      setSelectedAmount(event.target.value);
    };
  
    const handleEquityChange = (event) => {
      setSelectedEquity(event.target.value);
    };
  
    useEffect(() => {
      if (data) {
        const filtered = data.filter((item) =>
          item.fund_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (!selectedAmount || item.fund_amount >= Number(selectedAmount)) &&
          (selectedEquity === 'all' || (selectedEquity === 'notTaken' && !item.equity_taken))
        );
        setFilteredData(filtered);
      }
    }, [data, searchTerm, selectedAmount, selectedEquity]);
  
    console.log("Data:", data);
  
    const { state, dispatch } = useGlobalState();
  
    useEffect(() => {
      const getUserFromLocalStorage = () => {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = jwtDecode(userData);
          console.log('User data:', user);
          dispatch({
            type: 'SET_USER',
            payload: user
          });
        }
      };
      getUserFromLocalStorage();
    }, []);
  
    const handleLogout = () => {
      authService.logout();
      dispatch({ type: 'LOGOUT_USER' });
      router.push('/');
    };
  
    useEffect(() => {
      const fetchHostId = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/users/get_user_id_api_v1_users_user_id_get");
          setHostId(response.data.id); // 
        } catch (error) {
          console.error('Error fetching hostId:', error);
        }
      };
  
      fetchHostId();
    }, []);
    
      const handleButtonClick = async () => {
        try {
          const requestBody = {
            fund_name: 'Your Fund Name',
            fund_contact_email: 'contact@example.com',
            fund_type: 0,
            fund_amount: 0,
            equity_taken: true,
            amount_equity_taken: 0,
            fund_host_id: state.user.sub 
          };
    // Change this above if have time 
        const response = await axios.post(
          'http://127.0.0.1:8000/api/v1/funding/',
          requestBody
        );
    
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <>
        <main className={`${styles.main}`}>
          <Input value={searchTerm} onChange={handleSearch} />
  
          <Button onClick={handleButtonClick} text="Create Funding Opportunity" />
  
          <div className={styles.dropdownsContainer}>
            <div className={styles.dropdown}>
              <select value={selectedAmount} onChange={handleAmountChange}>
                <option value="">Fund Amount</option>
                {amounts.map((amount, index) => (
                  <option key={index} value={amount.value}>
                    {amount.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.dropdown}>
              <select value={selectedEquity} onChange={handleEquityChange}>
                <option value="all">Choose Equity</option>
                {equities.map((equity, index) => (
                  <option key={index} value={equity.value}>
                    {equity.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
  
          <div>
            {filteredData.map((item, index) => (
              <Htag
                key={index}
                text={`${item.fund_name} - Funds Available: ${item.fund_amount} equity taken ${item.amount_equity_taken}%`}
              />
            ))}
          </div>
  
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