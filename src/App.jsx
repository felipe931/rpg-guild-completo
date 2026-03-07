import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/navbar";
import { Home } from "./components/home";
import { Guilds } from "./components/guilds";
import { Members } from "./components/members";
import { MemberForm } from "./components/memberForm";
import { GuildForm } from "./components/guildForm";

const App = () => (
  <Router>
    <div className="bg-[#ECEAE0] w-screen h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guilds" element={<Guilds />} />
        <Route path="/members" element={<Members />} />
        <Route path="/guilds/:guildId" element={<GuildForm />} />
        <Route path="/members/:memberId" element={<MemberForm />} />
      </Routes>
    </div>
  </Router>
);

export default App;
