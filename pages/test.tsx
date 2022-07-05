// import Header from '@/components/commons/Header';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link  from 'next/link'

const Header = dynamic(() => import('@/components/commons/Header'), { ssr: false });

export interface TestProps {
  posts: any;
}

export default function Test ({ posts }: TestProps) {
  return (
    <div>
      <h1>Test</h1>
      <Header />
      <ul>
          {
            posts.map((post: any) => (
              <li key={post.id}>
                <Link href={`/${post.id}`} >
                  <a>{post.title}</a>
                </Link>
              </li>
            ))
          }
      </ul>
    </div>
  );
}


export const getStaticProps : GetStaticProps = async (context: GetStaticPropsContext) => {
  // console.log(context);
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');  
  const data = await response.json();
  // console.log(data);
  
  return {
    props: {
      posts: data.data
    },
    revalidate: 5
  }
}

