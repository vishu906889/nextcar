import React, { useState, useEffect, useRef } from 'react';
import {
  Gauge,
  Home,
  Settings,
  ArrowLeft,
  Download,
  Share2,
  Check,
  MessageSquare,
  BookOpen,
  Key,

} from 'lucide-react';
import clsx from 'clsx';
import { useTheme } from '../../hooks/useTheme';
import carImg from '../../assets/onlycar_effect.png';
import { DownloadIcon, FileIcon, HomeIcon, MessageIcon, ShareIcon, SettingIcon, SpeedMeterIcon, TestbookIcon, ThikIcon } from '../SvgIcon/SvgIcon';
import styles from './DashboardHero.module.scss';

// Animated Counter Utility Component
const AnimatedCounter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Check if value has numeric parts
    const numericPart = parseFloat(value.toString().replace(/,/g, ''));
    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }

    const startVal = parseFloat(displayValue.toString().replace(/,/g, '')) || 0;
    const duration = 600; // ms
    const startTime = performance.now();

    let animationFrameId;

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime >= duration) {
        setDisplayValue(value);
      } else {
        const progress = elapsedTime / duration;
        const easeOutQuad = progress * (2 - progress); // Easing function
        const currentVal = startVal + (numericPart - startVal) * easeOutQuad;

        if (value.toString().includes('.')) {
          setDisplayValue(currentVal.toFixed(1));
        } else if (value.toString().includes(',')) {
          setDisplayValue(Math.round(currentVal).toLocaleString());
        } else {
          setDisplayValue(Math.round(currentVal).toString());
        }
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return (
    <span>
      {displayValue}
      {suffix && <span className={styles.suffix}> {suffix}</span>}
    </span>
  );
};

// Telemetry dataset for Laps 01 - 05
const lapTelemetryData = {
  1: {
    lapName: "Speed Zone",
    topSpeed: "285",
    power: "520",
    torque: "690",
    acceleration: "3.8",
    oilChange: "2,500",
    range: "580"
  },
  2: {
    lapName: "Acceleration Zone",
    topSpeed: "310",
    power: "580",
    torque: "740",
    acceleration: "3.4",
    oilChange: "2,480",
    range: "540"
  },
  3: {
    lapName: "Technical Section", // Figma Default
    topSpeed: "352",
    power: "620",
    torque: "780",
    acceleration: "3.2",
    oilChange: "2,450",
    range: "520"
  },
  4: {
    lapName: "High Speed Zone",
    topSpeed: "390",
    power: "710",
    torque: "860",
    acceleration: "2.8",
    oilChange: "2,410",
    range: "470"
  },
  5: {
    lapName: "Final Corner",
    topSpeed: "330",
    power: "600",
    torque: "760",
    acceleration: "3.5",
    oilChange: "2,380",
    range: "510"
  }
};

