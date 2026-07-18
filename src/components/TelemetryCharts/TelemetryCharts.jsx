import React from 'react';
import clsx from 'clsx';
import { useTheme } from '../../hooks/useTheme';
import styles from './TelemetryCharts.module.scss';

// Chart datasets mapped to Laps 01 - 05
const chartData = {
  1: {
    // Speed & RPM Spline Paths (1000 x 200 viewBox)
    speedPath: "M 0,140 Q 150,110 300,60 T 600,100 T 900,40 T 1000,50",
    speedArea: "M 0,140 Q 150,110 300,60 T 600,100 T 900,40 T 1000,50 L 1000,200 L 0,200 Z",
    rpmPath: "M 0,160 Q 150,130 300,90 T 600,120 T 900,70 T 1000,80",
    
    // G-Force points (x, y coordinates around 150, 150 center)
    gPoints: [
      { x: 150, y: 150, g: "0.0" },
      { x: 130, y: 140, g: "0.4" },
      { x: 170, y: 160, g: "0.5" },
      { x: 140, y: 110, g: "1.1" },
      { x: 160, y: 185, g: "0.9" }
    ],
    peakLatG: "1.1 G",
    peakLongG: "0.9 G",
    avgSpeed: "235 km/h",
    maxRpm: "7,800 RPM"
  },
  2: {
    speedPath: "M 0,160 Q 150,130 300,50 T 600,40 T 900,30 T 1000,80",
    speedArea: "M 0,160 Q 150,130 300,50 T 600,40 T 900,30 T 1000,80 L 1000,200 L 0,200 Z",
    rpmPath: "M 0,170 Q 150,140 300,70 T 600,60 T 900,50 T 1000,100",
    
    gPoints: [
      { x: 150, y: 150, g: "0.0" },
      { x: 150, y: 90, g: "1.3" },
      { x: 150, y: 210, g: "1.2" },
      { x: 160, y: 130, g: "0.5" },
      { x: 140, y: 170, g: "0.6" }
    ],
    peakLatG: "0.6 G",
    peakLongG: "1.3 G",
    avgSpeed: "260 km/h",
    maxRpm: "8,100 RPM"
  },
  3: { // Figma default
    speedPath: "M 0,120 Q 150,160 300,110 T 500,80 T 700,150 T 900,60 T 1000,90",
    speedArea: "M 0,120 Q 150,160 300,110 T 500,80 T 700,150 T 900,60 T 1000,90 L 1000,200 L 0,200 Z",
    rpmPath: "M 0,140 Q 150,170 300,130 T 500,100 T 700,170 T 900,85 T 1000,110",
    
    gPoints: [
      { x: 150, y: 150, g: "0.0" },
      { x: 75, y: 160, g: "1.6" },
      { x: 225, y: 140, g: "1.7" },
      { x: 160, y: 80, g: "1.2" },
      { x: 130, y: 220, g: "1.4" }
    ],
    peakLatG: "1.7 G",
    peakLongG: "1.4 G",
    avgSpeed: "215 km/h",
    maxRpm: "8,300 RPM"
  },
  4: {
    speedPath: "M 0,110 Q 150,70 300,30 T 600,20 T 900,15 T 1000,40",
    speedArea: "M 0,110 Q 150,70 300,30 T 600,20 T 900,15 T 1000,40 L 1000,200 L 0,200 Z",
    rpmPath: "M 0,130 Q 150,90 300,50 T 600,40 T 900,35 T 1000,60",
    
    gPoints: [
      { x: 150, y: 150, g: "0.0" },
      { x: 150, y: 70, g: "1.8" },
      { x: 150, y: 230, g: "1.6" },
      { x: 120, y: 150, g: "0.6" },
      { x: 180, y: 150, g: "0.6" }
    ],
    peakLatG: "0.6 G",
    peakLongG: "1.8 G",
    avgSpeed: "310 km/h",
    maxRpm: "8,700 RPM"
  },
  5: {
    speedPath: "M 0,130 Q 150,140 300,160 T 600,110 T 900,80 T 1000,50",
    speedArea: "M 0,130 Q 150,140 300,160 T 600,110 T 900,80 T 1000,50 L 1000,200 L 0,200 Z",
    rpmPath: "M 0,150 Q 150,160 300,175 T 600,130 T 900,100 T 1000,70",
    
    gPoints: [
      { x: 150, y: 150, g: "0.0" },
      { x: 80, y: 120, g: "1.5" },
      { x: 210, y: 180, g: "1.3" },
      { x: 160, y: 100, g: "1.1" },
      { x: 130, y: 200, g: "1.0" }
    ],
    peakLatG: "1.5 G",
    peakLongG: "1.1 G",
    avgSpeed: "220 km/h",
    maxRpm: "8,000 RPM"
  }
};

