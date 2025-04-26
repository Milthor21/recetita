import { Outlet } from "react-router";
import Footer from "../components/Footer";

export default function LayoutApp() {

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 text-center">
                <h1 className="text-2xl font-bold">Recetitas</h1>
                <nav className="mt-2">
                    <a href="/" className="text-white mx-2">Inicio</a>
                    <a href="/favorites" className="text-white mx-2">Favoritos</a>
                </nav>
            </header>
            <main className="flex-grow p-4">
                <Outlet />
            </main>
            <Footer/>   
        </div>
    )
}