import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import requester from "../axios";
import { MemberForm } from "./memberForm";

export function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await requester.get("/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Erro ao buscar os membros:", error);
      }
    };

    getMembers();
  }, []);

  const deleteMember = async ({ id }) => {
    try {
      await requester.delete(`/members/${id}`);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o membro:", error);
    }
  };

  const updateMembers = (data) => {
    const exists = members.some((mb) => mb.id === data.id);
    setMembers((prev) =>
      exists ? prev.map((mb) => (mb.id === data.id ? data : mb)) : [...prev, data]
    );
  };

  const filteredMembers = members.filter((member) =>
    (member.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (member.classe ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-5 text-orange-300 bg-[#111827] rounded-lg shadow-inner">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl text-slate-100">Membros</h1>
        <input
          type="text"
          placeholder="Buscar por nome ou classe"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md p-2 text-slate-100 bg-[#0f172a]"
        />
      </div>

      {filteredMembers.length === 0 ? (
        <p className="text-sm text-slate-300">Nenhum membro encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMembers.map((member) => (
            <article key={member.id} className="border rounded-lg p-3 bg-slate-900 text-slate-100 shadow-sm">
              <h2 className="font-bold text-xl text-orange-400">{member.name}</h2>
              <p className="text-sm">Classe: {member.classe ?? "N/A"}</p>
              <p className="text-sm">Nível: {member.nivel ?? "N/A"} - XP: {member.xp ?? 0}</p>
              <p className="text-sm">Guilda: {member.guildId ?? "Sem guilda"}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button
                  type="button"
                  className="text-xs px-2 py-1 bg-orange-100 rounded"
                  onClick={() => navigate(String(member.id))}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="text-xs px-2 py-1 bg-red-100 rounded"
                  onClick={() => deleteMember(member)}
                >
                  Excluir
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="mt-4">
        <h2 className="text-xl">Nova ficha</h2>
        <MemberForm updateMembers={updateMembers} />
      </section>
    </div>
  );
}
