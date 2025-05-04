import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div className="navi">
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/customers">CUSTOMER</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/training">TRAINING</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/calendar">CALENDAR</NavLink>
          <NavLink className={({ isActive }) => isActive ? 'navcurrent' : 'nav'} to="/statistics">STATISTICS</NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default App
