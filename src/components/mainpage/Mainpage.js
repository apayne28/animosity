import { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

import HomepageContent from "./HomepageContent";

import NavigationBar from "./navBar/NavigationBar";

const Mainpage = () => {
  return (
    <div className='app-content'>
      <div className='header-content'>
        <Header />

        <NavigationBar />
      </div>
      <div className='homepage-content'>
        <div className='homepage-sidebar'>
          <HomepageContent />

          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
