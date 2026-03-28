import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function GuildForm(props) {
  const { guildId } = useParams();

  const [guild, setGuild] = useState({ name: "" });
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    const name = guild?.name?.trim();
    if (!name) {
      setStatusMessage("Nome de guilda obrigatório");
      return;
    }

    const created = { name };

    setLoading(true);
    try {
      const response = await requester.post("/guilds", created);
      const newGuild = response?.data?.id ? response.data : { ...created, id: `${Date.now()}` };
      props.updateGuilds?.(newGuild);
      setGuild({ name: "" });
      setStatusMessage("Guilda criada com sucesso.");
    } catch (error) {
      console.error("Erro ao adicionar a guilda:", error);
      const errorMsg = error?.response?.data || error?.message || "Erro ao criar guilda";
      setStatusMessage(`Erro ao criar guilda: ${errorMsg}. Verifique se o backend está ativo (npm run server).`);
    } finally {
      setLoading(false);
    }
  };

  const editGuild = async (guild) => {
    const { id } = guild;
    const name = guild?.name?.trim();

    if (!name) {
      setStatusMessage("Nome de guilda obrigatório");
      return;
    }

    const updated = { name };

    setLoading(true);
    try {
      const response = await requester.patch(`/guilds/${id}`, updated);
      setGuild(response.data);
      props.updateGuilds?.(response.data);
      setStatusMessage("Guilda atualizada com sucesso.");
    } catch (error) {
      console.error("Erro ao editar a guilda:", error);
      const errorMsg = error?.response?.data || error?.message || "Erro ao atualizar guilda";
      setStatusMessage(`Erro ao atualizar guilda: ${errorMsg}. Verifique se o backend está ativo (npm run server).`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = guildId ? editGuild : addGuild;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(guild);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-300 bg-[#1e293b] p-4 rounded-md shadow-sm border border-slate-700">
      {statusMessage && <p className="text-sm text-slate-200">{statusMessage}</p>}
      <div className="flex flex-col gap-1">
        <label className="text-slate-100">Guilda</label>
        <input
          className="bg-slate-800 border border-slate-600 text-slate-100 rounded p-2"
          name="name"
          type="text"
          value={guild?.name ?? ""}
          onChange={(e) =>
            setGuild((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <button
        type="submit"
        className="w-fit bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-400 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Aguarde..." : guildId ? "Atualizar" : "Criar"}
      </button>
    </form>
  );
}
