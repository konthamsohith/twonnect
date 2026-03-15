import React from 'react';

interface LogoProps {
    className?: string;
    style?: React.CSSProperties;
    color?: string;
}

/**
 * TWONNECT Stylized Logo
 * Implements a "Neo Geometric" aesthetic with Montserrat 800.
 * JSX is written on a single line to avoid accidental whitespace from newlines.
 */
const Logo: React.FC<LogoProps> = ({ className = "", style, color }) => {
    return (
        <span className={`twonnect-logo ${className}`} style={{ ...style, color: color || '#000000' }}>
            TWONN<svg className="logo-char-e" viewBox="0 0 62 72" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'baseline', height: '0.65em', width: '0.56em' }}><rect width="62" height="16" y="0" /><rect width="62" height="16" y="28" /><rect width="62" height="16" y="56" /></svg>CT
        </span>
    );
};

export default Logo;
