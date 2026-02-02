export function Card({ title, text, children, titleSize = "text-xl", titleColor, className }) {
  return (
    <div
      // Hacemos la tarjeta relative para poder posicionar elementos absolutos dentro
      className={`relative p-4 rounded-xl ${className}`} 
      // Fondo blanco semi-transparente
      style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }} 
    >
      <h3
        className={`${titleSize} font-semibold mb-2`} 
        // Permite pasar un color diferente para cada título
        style={{ color: titleColor }} 
      >
        {title}
      </h3>
      <p className="text-gray-600">{text}</p>

      {/* Children: Si hay children, los renderiza debajo del contenido */}
      {children && <div className="mt-4">{children}</div>}


    </div>
  );
}
