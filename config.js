// ==========================================================================
// CONFIG.JS - Conteúdo variável do modelo para Harmonizadoras Faciais
// ==========================================================================

export const SITE = {
  doutora: {
    nome: 'Dra. Elena Vasconcelos',
    cidade: 'São Paulo',
    registro: 'CRO/SP 114.892',
    instagram: 'draelenavasconcelos',
    whatsapp: '5511998765432'
  },
  hero: {
    titulo: 'Rejuvenescer sem perder',
    destaque: 'quem você é.',
    cargos: [],
    subtitulo: 'Harmonização facial com técnica refinada, olhar artístico e resultado natural, em São Paulo.',
    cards: [],
    foto: '/img/doutora.webp'
  },
  faixa: ['Beauty', 'Harmonia', 'Naturalidade', 'Elegância', 'Cuidado', 'Confiança'],
  gota: {
    antes: '/img/rosto-envelhecido.webp',
    depois: '/img/rosto-rejuvenescido.webp',
    impacto: { x: 0.46, y: 0.60 },
    titulo: 'Uma gota, e a pele',
    destaque: 'recupera o viço',
    subtitulo: 'Role e veja o ácido hialurônico agir. Cada região do rosto pede uma técnica, e o plano é feito sob medida para você.',
    anel: 'FULL FACE ✦ PREENCHIMENTO LABIAL ✦ PREENCHIMENTO DE MENTO ✦ BOTOX ✦ PREENCHIMENTO DE OLHEIRA ✦ '
  },
  servicos: [
    {
      id: 'labial',
      nome: 'Preenchimento labial',
      foto: '/img/s-labial.webp',
      foco: '44% 56%',
      zoom: 600,
      descricao: 'Contorno, volume e hidratação na medida do seu rosto, respeitando a proporção entre os lábios.',
      beneficio: 'Lábios mais jovens, hidratados e simétricos, com acabamento natural e arco do cupido definido.'
    },
    {
      id: 'mento',
      nome: 'Preenchimento de mento',
      foto: '/img/s-mento.webp',
      foco: '37% 67%',
      zoom: 600,
      descricao: 'Projeta e alinha o queixo para equilibrar o perfil e a harmonia com nariz e mandíbula.',
      beneficio: 'Mais expressão e definição, perfil equilibrado e contorno elegante sem aspecto masculinizado.'
    },
    {
      id: 'full',
      nome: 'Full face',
      foto: '/img/s-full.webp',
      foco: '56% 62%',
      zoom: 260,
      descricao: 'Planejamento completo do rosto, combinando técnicas para rejuvenescer com coerência entre todas as regiões.',
      beneficio: 'Rosto harmônico e descansado, reposição de coxins de gordura e resultado integrado e natural.'
    },
    {
      id: 'botox',
      nome: 'Botox',
      foto: '/img/s-botox.webp',
      foco: '66% 64%',
      zoom: 500,
      descricao: 'Relaxa a musculatura das linhas de expressão da testa e do olhar, sem congelar a sua expressão.',
      beneficio: 'Olhar mais leve, prevenção de rugas estáticas profundas e resultado perceptível em poucos dias.'
    },
    {
      id: 'olheira',
      nome: 'Preenchimento de olheira',
      foto: '/img/s-olheira.webp',
      foco: '58% 63%',
      zoom: 600,
      descricao: 'Suaviza a sombra e o aspecto de cansaço sob os olhos, devolvendo luz e frescor ao olhar.',
      beneficio: 'Olhar descansado, rosto mais iluminado e aparência fresca com cânula de ponta romba segura.'
    }
  ],
  galeria: [
    { src: '/img/g1.webp', legenda: 'Preenchimento labial' },
    { src: '/img/g2.webp', legenda: 'Projeção de mento' },
    { src: '/img/g3.webp', legenda: 'Preenchimento de olheiras' },
    { src: '/img/g4.webp', legenda: 'Full face estruturação' },
    { src: '/img/g5.webp', legenda: 'Botox preventivo' },
    { src: '/img/g6.webp', legenda: 'Sustentação malar' },
    { src: '/img/g7.webp', legenda: 'Definição labial' },
    { src: '/img/g8.webp', legenda: 'Contorno mandibular' }
  ],
  sobre: {
    titulo: 'Beleza é única.',
    destaque: 'O cuidado também.',
    subtitulo: 'Conheça a Dra. Elena Vasconcelos, especialista em harmonização facial em São Paulo.',
    cards: ['Resultado natural', 'Avaliação personalizada', '+5 anos de experiência'],
    frase_inicio: 'Meu trabalho não é mudar você. ',
    frase_destaque: 'É revelar a melhor versão do que já é seu.',
    emocional: 'Acredito que nenhum rosto precisa ser copiado. Cada traço conta uma história, e o meu trabalho é revelar o que já existe em você, com delicadeza e escuta. Quando uma paciente se olha no espelho e se reconhece, mais descansada, mais confiante e ainda assim ela mesma, sei que fiz meu papel. Aqui você não é um procedimento: é uma pessoa com expectativas, receios e um jeito único de ser bonita.',
    tecnico: 'Sou Cirurgiã-Dentista graduada pela USP, com pós-graduação em Harmonização Orofacial e mais de 5 anos de dedicação exclusiva aos procedimentos injetáveis. Também atuo como professora em cursos avançados de anatomia aplicada, priorizando protocolos de biossegurança de nível hospitalar. Cada plano é estruturado a partir de análise fotográfica e mapeamento facial anatômico, respeitando sua proporção e a saúde da pele.',
    numeros: [
      { v: 5, suf: '+', rot: 'anos de experiência' },
      { v: 800, suf: '+', rot: 'pacientes atendidas' },
      { v: 5, suf: '.0', rot: 'avaliação média' }
    ],
    foto: '/img/doutora2.webp'
  },
  instagram: {
    video: '/img/reel.mp4',
    embedId: ''
  },
  feedbacks: [
    {
      nome: 'Mariana Silveira',
      servico: 'Preenchimento labial',
      texto: 'O medo de ficar com a boca artificial era enorme. A Dra. Elena teve uma paciência admirável na consulta, explicou as proporções do meu lábio e o resultado ficou tão sutil que ninguém diz que fiz preenchimento. Só dizem que estou linda e descansada!'
    },
    {
      nome: 'Camila Fernandes',
      servico: 'Preenchimento de olheira',
      texto: 'Parecia que eu não dormia há 5 anos direto por conta das olheiras profundas. Em apenas 30 minutos a sombra escura sumiu e meu olhar ganhou vida nova. Procedimento indolor e sem roxinhos!'
    },
    {
      nome: 'Beatriz Albuquerque',
      servico: 'Full face',
      texto: 'Cheguei aos 46 anos sentindo que meu rosto estava perdendo o contorno. O planejamento Full Face da doutora devolveu a firmeza das minhas bochechas sem me transformar em outra pessoa. Me sinto segura e radiante.'
    },
    {
      nome: 'Juliana Prado',
      servico: 'Botox preventivo',
      texto: 'Minha maior exigência era não ficar com a testa engessada nem perder o sorriso nos olhos. A dosagem foi perfeita! As marcas de preocupação sumiram e continuo gesticulando com total naturalidade.'
    },
    {
      nome: 'Patrícia Mendes',
      servico: 'Preenchimento de mento',
      texto: 'Eu tinha o queixo retraído e detestava fotos de perfil. O alinhamento milimétrico que a Dra. Elena realizou equilibrou meu nariz e alongou o pescoço. O impacto na minha autoestima foi indescritível!'
    },
    {
      nome: 'Renata Castro',
      servico: 'Preenchimento labial & Botox',
      texto: 'O espaço é um refúgio de elegância e tranquilidade. O cuidado no pré, durante e o acompanhamento no pós-procedimento é fora da curva. Dá para sentir o amor e a precisão da doutora em cada detalhe.'
    },
    {
      nome: 'Larissa Fontes',
      servico: 'Full face',
      texto: 'Tinha pavor de ficar com o rosto quadrado como se vê nas redes sociais. A Dra. Elena tem mãos de fada e olhar de artista plástica. Minha pele ficou viçosa e meus traços continuam exatamente os meus.'
    },
    {
      nome: 'Fernanda Rocha',
      servico: 'Harmonização sutil',
      texto: 'A honestidade dela me conquistou no primeiro minuto. Ela me desaconselhou a fazer o que não precisava e sugeriu apenas pequenos toques estratégicos. Essa ética médica é rara hoje em dia!'
    }
  ],
  estudio: {
    fotos: [
      { src: '/img/estudio1.webp', alt: 'Recepção privativa e lounge de acolhimento' },
      { src: '/img/estudio2.webp', alt: 'Consultório clínico com iluminação e tecnologia de ponta' },
      { src: '/img/estudio3.webp', alt: 'Sala de procedimentos injetáveis com biossegurança' },
      { src: '/img/estudio4.webp', alt: 'Estúdio fotográfico para mapeamento e acompanhamento' }
    ],
    endereco: 'Av. Brigadeiro Faria Lima, 3477 - Conj. 112 - Itaim Bibi, São Paulo - SP',
    horario: 'Segunda a Sexta: 08h30 às 19h00 | Sábados: 09h00 às 14h00',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7455848529243!2d-46.68532852377317!3d-23.582987062143093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce575cb2fa8091%3A0x6b490d1f4d9241ee!2sAv.%20Brig.%20Faria%20Lima%2C%203477%20-%20Itaim%20Bibi%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr',
    mapsLink: 'https://maps.google.com/?q=Av.+Brigadeiro+Faria+Lima,+3477+-+Itaim+Bibi,+São+Paulo',
    wazeLink: 'https://waze.com/ul?q=Av.+Brigadeiro+Faria+Lima,+3477+-+São+Paulo',
    uberLink: 'https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Av.+Brigadeiro+Faria+Lima,+3477+-+Itaim+Bibi'
  },
  simulador: {
    antes: '/img/simulador-antes.webp',
    depois: '/img/simulador-depois.webp',
    regioes: {
      labios: [50, 62, 14, 10],
      queixo: [50, 74, 16, 12],
      olhos: [50, 39, 24, 13],
      full: [50, 48, 44, 46]
    }
  },
  faq: [
    {
      p: 'Fico com aspecto artificial?',
      r: 'Não. Nossa filosofia clínica é pautada na naturalidade e na harmonia facial. Trabalhamos com microdoses e técnicas anatômicas para que o resultado realce sua beleza sem que ninguém perceba que houve procedimento.'
    },
    {
      p: 'Quanto tempo dura o resultado?',
      r: 'O ácido hialurônico costuma durar entre 10 e 18 meses, variando de acordo com a região tratada, o metabolismo individual e o estilo de vida. O botox tem durabilidade estimada de 3 a 5 meses.'
    },
    {
      p: 'O procedimento dói?',
      r: 'O desconforto é muito baixo e totalmente suportável. Utilizamos anestésicos tópicos hospitalares de alta performance e os produtos já contêm anestésico (lidocaína) na própria fórmula. Utilizamos cânulas atraumáticas que não lesionam os tecidos.'
    },
    {
      p: 'Qual o tempo de recuperação (downtime)?',
      r: 'Praticamente imediato. Pode ocorrer leve edema ou sensibilidade passageira que regride entre 24 e 48 horas. É possível retomar suas tarefas normais no mesmo dia.'
    },
    {
      p: 'Posso voltar às atividades no mesmo dia?',
      r: 'Sim, suas atividades rotineiras de trabalho podem ser retomadas de imediato. Sugerimos apenas evitar exercícios físicos intensos, calor excessivo ou exposição direta ao sol nas primeiras 24 a 48 horas.'
    },
    {
      p: 'Como sei qual procedimento é para mim?',
      r: 'Você não precisa saber previamente. Na avaliação presencial realizamos uma análise estética e funcional minuciosa do seu rosto, compreendendo suas queixas e desenhando um plano seguro e sob medida.'
    },
    {
      p: 'Quem realiza os procedimentos?',
      r: 'Todos os procedimentos são conduzidos exclusivamente pela Dra. Elena Vasconcelos, desde a análise fotográfica inicial até a aplicação e as revisões periódicas.'
    },
    {
      p: 'Quais os cuidados antes e depois?',
      r: 'Antes: evitar álcool e anti-inflamatórios 24h antes. Depois: não massagear com força as regiões nas primeiras 48h, manter boa hidratação corporal e fazer uso diário de protetor solar.'
    },
    {
      p: 'Posso parcelar o tratamento?',
      r: 'Sim! Oferecemos opções facilitadas em até 12x no cartão de crédito, bem como condições especiais para pagamentos à vista via PIX. Os valores são informados de forma clara e transparente após a avaliação.'
    }
  ],
  analytics: {
    ga4: '',
    pixel: ''
  }
};
