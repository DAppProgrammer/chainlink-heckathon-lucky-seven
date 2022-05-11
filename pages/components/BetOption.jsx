import React from "react";

const BetOption = () => {
  return (
    <>
      <h1 className="text-center text-white text-4xl font-bold  text-gradient">
        Lucky Seven
      </h1>
      <div className="text-center text-white text-2xl text-gradient pt-10">
        Select Option
      </div>

      <div className="flex justify-center ">
        <div className="p-3 m-3 flex justify-around items-center flex-col rounded-xl h-20 w-40 my-5 eth-card .white-glassmorphism border-2 border-green-100 ">
          <div>2x</div>
          <div>2 To 6</div>
          <div>WIN 2000</div>
        </div>
        <div className="p-3 m-3 flex justify-around items-center flex-col rounded-xl h-20 w-40 my-5 eth-card .white-glassmorphism ">
          <div>3x</div>
          <div>7</div>
          <div>WIN 3000</div>
        </div>
        <div className="p-3 m-3 flex justify-around items-center flex-col rounded-xl h-20 w-40 my-5 eth-card .white-glassmorphism ">
          <div>2x</div>
          <div>8 To 12</div>
          <div>WIN 2000</div>
        </div>
      </div>

      <div className="text-center text-white text-2xl text-gradient pt-5">
        Select amount
      </div>
    </>
  );
};

export default BetOption;
