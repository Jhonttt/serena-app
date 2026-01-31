import Card from "../components/ui/Card"

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold text-primary">
          Tu bienestar mental es nuestra prioridad
        </h1>
        <p className="mt-4 text-gray-600">
          Un espacio seguro y tranquilo donde no estás solo.
        </p>

        <div className="flex justify-center gap-4 mt-8">
          <button
            style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
          >
            Buscar Ayuda Ahora
          </button>
          <button className="border px-6 py-3 rounded-lg">
            Explorar Recursos
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-20">
        <Card
          title="Confidencial"
          text="Tu privacidad es fundamental y segura."
        />
        <Card
          title="Apoyo Profesional"
          text="Recursos creados por profesionales certificados."
        />
        <Card
          title="Comunidad"
          text="Forma parte de una red de apoyo segura."
        />
      </section>


      <div style={{ backgroundColor: "rgb(246, 248, 255)" }}>
        <section className="pl-8"> {/* pl-6 = padding-left */}
          <h2 className="text-3xl font-semibold text-primary">
            Recursos de Aprendizaje
          </h2>
          <p className="mt-4 text-gray-600">
            Explora materiales educativos y herramientas para tu bienestar
          </p>

          <div className="flex justify-center gap-4 mt-8">


          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-20">
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>
          <Card
            title="Confidencial"
            text="Tu privacidad es fundamental y segura."  >
            <button
              style={{ backgroundColor: "#7C3AED", color: "white", padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: "none" }}
            >
              Acceder al recurso
            </button>
          </Card>

        </section>

      </div>

    </div>

  )
}