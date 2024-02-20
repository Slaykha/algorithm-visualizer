import React, { useEffect, useState } from 'react'
import Bar from '../components/Bar.js';
import { CustomButton } from '../components/CustomButton';
import "../assets/style/sort.css"
import { createRandomBarList } from '../helpers/helpers.js';
import { SortLogic } from '../components/Logic/SortLogic.js';

export const Sort = () => {
  const context = new (window.AudioContext || window.webkitAudioContext)();

  const MIN_BAR_VALUE = 1;
  const MAX_BAR_VALUE = 80;

  const [isSortStarted, setIsSortStarted] = useState(false)
  const [barListLength, setBarListLength] = useState(10);
  const [barList, setBarList] = useState([
    {value: 10, status: "pending"},
    {value: 5, status: "pending"},
    {value: 8, status: "pending"},
    {value: 9, status: "pending"},
    {value: 12, status: "pending"},
    {value: 5, status: "pending"},
    {value: 7, status: "pending"},
    {value: 1, status: "pending"},
  ]);

  const resetBarList = (amount) => {
    setBarList([...createRandomBarList(amount, MIN_BAR_VALUE, MAX_BAR_VALUE)])
  }

  const triggerSort = () => {
    setIsSortStarted(!isSortStarted);
  }

  return (
    <>
      <SortLogic 
        isSortStarted={isSortStarted}
        setIsSortStarted={setIsSortStarted}
        barList={barList}
        setBarList={setBarList}
      />
      <div className="sortContainer">
        <div style={{backgroundColor: "#535C91", display: "flex", gap: "10px"}}>
          <CustomButton 
            text={isSortStarted ? "Stop Sort" : "Start Sort"}
            h={40}
            w={150}
            customColor={isSortStarted ? "#7D0A0A" : "#1B1A55"}
            textColor="#FEFBF6"
            textSize={18}
            click={triggerSort}
          />

          <CustomButton 
            text="New List"
            h={40}
            w={150}
            customColor="#12372A"
            textColor="#FEFBF6"
            textSize={18}
            click={() => resetBarList(barListLength)}
          />

          <div>
            <input 
              type="range"
              min={5}
              max={75}
              value={barListLength}
              onChange={(e) => {
                setBarListLength(e.target.value)
                resetBarList(e.target.value)
              }}
            />
            <span>{barListLength}</span>
          </div>
        </div>
        <div className="bars">
          {barList.map((bar, index) => 
            <Bar 
              key={bar.id}
              bar={bar}
            />
          )}
        </div>
      </div>
    </>
  )
}
