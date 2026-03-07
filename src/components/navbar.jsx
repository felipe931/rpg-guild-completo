import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex w-full gap-5 h-[65px] items-center bg-[#E9E0D5] p-5">
      <h1 className="text-lg lg:text-xl text-orange-500">RPG Guild</h1>
      <ul className="flex gap-5">
        <li className="text-sm lg:text-md">
          <Link to="/" className="text-black">Home</Link>
        </li>
        <li className="text-sm lg:text-md ">
          <Link to="/guilds" className="text-black">Guildas</Link>
        </li>
        <li className="text-sm lg:text-md">
          <Link to="/members" className="text-black">Membros</Link>
        </li>
      </ul>
    </nav>
  );
}