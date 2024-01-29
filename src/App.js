import { useEffect, useState } from 'react';
import './App.css';
import { Bar } from './components/Bar';

function App() {
  const [bars, setBars] = useState([
    {value: 10, status: "pending"},
    {value: 5, status: "pending"},
    {value: 8, status: "pending"},
    {value: 9, status: "pending"},
    {value: 12, status: "pending"},
    {value: 5, status: "pending"},
    {value: 7, status: "pending"},
    {value: 1, status: "pending"},
  ]);

  useEffect(() => {
    let newBars = [...bars];

    const sort = async () => {
      for (let i = 1; i < newBars.length; i++) {
        for (let j = 0; j < i; j++) {
          await new Promise(resolve => {
            setTimeout(() => {
              sortStep(newBars, i, j);
              resolve();
            }, 100);
          })
        }
      }

      sortedArr()
    }

    const sortedArr = async () => {
      for (let i = 0; i < newBars.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            sorted(newBars, i)
            resolve();
          }, 100);
        }) 
      }
    }

    sort();
  }, [])

  const sortStep = (arr, i, j) => {
    let newArr = [...arr];

    newArr[i].status = "active";
    newArr[j].status = "active";

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

    setBars([...newArr])
  }

  const sorted = (arr, i) => {
    let newArr = [...arr];

    newArr[i].status = "sorted"

    setBars([...newArr])
  }

  return (
    <div className="App">
      {bars.map((bar, index) => 
        <Bar 
          key={index}
          bar={bar}
          // status={bar.status}
        />
      )}
    </div>
  );
}

export default App;
