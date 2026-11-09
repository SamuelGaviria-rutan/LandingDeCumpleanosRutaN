import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

type Milestone = {
  year: string
  title: string
  description: string
  impact: string
}

type Stage = {
  title: string
  description: string
  milestones: Milestone[]
}

const stages: Stage[] = [
  {
    title: "Los cimientos",
    description:
      "Una villa sin ventajas naturales aprende a fabricarlas. La arriería construye la primera red de confianza de la región.",
    milestones: [
      {
        year: "1826",
        title: "La economía se adelanta a la norma",
        description:
          "Para mover café, oro, sal y telas entre poblados separados por cordilleras, la región perfeccionó la arriería. Por esos caminos viajaban mercancías, y también precios, noticias y contactos. Los economistas llaman capital social a esa confianza acumulada que permite cooperar sin vigilarse. Antioquia construyó su primera red de información con mulas.",
        impact:
          "El Congreso reconoce a Medellín como capital de la provincia. La ciudad decide, y la norma lo escribe después.",
      },
    ],
  },
  {
    title: "La ciudad técnica",
    description:
      "Ingenieros, planos y servicios públicos. Medellín adopta el hábito de resolver sus problemas con método y a largo plazo.",
    milestones: [
      {
        year: "1947",
        title: "El plano de una ciudad que no existía",
        description:
          "La administración contrata al catalán José Luis Sert y al estadounidense Paul Lester Wiener, dos de los urbanistas más reconocidos del mundo, para diseñar la Medellín de las décadas siguientes. El Plan Piloto organizó el territorio por funciones y propuso convertir el río en el eje estructurante de la ciudad.",
        impact:
          "Instala un método: pensar el futuro con estudios técnicos y proyecciones de población.",
      },
    ],
  },
  {
    title: "La prueba y el regreso",
    description:
      "La ciudad atraviesa su etapa más dura y comprueba la fortaleza del tejido institucional que había construido.",
    milestones: [
      {
        year: "1995",
        title: "Lo que se mantuvo en pie",
        description:
          "Entre 1980 y 1995 la ciudad atravesó su prueba más dura. La pregunta reveladora no es cuánto se perdió, sino qué siguió funcionando. Las universidades siguieron graduando profesionales, las empresas públicas siguieron operando y las organizaciones cívicas conservaron su capacidad de acordar. El 30 de noviembre el Metro entró en operación entre Niquía y Poblado.",
        impact:
          "Un metro es un sistema de transporte. Ese metro fue además un mensaje: la ciudad termina lo que empieza.",
      },
    ],
  },
  {
    title: "La ciudad del conocimiento",
    description:
      "La universidad, la empresa y el Estado se sientan en una mesa permanente, y la ciencia encuentra un espacio público.",
    milestones: [
      {
        year: "2009",
        title: "Nace Ruta N",
        description:
          "En noviembre, la Alcaldía de Medellín, EPM y UNE constituyen la Corporación Ruta N, con un encargo inusual: articular universidades, empresas, inversionistas y gobierno alrededor de una misma estrategia. No llegó a un territorio vacío. Encontró universidades centenarias, una Cámara de Comercio activa, un comité de triple hélice en marcha y un museo de ciencia recién abierto.",
        impact:
          "Ruta N no inauguró la Medellín innovadora: institucionalizó una tradición de más de cien años.",
      },
    ],
  },
  {
    title: "Ruta N en marcha",
    description:
      "Quince años de recorrido, del primer edificio al laboratorio urbano que ocupa un polígono entero de la ciudad.",
    milestones: [
      {
        year: "2019",
        title: "El salto que muestran las cifras",
        description:
          "Se inaugura en Ruta N el Centro para la Cuarta Revolución Industrial, en alianza con el Foro Económico Mundial, dedicado a inteligencia artificial, ciencia de datos, internet de las cosas y cadena de bloques. Ese año la inversión de la ciudad en ciencia, tecnología e innovación llega al 2,27 por ciento del PIB, según los balances de la corporación.",
        impact:
          "En diez años la inversión en CTeI se había más que triplicado.",
      },
      {
        year: "2026",
        title: "La ciudad como laboratorio",
        description:
          "Arranca FutuMed, el primer laboratorio urbano del país. Un polígono de 1,8 kilómetros cuadrados alrededor del complejo Ruta N, declarado Zona de Tratamiento Especial. Más de veinte universidades, hospitales, clínicas y empresas trabajan allí en tres frentes: seguridad, economía circular y salud. Los proyectos avanzan por niveles de madurez tecnológica.",
        impact:
          "Las tecnologías se prueban en la calle, que es lo que esta ciudad viene haciendo desde la primera mula.",
      },
    ],
  },
]

