import React from 'react';
import classNames from 'classnames';
import CrossIcon from "../ui/icons/CrossIcon.tsx";

interface OwnProps{
  isActive: boolean,
  setIsActive: (v: boolean) => void
  currentPost: {title: string, text: string, image: string, image2x: string}
  setCurrentPost: (v:{title: string, text: string, image: string, image2x: string} ) => void
}
const Modal: React.FC<OwnProps> = ({isActive, setIsActive, currentPost, setCurrentPost}) => {
  return (
    <div
      className={classNames(
        'w-screen h-screen fixed bg-gray-200 left-0 top-0 bg-opacity-80 cursor-pointer',
        {'flex items-center justify-center': isActive},
        {'hidden': !isActive}
      )
    }
      onClick={() => {
        setIsActive(false)
        setCurrentPost({title: '', text: '', image: '', image2x: ''})
      }}
    >
      <div className='bg-white rounded-md p-5 flex flex-col items-center gap-4 max-w-[800px] cursor-auto relative' onClick={(e) => e.stopPropagation()}>
        <button onClick={() => {
          setIsActive(false)
          setCurrentPost({title: '', text: '', image: '', image2x: ''})
        }}><CrossIcon/></button>
        <img src={currentPost.image} srcSet={`${currentPost.image2x} 2x`} alt="post_image"/>
        <h1 className='leading-[30px] text-[1.5rem] font-semibold mb-4'>{currentPost.title}</h1>
        <p className='text-[1rem] leading-5 text-[#929292]'>{currentPost.text}</p>
      </div>
    </div>
  );
};

export default Modal;
