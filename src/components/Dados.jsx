import { useState } from "react";

function Dados({ lados }) {
  const [resultado, setResultado] = useState(null);

  function rolar() {
    const valor = Math.floor(Math.random() * lados) + 1;
    setResultado(valor);
  }

  return (
    <div style={{ margin: "10px" }}>
      <button onClick={rolar}>Rolar D{lados}</button>
      <p>Resultado: {resultado}</p>
    </div>
  );
}

export default Dados;