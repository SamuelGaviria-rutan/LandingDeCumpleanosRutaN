import { useState } from "react"

type Milestone = {
  year: string
  title: string
  description: string
  result: string
}

const milestones: Milestone[] = [
  {
    year: "2009",
    title: "Nace Ruta N",
    description:
      "La Alcaldía de Medellín, EPM y UNE crean una corporación para articular universidades, empresas, inversionistas y gobierno.",
    result:
      "La innovación se convierte en una estrategia compartida de ciudad.",
  },
  {
    year: "2011",
    title: "Un lugar en el mapa",
    description:
      "Abre el complejo Ruta N: tres edificios y 32.000 m² construidos con criterios de sostenibilidad.",
    result: "La estrategia obtiene una casa y la certificación LEED Oro.",
  },
  {
    year: "2016",
    title: "El mundo mira a Medellín",
    description:
      "La ciudad recibe el Premio Lee Kuan Yew por su transformación urbana y social.",
    result:
      "Medellín entra en la conversación internacional sobre ciudades que innovan.",
  },
  {
    year: "2019",
    title: "Las cifras dan el salto",
    description:
      "La inversión de Medellín en ciencia, tecnología e innovación alcanza el 2,27 % del PIB.",
    result: "En diez años, la inversión en CTeI se multiplica por más de tres.",
  },
  {
    year: "2021",
    title: "Distrito CTi",
    description:
      "La Constitución reconoce a Medellín como Distrito Especial de Ciencia, Tecnología e Innovación.",
    result:
      "La norma reconoce una transformación que la ciudad ya venía construyendo.",
  },
  {
    year: "2024",
    title: "Capital para crecer",
    description:
      "Medellín VC forma inversionistas, conecta una comunidad de inversión y crea un vehículo público-privado.",
    result: "El capital de riesgo local entra en la ecuación del ecosistema.",
  },
  {
    year: "2026",
    title: "La ciudad es el laboratorio",
    description:
      "FutuMed activa 1,8 km² alrededor de Ruta N para probar soluciones en seguridad, economía circular y salud.",
    result:
      "Más de 20 instituciones llevan la tecnología del laboratorio a la calle.",
  },
]

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M12 4v15M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export default function App() {
  const [activeMilestone, setActiveMilestone] = useState(3)

  return (
    <main>
      <section className="hero" id="inicio">
        <nav className="nav shell" aria-label="Navegación principal">
          <a href="#inicio" className="brand" aria-label="Ruta N, ir al inicio">
            <img src="/images/ruta-n-logo.png" alt="Ruta N Medellín" />
          </a>
          <div className="nav-links">
            <a href="#impacto">Impacto</a>
            <a href="#ruta">Nuestra ruta</a>
            <a href="#futuro">Lo que sigue</a>
          </div>
          <a className="date-link" href="#celebracion">
            11.11 <ArrowDown />
          </a>
        </nav>

        <div className="hero-grid shell">
          <div className="hero-copy">
            <p className="eyebrow light">Cumplimos años haciendo futuro</p>
            <h1>
              Una ruta
              <br />
              que no deja de
              <br />
              <em>avanzar.</em>
            </h1>
          </div>
          <div className="hero-aside">
            <p>
              Desde 2009 conectamos ideas, talento y capital para transformar a
              Medellín a través de la ciencia, la tecnología y la innovación.
            </p>
            <a href="#ruta" className="text-link">
              Recorrer nuestra historia <ArrowDown />
            </a>
          </div>
          <span className="hero-n" aria-hidden="true">
            n
          </span>
        </div>

        <div className="hero-bottom shell">
          <div className="birthday" id="celebracion">
            <span>Celebramos el</span>
            <strong>11 · Noviembre</strong>
          </div>
          <div className="photo-card">
            <img
              src="/images/medellin.jpg"
              alt="Vista de Medellín entre montañas"
              width="1800"
              height="1200"
            />
            <span>Medellín, Distrito CTi</span>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>CIENCIA</span>
          <i>n</i>
          <span>TECNOLOGÍA</span>
          <i>n</i>
          <span>INNOVACIÓN</span>
          <i>n</i>
          <span>EMPRENDIMIENTO</span>
          <i>n</i>
          <span>CIENCIA</span>
          <i>n</i>
          <span>TECNOLOGÍA</span>
          <i>n</i>
        </div>
      </div>

      <section className="impact shell section" id="impacto">
        <div className="section-intro">
          <p className="eyebrow">Una costumbre de largo plazo</p>
          <h2>
            Medellín imaginó su futuro
            <br />
            antes de construirlo.
          </h2>
        </div>
        <p className="section-copy">
          Ruta N institucionalizó una tradición de ciudad: resolver retos con
          conocimiento, conectar actores y tomar decisiones que trascienden
          generaciones.
        </p>

        <div className="metrics">
          <article className="metric metric-primary">
            <span className="metric-index">01</span>
            <strong>3×</strong>
            <h3>más inversión en CTeI</h3>
            <p>
              Entre 2009 y 2019, la inversión de la ciudad pasó de 0,70 % a 2,27
              % del PIB.
            </p>
            <div
              className="mini-chart"
              aria-label="La inversión pasó de 0,70 por ciento a 2,27 por ciento"
            >
              <span style={{ height: "31%" }}>
                <b>0,70 %</b>
                <i>2009</i>
              </span>
              <span style={{ height: "100%" }}>
                <b>2,27 %</b>
                <i>2019</i>
              </span>
            </div>
          </article>
          <article className="metric metric-dark">
            <span className="metric-index">02</span>
            <strong>32 mil</strong>
            <h3>m² para que las ideas sucedan</h3>
            <p>
              Un complejo sostenible que le dio una dirección física a la
              innovación.
            </p>
          </article>
          <article className="metric metric-light">
            <span className="metric-index">03</span>
            <strong>+20</strong>
            <h3>instituciones conectadas</h3>
            <p>
              Universidades, hospitales, clínicas y empresas participan en
              FutuMed.
            </p>
          </article>
        </div>
      </section>

      <section className="timeline-section section" id="ruta">
        <div className="shell">
          <div className="timeline-heading">
            <div>
              <p className="eyebrow light">Ruta N en marcha</p>
              <h2>Hitos que mueven la ciudad.</h2>
            </div>
            <p>
              Selecciona un año para conocer el avance que dejó en Medellín.
            </p>
          </div>

          <div
            className="year-selector"
            role="tablist"
            aria-label="Hitos de Ruta N"
          >
            {milestones.map((item, index) => (
              <button
                key={item.year}
                role="tab"
                aria-selected={activeMilestone === index}
                aria-controls="milestone-detail"
                className={activeMilestone === index ? "active" : ""}
                onClick={() => setActiveMilestone(index)}
              >
                <span>{item.year}</span>
                <i />
              </button>
            ))}
          </div>

          <article
            className="milestone-detail"
            id="milestone-detail"
            aria-live="polite"
          >
            <span className="milestone-number">
              {String(activeMilestone + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="milestone-year">
                {milestones[activeMilestone].year}
              </p>
              <h3>{milestones[activeMilestone].title}</h3>
            </div>
            <div className="milestone-story">
              <p>{milestones[activeMilestone].description}</p>
              <div>
                <span>Lo que deja</span>
                <strong>{milestones[activeMilestone].result}</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="future section" id="futuro">
        <div className="shell future-grid">
          <div className="future-mark" aria-hidden="true">
            n
          </div>
          <div className="future-copy">
            <p className="eyebrow">La pregunta sigue abierta</p>
            <h2>
              ¿Qué estamos dispuestos
              <br />a empezar hoy,
              <br />
              <em>para quienes aún no han nacido?</em>
            </h2>
            <p>
              Cada gran avance comenzó como una decisión sin garantías. El
              futuro de Medellín se construye igual: conectando conocimiento,
              confianza y acción.
            </p>
            <a href="#inicio" className="button-link">
              Volver al inicio <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <img src="/images/ruta-n-logo.png" alt="Ruta N Medellín" />
            <p>Ciencia, tecnología e innovación para transformar la ciudad.</p>
          </div>
          <div>
            <span>Aniversario Ruta N</span>
            <strong>11 · 11</strong>
          </div>
          <div className="footer-links">
            <a
              href="https://www.rutanmedellin.org/"
              target="_blank"
              rel="noreferrer"
            >
              rutanmedellin.org <ArrowUpRight />
            </a>
            <small>
              Fotografía de Jimmy Hu vía Unsplash.
              <br />
              Datos: Línea de tiempo CTi Medellín.
            </small>
          </div>
        </div>
      </footer>
    </main>
  )
}
