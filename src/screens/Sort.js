import React, { useEffect, useState } from 'react'
import Bar from '../components/Bar.js';
import { CustomButton } from '../components/CustomButton';
import "../assets/style/sort.css"
import { createRandomBarList } from '../helpers/helpers.js';

export const Sort = () => {
  const context = new (window.AudioContext || window.webkitAudioContext)();

  const MIN_BAR_VALUE = 1;
  const MAX_BAR_VALUE = 80;


  const [isSortStarted, setIsSortStarted] = useState(false)
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

  const resetBarList = ({amount}) => {
    setBarList([...createRandomBarList(amount, MIN_BAR_VALUE, MAX_BAR_VALUE)])
  }

  const triggerSort = () => {
    setIsSortStarted(!isSortStarted);
  }

  const sortStep = (arr, i, j) => {
    let newArr = [...arr];

    newArr[i].status = "active";
    newArr[j].status = "active";

    playSound(newArr[i].value * 10);
    playSound(newArr[j].value * 10);

    if(newArr[i].value < newArr[j].value){
      const temp = newArr[i].value;
      newArr[i].value = newArr[j].value;
      newArr[j].value = temp;
      newArr[i].status = "switching";
      newArr[j].status = "switching";
    }

    newArr.forEach(element => {
      if(element !== newArr[i] && element !== newArr[j]) element.status = "pending"
    });

    setBarList([...newArr])
  }

  const sorted = (arr, i) => {
    let newArr = [...arr];

    playSound(newArr[i].value * 10);

    newArr[i].status = "sorted"

    setBarList([...newArr])
  }

  const playSound = (frequency) => {
    // console.log("çal")
    // const oscillator = context.createOscillator();
    // oscillator.type = 'sine'; // You can change the waveform (sine, square, triangle, sawtooth)
    // oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    // const gainNode = context.createGain();
    // gainNode.gain.setValueAtTime(0.5, context.currentTime);
    // gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);

    // oscillator.connect(gainNode);
    // gainNode.connect(context.destination);

    // oscillator.start();
    // oscillator.stop(context.currentTime + 1);
  };

  useEffect(() => {
    let newBars = [...barList];

    const sort = async () => {
      for (let i = 1; i < newBars.length; i++) {
        for (let j = 0; j < i; j++) {
          await new Promise(resolve => {
            setTimeout(() => {
              sortStep(newBars, i, j);
              resolve();
            }, 10);
          })
        }
      }
      sortedArr();
    }

    const sortedArr = async () => {
      for (let i = 0; i < newBars.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            sorted(newBars, i)
            resolve();
          }, 10);
        }) 
      }

      setIsSortStarted(false)
    }

    if(isSortStarted) sort();
  }, [isSortStarted])

  return (
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
          click={() => resetBarList(20)}
        />
      </div>
      <div className="bars">
        {barList.map((bar, index) => 
          <Bar 
            key={index}
            bar={bar}
          />
        )}
      </div>
    </div>
  )
}
