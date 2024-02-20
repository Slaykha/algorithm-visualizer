export const createRandomBarList = (amount, min, max, status="pending") => {
  const list = [];

  for (let i = 0; i < amount; i++) {
    // {value: 10, status: "pending"},
    const element = {id: i ,value: Math.floor(Math.random() * (max - min) + 1), status: status};
    
    list.push(element);
  }

  console.log(list, amount)
  return list;
}