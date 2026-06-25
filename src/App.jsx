import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

/* =====================================================
   Ícones de linha (estilo premium contemporâneo)
   ===================================================== */
const ico = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}
const Svg = ({ children, size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...ico} aria-hidden="true">
    {children}
  </svg>
)
const IconCup = (p) => (
  <Svg {...p}>
    <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
    <path d="M17 9h2.2a2.3 2.3 0 0 1 0 4.6H17" />
    <path d="M7 2.5c-.6.8-.6 1.7 0 2.5M11 2.5c-.6.8-.6 1.7 0 2.5M21 21H3" />
  </Svg>
)
const IconHeart = (p) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.4-9.2-8.6C1.2 8.2 2.7 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c3.3 0 4.8 3.2 3.2 6.4C19 15.6 12 20 12 20Z" />
  </Svg>
)
const IconPin = (p) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.6-6.5-10.5A6.5 6.5 0 0 1 18.5 10.5C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </Svg>
)
const IconClock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
)
const IconPhone = (p) => (
  <Svg {...p}>
    <path d="M6.5 3.5h3l1.3 3.4-2 1.4a11 11 0 0 0 4.9 4.9l1.4-2 3.4 1.3v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />
  </Svg>
)
const IconCroissant = (p) => (
  <Svg {...p}>
    <path d="M4.5 15.5 9 14l1.2-4.2L14 8.5l1.5-4.5c2.8.6 5 2.8 5.6 5.6L16.5 11l-1.3 3.8L11 16l-1.5 4.5C6.7 19.9 4.5 17.7 3.9 15Z" />
    <path d="M9 14l-4.5 1.5M14 8.5 15.5 4M11 16l-1.8 4.4" />
  </Svg>
)
const IconHome = (p) => (
  <Svg {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M5.5 9.5V19a1 1 0 0 0 1 1H10v-4.5h4V20h3.5a1 1 0 0 0 1-1V9.5" />
  </Svg>
)
const IconSmile = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" />
  </Svg>
)
const IconArrow = (p) => (
  <Svg {...p} size={p.size || 18}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
)
const IconCheck = (p) => (
  <Svg {...p} size={p.size || 20}>
    <path d="M4 12.5 9 17.5 20 6.5" />
  </Svg>
)
const IconChevron = (p) => (
  <Svg {...p}>
    <path d="M15 6l-6 6 6 6" />
  </Svg>
)
const IconLeaf = (p) => (
  <Svg {...p}>
    <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 13" />
    <path d="M5 19c2-4 4.5-6.5 8.5-8.5" />
  </Svg>
)
const IconMusic = (p) => (
  <Svg {...p}>
    <path d="M9 18V6l10-2v11" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="15" r="2.5" />
  </Svg>
)
const IconChat = (p) => (
  <Svg {...p}>
    <path d="M4 5.5h16v10H9l-4 3.5v-3.5H4Z" />
    <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
  </Svg>
)
const IconStar = ({ half = false, filled = true }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id={`half-${half}`}>
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.2l1-5.9L3.5 9.2l5.9-.8L12 3Z"
      fill={filled ? 'currentColor' : half ? `url(#half-${half})` : 'none'}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
)
const IconInstagram = (p) => (
  <Svg {...p} size={p.size || 20}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </Svg>
)
const IconFacebook = (p) => (
  <Svg {...p} size={p.size || 20}>
    <path d="M14.5 7.5h2V4.5h-2.3C12 4.5 11 6 11 8v1.5H9V12.5h2V20h3v-7.5h2.3L17 9.5h-3V8c0-.4.2-.5.5-.5Z" />
  </Svg>
)
const IconWhatsapp = (p) => (
  <Svg {...p} size={p.size || 20}>
    <path d="M4 20l1.2-3.6A7.5 7.5 0 1 1 8 19l-4 1Z" />
    <path d="M9 9c0 3 3 6 6 6 .8 0 1.4-1 1-1.6l-1.4-.9-1 1c-1.2-.4-2.1-1.3-2.5-2.5l1-1-.9-1.4C10.6 8 9.6 8.2 9 9Z" />
  </Svg>
)

/* =====================================================
   Dados — conteúdo da casa
   ===================================================== */
