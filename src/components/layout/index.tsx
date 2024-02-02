import { Header } from "../header"
import { Outlet } from "react-router-dom"
import { Footer } from "../../components/footer";


export function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />            
        </>
    )
}