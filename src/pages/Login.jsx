// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem(`user_${id}`));
    if (storedUser && storedUser.user_pw === password) {
      sessionStorage.setItem('user_id', id);
      navigate('/main');
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <EntranceContainer className="entrance-container">
      <IntroducingContainer className="introducing-container">
        <Logo src="/images/CattleBell_logo.png" alt="" />
        <h1>어서오세요!</h1>
      </IntroducingContainer>
      <LoginContainer>
        <h2>로그인</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div className="form-group">
          <label htmlFor="id" className='label'>아이디:</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className='label'>비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button className="button" onClick={handleLogin}>로그인</Button>
        <Button className="button" onClick={handleSignup}>회원가입</Button>
      </LoginContainer>
    </EntranceContainer>
  );
}

export default Login;

const EntranceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (max-aspect-ratio: 1/1){
    flex-direction: column;
  }
`;

const IntroducingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width:768px){
    padding: 0px;
    font-size: 10px;
  }
`;

const Logo = styled.img`
  width: 400px;

  @media (max-width:768px){
    width: 200px;
  }
`
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 50px 120px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width:950px){
    padding: 20px 50px 30px;
  }
`;

const Button = styled.button`
  width: 100%;
  font-size: 15px;
  font-weight: bold;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;