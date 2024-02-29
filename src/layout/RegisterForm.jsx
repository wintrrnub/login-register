import axios from 'axios'
import { useState } from "react";

export default function RegisterForm() {
  const [input, setInput] = useState({
    username: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const hdlChange = e => {
    setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
      // validation
      if (input.password !== input.confirmPassword) {
        return alert('Please check confirm password')
      }
      const rs = await axios.post('http://localhost:8000/auth/register', input)
      console.log(rs)
      if (rs.status === 200) {
        alert('Register Successful')
      }
    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <>
      <label style={{ textAlign: "center", marginTop: "3%", display: "block", fontSize: "24px", fontWeight: "bold" }}>Register</label>
      <div style={{ width: "550px", borderRadius: "20px", padding: "40px", marginTop: "1%" }} className="border mx-auto rounded mt-5">
        <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">username</span>
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
              <span className="label-text">email</span>
            </div>
            <input
              type="email"
              className="input input-bordered w-full"
              name="email"
              value={input.email}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">address</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="address"
              value={input.address}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">phone</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              name="phone"
              value={input.phone}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              name="password"
              value={input.password}
              onChange={hdlChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Confirm Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={hdlChange}
            />
          </label>
          <div className="flex gap-5 justify-center">
            <button type="submit" className="btn btn-outline mt-7">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
