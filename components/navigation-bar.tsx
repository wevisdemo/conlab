import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import topics from '../data/topics';

type NavigationBarProps = {
  theme: 'black' | 'transparent';
  className?: string;
  showMenu?: boolean;
  menuToggleHandler?: (button: 'menu' | 'close') => void;
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  theme,
  className,
  showMenu: overrideShowMenu,
  menuToggleHandler,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={`${className} ${
        theme === 'black' ? 'bg-black' : undefined
      } w-full`}
    >
      <TopBar
        theme={theme}
        button="menu"
        onClick={() =>
          menuToggleHandler ? menuToggleHandler('menu') : setShowMenu(true)
        }
      ></TopBar>
      {overrideShowMenu === true ||
      (overrideShowMenu === undefined && showMenu) ? (
        <Menu
          onClick={() =>
            menuToggleHandler ? menuToggleHandler('close') : setShowMenu(false)
          }
        ></Menu>
      ) : undefined}
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
  <div className={`${className} w-full flex justify-between items-start`}>
    <Link href="/" passHref>
      <img
        className={`${
          theme === 'transparent' ? 'p-4 h-[112px]' : 'px-4 py-2 h-[60px]'
        } cursor-pointer`}
        src={require('../assets/images/logo-main.png')}
        alt=""
      ></img>
    </Link>
    <button onClick={onClick}>
      <img
        className="my-6 mx-6"
        src={
          button === 'close'
            ? require('../assets/images/close.svg')
            : theme === 'transparent'
            ? require('../assets/images/menu-on-white.svg')
            : require('../assets/images/menu-on-black.svg')
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

const Menu: FunctionComponent<MenuProps> = ({ onClick }) => {
  const { asPath } = useRouter();
  return (
    <div className="bg-black z-50 fixed w-full h-full top-0 flex flex-col">
      <TopBar theme="black" button="close" onClick={onClick}></TopBar>
      <div className="flex flex-col space-y-4 p-4 overflow-y-scroll items-center">
        <Link href="/" passHref>
          <MenuItem
            topicNumber={0}
            subtitle="หน้าหลัก"
            title="รัฐธรรมนูญในฝันออกแบบได้"
            active={asPath === '/'}
          ></MenuItem>
        </Link>
        {topics.map((t) => (
          <Link href={`/topics/${t.topicNumber}`} passHref key={t.topicNumber}>
            <MenuItem
              topicNumber={t.topicNumber}
              subtitle={`เรื่องที่ ${t.topicNumber}: ${t.shortTitle}`}
              title={t.title}
              active={asPath.includes(`/topics/${t.topicNumber}`)}
            ></MenuItem>
          </Link>
        ))}
      </div>
    </div>
  );
};

interface MenuItemProps {
  topicNumber: number;
  title: string;
  subtitle: string;
  active: boolean;
  href?: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = React.forwardRef(
  ({ topicNumber, title, subtitle, active, href }, ref) => (
    <a className="max-w-[544px] w-full" href={href}>
      <div
        className={`flex px-2 py-5 items-center space-x-4 ${
          active
            ? 'text-black border-blue-300 bg-blue-300'
            : 'text-white border-gray-500 bg-black'
        } border-4  rounded-[12px]`}
      >
        <div className="text-large-1 min-w-[60px] text-center">
          {topicNumber}
        </div>
        <div>
          <div className="text-small-1">{subtitle}</div>
          <div className="text-headline-2">{title}</div>
        </div>
      </div>
    </a>
  )
);

export default NavigationBar;
