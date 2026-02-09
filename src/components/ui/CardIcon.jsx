export function CardIcon({ title, text, children, titleSize = "text-xl", titleColor, className, iconButton }) {
  return (
    <div
      // Tarjeta relativa para posicionar elementos absolutos dentro
      // Incluye transición para hover personalizado externo
      className={`relative p-12 rounded-2xl transition-transform duration-200 ${className}`} 

    >
      {/* Botón absoluto en la esquina superior izquierda */}
      {iconButton && (
        <div className="absolute top-3 left-3 pl-5" >
          {iconButton}
        </div>
      )}

      {/* Título más abajo para no chocar con el botón */}
      <h3
        className={`${titleSize} font-semibold mt-5`} // mt-10 para bajarlo, mb-4 para separar del texto
        // Permite pasar un color diferente para cada título
        style={{ color: titleColor }} 
      >
        {title}
      </h3>

      <p className="text-gray-600">{text}</p>

      {/* Children: Si hay contenido adicional, se renderiza debajo */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
