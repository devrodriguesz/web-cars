import { useEffect, useState, useContext } from "react"
import { Container } from "../../components/container"
import { Panel } from "../../components/panel"

import { useNavigate } from "react-router-dom"

import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc
} from "firebase/firestore"
import { db, storage } from "../../services/firebaseConnection"
import { ref, deleteObject } from "firebase/storage"
import { AuthContext } from "../../contexts/AuthContext"

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

export function Dashboard() {
  const [cars, setCars] = useState<CarsProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {

    function loadCars() {
      if (!user?.uid) {
        return
      }

      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, where("uid", "==", user.uid))

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

  }, [user])

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

  async function handleDeleteCar(car: CarsProps) {
    const itemCar = car;

    const docRef = doc(db, "cars", itemCar.id)
    await deleteDoc(docRef);

    itemCar.images.map(async (image) => {
      const imagePath = `images/${image.uid}/${image.name}`
      const imageRef = ref(storage, imagePath)

      try {
        await deleteObject(imageRef)
        setCars(cars.filter(car => car.id !== itemCar.id))
      }
      catch (err) {
        console.log(err)
      }
    })

  }


  return (
    <Container>
      <Panel />

      <h1 className="font-medium text-center mt-6 text-3xl mb-6">
        Meus veículos cadastrados
      </h1>

      <div className="w-full flex justify-end mb-3">
        <button
          className="bg-black flex gap-2 items-center justify-center rounded-md border px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:scale-105 transition-all"
          onClick={() => navigate('/dashboard/new-car')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo veículo

        </button>
      </div>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map(car => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
            <button
              onClick={() => handleDeleteCar(car)}
              className="absolute bg-white w-10 h-10 rounded-full flex items-center justify-center drop-shadow top-2 right-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#000" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            <div
              className="w-full h-72 max-h-72 rounded-lg bg-slate-200"
              style={{ display: loadImages.includes(car.id) ? "none" : "block" }}
            >
            </div>
            <img
              className="w-full rounded-lg mb-2 max-h-72"
              src={car.images[0].url}
              alt="carro"
              onLoad={() => handleImageLoad(car.id)}
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
        ))}
      </main>
    </Container>
  )
}