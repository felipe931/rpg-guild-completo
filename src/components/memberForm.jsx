import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function MemberForm(props) {
  const { memberId } = useParams();

  const [member, setMember] = useState();

  const defaultAttributes = {
    vida: 100,
    esforco: 100,
    sanidade: 100,
  };

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await requester.get(`/members/${memberId}`);
        setMember({ ...defaultAttributes, ...response.data });
      } catch (error) {
        console.error("Erro ao buscar o membro:", error);
      }
    };

    if (memberId) getMember();
  }, [memberId]);

  const addMember = async ({ name, guildId, vida, esforco, sanidade }) => {
    const created = {
      name,
      guildId,
      vida: vida ?? defaultAttributes.vida,
      esforco: esforco ?? defaultAttributes.esforco,
      sanidade: sanidade ?? defaultAttributes.sanidade,
    };

    try {
      const response = await requester.post("/members", created);
      setMember({ ...defaultAttributes, ...response?.data });
      props.updateMembers?.(response?.data);
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
    }
  };

  const editMember = async ({ id, name, guildId, vida, esforco, sanidade }) => {
    const updated = {
      name,
      guildId,
      vida: vida ?? defaultAttributes.vida,
      esforco: esforco ?? defaultAttributes.esforco,
      sanidade: sanidade ?? defaultAttributes.sanidade,
    };

    try {
      const response = await requester.patch(`/members/${id}`, updated);
      setMember({ ...defaultAttributes, ...response?.data });
    } catch (error) {
      console.error("Erro ao editar o membro:", error);
    }
  };

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

  const adjustStat = (field, delta) => {
    setMember((prev) => {
      const value = Math.max(0, Math.min(100, (prev[field] ?? 0) + delta));
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = memberId ? editMember : addMember;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(member);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 text-orange-500">
      <div className="flex flex-col gap-1">
        <label>Membro</label>
        <input
          role="input"
          name="name"
          type="text"
          defaultValue={member?.name}
          onChange={(e) =>
            setMember((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>Guilda</label>
        <select
          role="select"
          value={member?.guildId ?? ""}
          name="guild"
          placeholder="Guilda"
          onChange={(e) =>
            setMember((prev) => ({ ...prev, guildId: e.target.value }))
          }
        >
          <option value="" />
          {guilds.map((guild) => (
            <option key={guild.id} value={guild.id}>
              {guild.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border rounded-md p-3 bg-white text-black">
        <h2 className="font-semibold text-orange-500">Atributos</h2>
        {[
          { key: "vida", label: "Vida" },
          { key: "esforco", label: "Esforço" },
          { key: "sanidade", label: "Sanidade" },
        ].map(({ key, label }) => (
          <div key={key} className="mb-3">
            <div className="flex justify-between items-center mb-1">
              <span>{label}: {member?.[key] ?? 0}</span>
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
                style={{ width: `${member?.[key] ?? 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="submit" className="w-fit">
        Confirmar
      </button>
    </form>
  );
}
