import React from 'react';
import Main from './Main/Main';
import SideBar from './SideBar/SideBar';
import  './DashBoard.css';

const DashBoard = () => {
  return (
    <>
      <div className="final">
        <SideBar/>
        <Main/>
      </div>
    </>
  )
}

export default DashBoard