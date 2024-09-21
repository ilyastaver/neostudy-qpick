// src/pages/MainPage.tsx
import React from 'react';
import Header from '../components/Header';
import '../styles/MainPage.css';
import Main from '../components/Main';

const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main-page">
        <Main />
      </div>
    </div>
  );
};

export default MainPage;
