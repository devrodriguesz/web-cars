import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Dashboard } from "./pages/dashboard"
import { NewCar } from "./pages/dashboard/new-car"
import { CarDetails } from "./pages/car-details"

import { Layout } from "./components/layout"

const router = createBrowserRouter([{
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/car-details/:id",
      element: <CarDetails />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path: "/dashboard/new-car",
      element: <NewCar />
    }
  ]
},
{
  path: "/login",
  element: <Login />
},
{
  path: "/register",
  element: <Register />
}
])

export { router };