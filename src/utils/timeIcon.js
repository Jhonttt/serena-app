// timeIcon.js
// Devuelve un icono según la hora del día
export function getTimeIcon() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return "☀️";        // Mañana
  if (hour >= 12 && hour < 18) return "🌤️";      // Tarde
  if (hour >= 18 && hour < 22) return "🌆";      // Atardecer
  return "🌙";                                     // Noche
}
