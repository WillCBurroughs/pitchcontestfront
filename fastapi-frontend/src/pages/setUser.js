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
import Icon from '@/components/atoms/icon';
import CustomNavbar from '@/components/organisms/CustomNavbar';




export default function Home() {



  const [selectedIdentity, setSelectedIdentity] = useState('');

  const [columnValueGender, setColumnValueGender] = useState('');

  const handleIdentityChange = (event) => {
    setSelectedIdentity(event.target.value);
  };

  const handleSave = () => {

    setColumnValueGender(selectedIdentity);

    // Perform an action to save the selected identity
    console.log('Selected identity:', columnValueGender);
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
        accept: "application/json"
      };
   
    const response = await axios.put(
      `http://127.0.0.1:8000/api/v1/userscolumn/${state.user.sub}?column_name=gender&column_value=${selectedIdentity}`,
      requestBody
    );

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

  const amounts = [
    { label: '$0', value: 0 },
    { label: '$1000', value: 1000 },
    { label: '$5000', value: 5000 },
    { label: '$10000', value: 10000 },
    { label: '$50000', value: 50000 },
    { label: '$100000', value: 100000 },
  ];

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

  const router = useRouter();

  return (
    <>
      <CustomNavbar activeLink="none" />
      <main className={`${styles.main}`}>

      <div className="dropdown">
          <select value={selectedIdentity} onChange={handleIdentityChange}>
            <option value="">Question I identify as...</option>
            <option value="male">Man</option>
            <option value="women">Woman</option>
            <option value="other">Other</option>
          </select>
          <Button onClick={handleSaveUserClick} text = "Save"/>
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