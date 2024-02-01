import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"

const schema = z.object({
  email: z.string().email("Insira um e-mail válido").min(1, {message: "O campo e-mail é obrigatório"}),
  password: z.string().min(1, {message: 'O campo senha é obrigatório'}),
})

type FormData = z.infer<typeof schema>

export function Login() {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }

    handleLogout()
  }, [])

  function onSubmit(data: FormData){
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((user)=>{
      console.log("LOGADO COM SUCESSO")
      console.log(user)
      navigate("/dashboard", {replace: true})

    })
    .catch(err => {
      console.log("ERRO AO LOGAR")
      console.log(err)
    })
  }


  return (
    <section className="h-screen max-h-screen flex">

      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <h1 className="font-bold text-center mt-6 text-3xl mb-6">
            Entrar
          </h1>
          <p className="text-lg font-normal">Digite seus dados nos campos abaixo.</p>
        </div>

        <form 
        className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-5 flex flex-col gap-5">
            <p className="-mb-3 font-medium">
              Seu e-mail
            </p>
            <Input
              placeholder="Digite seu e-mail..."
              type="email"
              name="email"
              error={errors.email?.message}
              register={register}
            />

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
          className="mt-5. w-full flex justify-center rounded-md bg-gray-900 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800">
            Entrar
          </button>

          <div className="space-y-4 mt-8">
            <button className="w-full p-3 flex items-center gap-2 justify-center shadow-md">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Entrar com Google</span>
            </button>
          </div>
          <p className="text-center text-blue-gray-500 font-medium mt-4">
            Não possui uma conta?
            <Link to="/register" className="text-blue-800 ml-1">Criar conta</Link>
          </p>
        </form>
      </div>

      <div className="w-3/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover"
        />
      </div>

    </section>
  )
}