import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">SANGGI</Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/products">제품</Link></li>
          <li><Link to="/regions">지역</Link></li>
          <li><Link to="/reporters">기자단</Link></li>
          <li><Link to="/low_price">저금통</Link></li>
        </ul>
        <div className="navbar-right">
          <Link to="/login" className="navbar-login">로그인</Link>
          <Link to="/register" className="navbar-register">회원가입</Link>
          <Link to="/search" className="navbar-search"><i className="fas fa-search"></i></Link>
          <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
        </div>
      </div>
      <div className="navbar-submenu">
        <ul>
          <li><Link to="/today_open">오늘오픈</Link></li>
          <li><Link to="/premium">프리미어</Link></li>
          <li><Link to="/youtube">유튜브</Link></li>
          <li><Link to="/shopping">구매평</Link></li>
          <li><Link to="/community">커뮤니티</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
