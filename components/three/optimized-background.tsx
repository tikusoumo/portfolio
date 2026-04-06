"use client";

export function OptimizedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient - static, no animation overhead */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50.5%),
            radial-gradient(circle at 80% 80%, rgba(255, 119, 102, 0.08) 0%, transparent 50.5%),
            linear-gradient(135deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%)
          `,
        }}
      />

      {/* Animated accent - single CSS animation, very performant */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(120, 200, 200, 0.1) 0%, transparent 50%)
          `,
          animation: "slideDown 20s ease-in-out infinite",
        }}
      />

      {/* Add animation keyframes via style tag */}
      <style>{`
        @keyframes slideDown {
          0% { transform: translateY(-20%); }
          50% { transform: translateY(0); }
          100% { transform: translateY(20%); }
        }
      `}</style>

      {/* Optional: Subtle vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at center, transparent 0%, rgba(10, 14, 39, 0.4) 100%)
          `,
        }}
      />
    </div>
  );
}
