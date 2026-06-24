import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

function App() {
useEffect(() => {
  document.documentElement.classList.add('js')

  const CAFE = [
    { img: "/assets/images/espresso.jpg", nome: "Espresso", desc: "Curto, intenso e honesto. O começo de quase toda boa conversa." },
    { img: "/assets/images/cafe-arte.jpg", nome: "Cappuccino", desc: "Cremoso, quente e feito para acompanhar uma conversa demorada." },
    { img: "/assets/images/cappuccino-xicara.jpg", nome: "Café coado", desc: "O café de sempre, na xícara da casa, do jeito que se toma sem pressa." },
    { img: "/assets/images/pao-de-queijo.jpg", nome: "Pão de queijo", desc: "Quentinho, macio por dentro. Pede uma segunda unidade." },
    { img: "/assets/images/empadas.jpg", nome: "Empadas", desc: "Da vitrine para a mesa, com aquele recheio de tarde tranquila." },
    { img: "/assets/images/doce.jpg", nome: "Doces da vitrine", desc: "Pequenos finais felizes para quem ainda quer ficar mais um pouco." },
    { img: "/assets/images/bebida-gelada.jpg", nome: "Bebidas geladas", desc: "Para os dias de calor de Belém, sem perder o aconchego." },
    { img: "/assets/images/cappuccino-mesa.jpg", nome: "Café da tarde", desc: "Um cappuccino, um quitute e a sensação rara de tempo sobrando." }
  ]

  const GALERIA = [
    { img: "/assets/images/fachada-principal.jpg", cap: "A fachada que guarda histórias", cls: "big" },
    { img: "/assets/images/cappuccino-mesa.jpg", cap: "O primeiro café da tarde", cls: "tall" },
    { img: "/assets/images/pao-de-queijo.jpg", cap: "Pão de queijo ainda quente", cls: "" },
    { img: "/assets/images/interior-salao.jpg", cap: "Luz baixa, conversa longa", cls: "wide" },
    { img: "/assets/images/cafe-arte.jpg", cap: "Uma pausa no meio do dia", cls: "" },
    { img: "/assets/images/balcao-vitrine.jpg", cap: "O balcão que recebe quem chega", cls: "tall" },
    { img: "/assets/images/fachada-corner.jpg", cap: "Detalhes de São Brás", cls: "" },
    { img: "/assets/images/cappuccino-pao.jpg", cap: "Café e quitute, sem pressa", cls: "wide" },
    { img: "/assets/images/maquina.jpg", cap: "De onde vem o aroma", cls: "" },
    { img: "/assets/images/empadas.jpg", cap: "Da vitrine para a mesa", cls: "" },
    { img: "/assets/images/salao-amplo.jpg", cap: "Um canto para cada conversa", cls: "wide" },
    { img: "/assets/images/cappuccino-alto.jpg", cap: "O cappuccino da casa", cls: "tall" },
    { img: "/assets/images/sanduiche.jpg", cap: "Para acompanhar o café", cls: "" },
    { img: "/assets/images/doce-chocolate.jpg", cap: "Um final doce", cls: "" },
    { img: "/assets/images/fachada-rua.jpg", cap: "A esquina de sempre", cls: "wide" }
  ]

  const SABORES = [
    { titulo: "Cafés quentes", itens: ["Espresso", "Espresso duplo", "Café coado", "Cappuccino da casa", "Pingado e café com leite"] },
    { titulo: "Cafés gelados", itens: ["Café gelado", "Cappuccino gelado", "Milkshakes", "Bebidas geladas do dia"] },
    { titulo: "Salgados", itens: ["Pão de queijo", "Empadas", "Sanduíches", "Salgados da vitrine"] },
    { titulo: "Doces", itens: ["Doces da vitrine", "Bolos caseiros", "Sobremesas do dia", "Petit gâteau"] },
    { titulo: "Opções para acompanhar", itens: ["Sucos naturais", "Torradas", "Tapiocas", "Quitutes da casa"] }
  ]

  const cafeGrid = document.getElementById('cafeGrid')
  const mosaic = document.getElementById('galleryMosaic')
  const menuEd = document.getElementById('menuEditorial')

  if (cafeGrid && cafeGrid.children.length === 0) {
    CAFE.forEach((c) => {
      cafeGrid.insertAdjacentHTML('beforeend', `
        <article class="cafe-card reveal">
          <div class="ph"><img src="${c.img}" alt="${c.nome} na Nestor Café" loading="lazy"></div>
          <div class="body"><h3>${c.nome}</h3><p>${c.desc}</p></div>
        </article>
      `)
    })
  }

  if (mosaic && mosaic.children.length === 0) {
    GALERIA.forEach((g, i) => {
      mosaic.insertAdjacentHTML('beforeend', `
        <figure class="g-item ${g.cls} reveal" data-index="${i}">
          <img src="${g.img}" alt="${g.cap}" loading="lazy">
          <figcaption class="cap"><span>${g.cap}</span></figcaption>
        </figure>
      `)
    })
  }

  if (menuEd && menuEd.children.length === 0) {
    SABORES.forEach((s) => {
      menuEd.insertAdjacentHTML('beforeend', `
        <div class="menu-block reveal">
          <h3>${s.titulo}</h3>
          <ul>${s.itens.map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>
      `)
    })
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const header = document.querySelector('.site-header')
  const toTopBtn = document.getElementById('toTop')
  const progress = document.getElementById('scrollProgress')
  const toggle = document.getElementById('menuToggle')
  const nav = document.getElementById('nav')
  const lb = document.getElementById('lightbox')
  const lbImg = document.getElementById('lbImg')
  const lbCap = document.getElementById('lbCap')

  let lenis = null
  let ctx = null
  let lbIndex = 0

  function setProgress() {
    if (!progress) return
    const d = document.documentElement
    const max = d.scrollHeight - d.clientHeight
    const p = max > 0 ? d.scrollTop / max : 0
    progress.style.transform = `scaleX(${p})`
  }

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop
    header?.classList.toggle('scrolled', y > 30)
    toTopBtn?.classList.toggle('show', y > 600)
    setProgress()
  }

  function closeMenu() {
    nav?.classList.remove('open')
    toggle?.classList.remove('open')
    toggle?.setAttribute('aria-expanded', 'false')
  }

  const onToggleClick = () => {
    const open = nav?.classList.toggle('open')
    toggle?.classList.toggle('open', open)
    toggle?.setAttribute('aria-expanded', String(open))
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  toggle?.addEventListener('click', onToggleClick)

  toTopBtn?.addEventListener('click', () => {
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  function openLb(i) {
    if (!lb || !lbImg || !lbCap) return
    lbIndex = (i + GALERIA.length) % GALERIA.length
    const g = GALERIA[lbIndex]
    lbImg.src = g.img
    lbImg.alt = g.cap
    lbCap.textContent = g.cap
    lb.classList.add('open')
    lb.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
    if (lenis) lenis.stop()
  }

  function closeLb() {
    lb?.classList.remove('open')
    lb?.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
    if (lenis) lenis.start()
  }

  mosaic?.querySelectorAll('.g-item').forEach((item) => {
    item.addEventListener('click', () => openLb(parseInt(item.dataset.index, 10)))
  })

  document.getElementById('lbClose')?.addEventListener('click', closeLb)
  document.getElementById('lbNext')?.addEventListener('click', () => openLb(lbIndex + 1))
  document.getElementById('lbPrev')?.addEventListener('click', () => openLb(lbIndex - 1))

  lb?.addEventListener('click', (e) => {
    if (e.target === lb) closeLb()
  })

  document.addEventListener('keydown', (e) => {
    if (!lb?.classList.contains('open')) return
    if (e.key === 'Escape') closeLb()
    if (e.key === 'ArrowRight') openLb(lbIndex + 1)
    if (e.key === 'ArrowLeft') openLb(lbIndex - 1)
  })

  function smoothAnchors(scrollFn) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href')
        if (!id || id.length < 2) return
        const target = document.querySelector(id)
        if (!target) return
        e.preventDefault()
        closeMenu()
        scrollFn(target)
      })
    })
  }

  function initFallback() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.reveal').forEach((n) => io.observe(n))

    smoothAnchors((target) => {
      const y = target.getBoundingClientRect().top + window.scrollY - 70
      window.scrollTo({ top: y, behavior: 'smooth' })
    })
  }

  function initMotion() {
    gsap.registerPlugin(ScrollTrigger)

    lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })

    lenis.on('scroll', () => {
      ScrollTrigger.update()
      onScroll()
    })

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    smoothAnchors((target) => lenis.scrollTo(target, { offset: -70 }))

    document.querySelectorAll('.hero .reveal').forEach((elm) => elm.classList.add('in'))

    const h1 = document.querySelector('.hero-title')
    let words = []

    if (h1) {
      if (!h1.querySelector('.word')) {
        const lines = h1.innerHTML.split(/<br\s*\/?>/i)
        h1.innerHTML = lines.map((line) => {
          const ital = /<em>/i.test(line)
          const text = line.replace(/<\/?em>/gi, '').trim()
          const ws = text.split(/\s+/).map((w) => `<span class="word"><i>${w}</i></span>`).join(' ')
          return `<span class="line${ital ? ' ital' : ''}">${ws}</span>`
        }).join('')
      }
      words = h1.querySelectorAll('.word i')
    }

    ctx = gsap.context(() => {
    gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
      .from('.hero-bg', { opacity: 0, scale: 1.12, duration: 1.7, ease: 'power2.out' }, 0)
      .from('.hero-overlay', { opacity: 0, duration: 1.2 }, 0)
      .from('.hero-eyebrow', { y: 18, opacity: 0, duration: 0.7 }, 0.3)
      .from(words, { yPercent: 120, stagger: 0.05, duration: 1.0 }, '-=0.35')
      .from('.hero-sub', { y: 18, opacity: 0, duration: 0.8 }, '-=0.55')
      .from('.hero-actions .btn', { y: 16, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.5')
      .from('.hero-scroll', { opacity: 0, y: 12, duration: 0.8 }, '-=0.3')

    gsap.utils.toArray('.split-media').forEach((media) => {
      const img = media.querySelector('img')
      if (!img) return
      media.classList.add('has-parallax')
      img.classList.add('parallax-img')
      gsap.fromTo(img, { yPercent: -7 }, {
        yPercent: 7,
        ease: 'none',
        scrollTrigger: {
          trigger: media,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })
    })

    const revealSection = document.querySelector('.reveal-section')
    if (revealSection) {
      revealSection.classList.add('motion')
      const stage = revealSection.querySelector('.reveal-stage')
      const cover = revealSection.querySelector('.reveal-cover')
      const port = revealSection.querySelector('.reveal-port')
      const portImg = port?.querySelector('img')
      const hint = revealSection.querySelector('.reveal-hint')
      const openCap = revealSection.querySelector('.reveal-open-cap')

      const POSTER_AR = 1536 / 1024
      const CX_PCT = 0.70
      const CY_PCT = 0.60
      const geo = { cx: 0, cy: 0, rMax: 600 }
      const clip = { r: 0 }

      function measure() {
        if (!stage) return
        const sw = stage.clientWidth
        const sh = stage.clientHeight
        let rw, rh
        if (sw / sh > POSTER_AR) {
          rh = sh
          rw = sh * POSTER_AR
        } else {
          rw = sw
          rh = sw / POSTER_AR
        }
        const offX = (sw - rw) / 2
        const offY = (sh - rh) / 2
        geo.cx = offX + CX_PCT * rw
        geo.cy = offY + CY_PCT * rh
        let m = 0
        const corners = [
  [0, 0],
  [sw, 0],
  [0, sh],
  [sw, sh],
]

corners.forEach(([x, y]) => {
          const d = Math.hypot(x - geo.cx, y - geo.cy)
          if (d > m) m = d
        })
        geo.rMax = m + 24
      }

      function applyClip() {
        if (!port) return
        const c = `circle(${clip.r}px at ${geo.cx}px ${geo.cy}px)`
        port.style.clipPath = c
        port.style.webkitClipPath = c
      }

      measure()
      applyClip()

      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: revealSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      })
        .to(clip, { r: () => geo.rMax, onUpdate: applyClip }, 0)
        .fromTo(portImg, { scale: 1.08 }, { scale: 1.0 }, 0)
        .to(hint, { opacity: 0 }, 0.06)
        .to(cover, { opacity: 0 }, 0.86)
        .to(openCap, { opacity: 1 }, 0.78)

      window.addEventListener('resize', () => {
        measure()
        applyClip()
      })
    }

    const revealEls = gsap.utils.toArray('.reveal').filter((elm) => !elm.closest('.hero'))
    ScrollTrigger.batch(revealEls, {
      start: 'top 86%',
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        overwrite: true
      })
    })
    })

    window.addEventListener('load', () => ScrollTrigger.refresh())
  }

  if (!prefersReduced) initMotion()
  else initFallback()

  onScroll()

  return () => {
    window.removeEventListener('scroll', onScroll)
    toggle?.removeEventListener('click', onToggleClick)
    lenis?.destroy()
    ctx?.revert()
    ScrollTrigger.getAll().forEach((t) => t.kill())
  }
}, [])

  return (
    <>
      <div className="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

      <header className="site-header" id="topo">
        <div className="header-inner">
          <a href="#topo" className="brand" aria-label="Nestor Café — início">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
                <path d="M8 13h13v6a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-6Z" stroke="currentColor" strokeWidth="1.4" />
                <path d="M21 14h2.5a2.5 2.5 0 0 1 0 5H21" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 9c-.6-1 .4-1.8 0-3M14.5 9c-.6-1 .4-1.8 0-3M18 9c-.6-1 .4-1.8 0-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7 27h17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="brand-text">
              <span className="brand-name">Nestor Café</span>
              <span className="brand-tag">desde 2013</span>
            </span>
          </a>

          <nav className="nav" id="nav">
            <a href="#inicio">Início</a>
            <a href="#historia">Nossa História</a>
            <a href="#o-cafe">O Café</a>
            <a href="#sabores">Sabores</a>
            <a href="#ambiente">Ambiente</a>
            <a href="#visite" className="nav-cta">Visite-nos</a>
          </nav>

          <button className="menu-toggle" id="menuToggle" aria-label="Abrir menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-bg">
          <picture>
            <source media="(max-width: 720px)" srcSet="/assets/images/hero-mobile.jpg" />
            <img className="hero-bg-img" src="/assets/images/hero-desktop.jpg" alt="Interior da Nestor Café em São Brás: balcão, azulejos, vitrine e luz quente" fetchPriority="high" />
          </picture>
        </div>
        <div className="hero-overlay" aria-hidden="true"></div>

        <div className="hero-content">
          <p className="hero-eyebrow reveal">Nestor Café · São Brás, Belém · desde 2013</p>
          <h1 className="hero-title">Um café onde o tempo<br /><em>passa mais devagar</em></h1>
          <p className="hero-sub reveal">
            Café quente, conversa tranquila e o aroma que vem do balcão.
            Uma pausa em São Brás, na Travessa 14 de Abril.
          </p>
          <div className="hero-actions reveal">
            <a href="#historia" className="btn btn-hero">Conheça a história</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Nestor+Caf%C3%A9+Travessa+14+de+Abril+1473+S%C3%A3o+Br%C3%A1s+Bel%C3%A9m+PA" target="_blank" rel="noopener noreferrer" className="btn btn-hero-ghost">Como chegar</a>
          </div>
        </div>

        <a className="hero-scroll" href="#bairro" aria-label="Rolar para descobrir">
          <span className="hero-scroll-line" aria-hidden="true"></span>
          <span className="hero-scroll-txt">explore</span>
        </a>
      </section>

      <section className="section bairro" id="bairro">
        <div className="container split">
          <div className="split-media reveal">
            <img src="/assets/images/cappuccino-mesa.jpg" alt="Cappuccino servido sobre mesa de azulejos na Nestor Café" loading="lazy" />
          </div>
          <div className="split-text reveal">
            <span className="kicker">Uma cafeteria de bairro</span>
            <p className="lead">Há lugares que não precisam fazer barulho para serem lembrados.</p>
            <p>
              A Nestor Café é um desses cantos de Belém onde o café chega quente,
              o ambiente convida à conversa e cada mesa parece guardar uma pequena história.
              Entre a rotina de São Brás e o aroma que vem do balcão, a casa se tornou
              refúgio para quem procura uma pausa com sabor de permanência.
            </p>
            <p className="signature">uma pausa em São Brás</p>
          </div>
        </div>
      </section>

      <section className="reveal-section" id="entre" aria-label="Entre na Nestor Café">
        <div className="reveal-stage">
          <img className="reveal-cover" src="/assets/images/poster-transparente.png" alt="Nestor Café — café quente, conversa tranquila, em São Brás" loading="lazy" />
          <figure className="reveal-port">
            <img src="/assets/images/cafe-interior-amplo.jpg" alt="Interior da Nestor Café" loading="lazy" />
          </figure>
          <p className="reveal-hint">role para abrir a casa</p>
          <figcaption className="reveal-open-cap"><span>Nestor Café · São Brás, Belém</span></figcaption>
        </div>
      </section>

      <section className="section historia" id="historia">
        <div className="container">
          <div className="section-head center reveal">
            <span className="kicker">Nossa história</span>
            <h2>Desde outubro de 2013</h2>
            <p className="section-intro">
              Fundada em outubro de 2013, a Nestor Café nasceu com vocação simples:
              servir bons cafés, bons salgados e bons momentos. Com o tempo, tornou-se
              ponto de encontro para quem passa pelo bairro, para quem trabalha por perto
              e para quem acredita que um café da tarde ainda pode ser um pequeno ritual.
            </p>
          </div>

          <div className="timeline reveal">
            <div className="tl-item">
              <span className="tl-year">2013</span>
              <h3>A casa abre as portas</h3>
              <p>Em São Brás, uma cafeteria começa a servir café quente e a juntar gente ao redor do balcão.</p>
            </div>
            <div className="tl-item">
              <span className="tl-year">Hoje</span>
              <h3>Um refúgio no meio da cidade</h3>
              <p>Um lugar para cafés, encontros e pausas, onde a primeira visita já tem gosto de costume.</p>
            </div>
            <div className="tl-item">
              <span className="tl-year">Amanhã</span>
              <h3>Uma história que continua</h3>
              <p>Escrita por quem senta, conversa e volta. Cada xícara guarda um pedaço do que ainda está por vir.</p>
            </div>
          </div>

          <p className="history-note reveal">
            Esta é uma narrativa institucional inicial. A história verdadeira da casa será
            contada em breve, com as memórias de quem a viveu de dentro.
          </p>
        </div>
      </section>

      <section className="section o-cafe" id="o-cafe">
        <div className="container">
          <div className="section-head reveal">
            <span className="kicker">O cardápio da casa</span>
            <h2>O café, servido sem pressa</h2>
            <p className="section-intro">
              Pequenas coisas feitas com cuidado. Cada item é preparado para acompanhar
              uma conversa, um intervalo ou um fim de tarde sem relógio.
            </p>
          </div>
          <div className="cafe-grid" id="cafeGrid"></div>
        </div>
      </section>

      <section className="section conversar" id="ambiente">
        <div className="container split reverse">
          <div className="split-text reveal">
            <span className="kicker">Um lugar para conversar</span>
            <p className="lead">A luz baixa, as mesas próximas e o aroma de café.</p>
            <p>
              Na Nestor, o café combina com reunião tranquila, conversa de fim de tarde,
              pausa entre compromissos e encontros que não precisam de pressa.
            </p>
            <ul className="feature-list">
              <li>Reuniões tranquilas e cafés de trabalho</li>
              <li>Conversas de fim de tarde sem hora para acabar</li>
              <li>Uma pausa entre os compromissos do dia</li>
            </ul>
          </div>
          <div className="split-media stack reveal">
            <img className="stack-a" src="/assets/images/interior-salao.jpg" alt="Salão interno da Nestor Café" loading="lazy" />
            <img className="stack-b" src="/assets/images/balcao-vitrine.jpg" alt="Balcão e vitrine de salgados da Nestor Café" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section galeria" id="galeria">
        <div className="container">
          <div className="section-head center reveal">
            <span className="kicker">Galeria afetiva</span>
            <h2>Pequenas memórias servidas à mesa</h2>
            <p className="section-intro">Um mural de instantes da casa. Passe o olhar com calma.</p>
          </div>
          <div className="gallery-mosaic" id="galleryMosaic"></div>
        </div>
      </section>

      <section className="section sabores" id="sabores">
        <div className="container">
          <div className="section-head center reveal">
            <span className="kicker">À mesa</span>
            <h2>Sabores da casa</h2>
            <p className="section-intro">Um cardápio que muda conforme o dia e a vitrine.</p>
          </div>

          <div className="menu-editorial" id="menuEditorial"></div>
          <p className="menu-note reveal">Consulte no balcão as opções do dia.</p>
        </div>
      </section>

      <section className="section visite" id="visite">
        <div className="container split">
          <div className="visit-card reveal">
            <span className="kicker">O endereço</span>
            <h2>Venha tomar um café com a gente</h2>
            <address className="visit-address">
              <strong>Nestor Café</strong><br />
              Travessa 14 de Abril, 1473<br />
              São Brás, Belém — PA
            </address>

            <div className="hours">
              <h3>Horários</h3>
              <ul>
                <li><span>Segunda a sexta</span><span>7h às 19h</span></li>
                <li><span>Sábado</span><span>8h às 17h30</span></li>
                <li><span>Domingo</span><span>consulte funcionamento</span></li>
              </ul>
              <p className="hours-note">Horários sujeitos a alteração. Confirme antes da visita.</p>
            </div>

            <a href="https://www.google.com/maps/search/?api=1&query=Nestor+Caf%C3%A9+Travessa+14+de+Abril+1473+S%C3%A3o+Br%C3%A1s+Bel%C3%A9m+PA" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Abrir no Google Maps</a>
          </div>

          <div className="visit-map reveal">
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

      <section className="section closing" id="fechamento">
        <div className="container center">
          <div className="closing-inner reveal">
            <span className="closing-ornament" aria-hidden="true">✦</span>
            <h2 className="closing-quote">Alguns cafés a gente toma.<br />Outros a gente guarda na memória.</h2>
            <p className="closing-sub">Entre, sente-se e deixe o dia desacelerar por alguns minutos.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Nestor+Caf%C3%A9+Travessa+14+de+Abril+1473+S%C3%A3o+Br%C3%A1s+Bel%C3%A9m+PA" target="_blank" rel="noopener noreferrer" className="btn btn-light">Visitar a Nestor Café</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <span className="brand-name">Nestor Café</span>
            <p className="footer-tag">Café, pausa e memória em São Brás.</p>
          </div>
          <div className="footer-col">
            <h4>Onde estamos</h4>
            <p>Travessa 14 de Abril, 1473<br />São Brás, Belém — PA</p>
          </div>
          <div className="footer-col">
            <h4>Encontre a casa</h4>
            <p>
              <a href="https://instagram.com/nestor.cafe" target="_blank" rel="noopener noreferrer">Instagram @nestor.cafe</a><br />
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
            </p>
          </div>
          <div className="footer-col">
            <h4>Horários</h4>
            <p>Seg a sex · 7h às 19h<br />Sábado · 8h às 17h30<br />Domingo · consulte</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Site criado como homenagem à história da casa.</p>
          <p className="footer-credit">© {new Date().getFullYear()} Nestor Café · São Brás, Belém — PA</p>
        </div>
      </footer>

      <button className="to-top" id="toTop" aria-label="Voltar ao topo">↑</button>

      <div className="lightbox" id="lightbox" aria-hidden="true">
        <button className="lb-close" id="lbClose" aria-label="Fechar">×</button>
        <button className="lb-prev" id="lbPrev" aria-label="Anterior">‹</button>
        <figure className="lb-figure">
          <img id="lbImg" src="" alt="" />
          <figcaption id="lbCap"></figcaption>
        </figure>
        <button className="lb-next" id="lbNext" aria-label="Próxima">›</button>
      </div>
    </>
  )
}

export default App
