// ==========================================================================
// APP.JS - Lógica de Interatividade, Animações e Motor do Site
// ==========================================================================

import { SITE } from './config.js';

// Utilitários de seleção e cálculo
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ez = (t) => t * t * (3 - 2 * t);
const wa = (t) => `https://wa.me/${SITE.doutora.whatsapp}?text=${encodeURIComponent(t)}`;

// Estado global do simulador
const simState = {
  selected: new Set(),
  intensity: 0.9,
  layers: [],
  activeService: ''
};

// Analytics Tracker
function track(name, data = {}) {
  try {
    if (window.gtag && SITE.analytics.ga4) {
      window.gtag('event', name, data);
    }
    if (window.fbq && SITE.analytics.pixel) {
      window.fbq('trackCustom', name, data);
    }
  } catch (err) {
    // Silencioso em caso de adblocker
  }
}

// --------------------------------------------------------------------------
// 1. Inicialização do Conteúdo a partir de config.js
// --------------------------------------------------------------------------
function initContent() {
  // Document Title & Nav Brand
  $('#navBrand').textContent = SITE.doutora.nome;
  $('#footerNome').textContent = SITE.doutora.nome;
  $('#footerRegistro').textContent = SITE.doutora.registro;
  $('#footerEndereco').textContent = SITE.estudio.endereco;
  $('#footerHorario').textContent = SITE.estudio.horario;
  $('#copyYear').textContent = new Date().getFullYear();

  // WhatsApp Flutuante
  const waUrl = wa('Olá! Vim pelo site e gostaria de saber mais.');
  $('#waFloat').href = waUrl;
  $('#footerWaLink').href = waUrl;
  $('#footerInstaLink').href = `https://instagram.com/${SITE.doutora.instagram}`;

  // Hero Section
  const cargosEl = $('#heroCargos');
  if (cargosEl && SITE.hero.cargos && SITE.hero.cargos.length) {
    cargosEl.innerHTML = SITE.hero.cargos.map((c) => `<span>${c}</span>`).join('');
  } else if (cargosEl) {
    cargosEl.remove();
  }

  $('#heroTitulo').innerHTML = `${SITE.hero.titulo} <span class="au">${SITE.hero.destaque}</span>`;
  $('#heroSubtitulo').textContent = SITE.hero.subtitulo;

  const heroCardsEl = $('#heroCards');
  if (heroCardsEl) heroCardsEl.remove();

  // Faixa Dourada com Rolagem Contínua
  const bandTrack = $('#bandTrack');
  const faixaWords = SITE.faixa.map((w) => `<span>${w}<span class="dot">✦</span></span>`).join('');
  // Duplicar para loop infinito sem fendas
  bandTrack.innerHTML = faixaWords + faixaWords + faixaWords;

  // Gota Section textos
  $('#gotaTitulo').innerHTML = `${SITE.gota.titulo} <span class="au">${SITE.gota.destaque}</span>`;
  $('#gotaSubtitulo').textContent = SITE.gota.subtitulo;
  $('#orbitText').textContent = SITE.gota.anel;

  // 5 Serviços
  const svContainer = $('#sv');
  svContainer.innerHTML = '';
  SITE.servicos.forEach((s) => {
    const card = document.createElement('article');
    card.className = 'svc glass rv';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-expanded', 'false');
    card.innerHTML = `
      <div class="pic" style="background-image: url('${s.foto}'); background-size: ${s.zoom}%; background-position: ${s.foco};" role="img" aria-label="${s.nome}"></div>
      <div class="t">
        <h3>${s.nome}</h3>
        <p>${s.descricao}</p>
        <span class="mo">Ver benefícios +</span>
        <div class="bn">${s.beneficio}</div>
      </div>
    `;

    const toggleService = (e) => {
      // Efeito de onda dourada (ripple) no ponto do clique
      const r = card.getBoundingClientRect();
      const ripple = document.createElement('i');
      ripple.className = 'rpl';
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : r.left + r.width / 2);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : r.top + r.height / 2);
      ripple.style.left = `${clientX - r.left}px`;
      ripple.style.top = `${clientY - r.top}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);

      const isOpening = !card.classList.contains('open');
      $$('.svc.open').forEach((o) => {
        if (o !== card) {
          o.classList.remove('open');
          o.setAttribute('aria-expanded', 'false');
        }
      });

      card.classList.toggle('open');
      card.setAttribute('aria-expanded', isOpening ? 'true' : 'false');
      if (isOpening) {
        track('service_open', { service: s.nome });
      }
    };

    card.addEventListener('click', toggleService);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(e);
      }
    });

    svContainer.appendChild(card);
  });

  // Botão "Conhecer mais serviços"
  $('#btnMaisServicos').onclick = () => {
    track('more_services_click');
    window.open(wa('Olá! Gostaria de conhecer os demais serviços oferecidos pela Dra. Elena.'), '_blank');
  };

  // Galeria de Fotos (sem título ao passar o mouse)
  const galContainer = $('#galeriaGrid');
  galContainer.innerHTML = '';
  SITE.galeria.forEach((g, idx) => {
    const fig = document.createElement('figure');
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('aria-label', 'Ampliar foto');
    fig.innerHTML = `<img src="${g.src}" alt="${g.legenda}" loading="lazy" />`;
    fig.onclick = () => openLightbox(idx);
    fig.onkeydown = (e) => {
      if (e.key === 'Enter') openLightbox(idx);
    };
    galContainer.appendChild(fig);
  });

  // Sobre a Profissional
  $('#sobreTitulo').innerHTML = `${SITE.sobre.titulo} <span class="au">${SITE.sobre.destaque}</span>`;
  $('#sobreSubtitulo').textContent = SITE.sobre.subtitulo;
  $('#sobreFraseInicio').textContent = SITE.sobre.frase_inicio;
  $('#sobreFraseDestaque').textContent = SITE.sobre.frase_destaque;
  $('#sobreEmocional').textContent = SITE.sobre.emocional;
  $('#sobreTecnico').textContent = SITE.sobre.tecnico;
  $('#sobreBtnAgendar').textContent = `Agendar com a ${SITE.doutora.nome}`;

  // Cards sutis inseridos no quadrado Sobre a Profissional
  const sobrePills = $('#sobrePills');
  if (sobrePills && SITE.sobre.cards) {
    sobrePills.innerHTML = SITE.sobre.cards
      .map((card) => `<div class="sobre-pill">${card}</div>`)
      .join('');
  }

  // Instagram Button
  $('#btnInsta').href = `https://instagram.com/${SITE.doutora.instagram}`;
  $('#btnInsta').textContent = `Seguir @${SITE.doutora.instagram} no Instagram`;

  // Feedbacks
  const fbTrack = $('#fbTrack');
  fbTrack.innerHTML = '';
  SITE.feedbacks.forEach((fb) => {
    const card = document.createElement('div');
    card.className = 'feedback-card';
    card.innerHTML = `
      <div>
        <div class="stars-row" aria-label="Avaliação 5 estrelas">
          ${[...Array(5)]
            .map(
              () => `
            <svg class="star-svg" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z"/>
            </svg>`
            )
            .join('')}
        </div>
        <p>“${fb.texto}”</p>
      </div>
      <div class="author-info">
        <strong>${fb.nome}</strong>
        <span>${fb.servico}</span>
      </div>
    `;
    fbTrack.appendChild(card);
  });

  // Estúdio Fotos: Carrossel Infinito com Bordas Douradas
  const estTrack = $('#estudioTrack') || $('#estudioGrid');
  if (estTrack) {
    estTrack.innerHTML = '';
    // Duplicar 4 vezes para carrossel infinito sem fendas
    const loopFotos = [...SITE.estudio.fotos, ...SITE.estudio.fotos, ...SITE.estudio.fotos, ...SITE.estudio.fotos];
    loopFotos.forEach((st) => {
      const item = document.createElement('div');
      item.className = 'estudio-item';
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'group');
      item.setAttribute('aria-label', st.alt);
      item.innerHTML = `
        <img src="${st.src}" alt="${st.alt}" loading="lazy" />
        <div class="estudio-item-caption">
          <span>${st.alt}</span>
        </div>
      `;
      estTrack.appendChild(item);
    });
  }

  // Estúdio Informações & Links
  $('#mapsEmbed').src = SITE.estudio.mapsEmbed;
  $('#estudioEndereco').textContent = SITE.estudio.endereco;
  $('#estudioHorario').textContent = SITE.estudio.horario;
  if ($('#linkMaps')) $('#linkMaps').href = SITE.estudio.mapsLink;

  // FAQ
  const faqContainer = $('#faqAccordion');
  faqContainer.innerHTML = '';
  SITE.faq.forEach((item) => {
    const det = document.createElement('details');
    det.className = 'faq-item';
    det.innerHTML = `
      <summary>
        <span>${item.p}</span>
        <span class="faq-icon" aria-hidden="true">+</span>
      </summary>
      <div class="faq-answer">
        <p>${item.r}</p>
      </div>
    `;

    // Acordeão: fechar os outros ao abrir um
    det.addEventListener('toggle', () => {
      if (det.open) {
        $$('.faq-item', faqContainer).forEach((other) => {
          if (other !== det) other.removeAttribute('open');
        });
      }
    });

    faqContainer.appendChild(det);
  });

  $('#btnFaqWa').href = wa('Olá! Tenho uma dúvida sobre os procedimentos de harmonização facial.');

  // Preencher Select do Formulário
  const formServico = $('#formServico');
  formServico.innerHTML = '';
  SITE.servicos.forEach((s) => {
    const opt = document.createElement('option');
    opt.value = s.nome;
    opt.textContent = s.nome;
    formServico.appendChild(opt);
  });
  const optAinda = document.createElement('option');
  optAinda.value = 'Ainda não sei, quero uma avaliação';
  optAinda.textContent = 'Ainda não sei, quero uma avaliação completa';
  formServico.appendChild(optAinda);
}

