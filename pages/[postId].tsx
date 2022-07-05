// import Header from '@/components/commons/Header';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/dist/client/router';

const Header = dynamic(() => import('@/components/commons/Header'), { ssr: false });

export interface PostDetailPageProps {
  post: any;
}

export default function PostDetailPage ({ post }: PostDetailPageProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <div style={{fontSize : '2rem',textAlign:'center' }}>Loading...</div>
  }
  return (
    <div>
      <h1>Post Detail Page</h1>
      <h2>{post.title}</h2>
      <h4>{post.description}</h4>
    </div>
  );
}

export const getStaticPaths : GetStaticPaths = async () => {
  console.log('\n GetStaticPath');
  const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1');  
  const data = await response.json();
  const pathsData = data.data.map((post: any) => ({
    params : {postId: post.id}
  }));
  return {
    paths: pathsData,
    fallback: true,
  }
}

export const getStaticProps : GetStaticProps = async (context: GetStaticPropsContext) => {
  console.log('\n GetStaticProps', context.params?.postId);
  const postId = context.params?.postId;
  if (!postId) {
    return {
      notFound : true
    }
  }
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);  
  const data = await response.json();
  
  return {
    props: {
      post: data
    },
    revalidate: 5
  }
}

 