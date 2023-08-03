import React, {useEffect, useState} from 'react';
import LogoIcon from "../ui/icons/LogoIcon.tsx";
import SearchIcon from "../ui/icons/SearchIcon.tsx";
import cl from './Header.module.scss'
import BottomArrowIcon from "../ui/icons/BottomArrowIcon.tsx";
import * as classNames from "classnames";
import RightArrowIcon from "../ui/icons/RightArrowIcon.tsx";
import BurgerMenuIcon from "../ui/icons/BurgerMenuIcon.tsx";
import CrossIcon from "../ui/icons/CrossIcon.tsx";

const NAV_ROUTES = [
  {
    href: '/',
    label: 'Demos',
    subMenuLinks: [
      {href: '/', label: 'Demo sublink 1'},
      {href: '/', label: 'Demo sublink 2'},
      {href: '/', label: 'Demo sublink 3'},
      {href: '/', label: 'Demo sublink 4'},
      {href: '/', label: 'Demo sublink 5'},
    ]
  },
  {
    href: '/',
    label: 'Post',
    subMenuLinks: [
      {href: '/', label: 'Post Header'},
      {href: '/', label: 'Post Layout'},
      {href: '/', label: 'Share Buttons'},
      {href: '/', label: 'Gallery Post'},
      {href: '/', label: 'Video Post'},
    ]
  },
  {
    href: '/',
    label: 'Features',
    subMenuLinks: [
      {href: '/', label: 'Features sublink 1'},
      {href: '/', label: 'Features sublink 2'},
      {href: '/', label: 'Features sublink 3'},
      {href: '/', label: 'Features sublink 4'},
      {href: '/', label: 'Features sublink 5'},
    ]
  },
  {
    href: '/',
    label: 'Categories',
    subMenuLinks: [
      {href: '/', label: 'Categories sublink 1'},
      {href: '/', label: 'Categories sublink 2'},
      {href: '/', label: 'Categories sublink 3'},
    ]
  },
  {
    href: '/',
    label: 'Shop',
    subMenuLinks: [
      {href: '/', label: 'Shop sublink 1'},
      {href: '/', label: 'Shop sublink 2'},
      {href: '/', label: 'Shop sublink 3'},
    ]
  },
  {
    href: '/',
    label: 'Buy Now',
    subMenuLinks: []
  },
]

interface OwnProps {
  query: string
  setQuery : (v: string) => void
}

const Header: React.FC<OwnProps> = ({setQuery, query}) => {

  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false)
  const [isSearchOpen, setSearchIsOpen] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollStatus, setScrollStatus] = useState<string>('')

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
      if (lastScrollY < window.scrollY){
        setScrollStatus('scrollBottom')
      } else if (lastScrollY > window.scrollY){
        setScrollStatus('scrollTop')
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY])

  return (
    <header
      className={
      classNames(
        'sticky top-0 left-0 bg-white flex lg:flex-col flex-row justify-center items-center duration-300 px-5 lg:px-0',
        {'translate-y-[-100%]': lastScrollY > 200},
        {'translate-y-[0]': scrollStatus === 'scrollTop'}

      )
    }
    >
      <div className="container relative lg:justify-center justify-between items-center flex py-7">
        <button
          className='block lg:hidden'
          onClick={() => setIsBurgerActive(true)}
        >
          <BurgerMenuIcon/>
        </button>
        <LogoIcon/>
        <button
          className='lg:absolute relative right-0 top-1/2 lg:translate-y-[-50%]'
          onClick={() => setSearchIsOpen(true)}
        >
          <SearchIcon/>
        </button>
      </div>
      <div className={classNames('z-10 w-screen h-[83px] absolute left-0 top-0 bg-[#E9E9E9] flex items-center justify-center duration-300', {'translate-x-[0]': isSearchOpen}, {'translate-x-[100%]': !isSearchOpen})}>
        <input
          type="text"
          className='p-2 rounded-md mr-2'
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        />
        <button className='font-medium' onClick={() => setSearchIsOpen(false)}>Закрыть</button>
      </div>
      <hr className='w-full hidden lg:block'/>
      <ul className='container lg:flex hidden items-center justify-center gap-8 my-5 '>
        {
          NAV_ROUTES.map(link => {
            if (link.subMenuLinks.length >= 1) {
              return (
                <li className={classNames('relative font-medium', cl.nav__link)} key={NAV_ROUTES.indexOf(link)}>
                  <a href={link.href} className='flex items-center'>
                    <p className='mr-[0.4rem]'>{link.label}</p>
                    <BottomArrowIcon/>
                  </a>
                  <ul className={cl.hovered_menu}>
                    {
                      link.subMenuLinks.map(subLink => {
                        return (
                          <li className='flex flex-col' key={link.subMenuLinks.indexOf(subLink)}>
                            <a href={subLink.href} className='flex items-center justify-between w-full'>
                              <p className={cl.hovered_menu__text}>{subLink.label}</p>
                              <RightArrowIcon/>
                            </a>
                            <hr className='w-full mt-2'/>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            } else {
              return (
                <li className='relative font-medium' key={NAV_ROUTES.indexOf(link)}>
                  <a href={link.href} className='flex items-center'>
                    <p className='mr-[0.4rem]'>{link.label}</p>
                  </a>
                </li>
              )
            }
          })
        }
      </ul>
      <hr className='w-full hidden lg:block'/>

      <div
        className={classNames('fixed left-0 top-0 w-screen bg-white bg-opacity-90 h-screen flex translate-x-0 duration-300 cursor-pointer', {'translate-x-[-100%]': !isBurgerActive}, {'translate-x-0': isBurgerActive} )}
        onClick={() => setIsBurgerActive(false)}
      >
        <div className='w-[320px] bg-white border border-[#E9E9E9] flex flex-col cursor-auto' onClick={(e) => e.stopPropagation()}>
          <div className='flex items-center my-8 mx-5 justify-between'>
            <LogoIcon/>
            <button onClick={(event) => {
              event.stopPropagation()
              setIsBurgerActive(false)
            }}>
              <CrossIcon/>
            </button>
          </div>
          <hr className='w-full'/>
          <ul className='mt-3 mx-5 font-medium'>
            {
              NAV_ROUTES.map(link => {
                if (NAV_ROUTES.indexOf(link) === 0) {
                  return (
                    <li className='mt-5' key={'mobile' + NAV_ROUTES.indexOf(link)}>
                      <a href={link.href} className='mb-5 flex items-center'>
                        <p className='mr-[0.3rem]'>{link.label}</p>
                        <BottomArrowIcon/>
                      </a>
                      <hr/>
                    </li>
                  )
                } else {
                  return (
                    <li className='mt-4' key={'mobile' + NAV_ROUTES.indexOf(link)}>
                      <a href={link.href} className='mb-4 flex items-center'>
                        <p className='mr-[0.3rem]'>{link.label}</p>
                        <BottomArrowIcon/>
                      </a>
                      <hr/>
                    </li>
                  )
                }
              })
            }
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
