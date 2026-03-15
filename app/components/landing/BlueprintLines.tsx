"use client";

import React from "react";

/**
 * BlueprintLines Component
 * Renders the structural grid lines and intersection dots seen in the reference.
 */
export default function BlueprintLines() {
    return (
        <div className="blueprint-container" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {/* Horizontal Line matching bottom of navbar */}
            <div className="blueprint-line-h" style={{ top: '65px', opacity: 0.5 }} />
        </div>
    );
}
