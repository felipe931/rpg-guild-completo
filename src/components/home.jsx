export function Home() {
  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1 className="text-3xl">Bem-vindo ao RPG Guild</h1>
      <p className="max-w-xl text-black">
        Use as abas para gerenciar guildas e cadastrar fichas de membros. Atualize atributos de vida, esforço e sanidade diretamente na ficha.
      </p>
      <ul className="list-disc pl-5 text-black">
        <li>Criação e edição de guildas e membros</li>
        <li>Busca rápida por nome/classe e guilda</li>
        <li>Interface de ficha com atributos e status</li>
      </ul>
    </div>
  );
}
