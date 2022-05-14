import React, { useContext, useEffect, useState } from "react";
import TransactionProvider from "../../context/TransactionContext";

const BetOption = () => {
  const [approve, setApprove] = useState(false);
  const [approved, setApproved] = useState(false);

  const [tokenBalance, setTokenBalance] = useState(2500);
  const [selectedOption, setSelectedOption] = useState(7);
  const [betAmount, setBetAmount] = useState(500);

  const updateBetAmount = (type) => {
    if (type == "+" && betAmount + 500 > tokenBalance) {
      alert("Bet amount cannot be more than token balance");
      return;
    }
    if (type == "-" && betAmount - 500 < 500) {
      alert("Bet amount cannot be less than 500");
      return;
    }

    type == "+" ? setBetAmount(betAmount + 500) : setBetAmount(betAmount - 500);
  };

  const handleApprove = () => {
    if (!approve) {
      //Check bet amount and available balance
      //Call async/await approve method of ERC20 token
      setApprove(true);

      setTimeout(() => {
        setApproved(true);
      }, 2000);
    }

    if (approved) {
      //roll the dice - call async/await random method of contract
      alert("You lost, try again!!!");
      setApproved(false);
      setApprove(false);
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gradient">
        Lucky Seven
      </h1>
      <div className="text-center text-white text-2xl text-gradient pt-10">
        Select Option
      </div>

      <div className="flex justify-center ">
        <div
          className={`cursor-pointer p-3 m-3 flex justify-around items-center flex-col rounded-xl h-24 w-40 my-5 eth-card .white-glassmorphism ${
            selectedOption == 6 ? "border-2 border-white" : "grayscale"
          }`}
          onClick={() => setSelectedOption(6)}
        >
          <div>Win 2x</div>
          <div className="sm:text-2xl">2 To 6</div>
          <div>Win {betAmount * 2}</div>
        </div>
        <div
          className={`cursor-pointer p-3 m-3 flex justify-around items-center flex-col rounded-xl h-24 w-40 my-5 eth-card .white-glassmorphism ${
            selectedOption == 7 ? "border-2 border-white" : "grayscale"
          }`}
          onClick={() => setSelectedOption(7)}
        >
          <div>Win 3x</div>
          <div className="sm:text-2xl">7</div>
          <div>Win {betAmount * 3}</div>
        </div>
        <div
          className={`cursor-pointer p-3 m-3 flex justify-around items-center flex-col rounded-xl h-24 w-40 my-5 eth-card .white-glassmorphism ${
            selectedOption == 8 ? "border-2 border-white" : "grayscale"
          }`}
          onClick={() => setSelectedOption(8)}
        >
          <div>Win 2x</div>
          <div className="sm:text-2xl">8 To 12</div>
          <div>Win {betAmount * 2}</div>
        </div>
      </div>

      <div className="text-center text-white text-2xl text-gradient pt-5">
        <div> Select bet amount</div>
        <div className="p-3">
          <button
            className="bg-black-500 w-10 rounded-tl-xl rounded-bl-xl text-2xl border-2"
            onClick={() => {
              updateBetAmount("-");
            }}
          >
            -
          </button>
          <span className="w-60 text-red px-5">{betAmount}</span>
          <button
            className="bg-black-500 w-10 rounded-tr-xl rounded-br-xl text-2xl border-2"
            onClick={() => {
              updateBetAmount("+");
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex justify-center pt-7 ">
        <div
          className={`cursor-pointer p-3 m-3 flex justify-around items-center flex-col rounded-full my-5 eth-card .white-glassmorphism ${
            approve ? "border-2 border-white" : "grayscale"
          } `}
          onClick={() => handleApprove()}
        >
          {approved ? (
            <span> Bet approved, click to roll the dice </span>
          ) : (
            <span> Approve the Bet</span>
          )}
        </div>
      </div>
    </>
  );
};

export default BetOption;
