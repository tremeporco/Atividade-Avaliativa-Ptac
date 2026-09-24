// Arquivo: src/components/ListarIdeias.jsx
export default function MostraIdeias({ ideias }) { 
  return (
    <ul>
      {ideias.map(u => (
        <li key={u.id}>{u.title}</li>
      ))}
    </ul>
  )
}