const HERO_HIGHLIGHTS = [
  { icon: IconCup, label: 'Café de qualidade' },
  { icon: IconHeart, label: 'Feito com carinho' },
  { icon: IconPin, label: 'No coração de São Brás' },
]

const STATS = [
  { icon: IconLeaf, value: '+13', label: 'anos de história' },
  { icon: IconCup, value: '100%', label: 'café selecionado' },
  { icon: IconHeart, value: 'Feito', label: 'com carinho' },
]

const FEATURES = [
  { icon: IconCup, title: 'Cafés especiais', desc: 'Grãos selecionados' },
  { icon: IconCroissant, title: 'Salgados & doces', desc: 'Receitas que acolhem' },
  { icon: IconHome, title: 'Ambiente acolhedor', desc: 'Clima de casa' },
  { icon: IconSmile, title: 'Atendimento', desc: 'Sempre atencioso' },
]

const SABORES = [
  { img: '/assets/images/espresso.jpg', nome: 'Espresso', desc: 'Intenso e marcante, como deve ser.' },
  { img: '/assets/images/cafe-arte.jpg', nome: 'Cappuccino', desc: 'Cremoso, aromático e irresistível.' },
  { img: '/assets/images/cappuccino-xicara.jpg', nome: 'Café coado', desc: 'Simples, tradicional e reconfortante.' },
  { img: '/assets/images/pao-de-queijo.jpg', nome: 'Pão de queijo', desc: 'Quentinho, macio e perfeito.' },
]

// Cardápio editorial — combinações por momento de consumo (seção "Sabores da casa")
const CARDAPIO = [
  {
    icon: IconClock,
    titulo: 'Para começar o dia',
    combos: ['Espresso + pão de queijo', 'Café coado + bolo simples'],
  },
  {
    icon: IconCup,
    titulo: 'Para uma pausa sem pressa',
    combos: ['Cappuccino + doce da vitrine', 'Café com leite + empada'],
  },
  {
    icon: IconChat,
    titulo: 'Para conversar',
    combos: ['Café coado + salgado da casa', 'Cappuccino + pão de queijo'],
  },
  {
    icon: IconLeaf,
    titulo: 'Para o calor de Belém',
    combos: ['Bebida gelada + sanduíche', 'Suco natural + quitute da vitrine'],
  },
]

const AMBIENTE_ITENS = [
  { icon: IconLeaf, label: 'Espaço climatizado' },
  { icon: IconMusic, label: 'Música ambiente' },
  { icon: IconChat, label: 'Ideal para conversar e relaxar' },
]

// Galeria editorial do espaço — ordem define o mosaico (g1 = destaque).
const GALERIA = [
  { img: '/assets/images/interior-salao.jpg', alt: 'Salão interno da Nestor Café', legenda: 'Nosso salão' },
  { img: '/assets/images/balcao-vitrine.jpg', alt: 'Balcão e vitrine de salgados', legenda: 'Balcão & vitrine' },
  { img: '/assets/images/cappuccino-mesa.jpg', alt: 'Cappuccino servido na mesa', legenda: 'Café na mesa' },
  { img: '/assets/images/fachada-rua.jpg', alt: 'Fachada da Nestor Café em São Brás', legenda: 'Nossa fachada' },
  { img: '/assets/images/salao-amplo.jpg', alt: 'Salão amplo e iluminado', legenda: 'Espaço amplo' },
  { img: '/assets/images/mesa-cafe.jpg', alt: 'Mesa posta com café e companhia', legenda: 'Pausa do dia' },
]

// Conteúdo de exemplo — substituir por depoimentos reais da casa.
const DEPOIMENTOS = [
  { nota: 5, texto: 'O melhor cappuccino de Belém! Ambiente acolhedor e atendimento sempre impecável.', autor: 'Juliana M.' },
  { nota: 5, texto: 'Lugar que virou rotina. Café delicioso, tudo fresquinho e feito com carinho.', autor: 'Carlos A.' },
  { nota: 4.5, texto: 'Me sinto em casa sempre que venho aqui. Recomendo demais!', autor: 'Mariana S.' },
  { nota: 5, texto: 'Pão de queijo perfeito e um café da tarde que vale a pausa no dia.', autor: 'Rafael T.' },
  { nota: 4.5, texto: 'Atendimento humano, mesa tranquila e aquele aroma que vem do balcão.', autor: 'Beatriz L.' },
  { nota: 5, texto: 'A esquina mais aconchegante de São Brás. Sempre volto.', autor: 'André P.' },
]

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Nestor+Caf%C3%A9+Travessa+14+de+Abril+1473+S%C3%A3o+Br%C3%A1s+Bel%C3%A9m+PA'

