import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"

const schema = z.object({
  name: z.string().min(1, { message: "O campo nome é obrigatório" }),
  email: z.string().email("Insira um e-mail válido").min(1, { message: "O campo e-mail é obrigatório" }),
  password: z.string().min(6, { message: "O campo senha deve ter pelo menos 6 caracteres" }),
})

type FormData = z.infer<typeof schema>

export function Register() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }

    handleLogout()
  }, [])

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user)=> {
      await updateProfile(user.user, {
        displayName: data.name
      })

      console.log("cadastrado com sucesso")
      navigate('/dashboard', {replace: true})
    })
    .catch((error)=>{
      console.log("Erro ao cadastrar este usuario")
      console.log(error)
    })
    
  }

  return (
    <section className="flex h-screen max-h-screen">

      <div className="w-3/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-bold text-center mt-6 text-3xl mb-6">Criar conta</h1>
        </div>

        <div className="text-center">
          <p className="text-lg font-normal">Preencha seus dados abaixo</p>
        </div>

        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-1 flex flex-col gap-6">
            <p className="-mb-3 font-medium">
              Nome completo
            </p>
            <Input
              placeholder="Digite seu nome completo..."
              type="text"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="mt-4 mb-1 flex flex-col gap-6">
            <p className="-mb-3 font-medium">
              E-mail
            </p>

            <Input
              placeholder="Digite seu e-mail..."
              type="email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mt-4 mb-1 flex flex-col gap-6">
            <p className="-mb-3 font-medium">
              Senha
            </p>
            <Input
              placeholder="Digite sua senha..."
              type="password"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button
            className="mt-5 w-full flex justify-center rounded-md bg-gray-900 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800"
          >
            Cadastrar
          </button>

          <p className="text-center text-blue-gray-500 font-medium mt-4">
            Você já possuí uma conta?
            <Link to="/login" className="text-blue-800 ml-1">Entrar</Link>
          </p>
        </form>
      </div>

    </section>
  )
}