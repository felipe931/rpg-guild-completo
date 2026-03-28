import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import requester from "../axios";
import { GuildForm } from "./guildForm";

export function Guilds() {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getGuilds = async () => {
      try {
        const response = await requester.get("/guilds");
        setGuilds(response.data);
      } catch (error) {
        console.error("Erro ao buscar as guildas:", error);
      }
    };

    getGuilds();
  }, []);

  const deleteGuild = async ({ id }) => {
    try {
      await requester.delete(`/guilds/${id}`);
      setGuilds((prev) => prev.filter((guild) => guild.id !== id));
    } catch (error) {
      console.error("Erro ao deletar a guilda:", error);
    }
  };

  const updateGuilds = (data) => {
    if (!data || !data.name) return;
    setGuilds((prev) => {
      const exists = prev.some((g) => g.id === data.id);
      return exists ? prev.map((g) => (g.id === data.id ? data : g)) : [...prev, data];
    });
  };

  const filteredGuilds = guilds.filter((guild) =>
    guild.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-300 bg-[#111827] rounded-lg shadow-inner">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl text-slate-100">Guildas</h1>
        <input
          type="text"
          placeholder="Buscar guildas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 text-slate-100 bg-[#0f172a]"
        />
      </div>
      <p className="text-sm text-slate-300">Total: {filteredGuilds.length} / {guilds.length}</p>

      <ul className="flex flex-col gap-2">
        {filteredGuilds.map((guild) => (
          <li key={guild.id} className="border p-3 rounded flex justify-between items-center bg-slate-900 text-slate-100">
            <span>{guild.name}</span>
            <div className="flex gap-2">
              <button onClick={() => navigate(String(guild.id))} className="text-xs bg-orange-700/30 px-2 rounded hover:bg-orange-600">Editar</button>
              <button onClick={() => deleteGuild(guild)} className="text-xs bg-red-700/30 px-2 rounded hover:bg-red-600">Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      <section className="mt-4">
        <h2 className="text-xl">Nova guilda</h2>
        <GuildForm updateGuilds={updateGuilds} />
      </section>
    </div>
  );
}
