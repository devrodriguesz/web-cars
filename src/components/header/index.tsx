import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from "react-router-dom"

export function Header() {
  const { signed, loadingAuth } = useContext(AuthContext)

  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-3 px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="web-cars-logo" />
          </Link>
        </div>

        {!loadingAuth && signed && (
            <button
              className="flex justify-center rounded-md border border-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all"

            >
              <Link to="/dashboard" className="text-sm font-semibold leading-5 text-black">
                Dashboard
              </Link>
            </button>

        )}

        {!loadingAuth && !signed && (
          <div className="flex lg:flex-1 lg:justify-end">
            <button
              className="flex justify-center rounded-md border border-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all"
              >
              <Link to="/login" className="text-sm font-semibold leading-5 text-black">
                Entrar <span aria-hidden="true">&rarr;</span>
              </Link>
            </button>
          </div>
        )}

      </nav>
    </header>
  )
}