export default function Card({ title, text, children, titleSize = "text-xl" }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className={`${titleSize} font-semibold text-primary mb-2`}>
        {title}
      </h3>
      <p className="text-gray-600">{text}</p>

      {/* Si hay children, los renderiza debajo */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
