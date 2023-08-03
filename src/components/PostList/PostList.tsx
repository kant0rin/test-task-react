import React, {useEffect, useState} from 'react';
import axios from "axios";
import {data} from "autoprefixer";

interface IPost {
  title: string,
  text: string,
  tags: string,
  autor: string,
  img: string,
  img_2x: string,
  date: string,
  views: string
}

interface OwnProps {
  query: string,
  setModalActive: (v: boolean) => void
  setCurrentPost: (v: {title: string, text: string, image: string, image2x: string}) => void
}


const PostList: React.FC<OwnProps> = ({query, setCurrentPost, setModalActive}) => {

  const [posts, setPosts] = useState<IPost[]>([])

  const fetchData = async () => {
    const request = await axios.get('https://cloud.codesupply.co/endpoint/react/data.json')
    setPosts(request.data)
  }

  const filteredPosts = posts.filter(value =>
      value.title.toLowerCase().includes(query.toLowerCase()) ||
      value.text.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    fetchData()

  }, [])

  return (
    <div className='container lg:my-[48px] my-0 mb-[20px] flex flex-wrap gap-x-[40px] gap-y-[48px] px-5 lg:px-0 justify-center'>
      {
        filteredPosts.map((post: IPost) => {
          return (
            <div
              key={posts.indexOf(post)}
              className='max-w-[360px] cursor-pointer'
              onClick={() => {
                setModalActive(true)
                setCurrentPost({title: post.title, text: post.text, image: post.img, image2x: post.img_2x})
              }}
            >
              <img src={post.img} alt="post_img" srcSet={`${post.img_2x} 2x`} className='mb-4'/>
              <div className='flex flex-col'>
                <p className='text-[0.85rem] font-semibold text-[#EB0028] mb-4'>{post.tags}</p>
                <h1 className='leading-[30px] text-[1.5rem] font-semibold mb-4'>{post.title}</h1>
                <div className='flex items-center mb-4'>
                  <p className='text-[0.75rem] leading-3 font-medium mr-1'>{post.autor}</p>
                  <div className='w-[4px] h-[4px] rounded-full bg-[#D7D7D7] mr-1'></div>
                  <p className='leading-3 text-[0.75rem] text-[#9B9B9B] mr-1'>{post.date}</p>
                  <div className='w-[4px] h-[4px] rounded-full bg-[#D7D7D7] mr-1'></div>
                  <p className='leading-3 text-[0.75rem] text-[#9B9B9B] mr-1'>{post.views} Views</p>
                </div>
                <p className='text-[0.875rem] leading-5 text-[#929292]'>{post.text}</p>

              </div>
            </div>
          )
        })
      }
    </div>
  );
};

export default PostList;
