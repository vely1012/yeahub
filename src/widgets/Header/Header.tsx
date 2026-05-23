import { NavLink, type NavLinkRenderProps } from 'react-router-dom'
// import YeahubLogo from '@/assets/icons/yeahub-logo.svg?react';
import { YeahubLogo, YeahubTitleLogo } from '@/shared/ui/Logo/YeahubLogos'
// import YeahubTitleLogo from '@/assets/icons/yeahub-title-logo.svg?react';

import { useState } from 'react'
import BurgerIcon from "@/assets/icons/burger.svg?react"
import MenuArrow from '@/assets/icons/menu-arrow.svg?react'

import './Header.css'

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

    const headerNavLinkClass = ({ isActive }: NavLinkRenderProps) => isActive ? "header__nav-link header__nav-link_active" : "header__nav-link"

    return (
        <header className="header section-with-bg wrapper">
            <nav className='header__nav'>
                <NavLink to="/" className="header__nav-logo">
                    <YeahubLogo width="33px" height="33px" />
                    <YeahubTitleLogo className="header__logo-title" />
                </NavLink>
                <NavLink to="/questions" className={headerNavLinkClass}>
                    <p className='header__nav-text'>База вопросов</p>
                </NavLink>
                {/* <NavLink to="/training" className={headerNavLinkClass}>
                    <p className='header__nav-text'>Тренажёр</p>
                </NavLink> */}
                <a href="#" className="header__nav-link">
                    <p className='header__nav-text'>Тренажёр</p>
                </a>
                {/* <NavLink to="/resources" className={headerNavLinkClass}>
                    <p className='header__nav-text'>Материалы</p>
                </NavLink> */}
                <a href="#" className="header__nav-link">
                    <p className='header__nav-text'>Материалы</p>
                </a>
                <div className={"header__dropdown " + (dropdownOpen ? "header__dropdown_open" : "")}>
                    <a className="header__nav-link header__drop-btn" onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(prev => !prev);
                    }}><p className='header__nav-text header__drop-text'>Подготовка<MenuArrow className='arrow-icon' /></p></a>
                    <div className="header__dropdown-content">
                        <NavLink to="/questions" className={headerNavLinkClass}>
                            <p className='header__nav-text'>База вопросов</p>
                        </NavLink>
                        {/* <NavLink to="/training" className={headerNavLinkClass}>
                            <p className='header__nav-text'>Тренажёр</p>
                        </NavLink> */}
                        <a href="#" className="header__nav-link">
                            <p className='header__nav-text'>Тренажёр</p>
                        </a>
                        {/* <NavLink to="/resources" className={headerNavLinkClass}>
                            <p className='header__nav-text'>Материалы</p>
                        </NavLink> */}
                        <a href="#" className="header__nav-link">
                            <p className='header__nav-text'>Материалы</p>
                        </a>
                    </div>
                </div>
            </nav>
            <div className='header__auth'>
                <button className='header__sign-in secondary-btn'>Вход</button>
                <button className='header__sign-up main-btn'>Регистрация</button>
            </div>

            <div className={"header__auth-dropdown " + (authDropdownOpen ? "header__auth-dropdown_open" : "")}>
                <a className="header__auth-drop-btn" onClick={(e) => {
                    e.preventDefault();
                    setAuthDropdownOpen(prev => !prev)
                }}>
                    <BurgerIcon />
                </a>
                <div className="header__auth-dropdown-content">
                    <a className="header__auth-dropdown-link">as;dlknasddf;lkkn</a>
                </div>
            </div>
        </header>
    )
}

export default Header