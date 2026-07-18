import React, { useState } from 'react';
import Header from './components/Header/Header';
import DashboardHero from './components/DashboardHero/DashboardHero';
import TelemetryCharts from './components/TelemetryCharts/TelemetryCharts';
import styles from './App.module.scss';

function App() {
  const [activeLap, setActiveLap] = useState(3); // Shared telemetry state, defaulting to LAP 03

  return (
    <div className={styles.appContainer}>
      <Header />
      <DashboardHero activeLap={activeLap} onLapSelect={setActiveLap} />
      {/* <TelemetryCharts activeLap={activeLap} /> */}
    </div>
  );
}

export default App;
