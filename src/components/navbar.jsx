import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex w-full gap-5 h-[65px] items-center bg-[#111827] p-5">
      <h1 className="text-lg lg:text-xl text-orange-400">RPG Guild</h1>
      <ul className="flex gap-5">
        <li className="text-sm lg:text-md">
          <Link to="/" className="text-slate-100 hover:text-orange-300">Home</Link>
        </li>
        <li className="text-sm lg:text-md ">
          <Link to="/guilds" className="text-slate-100 hover:text-orange-300">Guildas</Link>
        </li>
        <li className="text-sm lg:text-md">
          <Link to="/members" className="text-slate-100 hover:text-orange-300">Membros</Link>
        </li>
        <li className="text-sm lg:text-md">
          <Link to="/Dados" className="text-slate-100 hover:text-orange-300">Dados</Link>
        </li>
      </ul>
    </nav>
  );
}