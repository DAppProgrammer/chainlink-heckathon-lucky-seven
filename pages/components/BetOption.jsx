import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import TransactionProvider from "../../context/TransactionContext";
import Dice from "./Dice";
import Loader from "./Loader";
import Trade from "./Trade";

const BetOption = () => {
  const [loading, setLoading] = useState(false);

  const {
    gameToken,
    setGameToken,
    trading,
    setTrading,
    approveBet,
    approved,
    setApproved,
    selectedOption,
    setSelectedOption,
    betAmount,
    setBetAmount
  } = useContext(TransactionProvider);

  
  const updateBetAmount = (type) => {
    if (type == "+" && betAmount + 500 > gameToken) {
      alert("Bet amount cannot be more than token balance");
      return;
    }
    if (type == "-" && betAmount - 500 < 500) {
      alert("Bet amount cannot be less than 500");
      return;
    }

    type == "+" ? setBetAmount(betAmount + 500) : setBetAmount(betAmount - 500);
  };

  const handleApprove = async () => {
    if (betAmount > gameToken) {
      alert(
        "You do not have enough tokens to make this bet, buy some more tokens to play"
      );
      return;
    }
    setLoading(true);

    if (!approved) {
      //Check bet amount and available balance
      //Call async/await approve method of ERC20 token
      await approveBet(betAmount);

      setTimeout(() => {
        setApproved(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold text-gradient">
        Lucky Seven
      </h1>

      <div className="text-center text-white text-2xl text-gradient pt-10">
        Select Bet Option
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
        <div> Select Bet Amount</div>
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
        {!loading
          ? !approved && (
              <div
                className="cursor-pointer px-4 py-2 m-3 flex justify-around items-center flex-col rounded-full my-5 border-2 text-white "
                onClick={() => {
                  handleApprove();
                }}
              >
                Approve the Bet
              </div>
            )
          : !approved && <Loader />}
      </div>

      {trading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center gradient-bg-welcome">
          <div className="w-1/2 h-auto  bg-white rounded-2xl items-center text-center px-3 py-3">
            <Trade />
          </div>
        </div>
      )}

      {approved && <Dice />}
    </>
  );
};

export default BetOption;
