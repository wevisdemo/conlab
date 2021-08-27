import React, { FunctionComponent, MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import topics from '../data/topics';

type NavigationBarProps = {
  theme: 'black' | 'transparent';
  className?: string;
  showMenu?: boolean;
  hideLogo?: boolean;
  fixHamburger?: boolean;
  menuToggleHandler?: (button: 'menu' | 'close') => void;
};

const NavigationBar: FunctionComponent<NavigationBarProps> = ({
  theme,
  className,
  showMenu: overrideShowMenu,
  hideLogo,
  fixHamburger,
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
        button="menu"
        onClick={() =>
          menuToggleHandler ? menuToggleHandler('menu') : setShowMenu(true)
        }
        hideLogo={hideLogo}
        fixHamburger={fixHamburger}
      />
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
  button: 'menu' | 'close';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  hideLogo?: boolean;
  className?: string;
  fixHamburger?: boolean;
};

const TopBar: FunctionComponent<TopBarProps> = ({
  button,
  className,
  hideLogo,
  onClick,
  fixHamburger,
}) => (
  <div
    className={`${className} w-full flex items-start ${
      hideLogo ? 'justify-end' : 'justify-between'
    }`}
  >
    {!hideLogo && (
      <Link href="/" passHref>
        <img
          className="px-4 py-2 h-[60px] cursor-pointer"
          src={require('../assets/images/logo-main.png')}
          alt="CONstitution LAB"
        />
      </Link>
    )}
    <button
      onClick={onClick}
      className={`rounded-full bg-black w-10 h-10 flex justify-center items-center ${
        fixHamburger ? 'fixed top-2 right-2 z-50' : 'm-2'
      }`}
    >
      <img
        className={button === 'menu' ? 'w-4' : 'w-3'}
        src={
          button === 'close'
            ? require('../assets/images/close.svg')
            : require('../assets/images/menu-on-black.svg')
        }
        alt={button === 'close' ? 'Close' : 'Menu'}
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
      <TopBar button="close" onClick={onClick} />
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
