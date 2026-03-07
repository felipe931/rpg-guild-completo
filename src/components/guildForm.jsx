import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function GuildForm(props) {
  const { guildId } = useParams();

  const [guild, setGuild] = useState();

  useEffect(() => {
    const getGuild = async () => {
      try {
        const response = await requester.get(`/guilds/${guildId}`);
        setGuild(response.data);
      } catch (error) {
        console.error("Erro ao buscar a guilda:", error);
      }
    };

    if (guildId) getGuild();
  }, [guildId]);

  const addGuild = async (guild) => {
    const { name } = guild;

    const created = { name };

    try {
      const response = await requester.post("/guilds", created);
      props.updateGuilds?.(response.data);
    } catch (error) {
      console.error("Erro ao adicionar a guilda:", error);
    }
  };

  const editGuild = async (guild) => {
    const { id, name } = guild;

    const updated = {
      name,
    };

    try {
      const response = await requester.patch(`/guilds/${id}`, updated);
      setGuild(response.data);
    } catch (error) {
      console.error("Erro ao editar a guilda:", error);
    }
  };

  const handleSubmit = guildId ? editGuild : addGuild;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(guild);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-500">
      <div className="flex flex-col gap-1">
        <label>Guilda</label>
        <input
          name="name"
          type="text"
          defaultValue={guild?.name}
          onChange={(e) =>
            setGuild((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <button type="submit" className="w-fit">Confirmar</button>
    </form>
  );
}
