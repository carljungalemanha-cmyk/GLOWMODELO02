// ==========================================================================
// SRC/CONFIG.TS - TypeScript definitions and mirror for SITE configuration
// ==========================================================================

export interface DoctorInfo {
  nome: string;
  cidade: string;
  registro: string;
  instagram: string;
  whatsapp: string;
}

export interface HeroConfig {
  titulo: string;
  destaque: string;
  cargos: string[];
  subtitulo: string;
  cards: string[];
  foto: string;
}

export interface GotaConfig {
  antes: string;
  depois: string;
  impacto: { x: number; y: number };
  titulo: string;
  destaque: string;
  subtitulo: string;
  anel: string;
}

export interface ServicoItem {
  id: string;
  nome: string;
  foto: string;
  foco: string;
  zoom: number;
  descricao: string;
  beneficio: string;
}

export interface GaleriaItem {
  src: string;
  legenda: string;
}

export interface SobreConfig {
  titulo: string;
  destaque: string;
  subtitulo: string;
  cards?: string[];
  frase_inicio: string;
  frase_destaque: string;
  emocional: string;
  tecnico: string;
  numeros: Array<{ v: number; suf: string; rot: string }>;
  foto: string;
}

export interface FeedbackItem {
  nome: string;
  servico: string;
  texto: string;
}

export interface EstudioConfig {
  fotos: Array<{ src: string; alt: string }>;
  endereco: string;
  horario: string;
  mapsEmbed: string;
  mapsLink: string;
  wazeLink: string;
  uberLink: string;
}

export interface SimuladorConfig {
  antes: string;
  depois: string;
  regioes: {
    labios: [number, number, number, number];
    queixo: [number, number, number, number];
    olhos: [number, number, number, number];
    full: [number, number, number, number];
  };
}

export interface FaqItem {
  p: string;
  r: string;
}

export interface SiteModelConfig {
  doutora: DoctorInfo;
  hero: HeroConfig;
  faixa: string[];
  gota: GotaConfig;
  servicos: ServicoItem[];
  galeria: GaleriaItem[];
  sobre: SobreConfig;
  instagram: { video: string; embedId: string };
  feedbacks: FeedbackItem[];
  estudio: EstudioConfig;
  simulador: SimuladorConfig;
  faq: FaqItem[];
  analytics: { ga4: string; pixel: string };
}

export { SITE } from '../config.js';
