import { ChangeEvent, useState, useContext } from "react"
import { Container } from "../../../components/container"
import { Panel } from "../../../components/panel"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthContext } from "../../../contexts/AuthContext"
import { v4 as uuidV4 } from "uuid"

import { storage } from "../../../services/firebaseConnection"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatório"),
  model: z.string().min(1, "O campo modelo é obrigatório"),
  year: z.string().min(1, "O campo ano é obrigatório"),
  km: z.string().min(1, "O campo KM é obrigatório"),
  price: z.string().min(1, "O campo preço é obrigatório"),
  city: z.string().min(1, "O campo cidade é obrigatório"),
  whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
    message: "Número de telefone inválido."
  },),
  description: z.string().min(1, "O campo descrição é obrigatório"),
})

type FormData = z.infer<typeof schema>;

interface ImageItemProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string
}

export function NewCar() {
  const { user } = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const [carImages, setCarImages] = useState<ImageItemProps[]>([])


  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        await handleUpload(image)
      }
      else {
        alert('Envie uma imagem no formato jpeg ou png')
      }
      return;
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl
          }

          setCarImages((images) => [...images, imageItem])

        })
      })

  }

  function onSubmit(data: FormData) {
    console.log(data)
  }

  async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath)

    try{
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car)=> car.url !== item.url))
    }
    catch(err){
      console.log('ERRO AO DELETAR')
    }
  }

  return (
    <Container>
      <Panel />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row gap-2">
        <button className="border-2 w-48 rounded lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer opacity-0"
              onChange={handleFile}
            />
          </div>
        </button>

        {carImages.map(item => (
          <div key={item.name} className="w-full h-32 flex items-center justify-center relative">
            <button 
            className="absolute"
            onClick={() => handleDeleteImage(item)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFF" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>

            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover"
              alt="Foto do carro"
            />
          </div>
        ))}

      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row gap-2 mt-2">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Nome do carro</p>
              <Input
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Ex: Chevrolet Onix"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Modelo do carro</p>
              <Input
                type="text"
                register={register}
                name="model"
                error={errors.model?.message}
                placeholder="Ex: 1.0 manual"
              />
            </div>

          </div>


          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2021/2022"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Km</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 11.000"
              />
            </div>
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 011974473291"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Itatiba"
              />
            </div>
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="mb-3 w-full">
              <p className="mb-2 font-medium">Preço</p>
              <Input
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Ex: 69.000"
              />
            </div>
          </div>
          <textarea
            className="border-2 w-full rounded-md h-24 px-2"
            {...register('description')}
            name="description"
            id="description"
            placeholder="Digite a descrição completa do veículo..."
          />
          {errors.description && <p className="text-red-500 ">{errors.description.message}</p>}

          <button
            type="submit"
            className="w-full rounded-md bg-zinc-900 text-white font-medium h-10"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </Container>
  )
}