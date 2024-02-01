import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { Register } from "./pages/register"
import { Dashboard } from "./pages/dashboard"
import { NewCar } from "./pages/dashboard/new-car"
import { CarDetails } from "./pages/car-details"

import { Layout } from "./components/layout"
import { Private } from "./routes/Private"

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
      element: <Private><Dashboard/></Private>
    },
    {
      path: "/dashboard/new-car",
      element: <Private><NewCar/></Private>
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