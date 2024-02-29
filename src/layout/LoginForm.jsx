import axios from 'axios';
import { useState } from "react";
import useAuth from '../hooks/useAuth';
import { Link,useNavigate } from 'react-router-dom'; // เพิ่ม import Link

export default function LoginForm() {
  const Navigate = useNavigate();
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const reg = [
    { to: '/register', text: 'Register' },
  ];

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
      Navigate("/Home");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
    <label style={{ textAlign: "center", marginTop: "9%", display: "block", fontSize: "24px", fontWeight: "bold" }}>Login</label>
    <div style={{ width: "550px", borderRadius: "20px", padding: "40px", marginTop:"2%"}} className="border mx-auto rounded mt-5">
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">username :</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            name="username"
            value={input.username}
            onChange={hdlChange}
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">password :</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full"
            name="password"
            value={input.password}
            onChange={hdlChange}
          />
        </label>
        <div className="flex gap-5">
          <Link to={reg[0].to} className="btn btn-outline mt-7">{reg[0].text}</Link>
          <button type="submit" style={{ marginLeft: 'auto' }} className="btn btn-outline mt-7">Login</button>
        </div>
      </form>
    </div>
    </>
  );
}
