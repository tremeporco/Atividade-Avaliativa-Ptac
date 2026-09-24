import { useState } from 'react'

export default function UpdateIdeias({ ideias, setIdeias }) {
  const [erro, setErro] = useState(null)
  const [idEditando, setIdEditando] = useState(null)
  const [novoTitulo, setNovoTitulo] = useState('')

  async function handleAtualizar(id) {
    if (!novoTitulo.trim()) return

    try {
      setErro(null)
      
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: novoTitulo })
      })
      
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

      setIdeias(ideiasAtuais => 
        ideiasAtuais.map(ideia => 
          ideia.id === id ? { ...ideia, title: novoTitulo } : Black
        )
      )
      
      setIdEditando(null)
      setNovoTitulo('')
      
    } catch (e) {
      setErro(`Erro ao atualizar: ${e.message}`)
    }
  }

  function iniciarEdicao(ideia) {
    setIdEditando(ideia.id)
    setNovoTitulo(ideia.title)
  }

  if (!ideias || ideias.length === 0) return null

  return (
    <div>
      <h3>Ações de Edição:</h3>
      
      <ul>
        {ideias.map((ideia) => (
          <li key={ideia.id}>
            {idEditando === ideia.id ? (
              <div>
                <input 
                  type="text" 
                  value={novoTitulo} 
                  onChange={(e) => setNovoTitulo(e.target.value)} 
                />
                <button onClick={() => handleAtualizar(ideia.id)}>Salvar</button>
                <button onClick={() => setIdEditando(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <span>{ideia.title}</span>
                <button onClick={() => iniciarEdicao(ideia)}>Editar</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {erro && <p>{erro}</p>}
    </div>
  )
}
