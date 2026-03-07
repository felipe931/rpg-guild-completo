import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import requester from "../axios";
import { GuildForm } from "./guildForm";

export function Guilds() {
  const navigate = useNavigate();

  const [guilds, setGuilds] = useState([]);

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
      setGuilds(guilds.filter((guild) => guild.id !== id));
    } catch (error) {
      console.error("Erro ao deletar a guilda:", error);
    }
  };

  const updateGuilds = (data) => setGuilds([...guilds, data]);

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-500">
      <h1>Guildas</h1>
      <ul>
        {guilds.map((guild) => (
          <li key={guild.id} className="cursor-pointer flex gap-4 items-center">
            {guild.name}
            <button onClick={() => navigate(guild.id)}>Editar</button>
            <button onClick={() => deleteGuild(guild)}>Excluir</button>
          </li>
        ))}
      </ul>
      <GuildForm updateGuilds={updateGuilds} />
    </div>
  );
}
