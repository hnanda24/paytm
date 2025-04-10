import React from 'react';
import UserDashboard from './UserDashboard';
import TransferMoney from './TransferMoney';

const MainContainer = () => {
  return (
    <div className="min-h-screen w-full bg-[#1e1b4b] flex flex-col items-center justify-center p-8 gap-10">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserDashboard />
        <TransferMoney />
      </div>
    </div>
  );
};

export default MainContainer;