export const DashboardHero = ({ activeLap = 3, onLapSelect }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [activeAction, setActiveAction] = useState('check');
  const [hoveredItem, setHoveredItem] = useState(null);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = (name) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredItem(name);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const isTooltipVisible = (name) => {
    return hoveredItem ? hoveredItem === name : activeMenu === name;
  };

  const isButtonActiveStyle = (name) => {
    return hoveredItem ? hoveredItem === name : activeMenu === name;
  };

  const currentStats = lapTelemetryData[activeLap];

  // Helper to handle lap select
  const handleLapSelect = (lapIndex) => {
    if (onLapSelect) onLapSelect(lapIndex);
  };

  return (
    <main className={styles.heroContainer}>

      {/* 1. Light Beam Effect (Projects downwards from header edge to central widget) */}
      <div className={styles.lightBeam} />

      {/* 2. Top Section: Back Button, Title Block, Action Buttons Row (Unified as shown in Figma) */}
      <div className={styles.topSection}>
        {/* Left: Back button */}
        <div className={styles.topSectionLeft}>
          <button className={styles.backButton} aria-label="Go Back">
            <ArrowLeft size={16} />
          </button>
        </div>



        {/* Right: Actions Row */}
        <div className={styles.topSectionRight}>
          <div className={styles.actionRow}>
            <button
              onClick={() => setActiveAction('download')}
              className={clsx(styles.actionButton, activeAction === 'download' && styles.actionActiveRed)}
              aria-label="Download"
            >
              <DownloadIcon size={19} />
            </button>
            <button
              onClick={() => setActiveAction('share')}
              className={clsx(styles.actionButton, activeAction === 'share' && styles.actionActiveRed)}
              aria-label="Share"
            >
              <ShareIcon size={19} />
            </button>
            <button
              onClick={() => setActiveAction('check')}
              className={clsx(styles.actionButton, activeAction === 'check' && styles.actionActiveRed)}
              aria-label="Confirm"
            >
              <ThikIcon size={19} />
            </button>
          </div>
        </div>
      </div>


      {/* Center: Title & Subtitle */}
      <div className={styles.titleSection}>
        <h1 className={styles.mainTitle}>
          ENGINEERED FOR <span className={styles.titleHighlight}>PASSION</span>
        </h1>
        <p className={styles.subtitle}>Precision. Power. Performance</p>
        <div className={styles.accentLine} />
      </div>
      {/* 3. Top-Level Layout Body (Columns: Left Nav, Center Telemetry, Right Controls) */}
      <div className={styles.mainLayout}>

        {/* LEFT COLUMN: Sidebar Navigation */}
        <div className={styles.leftSidebar}>
          {/* Curved track containing icons */}
          <div className={styles.curvedMenuWrapper}>
            {/* SVG Arc Path (Glowing cyan/blue dashed circular guide) */}
            <svg className={styles.menuCurveSvg} viewBox="0 0 100 400" fill="none">
              <defs>
                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M80 20 Q 20 200 80 380"
                stroke="rgba(0, 168, 255, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                filter="url(#cyanGlow)"
              />
            </svg>

            {/* Navigation Icons absolute placed along the arc curve */}
            <div className={styles.iconContainer}>
              <div
                className={styles.menuButtonWrapper}
                style={{ top: '8%', left: '13px' }}
                onMouseEnter={() => handleMouseEnter('dashboard')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveMenu('dashboard')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('dashboard') && styles.menuButtonActive
                  )}
                  aria-label="Dashboard"
                >
                  <SpeedMeterIcon size={18} />
                </button>
                <div className={clsx(styles.tooltip, isTooltipVisible('dashboard') && styles.tooltipActive)}>
                  Dashboard
                </div>
              </div>

              <div
                className={styles.menuButtonWrapper}
                style={{ top: '48%', left: '0px' }}
                onMouseEnter={() => handleMouseEnter('home')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveMenu('home')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('home') && styles.menuButtonActive
                  )}
                  aria-label="Home"
                >
                  <HomeIcon size={18} />
                </button>
                <div className={clsx(styles.tooltip, isTooltipVisible('home') && styles.tooltipActive)}>
                  Home
                </div>
              </div>

              <div
                className={styles.menuButtonWrapper}
                style={{ top: '88%', left: '13px' }}
                onMouseEnter={() => handleMouseEnter('settings')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setActiveMenu('settings')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('settings') && styles.menuButtonActive
                  )}
                  aria-label="Settings"
                >
                  <SettingIcon size={18} />
                </button>
                <div className={clsx(styles.tooltip, isTooltipVisible('settings') && styles.tooltipActive)}>
                  Settings
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Symmetrical Telemetry Grid & Car Image */}
        <div className={styles.centerTelemetry}>

          {/* Left-side Stats Column (Right-aligned text) */}
          <div className={styles.statsColumnLeft}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.topSpeed} />
              </div>
              <div className={styles.statLabel}>Top Speed</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.power} />
              </div>
              <div className={styles.statLabel}>Power [HP]</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.torque} />
              </div>
              <div className={styles.statLabel}>Torque</div>
            </div>
          </div>

          {/* Focal Center Circle (Radial Rings + Car Image Mask) */}
          <div className={styles.centralCircleWrapper}>
            {/* Background concentric glow rings */}
            <div className={styles.sonarRingOuter} />
            <div className={styles.sonarRingMiddle} />
            <div className={styles.sonarRingInner} />

            {/* Central Masked Image Container */}
            <div className={styles.carCircle}>
              <img
                src={carImg}
                alt="NextCar Performance Focus"
                className={styles.carImage}
              />
            </div>
          </div>

          {/* Right-side Stats Column (Left-aligned text) */}
          <div className={styles.statsColumnRight}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.acceleration} suffix="Sec" />
              </div>
              <div className={styles.statLabel}>0-100 KM/H</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.oilChange} suffix="KM" />
              </div>
              <div className={styles.statLabel}>Oil Change</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statValue}>
                <AnimatedCounter value={currentStats.range} suffix="KM" />
              </div>
              <div className={styles.statLabel}>Range</div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar Controls */}
        <div className={styles.rightSidebar}>
          {/* Curved track containing icons */}
          <div className={styles.curvedMenuWrapperRight}>
            {/* SVG Arc Path (Curves symmetric to left side) */}
            <svg className={styles.menuCurveSvg} viewBox="0 0 100 400" fill="none">
              <path
                d="M20 20 Q 80 200 20 380"
                stroke="rgba(0, 168, 255, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                filter="url(#cyanGlow)"
              />
            </svg>

            {/* Navigation Icons absolute placed along the arc curve */}
            <div className={styles.iconContainerRight}>
              <div
                className={styles.menuButtonWrapperRight}
                style={{ top: '10%', right: '90px' }}
                onMouseEnter={() => handleMouseEnter('comments')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={clsx(styles.tooltipRight, isTooltipVisible('comments') && styles.tooltipActive)}>
                  Comments
                </div>
                <button
                  onClick={() => setActiveMenu(activeMenu === 'comments' ? '' : 'comments')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('comments') && styles.menuButtonActive
                  )}
                  aria-label="Comments"
                >
                  <MessageIcon size={18} />
                </button>
              </div>

              <div
                className={styles.menuButtonWrapperRight}
                style={{ top: '40%', right: '75px' }}
                onMouseEnter={() => handleMouseEnter('manual')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={clsx(styles.tooltipRight, isTooltipVisible('manual') && styles.tooltipActive)}>
                  Manual
                </div>
                <button
                  onClick={() => setActiveMenu(activeMenu === 'manual' ? '' : 'manual')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('manual') && styles.menuButtonActive
                  )}
                  aria-label="Manual"
                >
                  <TestbookIcon size={18} />
                </button>
              </div>

              <div
                className={styles.menuButtonWrapperRight}
                style={{ top: '71%', right: '90px' }}
                onMouseEnter={() => handleMouseEnter('key')}
                onMouseLeave={handleMouseLeave}
              >
                <div className={clsx(styles.tooltipRight, isTooltipVisible('key') && styles.tooltipActive)}>
                  Key
                </div>
                <button
                  onClick={() => setActiveMenu(activeMenu === 'key' ? '' : 'key')}
                  className={clsx(
                    styles.menuButton,
                    isButtonActiveStyle('key') && styles.menuButtonActive
                  )}
                  aria-label="Remote Key"
                >
                  <FileIcon size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: Interactive Lap Timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.timelineTrackContainer}>
          {/* Waveform graphic overlay */}
          <svg className={styles.waveSvg} preserveAspectRatio="none" viewBox="0 0 1000 120">
            <defs>
              <linearGradient id="waveFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-red)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill beneath wave */}
            <path
              d="M 0,120 L 0,90 Q 100,85 200,80 T 400,75 T 600,65 T 800,50 T 1000,45 L 1000,120 Z"
              fill="url(#waveFill)"
            />

            {/* Dotted Wave Path */}
            <path
              d="M 0,90 Q 100,85 200,80 T 400,75 T 600,65 T 800,50 T 1000,45"
              stroke="var(--accent-red)"
              strokeWidth="2"
              strokeDasharray="4 6"
              fill="none"
            />
          </svg>

          {/* Interactive Node Markers aligned with wave segments */}
          <div className={styles.timelineNodes}>

            {/* Lap Node 1 (Speed Zone) - ~10% horizontal */}
            <div
              className={clsx(styles.timelineNode, activeLap === 1 && styles.nodeActive)}
              style={{ left: '10%' }}
              onClick={() => handleLapSelect(1)}
            >
              <div className={styles.nodeCircle} style={{ bottom: '76px' }}>
                <div className={styles.nodeCore} />
              </div>
              <div className={styles.nodeLine} style={{ bottom: '40px', height: '36px' }} />
              <div className={styles.nodeLabelGroup}>
                <div className={styles.nodeTitle}>LAP 01</div>
                <div className={styles.nodeSubtitle}>Speed Zone</div>
              </div>
            </div>

            {/* Lap Node 2 (Acceleration Zone) - ~30% horizontal */}
            <div
              className={clsx(styles.timelineNode, activeLap === 2 && styles.nodeActive)}
              style={{ left: '30%' }}
              onClick={() => handleLapSelect(2)}
            >
              <div className={styles.nodeCircle} style={{ bottom: '81px' }}>
                <div className={styles.nodeCore} />
              </div>
              <div className={styles.nodeLine} style={{ bottom: '40px', height: '41px' }} />
              <div className={styles.nodeLabelGroup}>
                <div className={styles.nodeTitle}>LAP 02</div>
                <div className={styles.nodeSubtitle}>Acceleration Zone</div>
              </div>
            </div>

            {/* Lap Node 3 (Technical Section) - ~50% horizontal */}
            <div
              className={clsx(styles.timelineNode, activeLap === 3 && styles.nodeActive)}
              style={{ left: '50%' }}
              onClick={() => handleLapSelect(3)}
            >
              <div className={styles.nodeCircle} style={{ bottom: '94px' }}>
                <div className={styles.nodeCore} />
              </div>
              <div className={styles.nodeLine} style={{ bottom: '40px', height: '54px' }} />
              <div className={styles.nodeLabelGroup}>
                <div className={styles.nodeTitle}>LAP 03</div>
                <div className={styles.nodeSubtitle}>Technical Section</div>
              </div>
            </div>

            {/* Lap Node 4 (High Speed Zone) - ~70% horizontal */}
            <div
              className={clsx(styles.timelineNode, activeLap === 4 && styles.nodeActive)}
              style={{ left: '70%' }}
              onClick={() => handleLapSelect(4)}
            >
              <div className={styles.nodeCircle} style={{ bottom: '106px' }}>
                <div className={styles.nodeCore} />
              </div>
              <div className={styles.nodeLine} style={{ bottom: '40px', height: '66px' }} />
              <div className={styles.nodeLabelGroup}>
                <div className={styles.nodeTitle}>LAP 04</div>
                <div className={styles.nodeSubtitle}>High Speed Zone</div>
              </div>
            </div>

            {/* Lap Node 5 (Final Corner) - ~90% horizontal */}
            <div
              className={clsx(styles.timelineNode, activeLap === 5 && styles.nodeActive)}
              style={{ left: '90%' }}
              onClick={() => handleLapSelect(5)}
            >
              <div className={styles.nodeCircle} style={{ bottom: '114px' }}>
                <div className={styles.nodeCore} />
              </div>
              <div className={styles.nodeLine} style={{ bottom: '40px', height: '74px' }} />
              <div className={styles.nodeLabelGroup}>
                <div className={styles.nodeTitle}>LAP 05</div>
                <div className={styles.nodeSubtitle}>Final Corner</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  );
};

export default DashboardHero;