export const TelemetryCharts = ({ activeLap = 3 }) => {
  const data = chartData[activeLap] || chartData[3];

  return (
    <section className={styles.chartsContainer}>
      <div className={styles.chartsGrid}>
        
        {/* CHART 1: SPEED & RPM GRAPH */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Telemetry Speed & RPM</h2>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <span className={clsx(styles.legendDot, styles.legendDotRed)} />
                <span>Speed</span>
              </div>
              <div className={styles.legendItem}>
                <span className={clsx(styles.legendDot, styles.legendDotGray)} />
                <span>RPM</span>
              </div>
            </div>
          </div>

          <div className={styles.chartVisualWrapper}>
            <svg viewBox="0 0 1000 200" className={styles.splineSvg} preserveAspectRatio="none">
              {/* Grids */}
              <line x1="0" y1="50" x2="1000" y2="50" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="0" y1="150" x2="1000" y2="150" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />
              
              <line x1="250" y1="0" x2="250" y2="200" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="500" y1="0" x2="500" y2="200" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />
              <line x1="750" y1="0" x2="750" y2="200" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 6" />

              {/* Area Gradient beneath Speed */}
              <path 
                d={data.speedArea} 
                fill="url(#speedChartFill)" 
                className={styles.areaPath}
              />
              <defs>
                <linearGradient id="speedChartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Speed Path Line */}
              <path 
                d={data.speedPath} 
                fill="none" 
                stroke="var(--accent-red)" 
                strokeWidth="2.5" 
                className={styles.linePath}
              />

              {/* RPM Path Line */}
              <path 
                d={data.rpmPath} 
                fill="none" 
                stroke="var(--text-muted)" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
                className={styles.linePath}
              />
            </svg>
          </div>

          <div className={styles.cardFooter}>
            <div className={styles.footerStat}>
              <div className={styles.statLabel}>Avg Speed</div>
              <div className={styles.statValue}>{data.avgSpeed}</div>
            </div>
            <div className={styles.footerStat}>
              <div className={styles.statLabel}>Max Revs</div>
              <div className={styles.statValue}>{data.maxRpm}</div>
            </div>
          </div>
        </div>

        {/* CHART 2: G-FORCE VECTOR ANALYSIS */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>G-Force Vector Analysis</h2>
            <span className={styles.liveTag}>G-Vector</span>
          </div>

          <div className={styles.gForceBody}>
            {/* Left side: Interactive G-force plot */}
            <div className={styles.gForcePlotWrapper}>
              <svg viewBox="0 0 300 300" className={styles.gForceSvg}>
                {/* Concentric grid circles (representing G boundaries) */}
                <circle cx="150" cy="150" r="130" stroke="var(--border-color)" strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
                <circle cx="150" cy="150" r="90" stroke="var(--border-color)" strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
                <circle cx="150" cy="150" r="50" stroke="var(--border-color)" strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
                
                {/* Crosshair axes */}
                <line x1="20" y1="150" x2="280" y2="150" stroke="var(--border-color)" strokeWidth="0.8" />
                <line x1="150" y1="20" x2="150" y2="280" stroke="var(--border-color)" strokeWidth="0.8" />

                {/* Grid Labels */}
                <text x="155" y="45" fill="var(--text-muted)" fontSize="11" fontWeight="600">1.5G</text>
                <text x="155" y="85" fill="var(--text-muted)" fontSize="11" fontWeight="600">1.0G</text>
                <text x="155" y="125" fill="var(--text-muted)" fontSize="11" fontWeight="600">0.5G</text>

                {/* Plot trails & point */}
                {data.gPoints.map((pt, idx) => {
                  const isLast = idx === data.gPoints.length - 1;
                  return (
                    <g key={idx}>
                      {/* Trail connections */}
                      {idx > 0 && (
                        <line 
                          x1={data.gPoints[idx-1].x} 
                          y1={data.gPoints[idx-1].y} 
                          x2={pt.x} 
                          y2={pt.y} 
                          stroke="var(--accent-red)" 
                          strokeWidth="1.5" 
                          opacity={idx * 0.15}
                        />
                      )}
                      {/* Active points */}
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isLast ? 6 : 3} 
                        fill={isLast ? "var(--accent-red)" : "var(--text-muted)"}
                        className={clsx(isLast && styles.activeGPoint)}
                        opacity={isLast ? 1 : 0.6}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Right side: G-Force Stats */}
            <div className={styles.gForceStats}>
              <div className={styles.gForceStatItem}>
                <div className={styles.statLabel}>Peak Lat G</div>
                <div className={styles.statValue}>{data.peakLatG}</div>
              </div>
              <div className={styles.gForceStatItem}>
                <div className={styles.statLabel}>Peak Long G</div>
                <div className={styles.statValue}>{data.peakLongG}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TelemetryCharts;