export default function App() {
  const pageRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    let updateTimelineRail = () => {}
    let railUpdateFrame = 0
    let resizeObserver: ResizeObserver | undefined
    const scheduleTimelineRailUpdate = () => {
      cancelAnimationFrame(railUpdateFrame)
      railUpdateFrame = requestAnimationFrame(updateTimelineRail)
    }

    const context = gsap.context(() => {
      const timeline = pageRef.current?.querySelector<HTMLElement>(".timeline")
      const rail = timeline?.querySelector<HTMLElement>(".timeline-rail")
      const badges = timeline
        ? Array.from(timeline.querySelectorAll<HTMLElement>(".year-badge"))
        : []

      updateTimelineRail = () => {
        if (!timeline || !rail || badges.length < 2) return

        const timelineRect = timeline.getBoundingClientRect()
        const firstRect = badges[0].getBoundingClientRect()
        const endRect = badges[badges.length - 1].getBoundingClientRect()
        const start = firstRect.top - timelineRect.top + firstRect.height / 2
        const end = endRect.top - timelineRect.top + endRect.height / 2

        rail.style.setProperty("--rail-start", `${start}px`)
        rail.style.setProperty("--rail-length", `${end - start}px`)
      }

      resizeObserver = new ResizeObserver(scheduleTimelineRailUpdate)
      if (timeline) resizeObserver.observe(timeline)
      window.addEventListener("load", scheduleTimelineRailUpdate)
      window.addEventListener("resize", scheduleTimelineRailUpdate)

      scheduleTimelineRailUpdate()
      ScrollTrigger.addEventListener("refreshInit", updateTimelineRail)

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

      const reveal = (
        trigger: gsap.DOMTarget,
        targets: gsap.DOMTarget,
        options: gsap.TweenVars = {},
      ) => {
        gsap.from(targets, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          ...options,
          scrollTrigger: {
            trigger,
            start: "top 82%",
            once: true,
            ...options.scrollTrigger as ScrollTrigger.Vars,
          },
        })
      }

      const hero = gsap.timeline({
        defaults: { ease: "power3.out" },
      })

      hero
        .from(
          ".banner-image img",
          { scale: 1.08, opacity: 0, duration: 1.4 },
          0,
        )
        .from(".banner-topline", { y: -20, opacity: 0, duration: 0.7 }, 0.1)
        .from(".banner h1", { y: 64, opacity: 0, duration: 1.05 }, "-=.25")
        .from(
          [".banner-lead", ".banner .form-cta"],
          { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 },
          "-=.55",
        )

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count)
        const decimals = Number(element.dataset.decimals ?? 0)
        const suffix = element.dataset.suffix ?? ""
        const counter = { value: 0 }
        const formatter = new Intl.NumberFormat("es-CO", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })

        element.textContent = `${formatter.format(0)}${suffix}`

        gsap.to(counter, {
          value: target,
          duration: 1.35,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = `${formatter.format(counter.value)}${suffix}`
          },
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        })
      })

      reveal(
        ".timeline-intro",
        [".intro-copy .kicker", ".intro-copy h2", ".intro-copy > p:last-child"],
        { stagger: 0.12 },
      )
      reveal(".summary-stats", ".summary-stats > div", {
        y: 44,
        stagger: 0.12,
      })

      gsap.fromTo(".timeline-progress", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: badges[0],
          endTrigger: badges[badges.length - 1],
          start: "center 55%",
          end: "center 55%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      gsap.utils.toArray<HTMLElement>(".milestone").forEach((item) => {
        const badge = item.querySelector(".year-badge")
        const content = item.querySelectorAll(".milestone-body > *")
        const milestone = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            once: true,
          },
        })

        milestone
          .from(badge, {
            scale: 0.72,
            rotation: -6,
            opacity: 0,
            duration: 0.45,
            ease: "back.out(1.5)",
          })
          .from(
            content,
            {
              y: 24,
              opacity: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.06,
            },
            "-=.24",
          )

        const setBadgeActive = (active: boolean) =>
          gsap.to(badge, {
            scale: active ? 1.08 : 1,
            boxShadow: active
              ? "0 0 0 7px rgba(147, 213, 41, 0.2), 0 12px 28px rgba(18, 37, 29, 0.16)"
              : "0 0 0 2px var(--lime), 0 8px 20px rgba(18, 37, 29, 0.1)",
            duration: active ? 0.24 : 0.18,
            ease: active ? "back.out(1.5)" : "power2.out",
            overwrite: "auto",
          })

        ScrollTrigger.create({
          trigger: badge,
          start: "center 58%",
          end: "center 42%",
          onEnter: () => setBadgeActive(true),
          onLeave: () => setBadgeActive(false),
          onEnterBack: () => setBadgeActive(true),
          onLeaveBack: () => setBadgeActive(false),
        })
      })

      reveal(
        ".closing",
        [
          ".closing .banner-mark",
          ".closing .overline",
          ".closing h2",
          ".closing-description",
          ".closing .form-cta",
          ".closing-visual",
        ],
        {
          y: 46,
          stagger: 0.12,
          scrollTrigger: { start: "top 74%" },
        },
      )
    }, pageRef)

    return () => {
      cancelAnimationFrame(railUpdateFrame)
      resizeObserver?.disconnect()
      window.removeEventListener("load", scheduleTimelineRailUpdate)
      window.removeEventListener("resize", scheduleTimelineRailUpdate)
      ScrollTrigger.removeEventListener("refreshInit", updateTimelineRail)
      context.revert()
    }
  }, [])

  return (
    <main ref={pageRef}>
      <a className="skip-link" href="#linea-de-tiempo">
        Saltar a la línea de tiempo
      </a>

      <header className="banner">
        <div className="banner-image">
          <img
            src="https://images.unsplash.com/photo-1663269275922-6c5af53b317a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWRlbGxpbiUyMENvbG9tYmlhJTIwY2l0eSUyMG1vdW50YWlucyUyMGFyY2hpdGVjdHVyZSUyMGFlcmlhbHxlbnwxfHx8fDE3OTM5NzkwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1600"
            alt="Vista de Medellín entre montañas"
          />
        </div>
        <div className="banner-inner">
          <div className="banner-topline">
            <img src="/images/ruta-n-logo.png" alt="Ruta N Medellín" />
            <span>11 · 11</span>
          </div>
          <div className="banner-copy">
            <h1>El largo camino de una idea</h1>
            <p className="banner-lead">
              Tres siglos de ciencia, tecnología e innovación en Medellín, de la
              villa de montaña al Distrito CTi.
            </p>
            <button className="form-cta" type="button">
              Deja tu huella
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="timeline-intro" id="linea-de-tiempo">
        <div className="section-shell">
          <div className="intro-copy">
            <p className="kicker">Una costumbre de tres siglos</p>
            <h2>Imaginar la ciudad antes de construirla.</h2>
            <p>
              Medellín se convirtió en un distrito de ciencia y tecnología tras
              siglos repitiendo una misma costumbre.
            </p>
          </div>
          <dl className="summary-stats">
            <div>
              <dd data-count="351">351</dd>
              <dt>Años entre la fundación y el laboratorio urbano de hoy</dt>
            </div>
            <div>
              <dd data-count="17">17</dd>
              <dt>Decisiones documentadas que explican la trayectoria</dt>
            </div>
            <div>
              <dd data-count="3" data-suffix="×">
                3×
              </dd>
              <dt>Crecimiento de la inversión en CTeI entre 2009 y 2019</dt>
            </div>
          </dl>
        </div>
      </section>

      <section
        className="timeline"
        aria-label="Seis hitos seleccionados de la historia CTi de Medellín"
      >
        <div className="timeline-rail" aria-hidden="true">
          <i className="timeline-progress" />
        </div>

        {stages.map((stage, stageIndex) => (
          <div className="stage" key={stage.title}>
            <div className="milestone-list">
              {stage.milestones.map((milestone, milestoneIndex) => (
                <article
                  className="milestone section-shell"
                  key={milestone.year}
                >
                  <div className="year-badge">
                    <time dateTime={milestone.year}>{milestone.year}</time>
                  </div>
                  <div
                    className={`milestone-body${
                      milestone.year === "2026" ? " milestone-body--visual" : ""
                    }`}
                  >
                    {milestoneIndex === 0 && (
                      <header
                        className={`stage-header${
                          stageIndex <= 1 ||
                          stageIndex === 2 ||
                          stageIndex === 3 ||
                          stageIndex === stages.length - 1
                            ? " stage-header--visual"
                            : ""
                        }`}
                      >
                        <h2>{stage.title}</h2>
                        <p>{stage.description}</p>
                        {stageIndex <= 1 && (
                          <figure className="stage-visual">
                            <div className="visual-image">
                              <img
                                src={
                                  stageIndex === 0
                                    ? "/images/arrieria-cimientos.webp"
                                    : "/images/medellin-cimientos.webp"
                                }
                                alt={
                                  stageIndex === 0
                                    ? "Arriero junto a dos mulas cargadas con mercancías"
                                    : "Representación isométrica del valle de Medellín entre montañas"
                                }
                                width={stageIndex === 0 ? 1516 : 1797}
                                height={stageIndex === 0 ? 988 : 1336}
                                loading="lazy"
                              />
                            </div>
                            <figcaption>
                              {stageIndex === 0
                                ? "Arriería · La primera red de la región"
                                : "Medellín · Una ciudad entre montañas"}
                            </figcaption>
                          </figure>
                        )}
                        {stageIndex === 2 && (
                          <figure className="stage-visual">
                            <div className="visual-image">
                              <img
                                src="/images/metro-prueba-regreso.webp"
                                alt="Representación isométrica del Metro de Medellín atravesando la ciudad"
                                width="1280"
                                height="960"
                                loading="lazy"
                              />
                            </div>
                            <figcaption>
                              Metro de Medellín · Lo que se mantuvo en pie
                            </figcaption>
                          </figure>
                        )}
                        {stageIndex === 3 && (
                          <figure className="stage-visual">
                            <div className="visual-image">
                              <img
                                src="/images/ruta-n-conocimiento.webp"
                                alt="Vista isométrica del complejo Ruta N en Medellín"
                                width="1118"
                                height="715"
                                loading="lazy"
                              />
                            </div>
                            <figcaption>
                              Ruta N · Un espacio público para el conocimiento
                            </figcaption>
                          </figure>
                        )}
                        {stageIndex === stages.length - 1 && (
                          <figure className="stage-visual">
                            <div className="visual-image">
                              <img
                                src="/images/ruta-n-isometric.webp"
                                alt="Vista isométrica del edificio de Ruta N"
                                width="960"
                                height="839"
                                loading="lazy"
                              />
                            </div>
                            <figcaption>Ruta N · Medellín</figcaption>
                          </figure>
                        )}
                      </header>
                    )}
                    <h3>{milestone.title}</h3>
                    <div className="milestone-details">
                      <p className="milestone-description">
                        {milestone.description}
                      </p>
                      <aside className="impact">
                        <span>Qué deja</span>
                        <p>{milestone.impact}</p>
                      </aside>
                    </div>
                    {milestone.year === "2026" && (
                      <figure className="milestone-stage-visual">
                        <div className="visual-image">
                          <img
                            src="/images/ciudad-laboratorio.webp"
                            alt="Sistema urbano sostenible con pavimento permeable, filtración de agua y una quebrada natural"
                            width="1786"
                            height="872"
                            loading="lazy"
                          />
                        </div>
                        <figcaption>
                          FutuMed · La ciudad como laboratorio
                        </figcaption>
                      </figure>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="closing">
        <div className="closing-inner">
          <div className="closing-copy">
            <span className="banner-mark" aria-hidden="true" />
            <p className="overline">La pregunta que sigue abierta</p>
            <h2>
              ¿Qué estamos dispuestos a empezar hoy, para gente que todavía no
              ha nacido?
            </h2>
            <p className="closing-description">
              Nadie en 1887 podía demostrar que una escuela de ingeniería
              transformaría a un país que apenas abría caminos. Nadie en 1955
              tenía garantías de que una empresa de servicios públicos duraría
              setenta años. Las tomaron igual.
            </p>
            <button className="form-cta closing-cta" type="button">
              Deja tu huella
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <figure className="closing-visual">
            <img
              src="/images/ruta-n-confeti.webp"
              alt="Edificio de Ruta N rodeado de confeti animado"
              width="520"
              height="358"
              loading="lazy"
            />
          </figure>
        </div>
      </section>
    </main>
  )
}
