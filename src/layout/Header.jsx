import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { IoTriangle, IoPerson, IoPersonOutline } from "react-icons/io5";
import { HiMiniShoppingCart } from "react-icons/hi2";

const guestNav = [
  { text: 'Login' },
];

const centerNav = [
  // { to: '/Home', text: 'หน้าหลัก' },
  // { to: '/products', text: 'สินค้า' },
  // { to: '/contact', text: 'ติดต่อเรา' },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user ? centerNav : guestNav; // Adjusted userNav

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#F8F8F8', width: "100%", boxShadow: "rgba(0, 0, 0, 0.10) 0px 5px 20px" }} className="navbar">
    <div className="flex-1">
      <a className="btn btn-ghost text-base"><IoTriangle /> MYPHONE</a>
    </div>
    <div className="flex-1 flex justify-center">
      <ul className="menu menu-horizontal px-1 font-bold text-base">
        <li><Link to="/">หน้าหลัก</Link></li>
        <li><Link to="/alert">สินค้า</Link></li>
        <li><Link to="/contact">ติดต่อเรา</Link></li>
      </ul>
    </div>
    <div className="flex-1 flex justify-end">
      <ul className="menu menu-horizontal px-1 font-bold text-base">
        <li>
          <Link to="/alert"><HiMiniShoppingCart />Cart</Link>
        </li>
      </ul>
      <ul className="menu menu-horizontal px-1 font-bold text-base">
        {user ? (
          <>
            <li>
              <Link to="#" onClick={hdlLogout}><IoPersonOutline />Logout</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login"><IoPersonOutline />{guestNav[0].text}</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
  );
}
