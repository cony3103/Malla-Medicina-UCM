// script.js

// Objeto que define qué ramos son requisito para desbloquear otros
const requisitos = {
  // Semestre 1
  anatomia1: ['intro', 'quimica', 'tallerAcad'],
  infoCom: ['intro', 'quimica', 'tallerAcad'],
  tallerSaludCom: ['intro', 'quimica', 'tallerAcad'],
  bbm2: ['bbm1'],
  met2: ['met1'],
  ingles2: ['ingles1'],

  // Semestre 2
  anatomia2: ['anatomia1'],
  neuroanato: ['anatomia1'],
  fisiologiaGen: ['anatomia1', 'bbm2'],
  epidemio: ['met2'],
  ingles3: ['ingles2'],

  // Semestre 3
  histologia: ['anatomia2', 'neuroanato'],
  basesNeuro: ['neuroanato'],
  fisiologiaSist: ['fisiologiaGen'],
  patologiaGen: ['fisiologiaGen', 'anatomia2', 'neuroanato'],
  hitoPreclinica: ['anatomia2', 'neuroanato', 'fisiologiaGen', 'epidemio', 'tallerProc', 'ingles3'],

  // Semestre 4
  semiologia: ['histologia', 'basesNeuro', 'fisiologiaSist', 'patologiaGen', 'hitoPreclinica'],
  micro1: ['histologia', 'basesNeuro', 'fisiologiaSist', 'patologiaGen', 'hitoPreclinica'],
  farmaco1: ['histologia', 'basesNeuro', 'fisiologiaSist', 'patologiaGen', 'hitoPreclinica'],
  patologiaSist: ['histologia', 'basesNeuro', 'fisiologiaSist', 'patologiaGen', 'hitoPreclinica'],

  // Semestre 5
  clinica1: ['semiologia', 'micro1', 'farmaco1', 'patologiaSist'],
  tallerClinico: ['semiologia', 'micro1', 'farmaco1', 'patologiaSist'],
  micro2: ['micro1'],
  farmaco2: ['farmaco1'],

  // Semestre 6
  clinica2: ['clinica1', 'micro2', 'farmaco2', 'tallerClinico'],
  psicoMed: ['clinica2'],
  saludPublica: ['tallerClinico'],
  medMol: ['clinica1', 'farmaco2', 'tallerClinico'],

  // Semestre 7
  clinica3: ['clinica2'],
  psiquiatria: ['clinica2', 'psicoMed'],
  eticaMed: ['clinica2', 'psicoMed', 'tallerClinico'],

  // Semestre 8
  clinica4: ['clinica3', 'eticaMed'],
  obstetricia: ['clinica3', 'psiquiatria', 'eticaMed'],
  legal: ['clinica3', 'psiquiatria', 'eticaMed'],

  // Semestre 9
  clinica5: ['clinica4', 'psiquiatria', 'legal'],
  pediatria: ['clinica4', 'psiquiatria', 'eticaMed'],
  hitoClinica: ['clinica4', 'obstetricia', 'legal'],

  // Semestre 10
  internadoMed: ['clinica5', 'pediatria', 'hitoClinica'],
  internadoGine: ['clinica5', 'pediatria', 'hitoClinica'],
  internadoPedia: ['clinica5', 'pediatria', 'hitoClinica'],
  internadoCirugia: ['clinica5', 'pediatria', 'hitoClinica'],

  // Semestre 11 y 12
  internadoFamiliar: ['internadoMed', 'internadoGine', 'internadoPedia', 'internadoCirugia'],
  internadoEsp: ['internadoMed', 'internadoGine', 'internadoPedia', 'internadoCirugia'],
  internadoOpt: ['internadoMed', 'internadoGine', 'internadoPedia', 'internadoCirugia'],

  // Semestre 13 y 14
  // Estos internados no desbloquean nada más, ya están al final
};

// Conjunto para guardar ramos clickeados (aprobados)
const aprobados = new Set();

// Función para manejar clic en ramo
function marcarAprobado(id) {
  if (aprobados.has(id)) return; // Ya aprobado
  aprobados.add(id);
  const boton = document.getElementById(id);
  boton.classList.add('aprobado');
  boton.disabled = true; // Ya no clickeable

  // Verificamos si con este clic se desbloquean otros ramos
  verificarDesbloqueos();
}

// Verificar qué ramos desbloquear
function verificarDesbloqueos() {
  for (const ramo in requisitos) {
    const requisitosRamo = requisitos[ramo];
    const boton = document.getElementById(ramo);
    if (!boton) continue; // Si no existe, ignorar

    // Si ya está desbloqueado o aprobado, ignorar
    if (!boton.disabled) continue;
    if (aprobados.has(ramo)) continue;

    // Chequeamos si todos los requisitos están aprobados
    const puedeDesbloquear = requisitosRamo.every(req => aprobados.has(req));
    if (puedeDesbloquear) {
      boton.disabled = false;
      boton.classList.remove('bloqueado');
    }
  }
}

// Al cargar la página, bloqueamos todos los ramos que tienen requisitos
document.addEventListener('DOMContentLoaded', () => {
  for (const ramo in requisitos) {
    const boton = document.getElementById(ramo);
    if (boton) {
      boton.disabled = true;
      boton.classList.add('bloqueado');
    }
  }

  // Los ramos sin requisito iniciales deben estar desbloqueados
  // Defínelos aquí para desbloquearlos al cargar
  const iniciales = [
    'intro', 'bbm1', 'quimica', 'met1', 'tallerAcad', 'ingles1',
    'infoCom', 'tallerSaludCom', 'introduccionFe', 'eticaCristiana', 'cert1', 'cert2', 'cert3'
  ];
  iniciales.forEach(id => {
    const boton = document.getElementById(id);
    if (boton) {
      boton.disabled = false;
      boton.classList.remove('bloqueado');
    }
  });
});
