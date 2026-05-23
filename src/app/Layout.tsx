import { Outlet } from "react-router-dom"
import Footer from "../widgets/Footer/Footer"
import Header from "../widgets/Header/Header"

export default function Layout() {
    return <>
        <Header />
        <div className="outlet">
            <Outlet />
        </div>
        <Footer />
    </>
}