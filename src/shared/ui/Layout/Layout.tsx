import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import './Layout.css';


export default function Layout() {
    return <>
        <Header />
        <div className="outlet">
            <Outlet />
        </div>
        <Footer />
    </>
}