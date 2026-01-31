const resources = [
  { title: "Respiración para Ansiedad", tag: "Ansiedad" },
  { title: "Mindfulness para Principiantes", tag: "Mindfulness" },
  { title: "Meditación para Dormir", tag: "Sueño" },
]

export default function Resources() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-primary mb-6">
        Recursos de Aprendizaje
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <span className="text-sm text-primary">{r.tag}</span>
            <h3 className="mt-2 font-semibold">{r.title}</h3>
            <button className="mt-4 w-full border rounded py-2">
              Acceder al Recurso
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
