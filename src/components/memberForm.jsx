import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function MemberForm(props) {
  const { memberId } = useParams();

  const defaultAttributes = {
    classe: "Guerreiro",
    nivel: 1,
    xp: 0,
    vida: 100,
    esforco: 100,
    sanidade: 100,
    forca: 10,
    destreza: 10,
    inteligencia: 10,
  };

  const [member, setMember] = useState({ ...defaultAttributes });
  const [guilds, setGuilds] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await requester.get(`/members/${memberId}`);
        setMember({ ...defaultAttributes, ...response.data });
      } catch (error) {
        console.error("Erro ao buscar o membro:", error);
        setStatusMessage("Erro ao carregar a ficha do membro.");
      }
    };

    if (memberId) getMember();
  }, [memberId]);

  useEffect(() => {
    const getGuilds = async () => {
      try {
        const response = await requester.get("/guilds");
        setGuilds(response.data);
      } catch (error) {
        console.error("Erro ao buscar as guildas:", error);
        setStatusMessage("Erro ao carregar guildas.");
      }
    };

    getGuilds();
  }, []);

  const adjustStat = (field, delta, min = 0, max = 100) => {
    setMember((prev) => {
      const value = Math.max(min, Math.min(max, (prev[field] ?? 0) + delta));
      return { ...prev, [field]: value };
    });
  };

  const sanitize = (value, fallback = 0) => {
    const number = Number(value);
    return Number.isNaN(number) ? fallback : number;
  };

  const buildPayload = (base) => ({
    name: base.name?.trim(),
    guildId: base.guildId?.trim(),
    classe: base.classe?.trim() || defaultAttributes.classe,
    nivel: sanitize(base.nivel, defaultAttributes.nivel),
    xp: sanitize(base.xp, defaultAttributes.xp),
    vida: sanitize(base.vida, defaultAttributes.vida),
    esforco: sanitize(base.esforco, defaultAttributes.esforco),
    sanidade: sanitize(base.sanidade, defaultAttributes.sanidade),
    forca: sanitize(base.forca, defaultAttributes.forca),
    destreza: sanitize(base.destreza, defaultAttributes.destreza),
    inteligencia: sanitize(base.inteligencia, defaultAttributes.inteligencia),
  });

  const addMember = async (data) => {
    if (!data.name || !data.guildId) {
      setStatusMessage("Nome e guilda são obrigatórios.");
      return;
    }

    try {
      const response = await requester.post("/members", data);
      setMember({ ...defaultAttributes, ...response?.data });
      props.updateMembers?.(response?.data);
      setStatusMessage("Ficha criada com sucesso.");
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      setStatusMessage("Erro ao criar ficha.");
    }
  };

  const editMember = async (data) => {
    if (!data.name || !data.guildId) {
      setStatusMessage("Nome e guilda são obrigatórios.");
      return;
    }

    try {
      const response = await requester.patch(`/members/${data.id}`, data);
      setMember({ ...defaultAttributes, ...response?.data });
      setStatusMessage("Ficha atualizada com sucesso.");
      props.updateMembers?.(response?.data);
    } catch (error) {
      console.error("Erro ao editar o membro:", error);
      setStatusMessage("Erro ao atualizar ficha.");
    }
  };

  const handleSubmit = memberId ? editMember : addMember;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(buildPayload(member));
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-300 bg-[#1e293b] p-4 rounded-md shadow-sm border border-slate-700">
      <h2 className="text-lg font-semibold text-orange-400">Ficha do Membro</h2>

      <div className="flex flex-col gap-1">
        <label className="text-slate-100">Nome</label>
        <input
          className="bg-slate-800 border border-slate-600 text-slate-100 rounded p-2"
          role="input"
          name="name"
          type="text"
          value={member.name ?? ""}
          onChange={(e) => setMember((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Ex: Selene Nightingale"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-slate-100">Guilda</label>
        <select
          role="select"
          value={member.guildId ?? ""}
          onChange={(e) => setMember((prev) => ({ ...prev, guildId: e.target.value }))}
          className="bg-slate-800 border border-slate-600 text-slate-100 rounded p-2"
          disabled={guilds.length === 0}
        >
          <option value="">{guilds.length === 0 ? "Carregando guildas..." : "-- Escolha uma guilda --"}</option>
          {guilds.map((guild) => (
            <option key={guild.id} value={guild.id}>
              {guild.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label>Classe</label>
        <input
          name="classe"
          type="text"
          value={member.classe ?? defaultAttributes.classe}
          onChange={(e) => setMember((prev) => ({ ...prev, classe: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label>Nível</label>
          <input
            name="nivel"
            type="number"
            min={1}
            value={member.nivel ?? defaultAttributes.nivel}
            onChange={(e) => setMember((prev) => ({ ...prev, nivel: Number(e.target.value) }))}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>XP</label>
          <input
            name="xp"
            type="number"
            min={0}
            value={member.xp ?? defaultAttributes.xp}
            onChange={(e) => setMember((prev) => ({ ...prev, xp: Number(e.target.value) }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm text-slate-200">
        {[
          { key: "forca", label: "Força" },
          { key: "destreza", label: "Destreza" },
          { key: "inteligencia", label: "Inteligência" },
        ].map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-1">
            <label>{label}</label>
            <input
              name={key}
              type="number"
              min={1}
              max={20}
              value={member[key] ?? defaultAttributes[key]}
              onChange={(e) => setMember((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
            />
          </div>
        ))}
      </div>

      <div className="border rounded-md p-3 bg-[#0f172a] text-slate-200">
        <h3 className="font-semibold text-orange-400">Atributos</h3>
        {["vida", "esforco", "sanidade"].map((key) => (
          <div key={key} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span>{key.charAt(0).toUpperCase() + key.slice(1)}: {member[key] ?? defaultAttributes[key]}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-red-200 px-2 rounded"
                  onClick={() => adjustStat(key, -5)}
                >
                  -
                </button>
                <button
                  type="button"
                  className="bg-green-200 px-2 rounded"
                  onClick={() => adjustStat(key, 5)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-3 bg-lime-500"
                style={{ width: `${member[key] ?? defaultAttributes[key]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {statusMessage && <p className="text-sm text-red-500">{statusMessage}</p>}

      <button type="submit" className="w-fit bg-orange-500 text-white px-4 py-2 rounded">
        {memberId ? "Atualizar Ficha" : "Criar Ficha"}
      </button>
    </form>
  );
}