function Stars({ nota }) {
  const full = Math.floor(nota)
  const half = nota % 1 >= 0.5
  return (
    <span className="stars" aria-label={`${nota} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} filled={i < full} half={!half ? false : i === full} />
      ))}
    </span>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [depo, setDepo] = useState(0)
  const [perView, setPerView] = useState(3)
  const heroTitleRef = useRef(null)

  // ---- carrossel: itens por visão (responsivo) ----
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth
      setPerView(w <= 720 ? 1 : w <= 1024 ? 2 : 3)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  // ---- trava o scroll do body enquanto o menu mobile está aberto ----
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const maxDepo = Math.max(0, DEPOIMENTOS.length - perView)
  const depoIdx = Math.min(depo, maxDepo)

  // ---- carrossel: avanço automático ----
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setDepo((d) => (d >= maxDepo ? 0 : d + 1))
    }, 6000)
    return () => clearInterval(id)
  }, [maxDepo])

  // ---- movimento / scroll suave / reveals ----
  useEffect(() => {
    document.documentElement.classList.add('js')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const header = document.querySelector('.site-header')
    const toTopBtn = document.getElementById('toTop')
    const progress = document.getElementById('scrollProgress')

    let lenis = null
    let ctx = null

    function setProgress() {
      if (!progress) return
      const d = document.documentElement
      const max = d.scrollHeight - d.clientHeight
      progress.style.transform = `scaleX(${max > 0 ? d.scrollTop / max : 0})`
    }
    function onScroll() {
      const y = window.scrollY || document.documentElement.scrollTop
      header?.classList.toggle('scrolled', y > 30)
      toTopBtn?.classList.toggle('show', y > 600)
      setProgress()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    toTopBtn?.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0)
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    // deslocamento único para todas as âncoras: considera APENAS a altura real do
    // header fixo + um respiro, descontando o padding-top da própria seção — assim
    // o título aparece ~28px abaixo do menu, sem o bloco vazio do padding interno.
    const ANCHOR_GAP = 28
    function anchorOffset(target) {
      const headerH = header?.offsetHeight || 0
      const padTop = parseFloat(getComputedStyle(target).paddingTop) || 0
      return padTop - headerH - ANCHOR_GAP
    }

    function smoothAnchors(scrollFn) {
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
          const id = a.getAttribute('href')
          if (!id || id.length < 2) return
          const target = document.querySelector(id)
          if (!target) return
          e.preventDefault()
          setMenuOpen(false)
          scrollFn(target)
        })
      })
    }

    function initFallback() {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
      )
      document.querySelectorAll('.reveal').forEach((n) => io.observe(n))
      smoothAnchors((target) => {
        const y = target.getBoundingClientRect().top + window.scrollY + anchorOffset(target)
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' })
      })
    }

    function initMotion() {
      gsap.registerPlugin(ScrollTrigger)
      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
      lenis.on('scroll', () => {
        ScrollTrigger.update()
        onScroll()
      })
      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
      smoothAnchors((target) => lenis.scrollTo(target, { offset: anchorOffset(target) }))

      // divide o título do hero em palavras para a revelação
      const h1 = heroTitleRef.current
      let words = []
      if (h1 && !h1.querySelector('.word')) {
        const lines = h1.innerHTML.split(/<br\s*\/?>/i)
        h1.innerHTML = lines
          .map((line) => {
            const ital = /<em>/i.test(line)
            const text = line.replace(/<\/?em>/gi, '').trim()
            const ws = text
              .split(/\s+/)
              .map((w) => `<span class="word"><i>${w}</i></span>`)
              .join(' ')
            return `<span class="line${ital ? ' ital' : ''}">${ws}</span>`
          })
          .join('')
        words = h1.querySelectorAll('.word i')
      }
      document.querySelectorAll('.hero .reveal').forEach((el) => el.classList.add('in'))

      ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
          .from('.hero-bg', { opacity: 0, scale: 1.12, duration: 1.7, ease: 'power2.out' }, 0)
          .from('.hero-overlay', { opacity: 0, duration: 1.2 }, 0)
          .from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.7 }, 0.3)
          .from(words, { yPercent: 120, stagger: 0.05, duration: 1.0 }, '-=0.35')
          .from('.hero-sub', { y: 18, opacity: 0, duration: 0.8 }, '-=0.55')
          .from('.hero-actions > *', { y: 16, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.5')
          .from('.hero-highlights li', { y: 14, opacity: 0, stagger: 0.1, duration: 0.6 }, '-=0.4')
          .from('.hero-scroll', { opacity: 0, y: 12, duration: 0.8 }, '-=0.3')

        gsap.utils.toArray('.parallax-media').forEach((media) => {
          const img = media.querySelector('img')
          if (!img) return
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        const revealEls = gsap.utils.toArray('.reveal').filter((el) => !el.closest('.hero'))
        ScrollTrigger.batch(revealEls, {
          start: 'top 88%',
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: true,
            }),
        })
      })

      window.addEventListener('load', () => ScrollTrigger.refresh())
    }

    if (!prefersReduced) initMotion()
    else initFallback()
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      lenis?.destroy()
      ctx?.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const go = (n) => setDepo((d) => Math.min(Math.max(0, d + n), maxDepo))

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

      {/* ---------- header ---------- */}
      <header className="site-header" id="topo">
        <div className="header-inner">
          <a href="#topo" className="brand" aria-label="Nestor Café — início">
            <span className="brand-mark" aria-hidden="true">
              <img src="/nestor-header-icon-48.png" alt="" className="brand-logo" />
            </span>
            <span className="brand-text">
              <span className="brand-name">Nestor Café</span>
              <span className="brand-tag">desde 2013</span>
            </span>
          </a>

          <nav className={`nav ${menuOpen ? 'open' : ''}`} id="nav">
            <a href="#inicio">Início</a>
            <a href="#historia">Nossa História</a>
            <a href="#o-cafe">O Café</a>
            <a href="#sabores">Sabores</a>
            <a href="#ambiente">Ambiente</a>
            <a href="#visite" className="nav-cta">Visite-nos</a>
          </nav>

          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className="hero" id="inicio">
        <div className="hero-bg">
          <picture>
            <source media="(max-width: 720px)" srcSet="/assets/images/hero-mobile.jpg" />
            <img
              className="hero-bg-img"
              src="/assets/images/hero-desktop.jpg"
              alt="Interior da Nestor Café em São Brás: balcão, azulejos, vitrine e luz quente"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <div className="container hero-content">
          <p className="hero-eyebrow reveal">Nestor Café · São Brás, Belém · desde 2013</p>
          <h1 className="hero-title" ref={heroTitleRef}>
            Um café onde o tempo<br />
            <em>passa mais devagar</em>
          </h1>
          <p className="hero-sub reveal">
            Café quente, conversa tranquila e o aroma que vem do balcão.<br />
            Uma pausa em São Brás, na Travessa 14 de Abril.
          </p>
          <div className="hero-actions reveal">
            <a href="#historia" className="btn btn-hero">Conheça a nossa história</a>
            <a href="#sabores" className="btn btn-hero-ghost">Ver cardápio</a>
          </div>

          <ul className="hero-highlights">
            {HERO_HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label}>
                <Icon size={22} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <a className="hero-scroll" href="#historia" aria-label="Rolar para descobrir">
          <span className="hero-scroll-line" aria-hidden="true"></span>
          <span className="hero-scroll-txt">explore</span>
        </a>
      </section>

      {/* ---------- nossa história ---------- */}
      <section className="section historia" id="historia">
        <div className="container historia-grid">
          <div className="historia-media parallax-media reveal">
            <img src="/assets/images/cappuccino-pao.jpg" alt="Cappuccino e pão de queijo na Nestor Café" loading="lazy" />
          </div>

          <div className="historia-text reveal">
            <span className="kicker">Nossa história</span>
            <h2>
              Mais que um café,<br />
              <em>um lugar para ficar</em>
            </h2>
            <p>
              Desde 2013, o Nestor Café faz parte da rotina de quem vive e visita São Brás.
              Aqui, cada detalhe é pensado para receber bem: do café passado na hora ao sorriso no balcão.
            </p>
            <p>
              Seja para um rápido espresso ou uma conversa que se alonga pela tarde, você sempre será bem-vindo.
            </p>
            <a href="#o-cafe" className="text-link">
              Conheça o nosso café <IconArrow />
            </a>
          </div>

          <ul className="stats">
            {STATS.map(({ icon: Icon, value, label }) => (
              <li className="stat-card reveal" key={label}>
                <span className="stat-ico"><Icon size={22} /></span>
                <span className="stat-value">{value}</span>
                <span className="stat-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* faixa de diferenciais */}
        <div className="container">
          <ul className="feature-bar reveal">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <li key={title}>
                <Icon size={26} />
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- sabores ---------- */}
      <section className="section sabores" id="o-cafe">
        <div className="container sabores-grid">
          <div className="sabores-intro reveal">
            <span className="kicker">O café, servido sem pressa</span>
            <h2>
              Nossos sabores para<br />
              <em>todos os momentos</em>
            </h2>
            <a href="#sabores" className="btn btn-primary">Ver cardápio completo</a>
          </div>

          <div className="sabores-cards">
            {SABORES.map((s) => (
              <article className="sabor-card reveal" key={s.nome}>
                <div className="sabor-ph"><img src={s.img} alt={s.nome} loading="lazy" /></div>
                <div className="sabor-body">
                  <h3>{s.nome}</h3>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- sabores da casa (cardápio editorial) ---------- */}
      <section className="section cardapio" id="sabores">
        <div className="container">
          <div className="section-head center reveal">
            <span className="kicker">Cardápio &amp; combinações</span>
            <h2>Sabores <em>da casa</em></h2>
            <p className="cardapio-sub">
              Escolha pelo momento: um espresso rápido, um cappuccino sem pressa
              ou algo doce para acompanhar a conversa.
            </p>
          </div>

          <div className="cardapio-grid">
            {CARDAPIO.map(({ icon: Icon, titulo, combos }) => (
              <article className="cardapio-card reveal" key={titulo}>
                <span className="cardapio-ico"><Icon size={22} /></span>
                <h3>{titulo}</h3>
                <ul className="cardapio-combos">
                  {combos.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ambiente ---------- */}
      <section className="section ambiente" id="ambiente">
        <span className="ambiente-steam" aria-hidden="true"><IconCup size={220} /></span>
        <div className="container">
          <div className="ambiente-head">
            <div className="ambiente-text reveal">
              <span className="kicker">Ambiente</span>
              <h2>
                Sinta-se<br />
                <em>em casa</em>
              </h2>
              <p>
                Um ambiente aconchegante, detalhes que contam histórias e o cheirinho de café que abraça.
              </p>
            </div>

            <div className="ambiente-aside reveal">
              <ul className="check-list">
                {AMBIENTE_ITENS.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <span className="check-ico"><IconCheck size={18} /></span>
                    {label}
                  </li>
                ))}
              </ul>
              <a href="#ambiente-galeria" className="text-link">
                Conheça nosso espaço <IconArrow />
              </a>
            </div>
          </div>

          <div className="ambiente-gallery reveal" id="ambiente-galeria">
            {GALERIA.map((g, i) => (
              <figure className={`gal-item g${i + 1}`} key={g.img}>
                <img src={g.img} alt={g.alt} loading="lazy" />
                <figcaption>{g.legenda}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- depoimentos ---------- */}
      <section className="section depoimentos" id="galeria">
        <div className="container">
          <div className="section-head center reveal on-dark">
            <span className="kicker">Quem vem, aprova</span>
            <h2>Pequenas memórias servidas à mesa</h2>
          </div>

          <div className="depo-carousel reveal">
            <button className="depo-arrow prev" onClick={() => go(-1)} aria-label="Anterior" disabled={depoIdx === 0}>
              <IconChevron />
            </button>

            <div className="depo-viewport">
              <div
                className="depo-track"
                style={{ transform: `translateX(-${depoIdx * (100 / perView)}%)` }}
              >
                {DEPOIMENTOS.map((d, i) => (
                  <div className="depo-slide" style={{ flex: `0 0 ${100 / perView}%` }} key={i}>
                    <figure className="depo-card">
                      <Stars nota={d.nota} />
                      <blockquote>“{d.texto}”</blockquote>
                      <figcaption>{d.autor}</figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            <button className="depo-arrow next" onClick={() => go(1)} aria-label="Próximo" disabled={depoIdx >= maxDepo}>
              <IconChevron style={{ transform: 'rotate(180deg)' }} />
            </button>
          </div>

          <div className="depo-dots">
            {Array.from({ length: maxDepo + 1 }).map((_, i) => (
              <button
                key={i}
                className={`depo-dot ${i === depoIdx ? 'active' : ''}`}
                onClick={() => setDepo(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
          <p className="placeholder-note">Depoimentos ilustrativos, faremos a substituição pelos comentários reais da casa assim que o projeto for aprovado.</p>
        </div>
      </section>

      {/* ---------- visite ---------- */}
      <section className="section visite" id="visite">
        <div className="container visite-grid">
          <div className="visite-text reveal">
            <span className="kicker">Onde estamos</span>
            <h2>Venha nos visitar!</h2>
            <p>Estamos no coração de São Brás, pertinho de você.</p>

            <ul className="visite-info">
              <li>
                <span className="visite-ico"><IconPin size={22} /></span>
                <div>
                  <strong>Travessa 14 de Abril, 1473</strong>
                  <span>São Brás, Belém — PA</span>
                </div>
              </li>
              <li>
                <span className="visite-ico"><IconClock size={22} /></span>
                <div>
                  <strong>Seg a Sáb · 7h às 19h</strong>
                  <span>Dom · 8h às 14h</span>
                </div>
              </li>
            </ul>

            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Como chegar
            </a>
          </div>

          <div className="visite-map reveal">
            <iframe
              title="Mapa da Nestor Café"
              src="https://www.google.com/maps?q=Travessa+14+de+Abril+1473+S%C3%A3o+Br%C3%A1s+Bel%C3%A9m+PA&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* ---------- fechamento ---------- */}
      <section className="section closing" id="fechamento">
        <div className="container closing-inner reveal">
          <h2 className="closing-quote">
            Alguns cafés a gente toma.<br />
            Outros, a gente guarda na memória.
          </h2>
          <p className="closing-sub">Nestor Café, desde 2013, fazendo parte da sua história.</p>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light">
            Fale conosco
          </a>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#topo" className="brand">
              <span className="brand-mark" aria-hidden="true">
                <img src="/nestor-header-icon-48.png" alt="" className="brand-logo" />
              </span>
              <span className="brand-text">
                <span className="brand-name">Nestor Café</span>
                <span className="brand-tag">desde 2013</span>
              </span>
            </a>
            <p className="footer-tag">Café quente, conversa tranquila e o aroma que vem do balcão.</p>
          </div>

          <div className="footer-col">
            <h4>Navegação</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#historia">Nossa História</a></li>
              <li><a href="#o-cafe">O Café</a></li>
              <li><a href="#sabores">Sabores</a></li>
              <li><a href="#ambiente">Ambiente</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <p className="footer-contact"><IconPhone size={18} /> (91) 9 1234-5678</p>
            <div className="footer-social">
              <a href="https://instagram.com/nestor.cafe" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFacebook /></a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IconWhatsapp /></a>
            </div>
            <p className="footer-mail">contato@nestorcafe.com.br</p>
          </div>

          <div className="footer-col">
            <h4>Funcionamento</h4>
            <p>Seg a Sáb · 7h às 19h<br />Dom · 8h às 14h</p>
            <p className="footer-addr">Travessa 14 de Abril, São Brás<br />Belém — PA</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Nestor Café. Todos os direitos reservados.</p>
          <p className="footer-credit">Desenvolvido por Ane com <span aria-hidden="true">♥</span></p>
        </div>
      </footer>

      <button className="to-top" id="toTop" aria-label="Voltar ao topo">↑</button>
    </>
  )
}

export default App
