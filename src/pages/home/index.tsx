import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [cars, setCars] = useState<CarsProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, orderBy("created", "desc"))

      getDocs(queryRef)
        .then((snapshot) => {
          let listCars = [] as CarsProps[];

          snapshot.forEach(doc => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            })
          })

          setCars(listCars)
        })

    }

    loadCars();

  }, [])

  function handleImageLoad(id: string){
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none"
          placeholder="Digite o nome do carro ..."
        />
        <button
          className="flex justify-center rounded-md bg-red-500 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600"
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-3xl mb-6">
        Carros novos e usados em todos Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        {cars.map(car => (
          <Link key={car.id} to={`/car-details/${car.id}`}>
            <section className="w-full bg-white rounded-lg">
            <div 
              className="w-full h-72 max-h-72 rounded-lg bg-slate-200"
              style={{ display: loadImages.includes(car.id) ? "none" : "block"}}
              >  
            </div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                src={car.images[0].url}
                alt="carro"
                onLoad={ () => handleImageLoad(car.id) }
                style={{ display: loadImages.includes(car.id) ? "block" : "none" }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">Ano {car.year} | {car.km} km</span>
                <strong className="text-black font-medium text-xl">R$ {car.price} </strong>
              </div>
              <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-zinc-700">
                  {car.city}
                </span>
              </div>
            </section>
          </Link>
        ))}

      </main>
    </Container>
  )
}