// --------------------------------------------------------------------------
// 2. Animação da Gota de Ácido Hialurônico (Sessão 8.3)
// --------------------------------------------------------------------------
function initDropAnimation() {
  const c2 = $('#s2');
  const stg = $('#stg');
  const circ = $('#circ');
  const hang = $('#hang');
  const fall = $('#fall');
  const hl = $('#hl');
  const front = $('#front');
  const yc = $('#yc');
  const rip = $('#rip');
  const lb = $('#lb');

  if (!c2 || !stg || !circ) return;

  const IX = SITE.gota.impacto.x;
  const IY = SITE.gota.impacto.y;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 9 gotículas do respingo
  const SP = [...Array(9)].map((_, i) => {
    const d = document.createElement('i');
    d.className = 'sp';
    stg.appendChild(d);
    return {
      d,
      a: Math.PI * (0.12 + (0.76 * i) / 8),
      v: 52 + (i % 3) * 24
    };
  });

  // Gota pendurada com filete largo na base (fl), pescoço (nw) e bulbo (bw) até comprimento L
  const hangPath = (x, L, nw, bw) => {
    if (L < 2) return '';
    const fl = nw + 26;
    const by = Math.max(L - bw, 2);
    return (
      `M${x - fl} 0C${x - nw - 4} 3 ${x - nw} ${L * 0.1} ${x - nw} ${L * 0.3}C${x - nw} ${L * 0.55} ${x - bw} ${L * 0.5} ${x - bw} ${by}` +
      `A${bw} ${bw} 0 0 0 ${x + bw} ${by}C${x + bw} ${L * 0.5} ${x + nw} ${L * 0.55} ${x + nw} ${L * 0.3}C${x + nw} ${L * 0.1} ${x + nw + 4} 3 ${x + fl} 0Z`
    );
  };

  // Gota em queda esticada por s
  const dropPath = (x, y, r, s) =>
    `M${x} ${y - r * 1.9 * s}C${x + r * 0.15} ${y - r * s} ${x + r} ${y - r * 0.5} ${x + r} ${y}A${r} ${r} 0 0 1 ${x - r} ${y}C${x - r} ${y - r * 0.5} ${x - r * 0.15} ${y - r * s} ${x} ${y - r * 1.9 * s}Z`;

  function tick() {
    const r = c2.getBoundingClientRect();
    const a = cl(1 - r.top / window.innerHeight); // aproximação da divisão
    const p = still ? 1 : cl(-r.top / (r.height - window.innerHeight)); // progresso dentro da sessão fixa

    const s = stg.getBoundingClientRect();
    const cb = circ.getBoundingClientRect();
    const ix = cb.left - s.left + IX * cb.width;
    const iy = cb.top - s.top + IY * cb.height;

    let L = 0,
      nw = 15,
      bw = 9;

    if (still) {
      hang.setAttribute('d', '');
      fall.setAttribute('d', '');
      hl.setAttribute('rx', '0');
    } else {
      if (p <= 0) {
        const k = ez(cl((a - 0.45) / 0.55));
        L = 8 + k * 97;
        bw = 8 + k * 18;
        nw = 15 - k * 3;
      } else if (p < 0.1) {
        const k = p / 0.1;
        L = 105 + k * 30;
        bw = 26 + k * 6;
        nw = 12 - k * 9;
      } else {
        const k = ez(cl((p - 0.1) / 0.05));
        L = (1 - k) * 40;
        bw = 7;
        nw = 7 * (1 - k) + 2;
      }
      hang.setAttribute('d', hangPath(ix, L, nw, bw));

      let fy = 0,
        fr = 0,
        fs = 1;
      if (p >= 0.1 && p < 0.43) {
        const k = cl((p - 0.1) / 0.3);
        const y0 = 104;
        fy = y0 + (iy - y0) * k * k;
        fr = 32 * (1 - 0.1 * k);
        fs = 1 + 0.55 * k;
        if (p >= 0.4) fr *= 1 - (p - 0.4) / 0.03;
      }

      if (fr > 0) {
        fall.setAttribute('d', dropPath(ix, fy, fr, fs));
        hl.setAttribute('cx', `${ix - fr * 0.35}`);
        hl.setAttribute('cy', `${fy - fr * 0.15}`);
        hl.setAttribute('rx', `${fr * 0.16}`);
        hl.setAttribute('ry', `${fr * 0.42}`);
      } else {
        fall.setAttribute('d', '');
        hl.setAttribute('rx', '0');
      }
    }

    // Ondas e respingo no impacto (p = 0.40)
    rip.style.left = `${ix}px`;
    rip.style.top = `${iy}px`;
    rip.style.setProperty('--k', still || p < 0.4 || p > 0.62 ? '0' : `${cl((p - 0.4) / 0.2)}`);

    SP.forEach((o) => {
      const t = cl((p - 0.4) / 0.1);
      if (still || t <= 0 || t >= 1) {
        o.d.style.opacity = '0';
        return;
      }
      o.d.style.opacity = `${1 - t}`;
      o.d.style.transform = `translate(${ix + Math.cos(o.a) * o.v * t * 1.4}px, ${iy - Math.sin(o.a) * o.v * t * 1.5 + t * t * 70}px)`;
    });

    // Transformação em círculo a partir do impacto
    const R = Math.hypot(cb.width, cb.height);
    const rk = still ? 1 : ez(cl((p - 0.4) / 0.36));
    yc.style.clipPath = `circle(${rk * R}px at ${IX * 100}% ${IY * 100}%)`;

    front.style.width = `${2 * rk * R}px`;
    front.style.height = `${2 * rk * R}px`;
    front.style.opacity = rk > 0 && rk < 0.98 ? '1' : '0';
    lb.textContent = rk > 0.5 ? 'Depois' : 'Antes';
  }

  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  window.addEventListener('load', tick);
  tick();
}

