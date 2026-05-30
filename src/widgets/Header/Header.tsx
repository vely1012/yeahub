import { NavLink, type NavLinkRenderProps } from 'react-router-dom'
import { useState } from 'react'
import { YeahubLogo, YeahubTitleLogo } from '@/shared/ui/Logo/YeahubLogos'

import BurgerIcon from "@/assets/icons/burger.svg?react"
import MenuArrow from '@/assets/icons/menu-arrow.svg?react'
import LoginIcon from '@/assets/icons/login-icon.svg?react'

import './Header.css'
import { useClickOutside } from '@/shared/lib/useClickOutside'

function Header() {
    const dropdownRef = useClickOutside<HTMLDivElement>(() => { setDropdownOpen(false) })
    const authDropdownRef = useClickOutside<HTMLDivElement>(() => { setAuthDropdownOpen(false) })
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
                <a href="#" className="header__nav-link">
                    <p className='header__nav-text'>Тренажёр</p>
                </a>
                <a href="#" className="header__nav-link">
                    <p className='header__nav-text'>Материалы</p>
                </a>
                <div className={"header__dropdown " + (dropdownOpen ? "header__dropdown_open" : "")} ref={dropdownRef}>
                    <a className="header__nav-link header__drop-btn" onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(prev => !prev);
                    }}><p className='header__nav-text header__drop-text'>Подготовка<MenuArrow className='arrow-icon' /></p></a>
                    <div className="header__dropdown-content">
                        <NavLink to="/questions" className={headerNavLinkClass}>
                            <p className='header__nav-text'>База вопросов</p>
                        </NavLink>
                        <a href="#" className="header__nav-link">
                            <p className='header__nav-text'>Тренажёр</p>
                        </a>
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

            <div className={"header__auth-dropdown " + (authDropdownOpen ? "header__auth-dropdown_open" : "")} ref={authDropdownRef}>
                <a className="header__auth-drop-btn" onClick={(e) => {
                    e.preventDefault();
                    setAuthDropdownOpen(prev => !prev)
                }}>
                    <BurgerIcon />
                </a>
                <div className="header__auth-dropdown-content">
                    <a href="#" className='header__nav-link'>
                        <p className="header__nav-text" style={{ display: "flex", alignItems: "center", gap: "10px" }}><LoginIcon className="header__nav-text" />Войти</p>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Header