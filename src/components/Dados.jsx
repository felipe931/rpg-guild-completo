import { useState } from "react";

function Dados() {
  const [resultado, setResultado] = useState(null);
  const [dado, setDado] = useState("");

  function rolar() {
    const lados = Number(dado);
    
    if (!lados || lados <= 0) {
      alert("Digite um número válido de lados!");
      return;
    }

    const valor = Math.floor(Math.random() * lados) + 1;
    setResultado(valor);
  }

  return (
    <div style={{ margin: "10px" }}>
        <input
        className="bg-slate-800 border border-slate-600 text-slate-100 rounded p-2"
        type="text"
        value={dado}
        onChange={(e) => setDado(e.target.value)}
      />
      <button onClick={rolar}>Rolar D{dado || "?"}</button>
      <p>Resultado: {resultado}</p>
      <p>Dado: {dado}</p>
    </div>
  );
}


export default Dados;