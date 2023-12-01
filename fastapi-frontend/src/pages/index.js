// Main file to be edited 
"use client";
import React, { useState, useEffect} from 'react'
import { useGlobalState } from '../context/GlobalState';
import { useRouter } from 'next/navigation';
import authService from '../services/auth.service';
import { jwtDecode } from "jwt-decode";
import styles from '../styles/home.module.css';
import Link from 'next/link';
import axios from "axios";
import Htag from '../components/atoms/Htag';
import Input from '@/components/atoms/Input';

export default function Home() {

  let [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredData = data
    ? data.filter(
        (item) =>
          item.fund_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

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

  return (
    <>
      <main className={`${styles.main}`}>


      <Input value={searchTerm} onChange={handleSearch} />

      <div>
        {filteredData.map((item, index) => (
          <Htag key={index} text={item.fund_name + ":  " + "equity taken " + item.amount_equity_taken + "%"} />
        ))}
      </div>

        <div className={styles.grid}>
        {state.user ? (
            <li className="nav-item">
              <Link href="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
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
