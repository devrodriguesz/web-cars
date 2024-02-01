import { Link } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

export function Panel() {

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className="bg-red-500 rounded-md flex w-full text-left mb-4">
            <nav aria-label="breadcrumb" className="w-full flex justify-end">
                <ol className="flex w-full flex-wrap items-center rounded-md bg-blue-gray-50 bg-opacity-60 py-2 px-4">
                    <li className="flex items-center cursor-pointer font-sans text-sm font-normal leading-normal text-white antialiased transition-colors duration-300 hover:scale-105 transition-all">
                        <Link className="flex items-center opacity-85" to="/">
                            Home
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                        </Link>
                        <span className="mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
                            /
                        </span>
                    </li>

                    <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-white antialiased transition-colors duration-300 hover:scale-105 transition-all">
                        <Link className="opacity-85" to="/dashboard">
                            <span>Dashboard</span>
                        </Link>
                        <span className="pointer-events-none mx-2 select-none font-sans text-sm font-normal leading-normal text-blue-gray-500 antialiased">
                            /
                        </span>
                    </li>
                    <li className="flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-white antialiased transition-colors duration-300 hover:scale-105 transition-all">
                        <Link
                            className="font-medium text-white transition-colors hover:scale-105 transition-all"
                            to="/dashboard/new-car"
                        >
                            Adicionar veículo
                        </Link>
                    </li>
                </ol>
                <span className="w-max flex cursor-pointer items-center font-sans text-sm font-normal leading-normal text-white antialiased transition-colors duration-300 hover:scale-105 transition-all">
                    <Link
                        className="mr-4 w-max font-normal text-white transition-colors hover:scale-105 transition-all"
                        onClick={handleLogout}
                        to="/"
                    >
                        Sair da conta
                    </Link>
                </span>
            </nav>

        </div>
    )
}