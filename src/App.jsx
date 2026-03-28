import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/navbar';
import { Home } from './components/home';
import { Guilds } from './components/guilds';
import { Members } from './components/members';
import { MemberForm } from './components/memberForm';
import { GuildForm } from './components/guildForm';
import React from 'react';
import customizar from './customizar';

const App = () => (
  <Router>
    <div className='bg-[#0d1117] text-slate-100 min-h-screen w-screen'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/guilds' element={<Guilds />} />
        <Route path='/members' element={<Members />} />
        <Route path='/guilds/:guildId' element={<GuildForm />} />
        <Route path='/members/:memberId' element={<MemberForm />} />
      </Routes>

      <h1>Bem-vindo à Guilda</h1>
      <button onClick={customizar}>Customizar Personagem</button>
    </div>
  </Router>
);


/*function App() {
    return (
        <div>
            <h1>Bem-vindo à Guilda</h1>
            <button onClick={customizar}>Customizar Personagem</button>
        </div>
    );
}*/

export default App;
