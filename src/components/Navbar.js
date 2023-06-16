import { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navbarItemHorizontalPadding = 3;
  const navItemVerticalPadding = 2;

  let [isRespoNavbarActive, setRespoNavbarStatus] = useState(false);

  let activeClassnames = classNames({
    "text-primary": true,
    underline: true,
  });

  const [activeLink, setActiveLink] = useState("home");

  const handleClick = (e) => {
    setActiveLink(e.target.id);
  };

  return (
    <div
      className="bg-primarybg sticky top-0 drop-shadow-md"
      style={{ zIndex: 10 }}
    >
      <nav className="flex md:flex-row flex-col py-4 md:py-4 mx-auto justify-between items-center">
        <div className="container mx-auto flex justify-between">
          <div className="flex justify-between w-full md:w-fit items-center">
            <a href="/">
              <img className="w-24" src="/skip_logo.svg" />
            </a>
            <img
              onClick={() => setRespoNavbarStatus(!isRespoNavbarActive)}
              className={`${
                !isRespoNavbarActive ? "block" : "hidden"
              } h-8 md:hidden`}
              src="./menu_icon.svg"
            />
            <img
              onClick={() => setRespoNavbarStatus(!isRespoNavbarActive)}
              className={`${
                isRespoNavbarActive ? "block" : "hidden"
              } h-8 md:hidden`}
              src="./x_black.svg"
            />
          </div>
          <ul className="font-mtavruli items-center text-white md:flex hidden">
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding} ${
                activeLink === "home" ? "text-secondary underline" : ""
              }`}
            >
              <NavLink to="/" id="home" onClick={handleClick}>
                მთავარი
              </NavLink>
            </li>
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding} ${
                activeLink === "catalog" ? "text-secondary underline" : ""
              }`}
            >
              <NavLink to="/catalog" id="catalog" onClick={handleClick}>
                კატალოგი
              </NavLink>
            </li>
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding}`}
            >
              <a href="#">ჩვენს შესახებ</a>
            </li>
            {/* <li className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding}`}>
                        <button><img className="w-6" src="/ri_moon-fill.png" /></button>
                    </li> */}
            {/* <li className={`px-${navbarItemHorizontalPadding} pr-0 py-${navItemVerticalPadding}`}>
                        <button className="flex items-center">
                            ქარ
                            <img className="w-3 ml-1" src="/arrow-down-black.png" />
                        </button>
                    </li> */}
          </ul>
          <ul
            className={`font-mtavruli relative ${
              isRespoNavbarActive ? "h-48" : "h-0 hidden"
            } transition-height bg-white items-center text-secondary md:hidden flex bg-white flex-col py-4`}
          >
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding} ${
                activeLink === "home" ? "text-secondary underline" : ""
              }`}
            >
              <NavLink to="/" id="home" onClick={handleClick}>
                მთავარი
              </NavLink>
            </li>
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding} ${
                activeLink === "catalog" ? "text-secondary underline" : ""
              }`}
            >
              <NavLink to="/catalog" id="catalog" onClick={handleClick}>
                კატალოგი
              </NavLink>
            </li>
            <li
              className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding}`}
            >
              <a href="#">ჩვენს შესახებ</a>
            </li>
            {/* <li className={`px-${navbarItemHorizontalPadding} py-${navItemVerticalPadding}`}>
                        <button><img className="w-6" src="/ri_moon-fill.png" /></button>
                    </li> */}
            {/* <li className={`px-${navbarItemHorizontalPadding} pr-0 py-${navItemVerticalPadding}`}>
                        <button className="flex items-center">
                            ქარ
                            <img className="w-3 ml-1" src="/arrow-down-black.png" />
                        </button>
                    </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
