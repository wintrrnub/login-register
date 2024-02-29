import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // เพิ่ม import Link

export default function LoginForm() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const hdlChange = e => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async e => {
    try {
      e.preventDefault();
      // validation
      const rs = await axios.post('http://localhost:8000/auth/login', input);
      console.log(rs.data.token);
      localStorage.setItem('token', rs.data.token);
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` }
      });
      console.log(rs1.data);
      setUser(rs1.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <></>
  );
  
}
