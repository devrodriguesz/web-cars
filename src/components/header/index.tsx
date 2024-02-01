import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"

export function Header() {
  const signed = true;
  const loadingAuth = false;

  return (
    <header className="bg-white">
      <nav className="mx-auto flex items-center justify-between p-3 px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="web-cars-logo" />
          </Link>
        </div>

        {!loadingAuth && signed && (
          <Link to="/dashboard">
            <UserCircleIcon className="h-8 w-8 flex-none text-gray-800 stroke-1" aria-hidden="true" />
          </Link>
        )}

        {!loadingAuth && !signed && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Entrar <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}

      </nav>
    </header>
  )
}