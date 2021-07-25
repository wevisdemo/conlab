import { FunctionComponent, MouseEventHandler, useState } from 'react';
import Button from './button';

type NavigationBarProps = {
  theme: 'black' | 'transparent';
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({ theme }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={`${theme === 'black' ? 'bg-black' : undefined} w-[100%]`}>
      <TopBar
        theme={theme}
        button="menu"
        onClick={() => setShowMenu(true)}
      ></TopBar>
      {showMenu ? <Menu onClick={() => setShowMenu(false)}></Menu> : undefined}
    </div>
  );
};

type TopBarProps = {
  theme: 'black' | 'transparent';
  button: 'menu' | 'close';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const TopBar: FunctionComponent<TopBarProps> = ({
  theme,
  button,
  className,
  onClick,
}) => (
  <div className={`${className} w-[100%] flex justify-between items-start`}>
    <img
      className={theme === 'transparent' ? 'p-[16px]' : 'px-[16px] py-[8px]'}
      src={
        theme === 'transparent'
          ? require('../assets/images/logo-large.png')
          : require('../assets/images/logo-compact.png')
      }
      alt=""
    ></img>
    <button onClick={onClick}>
      <img
        className="my-[26px] mx-[24px]"
        src={
          button === 'close'
            ? require('../assets/images/close.png')
            : theme === 'transparent'
            ? require('../assets/images/menu-on-white.png')
            : require('../assets/images/menu-on-black.png')
        }
        alt=""
        width={button === 'menu' ? 16 : 14}
        height={button === 'menu' ? 12 : 14}
      ></img>
    </button>
  </div>
);

type MenuProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Menu: FunctionComponent<MenuProps> = ({ onClick }) => (
  <div className="bg-black fixed w-[100%] h-[100%] top-0 flex flex-col space-x-[16px]">
    <TopBar theme="black" button="close" onClick={onClick}></TopBar>
    <div className=" "></div>
  </div>
);

export default NavigationBar;
