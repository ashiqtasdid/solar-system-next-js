import React from 'react';
import SolarSystem from '../components/SolarSystem';
import Nav from '../components/Nav';

const Home: React.FC = () => {
  return (
    <div className="m-0 p-0 overflow-hidden w-screen h-screen" id='__next'>
      <Nav />

      <main className="">
        <div className="">
          <SolarSystem />
        </div>
      </main>
    </div>
  );
};

export default Home;
