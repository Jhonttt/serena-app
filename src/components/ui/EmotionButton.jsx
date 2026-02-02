export default function EmotionButton({
  icon,
  label,
  bgColor,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="
        flex flex-col items-center justify-center
        p-6 rounded-xl
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-offset-2
      "
      style={{ backgroundColor: bgColor }}
    >
      <span className="text-4xl mb-2">{icon}</span>
      <span className="font-medium text-gray-700">{label}</span>
    </button>
  );
}
