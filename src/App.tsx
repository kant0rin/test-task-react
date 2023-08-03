import React, {useState} from 'react';
import Header from "./components/Header/Header.tsx";
import PostList from "./components/PostList/PostList.tsx";
import Modal from './components/Modal/Modal.tsx';

function App() {

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [currentPost, setCurrentPost] = useState({title: '', text: '', image: '', image2x: ''})
  const [isModalActive, setIsModalActive] = useState<boolean>(false)


  return (
    <>
      <Header setQuery={setSearchQuery} query={searchQuery}/>
      <Modal setCurrentPost={setCurrentPost} currentPost={currentPost} setIsActive={setIsModalActive} isActive={isModalActive}/>
      <PostList query={searchQuery} setCurrentPost={setCurrentPost} setModalActive={setIsModalActive}/>
    </>
  )
}

export default App
