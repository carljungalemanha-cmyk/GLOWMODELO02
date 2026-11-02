import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const outDir = path.resolve('public/img');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to render SVG to WebP
async function renderSvgToWebp(svgContent, filename, width = 1200, height = 800) {
  const filePath = path.join(outDir, filename);
  await sharp(Buffer.from(svgContent))
    .resize(width, height)
    .webp({ quality: 92 })
    .toFile(filePath);
  console.log(`Generated: ${filename} (${width}x${height})`);
}

// 1. Doctor Portrait (Hero & About)
function createDoctorSvg(variant = 1) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" width="1000" height="1250">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F2EFE9"/>
        <stop offset="50%" stop-color="#E7E5DE"/>
        <stop offset="100%" stop-color="#D9D5CB"/>
      </linearGradient>
      <radialGradient id="faceGlow" cx="50%" cy="38%" r="40%">
        <stop offset="0%" stop-color="#FFF9F2" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#E8DFD1" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B8924A"/>
        <stop offset="50%" stop-color="#F5E2A8"/>
        <stop offset="100%" stop-color="#9C7A32"/>
      </linearGradient>
      <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#F7F6F2"/>
        <stop offset="100%" stop-color="#ECEAE3"/>
      </linearGradient>
      <linearGradient id="skinGrad" x1="30%" y1="20%" x2="70%" y2="80%">
        <stop offset="0%" stop-color="#FCEEE3"/>
        <stop offset="50%" stop-color="#F4DEC9"/>
        <stop offset="100%" stop-color="#E5C7AF"/>
      </linearGradient>
      <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A3B32"/>
        <stop offset="50%" stop-color="#2D231E"/>
        <stop offset="100%" stop-color="#1A1411"/>
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#2D2B28" flood-opacity="0.15"/>
      </filter>
    </defs>
    <!-- Background -->
    <rect width="1000" height="1250" fill="url(#bgGrad)"/>
    <circle cx="500" cy="450" r="480" fill="url(#faceGlow)"/>

    <!-- Doctor Silhouette / Illustration with high aesthetic fashion lighting -->
    <g transform="translate(0, 40)">
      <!-- Hair Backing -->
      <path d="M 280,360 Q 300,120 500,110 Q 700,120 720,360 Q 750,560 740,700 Q 720,780 680,820 L 320,820 Q 280,780 260,700 Q 250,560 280,360 Z" fill="url(#hairGrad)" filter="url(#softShadow)"/>

      <!-- Neck & Shoulders -->
      <path d="M 430,500 L 430,640 L 570,640 L 570,500 Z" fill="url(#skinGrad)"/>
      <path d="M 380,620 Q 500,670 620,620 L 760,860 L 890,1200 L 110,1200 L 240,860 Z" fill="url(#coatGrad)" filter="url(#softShadow)"/>
      <!-- Coat Lapels -->
      <path d="M 390,620 L 470,890 L 530,890 L 610,620 L 530,960 L 470,960 Z" fill="#F0EDE4" stroke="#E2DDD2" stroke-width="2"/>
      <line x1="500" y1="890" x2="500" y2="1200" stroke="#DCD6C7" stroke-width="2"/>
      
      <!-- Stethoscope or golden pendant -->
      <path d="M 430,620 Q 500,740 570,620" fill="none" stroke="url(#goldSheen)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="500" cy="740" r="14" fill="url(#goldSheen)"/>

      <!-- Face -->
      <path d="M 350,340 Q 350,180 500,180 Q 650,180 650,340 Q 650,530 500,560 Q 350,530 350,340 Z" fill="url(#skinGrad)" filter="url(#softShadow)"/>
      
      <!-- Hair Volume Styling -->
      <path d="M 330,300 Q 360,140 500,130 Q 640,140 670,300 Q 610,210 500,200 Q 390,210 330,300 Z" fill="url(#hairGrad)"/>
      <path d="M 320,340 Q 340,490 380,560 Q 360,420 360,340 Z" fill="#2E241F"/>
      <path d="M 680,340 Q 660,490 620,560 Q 640,420 640,340 Z" fill="#2E241F"/>

      <!-- Facial Features -->
      <!-- Eyebrows -->
      <path d="M 400,310 Q 440,295 470,305" fill="none" stroke="#3D322A" stroke-width="5" stroke-linecap="round"/>
      <path d="M 530,305 Q 560,295 600,310" fill="none" stroke="#3D322A" stroke-width="5" stroke-linecap="round"/>

      <!-- Eyes -->
      <path d="M 405,335 Q 435,325 465,338 Q 435,350 405,335 Z" fill="#FFFFFF"/>
      <circle cx="435" cy="336" r="9" fill="#3D2B1F"/>
      <circle cx="438" cy="333" r="3" fill="#FFFFFF"/>
      <path d="M 400,335 Q 435,320 470,336" fill="none" stroke="#2D2B28" stroke-width="3" stroke-linecap="round"/>

      <path d="M 535,338 Q 565,325 595,335 Q 565,350 535,338 Z" fill="#FFFFFF"/>
      <circle cx="565" cy="336" r="9" fill="#3D2B1F"/>
      <circle cx="568" cy="333" r="3" fill="#FFFFFF"/>
      <path d="M 530,336 Q 565,320 600,335" fill="none" stroke="#2D2B28" stroke-width="3" stroke-linecap="round"/>

      <!-- Nose -->
      <path d="M 500,330 L 496,410 Q 482,416 492,422 Q 500,426 508,422 Q 518,416 504,410 Z" fill="#E5B99A" opacity="0.6"/>

      <!-- Lips with natural definition -->
      <path d="M 460,465 Q 480,458 500,464 Q 520,458 540,465 Q 520,478 500,480 Q 480,478 460,465 Z" fill="#D97A7A"/>
      <path d="M 460,465 Q 500,472 540,465 Q 525,498 500,500 Q 475,498 460,465 Z" fill="#C96565"/>
      <line x1="462" y1="465" x2="538" y2="465" stroke="#9E4646" stroke-width="1.5"/>
      <!-- Lip highlight -->
      <ellipse cx="500" cy="484" rx="14" ry="4" fill="#FFFFFF" opacity="0.45"/>

      <!-- Elegant gold earring -->
      <circle cx="342" cy="400" r="7" fill="url(#goldSheen)"/>
      <path d="M 342,407 L 342,435" stroke="url(#goldSheen)" stroke-width="3"/>
      <circle cx="342" cy="437" r="5" fill="url(#goldSheen)"/>

      <circle cx="658" cy="400" r="7" fill="url(#goldSheen)"/>
      <path d="M 658,407 L 658,435" stroke="url(#goldSheen)" stroke-width="3"/>
      <circle cx="658" cy="437" r="5" fill="url(#goldSheen)"/>
    </g>

    <!-- Professional badge bar -->
    <rect x="250" y="1120" width="500" height="60" rx="30" fill="rgba(255,255,255,0.85)" stroke="url(#goldSheen)" stroke-width="1.5"/>
    <text x="500" y="1157" font-family="'Jost', sans-serif" font-size="20" font-weight="500" fill="#2D2B28" text-anchor="middle" letter-spacing="1">
      ${variant === 1 ? 'DRA. ELENA VASCONCELOS ✦ CRO/SP' : 'ESPECIALISTA EM HARMONIZAÇÃO FACIAL'}
    </text>
  </svg>
  `;
}

// 2. Before & After Faces (16:9 ratio, 2576x1438, exact matching coordinates!)
// Note: PRD says:
// "mulher deitada com o rosto virado para cima em fundo branco, uma com a pele envelhecida (antes) e outra rejuvenescida (depois).
// Elas ficam recortadas no círculo com background-size:250% auto e background-position:55% 100%, enquadrando do lábio até a testa.
// Impacto: x: 0.46, y: 0.60 no círculo."
function createFaceSvg(isRejuvenated = false) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2576 1438" width="2576" height="1438">
    <defs>
      <linearGradient id="bgSkin" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="40%" stop-color="#FCFAF5"/>
        <stop offset="100%" stop-color="#F2EEE6"/>
      </linearGradient>
      <radialGradient id="faceBase" cx="54%" cy="62%" r="45%">
        <stop offset="0%" stop-color="${isRejuvenated ? '#FFF0E5' : '#F7E3D4'}"/>
        <stop offset="55%" stop-color="${isRejuvenated ? '#F5DFC8' : '#ECC7AF'}"/>
        <stop offset="100%" stop-color="${isRejuvenated ? '#E2C2A7' : '#D4A888'}"/>
      </radialGradient>
      <radialGradient id="cheekGlow" cx="${isRejuvenated ? '52%' : '52%'}" cy="58%" r="22%">
        <stop offset="0%" stop-color="${isRejuvenated ? '#F5A394' : '#E8A096'}" stop-opacity="${isRejuvenated ? '0.45' : '0.22'}"/>
        <stop offset="100%" stop-color="#F5DFC8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="hairDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D231E"/>
        <stop offset="100%" stop-color="#14100E"/>
      </linearGradient>
      <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3"/>
      </filter>
    </defs>

    <!-- Clean clinical studio white background -->
    <rect width="2576" height="1438" fill="url(#bgSkin)"/>

    <!-- Hair surrounding resting face -->
    <path d="M 600,0 Q 800,200 850,700 Q 900,1100 1200,1438 L 2576,1438 L 2576,0 Z" fill="url(#hairDark)"/>
    <path d="M 0,0 L 700,0 Q 600,600 400,1438 L 0,1438 Z" fill="url(#hairDark)"/>

    <!-- Soft pillow contour -->
    <ellipse cx="1400" cy="850" rx="900" ry="550" fill="#FFFFFF" opacity="0.95"/>

    <!-- Head & Face (angled slightly looking up, relaxed) -->
    <!-- Jaw and cheek contour -->
    <path d="M 850,550 Q 820,950 1150,1180 Q 1400,1320 1650,1180 Q 1950,950 1920,550 Q 1850,220 1400,200 Q 950,220 850,550 Z" 
          fill="url(#faceBase)"/>

    <!-- Cheek volume & contour highlight -->
    <ellipse cx="1200" cy="780" rx="220" ry="160" fill="url(#cheekGlow)"/>
    <ellipse cx="1600" cy="780" rx="220" ry="160" fill="url(#cheekGlow)"/>

    ${isRejuvenated ? `
    <!-- REJUVENATED: Smooth glowing malar highlight -->
    <ellipse cx="1210" cy="750" rx="140" ry="80" fill="#FFFFFF" opacity="0.32" filter="url(#soft)"/>
    <ellipse cx="1590" cy="750" rx="140" ry="80" fill="#FFFFFF" opacity="0.32" filter="url(#soft)"/>
    ` : `
    <!-- AGED: Nasolabial fold shadow & slight volume deflation -->
    <path d="M 1250,780 Q 1230,860 1220,960" stroke="#BA8568" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.45" filter="url(#soft)"/>
    <path d="M 1550,780 Q 1570,860 1580,960" stroke="#BA8568" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.45" filter="url(#soft)"/>
    <!-- Marionette line shadows -->
    <path d="M 1240,990 Q 1230,1050 1235,1100" stroke="#BA8568" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.35"/>
    <path d="M 1560,990 Q 1570,1050 1565,1100" stroke="#BA8568" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.35"/>
    `}

    <!-- Eyes and Tear Troughs -->
    <!-- Left Eye -->
    <g transform="translate(1120, 620)">
      <path d="M -80,0 Q 0,-30 80,0 Q 0,30 -80,0 Z" fill="#FFFFFF"/>
      <circle cx="0" cy="0" r="28" fill="#4A3425"/>
      <circle cx="4" cy="-5" r="9" fill="#FFFFFF"/>
      <!-- Eyelashes -->
      <path d="M -85,-2 Q 0,-38 85,-2" stroke="#1F1611" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M -40,-35 L -45,-45 M 0,-40 L 0,-52 M 40,-35 L 45,-45" stroke="#1F1611" stroke-width="2.5"/>
      <!-- Eyebrow -->
      <path d="M -95,-60 Q 0,-85 90,-55" stroke="#2D211A" stroke-width="8" fill="none" stroke-linecap="round"/>
      ${!isRejuvenated ? `
      <!-- AGED: Tear trough depression / dark shadow -->
      <path d="M -65,30 Q 0,55 70,30" stroke="#8E6551" stroke-width="6" fill="none" opacity="0.5" filter="url(#soft)"/>
      <path d="M -75,42 Q 0,72 80,42" stroke="#7A5645" stroke-width="3.5" fill="none" opacity="0.35"/>
      <!-- Crow's feet -->
      <path d="M 82,-5 L 115,-18 M 85,2 L 120,5 M 80,10 L 112,22" stroke="#9C725D" stroke-width="3" opacity="0.45"/>
      ` : `
      <!-- REJUVENATED: Bright, rested, smooth under-eye light -->
      <path d="M -60,25 Q 0,45 65,25" fill="#FFEFE5" opacity="0.8"/>
      `}
    </g>

    <!-- Right Eye -->
    <g transform="translate(1680, 620)">
      <path d="M -80,0 Q 0,-30 80,0 Q 0,30 -80,0 Z" fill="#FFFFFF"/>
      <circle cx="0" cy="0" r="28" fill="#4A3425"/>
      <circle cx="4" cy="-5" r="9" fill="#FFFFFF"/>
      <path d="M -85,-2 Q 0,-38 85,-2" stroke="#1F1611" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <path d="M -40,-35 L -45,-45 M 0,-40 L 0,-52 M 40,-35 L 45,-45" stroke="#1F1611" stroke-width="2.5"/>
      <!-- Eyebrow -->
      <path d="M -90,-55 Q 0,-85 95,-60" stroke="#2D211A" stroke-width="8" fill="none" stroke-linecap="round"/>
      ${!isRejuvenated ? `
      <!-- AGED: Tear trough shadow -->
      <path d="M -70,30 Q 0,55 65,30" stroke="#8E6551" stroke-width="6" fill="none" opacity="0.5" filter="url(#soft)"/>
      <path d="M -80,42 Q 0,72 75,42" stroke="#7A5645" stroke-width="3.5" fill="none" opacity="0.35"/>
      <!-- Crow's feet -->
      <path d="M -82,-5 L -115,-18 M -85,2 L -120,5 M -80,10 L -112,22" stroke="#9C725D" stroke-width="3" opacity="0.45"/>
      ` : `
      <!-- REJUVENATED: Bright, rested under-eye -->
      <path d="M -65,25 Q 0,45 60,25" fill="#FFEFE5" opacity="0.8"/>
      `}
    </g>

    <!-- Forehead (Relaxed vs Forehead Lines) -->
    ${!isRejuvenated ? `
    <!-- AGED: Forehead horizontal lines & Glabella lines -->
    <path d="M 1250,440 Q 1400,430 1550,440" stroke="#B88A72" stroke-width="3.5" fill="none" opacity="0.4" filter="url(#soft)"/>
    <path d="M 1280,480 Q 1400,470 1520,480" stroke="#B88A72" stroke-width="3" fill="none" opacity="0.35"/>
    <path d="M 1390,560 L 1390,590 M 1410,560 L 1410,590" stroke="#A87A62" stroke-width="3" opacity="0.45"/>
    ` : `
    <!-- REJUVENATED: Silk smooth radiant forehead with subtle light -->
    <ellipse cx="1400" cy="460" rx="200" ry="70" fill="#FFFFFF" opacity="0.28" filter="url(#soft)"/>
    `}

    <!-- Nose -->
    <g transform="translate(1400, 750)">
      <path d="M 0,-120 L -12,40 Q -38,55 -15,70 Q 0,78 15,70 Q 38,55 12,40 Z" fill="#E8B99E" opacity="0.7"/>
      <ellipse cx="0" cy="55" rx="14" ry="10" fill="#FFFFFF" opacity="0.4"/>
      <!-- Nostril shadows -->
      <ellipse cx="-22" cy="62" rx="6" ry="4" fill="#6E4430" opacity="0.5"/>
      <ellipse cx="22" cy="62" rx="6" ry="4" fill="#6E4430" opacity="0.5"/>
    </g>

    <!-- Lips (Philtrum, Cupid's Bow, Vermilion Border) -->
    <!-- Coordinates centered around 1400, 960 -->
    <g transform="translate(1400, 970)">
      ${isRejuvenated ? `
      <!-- REJUVENATED: Plump, well-hydrated, defined cupid's bow and symmetry -->
      <!-- Philtrum columns -->
      <path d="M -15,-40 L -18,-15 M 15,-40 L 18,-15" stroke="#FFFFFF" stroke-width="3" opacity="0.6"/>
      <!-- Upper lip -->
      <path d="M -110,0 Q -60,-28 -20,-14 Q 0,-3 20,-14 Q 60,-28 110,0 Q 60,18 0,22 Q -60,18 -110,0 Z" 
            fill="#E07A7C"/>
      <!-- Lower lip (fuller, soft curve) -->
      <path d="M -110,0 Q 0,10 110,0 Q 75,54 0,58 Q -75,54 -110,0 Z" 
            fill="#CE6567"/>
      <!-- Center opening shadow -->
      <path d="M -105,0 Q 0,8 105,0" stroke="#8C3537" stroke-width="2.5" fill="none"/>
      <!-- Hydration luster highlight -->
      <ellipse cx="0" cy="32" rx="35" ry="12" fill="#FFFFFF" opacity="0.65" filter="url(#soft)"/>
      <ellipse cx="-30" cy="-6" rx="15" ry="6" fill="#FFFFFF" opacity="0.5"/>
      <ellipse cx="30" cy="-6" rx="15" ry="6" fill="#FFFFFF" opacity="0.5"/>
      ` : `
      <!-- AGED: Thinner lips, slight loss of border definition, dry texture, perioral vertical lines -->
      <path d="M -95,0 Q -50,-16 -16,-8 Q 0,-2 16,-8 Q 50,-16 95,0 Q 50,10 0,12 Q -50,10 -95,0 Z" 
            fill="#BD6F71"/>
      <path d="M -95,0 Q 0,6 95,0 Q 60,34 0,36 Q -60,34 -95,0 Z" 
            fill="#AC5E60"/>
      <!-- Smoker/barcode lines -->
      <line x1="-45" y1="-18" x2="-45" y2="-8" stroke="#8C5B48" stroke-width="2" opacity="0.5"/>
      <line x1="-20" y1="-18" x2="-20" y2="-10" stroke="#8C5B48" stroke-width="2" opacity="0.5"/>
      <line x1="20" y1="-18" x2="20" y2="-10" stroke="#8C5B48" stroke-width="2" opacity="0.5"/>
      <line x1="45" y1="-18" x2="45" y2="-8" stroke="#8C5B48" stroke-width="2" opacity="0.5"/>
      <line x1="0" y1="-15" x2="0" y2="-4" stroke="#8C5B48" stroke-width="2" opacity="0.5"/>
      `}
    </g>

    <!-- Chin (Mento) -->
    <g transform="translate(1400, 1140)">
      ${isRejuvenated ? `
      <!-- REJUVENATED: Defined, projected, harmonious chin with light apex -->
      <ellipse cx="0" cy="15" rx="75" ry="50" fill="#FFE5D4" opacity="0.7"/>
      <ellipse cx="0" cy="12" rx="40" ry="22" fill="#FFFFFF" opacity="0.4" filter="url(#soft)"/>
      ` : `
      <!-- AGED: Retruded chin, pebble texture / mentalis hypertonicity -->
      <ellipse cx="0" cy="15" rx="60" ry="40" fill="#E2B79E" opacity="0.4"/>
      <circle cx="-25" cy="15" r="4" fill="#B07D62" opacity="0.3"/>
      <circle cx="15" cy="22" r="4" fill="#B07D62" opacity="0.3"/>
      <circle cx="0" cy="30" r="5" fill="#B07D62" opacity="0.25"/>
      `}
    </g>

    <!-- Overall Glow & Radiance on Rejuvenated -->
    ${isRejuvenated ? `
    <circle cx="1200" cy="800" r="18" fill="#FFF3C9" opacity="0.6" filter="url(#soft)"/>
    <circle cx="1600" cy="800" r="18" fill="#FFF3C9" opacity="0.6" filter="url(#soft)"/>
    ` : ''}
  </svg>
  `;
}

// 3. Service Photos (5 specific procedures)
function createServiceSvg(serviceName, colorHex) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FCFAF5"/>
        <stop offset="50%" stop-color="#F3EFE6"/>
        <stop offset="100%" stop-color="#E8E2D5"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="${colorHex}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#FCFAF5" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B8924A"/>
        <stop offset="100%" stop-color="#F5E2A8"/>
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#bg)"/>
    <circle cx="400" cy="300" r="280" fill="url(#glow)"/>

    <!-- Subtle aesthetic medical graphics & contours -->
    <circle cx="400" cy="300" r="180" fill="none" stroke="#B8924A" stroke-width="1" stroke-dasharray="4 6" opacity="0.5"/>
    <circle cx="400" cy="300" r="230" fill="none" stroke="#B8924A" stroke-width="0.8" opacity="0.3"/>
    
    <!-- Service stylized motif -->
    <g transform="translate(400, 270)">
      <path d="M 0,-70 C 30,-30 60,-10 60,30 C 60,65 30,85 0,85 C -30,85 -60,65 -60,30 C -60,-10 -30,-30 0,-70 Z" 
            fill="url(#gold)" opacity="0.85"/>
      <ellipse cx="-15" cy="20" rx="10" ry="25" fill="#FFFFFF" opacity="0.6" transform="rotate(-15 -15 20)"/>
    </g>

    <text x="400" y="440" font-family="'Cormorant Garamond', serif" font-size="34" font-weight="600" font-style="italic" fill="#2D2B28" text-anchor="middle">
      ${serviceName}
    </text>
    <text x="400" y="475" font-family="'Jost', sans-serif" font-size="14" font-weight="500" fill="#7A7872" text-anchor="middle" letter-spacing="2">
      TÉCNICA EXCLUSIVA ✦ RESULTADO NATURAL
    </text>
  </svg>
  `;
}

// 4. Studio Interior Photo
function createStudioSvg(name, subtitle) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
    <defs>
      <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDFBF7"/>
        <stop offset="50%" stop-color="#F2EEE5"/>
        <stop offset="100%" stop-color="#E5DFD3"/>
      </linearGradient>
      <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#9C7A32"/>
        <stop offset="50%" stop-color="#F5E2A8"/>
        <stop offset="100%" stop-color="#B8924A"/>
      </linearGradient>
    </defs>
    <!-- Room perspective architecture -->
    <rect width="1000" height="700" fill="url(#wallGrad)"/>
    <!-- Floor line -->
    <polygon points="0,520 1000,520 1000,700 0,700" fill="#EBE6DC"/>
    <!-- Gold baseboard -->
    <line x1="0" y1="520" x2="1000" y2="520" stroke="url(#goldAcc)" stroke-width="2"/>
    <!-- Ceiling soft light panel -->
    <polygon points="200,0 800,0 720,120 280,120" fill="#FFFFFF" opacity="0.9"/>
    <!-- Minimalist luxury console & artwork -->
    <rect x="350" y="240" width="300" height="280" rx="12" fill="#FFFFFF" stroke="#E2DDD0" stroke-width="1.5" opacity="0.85"/>
    <rect x="380" y="160" width="240" height="60" rx="6" fill="#F7F5EE" stroke="url(#goldAcc)" stroke-width="1"/>
    
    <text x="500" y="360" font-family="'Cormorant Garamond', serif" font-size="32" font-weight="600" font-style="italic" fill="#2D2B28" text-anchor="middle">
      ${name}
    </text>
    <text x="500" y="400" font-family="'Jost', sans-serif" font-size="14" font-weight="400" fill="#7A7872" text-anchor="middle" letter-spacing="1.5">
      ${subtitle}
    </text>
  </svg>
  `;
}

// 5. Gallery Item (Clinical elegance)
function createGallerySvg(label, index) {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
    <defs>
      <linearGradient id="galBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FBF9F4"/>
        <stop offset="50%" stop-color="#F0ECE1"/>
        <stop offset="100%" stop-color="#E6DFD1"/>
      </linearGradient>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#B8924A"/>
        <stop offset="100%" stop-color="#E8D3A0"/>
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#galBg)"/>
    
    <!-- Elegant clinical portrait frame -->
    <circle cx="400" cy="380" r="260" fill="#FFFFFF" stroke="url(#goldBorder)" stroke-width="2"/>
    <circle cx="400" cy="380" r="245" fill="#F8F6F0"/>
    
    <!-- Abstract facial harmony motif -->
    <path d="M 320,380 Q 400,320 480,380 Q 440,460 400,470 Q 360,460 320,380 Z" fill="#E8BBA2" opacity="0.6"/>
    <ellipse cx="400" cy="425" rx="40" ry="18" fill="#CE6A6C" opacity="0.8"/>
    <line x1="360" y1="425" x2="440" y2="425" stroke="#9E4646" stroke-width="1.5"/>

    <text x="400" y="690" font-family="'Cormorant Garamond', serif" font-size="28" font-style="italic" fill="#2D2B28" text-anchor="middle">
      ${label}
    </text>
    <text x="400" y="725" font-family="'Jost', sans-serif" font-size="12" font-weight="500" fill="#B8924A" text-anchor="middle" letter-spacing="2">
      CASO CLÍNICO AUTORIZADO 0${index}
    </text>
  </svg>
  `;
}

async function main() {
  console.log('Generating high-end image assets...');

  // Doctor photos
  await renderSvgToWebp(createDoctorSvg(1), 'doutora.webp', 1000, 1250);
  await renderSvgToWebp(createDoctorSvg(2), 'doutora2.webp', 1000, 1250);

  // Before & After faces (PRD: 2576x1438, 16:9 ratio!)
  await renderSvgToWebp(createFaceSvg(false), 'rosto-envelhecido.webp', 2576, 1438);
  await renderSvgToWebp(createFaceSvg(true), 'rosto-rejuvenescido.webp', 2576, 1438);

  // 5 Services
  const services = [
    { file: 's-labial.webp', name: 'Preenchimento Labial', color: '#E58A8A' },
    { file: 's-mento.webp', name: 'Preenchimento de Mento', color: '#D4AF88' },
    { file: 's-full.webp', name: 'Full Face Harmonização', color: '#C9A25A' },
    { file: 's-botox.webp', name: 'Toxina Botulínica (Botox)', color: '#88B2C4' },
    { file: 's-olheira.webp', name: 'Preenchimento de Olheira', color: '#A092B8' }
  ];
  for (const s of services) {
    await renderSvgToWebp(createServiceSvg(s.name, s.color), s.file, 800, 600);
  }

  // Gallery
  const gallery = [
    'Preenchimento Labial',
    'Perfil e Projeção de Mento',
    'Atenuação de Olheiras',
    'Full Face Estruturação',
    'Botox Terço Superior',
    'Sustentação Malar',
    'Gloss Injetável &amp; Contorno',
    'Ângulo e Contorno Mandibular',
    'Rinomodelação Não-Cirúrgica'
  ];
  for (let i = 0; i < gallery.length; i++) {
    await renderSvgToWebp(createGallerySvg(gallery[i], i + 1), `g${i + 1}.webp`, 800, 800);
  }

  // Studio photos
  const studios = [
    { file: 'estudio1.webp', name: 'Recepção e Lounge Privativo', sub: 'Acolhimento com privacidade absoluta e café cortesia' },
    { file: 'estudio2.webp', name: 'Consultório Clínico Principal', sub: 'Ambiente climatizado com iluminação cirúrgica difusa' },
    { file: 'estudio3.webp', name: 'Sala de Procedimentos Injetáveis', sub: 'Conforto acústico e biossegurança grau hospitalar' },
    { file: 'estudio4.webp', name: 'Estúdio de Análise Fotográfica', sub: 'Mapeamento facial 3D e registro padronizado' }
  ];
  for (const st of studios) {
    await renderSvgToWebp(createStudioSvg(st.name, st.sub), st.file, 1000, 700);
  }

  console.log('All image assets created successfully!');
}

main().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