// --------------------------------------------------------------------------
// 3. Maré de Ondas e Gotas em Ascensão (Sessão 8.4)
// --------------------------------------------------------------------------
function initTideAndDrops() {
  const tide = $('#tide');
  const sv = $('#servicos');
  const dpsContainer = $('#dps');

  if (!tide || !sv || !dpsContainer) return;

  function tp() {
    const r = sv.getBoundingClientRect();
    const progress = cl(1 - (r.top - window.innerHeight * 0.2) / (window.innerHeight * 0.9));
    tide.style.setProperty('--tp', `${progress}`);
  }

  window.addEventListener('scroll', tp, { passive: true });
  tp();

  // Gerar 14 gotas de gel flutuantes
  dpsContainer.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const d = document.createElement('i');
    const z = 12 + Math.random() * 32;
    d.className = 'dp';
    d.style.cssText = `
      left: ${Math.random() * 96}%;
      width: ${z}px;
      height: ${z * 1.25}px;
      animation-duration: ${12 + Math.random() * 14}s;
      animation-delay: ${-Math.random() * 20}s;
      opacity: ${0.35 + Math.random() * 0.5};
      --sw: ${(Math.random() - 0.5) * 120}px;
    `;
    dpsContainer.appendChild(d);
  }
}

// --------------------------------------------------------------------------
// 4. Simulador Facial Interativo e Formulário Qualificado (Sessão 8.11)
// --------------------------------------------------------------------------
function initSimulatorAndForm() {
  const sim = $('#sim');
  const opts = $('#simOpts');
  const scan = $('#scanLine');
  const intensityInput = $('#simIntensity');
  const simVal = $('#simVal');
  const formNome = $('#formNome');
  const formServico = $('#formServico');
  const formData = $('#formData');
  const formHorario = $('#formHorario');
  const formQueixa = $('#formQueixa');
  const waPreviewText = $('#waPreviewText');
  const previewTime = $('#previewTime');
  const btnSendWa = $('#btnSendWa');
  const btnCopyMsg = $('#btnCopyMsg');
  const grpNome = $('#grpNome');

  if (formData) {
    formData.min = new Date().toISOString().split('T')[0];
  }

  if (!sim || !opts || !scan) return;

  const R = SITE.simulador.regioes;
  const G = (x, y, rx, ry) => `radial-gradient(ellipse ${rx}% ${ry}% at ${x}% ${y}%, #000 40%, transparent 100%)`;

  const SM = [
    ['Mais boca', 'Preenchimento labial', G(...R.labios)],
    ['Mais queixo', 'Preenchimento de mento', G(...R.queixo)],
    ['Olhar descansado', 'Preenchimento de olheira', G(...R.olhos)],
    ['Rejuvenescer tudo', 'Full face', 'linear-gradient(#000, #000)']
  ];

  simState.layers = [];
  opts.innerHTML = '';

  SM.forEach((m, i) => {
    const o = document.createElement('div');
    o.className = 'lay ov';
    o.style.maskImage = m[2];
    o.style.webkitMaskImage = m[2];
    sim.insertBefore(o, scan);
    simState.layers.push(o);

    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = m[0];
    b.onclick = () => {
      if (simState.selected.has(i)) {
        simState.selected.delete(i);
        b.classList.remove('on');
      } else {
        simState.selected.add(i);
        b.classList.add('on');
      }
      applySimulation();
    };
    opts.appendChild(b);
  });

  function applySimulation() {
    const v = Number(intensityInput.value) / 100;
    simState.intensity = v;
    simVal.textContent = `${intensityInput.value}%`;

    simState.layers.forEach((layer, idx) => {
      layer.style.opacity = simState.selected.has(idx) ? `${v}` : '0';
    });

    const activeIndices = [...simState.selected];
    if (activeIndices.length > 0) {
      formServico.value = SM[activeIndices[0]][1];
      track('simulator_region_select', { region: SM[activeIndices[0]][0] });
    }
    updateMessagePreview();
  }

  intensityInput.oninput = applySimulation;

  // Linha de laser varrendo uma vez ao entrar em tela
  new IntersectionObserver(
    ([e], o) => {
      if (e.isIntersecting) {
        sim.classList.add('go');
        o.disconnect();
      }
    },
    { threshold: 0.45 }
  ).observe(sim);

  // Form Live Message Formatting
  function buildMessage() {
    const activeList = [...simState.selected].map((i) => SM[i][0].toLowerCase()).join(', ');
    const nomeVal = formNome.value.trim() || '[seu nome]';
    const servicoVal = formServico.value;
    const horarioVal = formHorario.value;
    const queixaVal = formQueixa.value.trim() || '[conte aqui o que mais te incomoda]';

    let dataTexto = '';
    if (formData && formData.value) {
      const [ano, mes, dia] = formData.value.split('-');
      dataTexto = `${dia}/${mes}/${ano}`;
    }

    let msg = `Olá! Meu nome é ${nomeVal}.\n`;
    msg += `Tenho interesse em: ${servicoVal}.\n`;
    if (dataTexto) {
      msg += `Dia de preferência: ${dataTexto}.\n`;
    }
    msg += `Melhor período: ${horarioVal}.\n`;
    msg += `O que mais me incomoda: ${queixaVal}.`;

    if (activeList) {
      msg += `\nNa simulação do site, quis: ${activeList}.`;
    }
    msg += `\nEnvio minha foto a seguir no WhatsApp para uma pré-avaliação personalizada.`;

    return msg;
  }

  function updateMessagePreview() {
    waPreviewText.textContent = buildMessage();
    const now = new Date();
    previewTime.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  ['input', 'change'].forEach((ev) => {
    $('#bookingForm').addEventListener(ev, () => {
      if (formNome.value.trim()) {
        grpNome.classList.remove('has-error');
      }
      updateMessagePreview();
    });
  });

  updateMessagePreview();

  // Enviar pelo WhatsApp
  btnSendWa.onclick = () => {
    if (!formNome.value.trim()) {
      grpNome.classList.add('has-error');
      formNome.focus();
      return;
    }
    track('form_submit', {
      service: formServico.value,
      time: formHorario.value
    });
    window.open(wa(buildMessage()), '_blank');
  };

  // Copiar Mensagem
  btnCopyMsg.onclick = () => {
    navigator.clipboard.writeText(buildMessage()).then(() => {
      showToast('Mensagem copiada para a área de transferência!');
      track('copy_message_click');
    });
  };
}

// --------------------------------------------------------------------------
// 5. Lightbox Modal da Galeria
// --------------------------------------------------------------------------
let currentLightboxIdx = 0;

function openLightbox(idx) {
  currentLightboxIdx = idx;
  const modal = $('#lightboxModal');
  const img = $('#lightboxImg');
  const caption = $('#lightboxCaption');

  const item = SITE.galeria[idx];
  img.src = item.src;
  img.alt = item.legenda;
  if (caption) caption.textContent = '';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  track('gallery_lightbox_open', { item: item.legenda });
}

function closeLightbox() {
  const modal = $('#lightboxModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function nextLightbox() {
  currentLightboxIdx = (currentLightboxIdx + 1) % SITE.galeria.length;
  openLightbox(currentLightboxIdx);
}

function prevLightbox() {
  currentLightboxIdx = (currentLightboxIdx - 1 + SITE.galeria.length) % SITE.galeria.length;
  openLightbox(currentLightboxIdx);
}

function initLightbox() {
  $('#lightboxClose').onclick = closeLightbox;
  $('#lightboxNext').onclick = nextLightbox;
  $('#lightboxPrev').onclick = prevLightbox;

  $('#lightboxModal').onclick = (e) => {
    if (e.target === $('#lightboxModal')) closeLightbox();
  };

  window.addEventListener('keydown', (e) => {
    if (!$('#lightboxModal').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightbox();
    if (e.key === 'ArrowLeft') prevLightbox();
  });
}

// --------------------------------------------------------------------------
// 6. Contadores Animados da Sessão Sobre
// --------------------------------------------------------------------------
function initCounters() {
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const suf = el.dataset.suf || '';

    new IntersectionObserver(
      ([e], o) => {
        if (!e.isIntersecting) return;
        o.disconnect();

        const t0 = performance.now();
        (function f(n) {
          const k = Math.min(1, (n - t0) / 1600);
          const current = end * (1 - Math.pow(1 - k, 3));
          el.textContent = (end % 1 === 0 ? Math.round(current) : current.toFixed(1)) + suf;
          if (k < 1) requestAnimationFrame(f);
        })(t0);
      },
      { threshold: 0.6 }
    ).observe(el);
  });
}

// --------------------------------------------------------------------------
// 7. Instagram Reels: Autoplay quando em tela e Controle de Som
// --------------------------------------------------------------------------
function initReels() {
  const v = $('#reel');
  const soundBtn = $('#sound');

  if (!v || !soundBtn) return;

  new IntersectionObserver(
    ([e]) => {
      if (e.isIntersecting) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    },
    { threshold: 0.4 }
  ).observe(v);

  soundBtn.onclick = () => {
    v.muted = !v.muted;
    const icon = $('#soundIcon');
    if (v.muted) {
      icon.innerHTML =
        '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
    } else {
      icon.innerHTML =
        '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    }
    track('reel_sound_toggle', { muted: v.muted });
  };
}

// --------------------------------------------------------------------------
// 8. Feedbacks: Carrossel e Estrelas Douradas Sequenciais
// --------------------------------------------------------------------------
function initFeedbacks() {
  const trackEl = $('#fbTrack');
  const prevBtn = $('#fbPrev');
  const nextBtn = $('#fbNext');

  if (!trackEl || !prevBtn || !nextBtn) return;

  const cardWidth = () => {
    const card = $('.feedback-card', trackEl);
    if (!card) return 320;
    const style = window.getComputedStyle(trackEl);
    const gap = parseFloat(style.gap) || 16;
    return card.getBoundingClientRect().width + gap;
  };

  prevBtn.onclick = () => {
    trackEl.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
  };

  nextBtn.onclick = () => {
    trackEl.scrollBy({ left: cardWidth(), behavior: 'smooth' });
  };

  // Preenchimento sequencial das 5 estrelas em cada card que entra na viewport
  const starObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stars = $$('.star-svg', entry.target);
          stars.forEach((star, i) => {
            setTimeout(() => {
              star.classList.add('filled');
            }, i * 110);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  $$('.feedback-card', trackEl).forEach((c) => starObserver.observe(c));
}

// --------------------------------------------------------------------------
// 9. Timeline de Atendimento (Educativa) com Linha Dourada Animada
// --------------------------------------------------------------------------
function initTimeline() {
  const tlBox = $('#tlBox');
  const tlPath = $('#tlPath');
  const steps = $$('.timeline-step', tlBox);

  if (!tlBox || !tlPath) return;

  const pathLength = 600;
  tlPath.style.strokeDasharray = `${pathLength}`;
  tlPath.style.strokeDashoffset = `${pathLength}`;

  function onScroll() {
    const r = tlBox.getBoundingClientRect();
    const h = window.innerHeight;
    const progress = cl((h * 0.75 - r.top) / (r.height * 0.95));
    tlPath.style.strokeDashoffset = `${pathLength * (1 - progress)}`;

    steps.forEach((step, idx) => {
      const stepRect = step.getBoundingClientRect();
      if (stepRect.top < h * 0.65) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --------------------------------------------------------------------------
// 10. Efeitos Globais: Scroll Progress, Cursor, Toast e Mobile Curtain
// --------------------------------------------------------------------------
function initGlobalEffects() {
  // Barra de progresso de scroll
  const progressBar = $('#scroll-progress');
  window.addEventListener(
    'scroll',
    () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    },
    { passive: true }
  );

  // Revelação de elementos (.rv)
  $$('.rv').forEach((el) => {
    new IntersectionObserver(
      ([e], o) => {
        if (e.isIntersecting) {
          el.classList.add('v');
          o.disconnect();
        }
      },
      { threshold: 0.15 }
    ).observe(el);
  });

  // Cursor customizado Desktop
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = $('#cDot');
    const follow = $('#cFollow');
    let mouseX = -100,
      mouseY = -100;
    let followX = -100,
      followY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursor() {
      followX += (mouseX - followX) * 0.18;
      followY += (mouseY - followY) * 0.18;
      follow.style.transform = `translate(${followX}px, ${followY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expandir cursor sobre links e botões
    $$('a, button, .svc, figure, input, select, textarea').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        follow.style.width = '48px';
        follow.style.height = '48px';
        follow.style.backgroundColor = 'rgba(184, 146, 74, 0.12)';
      });
      el.addEventListener('mouseleave', () => {
        follow.style.width = '32px';
        follow.style.height = '32px';
        follow.style.backgroundColor = 'transparent';
      });
    });
  }

  // Menu Cortina Mobile
  const navToggle = $('#navToggle');
  const curtain = $('#mobileCurtain');
  navToggle.onclick = () => {
    const isOpen = curtain.classList.contains('active');
    curtain.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  $$('.m-link').forEach((link) => {
    link.onclick = () => {
      curtain.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };
  });
}

// Toast Notifier
function showToast(text) {
  const toast = $('#toastMsg');
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

// Smooth scroll Lenis (se disponível)
function initSmoothScroll() {
  if (window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

// --------------------------------------------------------------------------
// Execução Principal após carregamento da página
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initContent();
  initDropAnimation();
  initTideAndDrops();
  initSimulatorAndForm();
  initLightbox();
  initCounters();
  initReels();
  initFeedbacks();
  initTimeline();
  initGlobalEffects();
  initSmoothScroll();
});
