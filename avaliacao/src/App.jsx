import { useState, useEffect } from "react"
import MostraIdeias from "./components/ListarIdeias"
import ExcluirIdeias from "./components/DeletarIdeias"
import UpdateIdeias from "./components/AtualizarIdeias"

export default function App() { 
  const [ideias, setIdeias] = useState([])

  useEffect(() => {
    async function carregar() {
      try {
        // CORREÇÃO DA URL AQUI:
        const resp = await fetch('https://typicode.com')
        const dados = await resp.json()
        setIdeias(dados.slice(0, 3)) // Pega apenas as 3 primeiras ideias
      } catch (e) {
        console.error("Erro ao buscar ideias", e)
      }
    }
    carregar()
  }, [])

  return (
    <> 
      <h1>Banco de ideias</h1>

      <MostraIdeias ideias={ideias} />

      <ExcluirIdeias setIdeias={setIdeias} ideias={ideias} />

      <UpdateIdeias ideias={ideias} setIdeias={setIdeias} />
    </> 
  )
}
