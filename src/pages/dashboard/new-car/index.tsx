import { Container } from "../../../components/container"
import { Panel } from "../../../components/panel"
import { useForm } from "react-hook-form"
import { Input } from "../../../components/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

export function NewCar() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data)
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
            <input type="file" accept="image/*" className="cursor-pointer opacity-0"></input>
          </div>
        </button>
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