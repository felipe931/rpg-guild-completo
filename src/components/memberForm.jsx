import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import requester from "../axios";

export function MemberForm(props) {
  const { memberId } = useParams();

  const [member, setMember] = useState();

  useEffect(() => {
    const getMember = async () => {
      try {
        const response = await requester.get(`/members/${memberId}`);
        setMember(response.data);
      } catch (error) {
        console.error("Erro ao buscar o membro:", error);
      }
    };

    if (memberId) getMember();
  }, [memberId]);

  const addMember = async ({ name, guildId }) => {
    const created = {
      name,
      guildId,
    };

    try {
      const response = await requester.post("/members", created);
      setMember(response?.data);
      props.updateMembers?.(response?.data);
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
    }
  };

  const editMember = async ({ id, name, guildId }) => {
    const updated = {
      name,
      guildId,
    };

    try {
      const response = await requester.patch(`/members/${id}`, updated);
      setMember(response?.data);
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
          value={member?.guildId ?? 0}
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
      <button type="submit" className="w-fit">
        Confirmar
      </button>
    </form>
  );
}
