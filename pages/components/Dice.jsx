import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import Loader from "./Loader";
import TransactionProvider from "../../context/TransactionContext";
import {
  luckySevenGameAbi,
  luckySevenGameAddress,
  providerUrl
} from "../../utils/constants";

import { useAddress } from "@thirdweb-dev/react";

const Dice = () => {
  const address = useAddress();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [loading, setLoading] = useState(false);
  const [executed, setExecuted] = useState(false);
  const {
    approved,
    setApproved,
    transfer,
    transferFrom,
    updateGameToken,
    selectedOption,
    betAmount
  } = useContext(TransactionProvider);

  const getRandoms = () => {
    let rnd = 0,
      rnd2 = 0,
      rndNew = 0,
      rnd2New = 0;

    while (rndNew === rnd) {
      rndNew = Math.floor(Math.random() * 6 + 1);
    }
    setNum1(rndNew);

    while (rnd2New === rnd2) {
      rnd2New = Math.floor(Math.random() * 6 + 1);
    }
    setNum2(rnd2New);
  };

  const spin = () => {
    let x, y, x2, y2;

    switch (num1) {
      case 1:
        x = 720;
        y = 810;
        break;
      case 6:
        x = 720;
        y = 990;
        break;
      default:
        x = 720 + (6 - num1) * 90;
        y = 900;
        break;
    }

    switch (num2) {
      case 1:
        x2 = 720;
        y2 = 810;
        break;
      case 6:
        x2 = 720;
        y2 = 990;
        break;
      default:
        x2 = 720 + (6 - num2) * 90;
        y2 = 900;
        break;
    }

    document.querySelector(".dice1").style.transform =
      "translateZ(-100px) rotateY(" + x + "deg) rotateX(" + y + "deg)";

    document.querySelector(".dice2").style.transform =
      "translateZ(-100px) rotateY(" + x2 + "deg) rotateX(" + y2 + "deg)";

    setTimeout(() => {
      setExecuted(true);
    }, 1000);
  };

  const rollTheDice = async () => {
    setLoading(true);
    getRandoms();

    let betResult = 0;
    if (num1 + num2 <= 6) {
      betResult = 6;
    } else if (num1 + num2 >= 8) {
      betResult = 8;
    } else {
      betResult = 7;
      if (betResult == selectedOption) setBetAmount(betAmount * 2);
    }

    alert(`${betResult},${selectedOption}`);
    if (betResult == selectedOption) {
      await transfer(ethers.utils.parseEther(betAmount.toString()));
    } else {
      await transferFrom(ethers.utils.parseEther(betAmount.toString()));
    }

    setLoading(false);
    spin();
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-2/3  text-white pt-1 bg-gradient-to-r from-gray-500 to-gray-900 rounded-2xl justify-end text-right">
          {executed ? (
            <button
              onClick={async () => {
                setApproved(false);
                await updateGameToken(address);
              }}
              className="p-1 rounded-sm m-3 bg-red-400 text-{#44253e}"
            >
              X
            </button>
          ) : (
            <div onClick={() => setApproved(false)} className="p-1 m-3 ">
              &nbsp;
            </div>
          )}
          <div className="text-center items-center">
            <div className="flex justify-center gap-20 m-10">
              <div id="dice" className="dice1">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>

              <div id="dice2" className="dice2">
                <div className="side one">
                  <span className="dot"></span>
                </div>
                <div className="side two">
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side three">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
                <div className="side four">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side five">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
                <div className="side six">
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="kolona">
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {!loading && !executed && (
                <button
                  className="cursor-pointer px-3 py-2 m-3 items-center flex-col rounded-full my-5 border-2  "
                  onClick={rollTheDice}
                >
                  Roll the Dice
                </button>
              )}

              {loading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dice;
