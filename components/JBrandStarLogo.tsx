import React from "react"

const JBrandStarLogo = ({ className = "", size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <defs>
      <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#9333EA" />
      </linearGradient>
      <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.25" />
      </filter>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Background glow effect */}
    <rect x="2" y="2" width="56" height="56" rx="12" fill="url(#boxGradient)" opacity="0.2" filter="url(#glow)" />
    {/* Main logo container */}
    <rect x="2" y="2" width="56" height="56" rx="12" fill="url(#boxGradient)" filter="url(#dropShadow)" />
    {/* Star icon */}
    <g transform="translate(30, 30)">
      <path d="M0,-12 L3.5,-3.5 L12,0 L3.5,3.5 L0,12 L-3.5,3.5 L-12,0 L-3.5,-3.5 Z" fill="white" />
    </g>
  </svg>
)

export default JBrandStarLogo
