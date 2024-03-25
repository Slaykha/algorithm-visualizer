import { useEffect } from "react";

export const SortLogic = ({isSortStarted, setIsSortStarted, barList, setBarList}) => {
  const sortStep = (arr, i, j) => {
    let newArr = arr;

    newArr[i].status = "active";
    newArr[j].status = "active";

    // playSound(newArr[i].value * 10);
    // playSound(newArr[j].value * 10);

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

    // playSound(newArr[i].value * 10);

    newArr[i].status = "sorted"

    setBarList([...newArr])
  }

  // const playSound = (frequency) => {
  //   console.log("çal")
  //   const oscillator = context.createOscillator();
  //   oscillator.type = 'sine'; // You can change the waveform (sine, square, triangle, sawtooth)
  //   oscillator.frequency.setValueAtTime(frequency, context.currentTime);

  //   const gainNode = context.createGain();
  //   gainNode.gain.setValueAtTime(0.5, context.currentTime);
  //   gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 1);

  //   oscillator.connect(gainNode);
  //   gainNode.connect(context.destination);

  //   oscillator.start();
  //   oscillator.stop(context.currentTime + 1);
  // };

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
}
