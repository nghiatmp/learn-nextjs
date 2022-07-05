import React, { useEffect, useState } from 'react';
import { GetStaticProps , GetStaticPropsContext } from 'next'

export interface AboutProps {
  data: string,
}

export default function About({ data } : AboutProps) {
  const [name, setName] = useState('chưa set gi ca');
  console.log('render');
  
  useEffect(() => {
    const data = new Promise((resolve, reject) => {
      setTimeout(() => {
        const string : string = 'NGHIALM'
        resolve(string)
      }, 3000);
    });
    data.then((res : any) => setName(res));
    
  }, [name])
  return (
    <div>
      <h1>{data}</h1>
      <h1>{ name }</h1>
    </div>
  );
}

export const getServerSideProps = async () => {
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      const string : string = 'data from serve'
      resolve(string)
    }, 5000);
  });  

  return {
    props: {
      data
    },
  }
}