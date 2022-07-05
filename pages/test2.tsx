import React, { useState } from 'react';

function Test2() {
  let arr: Array<number>;
  let setArr : any;
  [arr, setArr] =  useState([]);
  const addItemToArr = () => {
    const item = Math.random()* 10;
    const arr2 = [
      ...arr
    ];
    arr2.push(item);
    setArr(arr2);
  }
  return (
    <div>
      <h1>Result: { arr.length }</h1>
      <button onClick={addItemToArr}> Add new Item</button>
      
    </div>
  );
}

export default Test2;