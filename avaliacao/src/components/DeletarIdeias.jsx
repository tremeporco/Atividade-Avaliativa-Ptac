import { useState } from 'react'

export default function ExcluirIdeias({ ideias, setIdeias }) {
  const [erro, setErro] = useState(null)

  async function handleExcluir(id) {
    try {
      setErro(null)
      
      const resp = await fetch(`https://jsonplaceholder.typicode.com{id}`, {
        method: 'DELETE',
      })
      
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

      setIdeias(ideiasAtuais => ideiasAtuais.filter(ideia => ideia.id !== id))
      
    } catch (e) {
      setErro(`Erro ao excluir: ${e.message}`)
    }
  }

  if (!ideias || ideias.length === 0) return null

  return (
    <div>
      <h3>Ações de Exclusão:</h3>
      
      <ul>
        {ideias.map((ideia) => (
          <li key={ideia.id}>
            <span>{ideia.title}</span>
            <button onClick={() => handleExcluir(ideia.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {erro && <p>{erro}</p>}
    </div>
  )
}
