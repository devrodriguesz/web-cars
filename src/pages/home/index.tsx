import { Container } from "../../components/container";

export function Home() {
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
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-62 hover:scale-105 transition-all"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202401/20240125/honda-civic-2.0-16v-flexone-ex-4p-cvt-wmimagem16330843376.jpg?s=fill&w=552&h=414&q=60"
            alt="carro"
          />
          <p className="font-bold mt-1 mb-2 px-2">Honda Civic</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2016/2016 | 23.000 km</span>
            <strong className="text-black font-medium text-xl">R$ 190.000</strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">
              Campo Grande - MS
            </span>
          </div>

        </section>
      </main>
    </Container>
  )
}
