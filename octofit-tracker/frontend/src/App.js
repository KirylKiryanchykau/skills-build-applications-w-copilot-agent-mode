import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const navLinkClassName = ({ isActive }) =>
    `nav-link px-3 py-2 rounded-pill${isActive ? ' active bg-primary text-white' : ' text-dark'}`;

  const logoSrc = `${process.env.PUBLIC_URL}/octofitapp-small.png`;

  return (
    <div className="app-shell py-4 py-md-5">
      <div className="container">
        <header className="card border-0 shadow-sm app-hero mb-4">
          <div className="card-body p-4 p-md-5 text-start">
            <div className="hero-brand mb-3">
              <img src={logoSrc} alt="OctoFit Tracker logo" className="hero-logo" />
              <h1 className="display-5 fw-bold mb-0">OctoFit Tracker</h1>
            </div>
            <p className="lead mb-0">
              Track activities, teams, workouts, and rankings with a clean dashboard view.
            </p>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg rounded-4 app-nav mb-4 px-3 py-2" aria-label="Main navigation">
          <span className="navbar-brand fw-semibold app-brand-wrap">
            <img src={logoSrc} alt="OctoFit" className="nav-logo" />
            <span>Dashboard</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="main-nav">
            <div className="navbar-nav gap-2 ms-auto">
              <NavLink className={navLinkClassName} to="/activities">
                Activities
              </NavLink>
              <NavLink className={navLinkClassName} to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink className={navLinkClassName} to="/teams">
                Teams
              </NavLink>
              <NavLink className={navLinkClassName} to="/users">
                Users
              </NavLink>
              <NavLink className={navLinkClassName} to="/workouts">
                Workouts
              </NavLink>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
