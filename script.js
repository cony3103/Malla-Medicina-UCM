// info para mostrar cuando se cliquea un ramo
const info = {
  intro: "Sin requisito.",
  bbm1: "Sin requisito.",
  quimica: "Sin requisito.",
  met1: "Sin requisito.",
  tallerAcad: "Sin requisito.",
  ingles1: "Sin requisito.",

  anatomia1: "Sin requisito.",
  bbm2: "Requisito: Bases Biológicas de la Medicina I.",
  infoCom: "Sin requisito.",
  met2: "Requisito: Metodología De la Investigación I.",
  tallerSaludCom: "Sin requisito.",
  ingles2: "Requisito: Inglés I.",

  anatomia2: "Requisito: Anatomía y embriología I.",
  neuroanato: "Requisito: Anatomía y embriología I.",
  fisiologiaGen: "Requisito: Bases Biológicas de la Medicina II y Anatomía y embriología I.",
  epidemio: "Requisito: Metodología De la Investigación II.",
  tallerProc: "Requisito: Anatomía y embriología I.",
  ingles3: "Requisito: Inglés II.",

  histologia: "Requisito: Anatomía y embriología II y Neuroanatomía.",
  basesNeuro: "Requisito: Neuroanatomía.",
  fisiologiaSist: "Requisito: Fisiología médica general.",
  patologiaGen: "Requisito: Fisiología médica general, Anatomía y embriología II, Neuroanatomía.",
  hitoPreclinica: "Requisito: Todos los ramos del semestre 3.",

  semiologia: "Requisito: Todos los ramos de semestres 1 a 4.",
  micro1: "Requisito: Todos los ramos de semestres 1 a 4.",
  farmaco1: "Requisito: Todos los ramos de semestres 1 a 4.",
  patologiaSist: "Requisito: Todos los ramos de semestres 1 a 4.",

  clinica1: "Requisito: Semestre 5.",
  micro2: "Requisito: Microbiología I.",
  farmaco2: "Requisito: Bases farmacológicas de la Medicina I.",
  tallerClinico: "Requisito: Semestre 5.",
  fe: "Sin requisito.",

  clinica2: "Requisito: Clínicas Integradas I, Microbiología II, Bases farmacológicas de la Medicina II, Taller clínico integrado.",
  psicoMed: "Requisito: Clínicas Integradas II.",
  saludPublica: "Requisito: Taller clínico integrado.",
  medMol: "Sin requisito.",
  eticaCristiana: "Sin requisito.",

  clinica3: "Requisito: Clínicas Integradas II.",
  psiquiatria: "Requisito: Clínicas Integradas II y Psicología Médica.",
  eticaMed: "Requisito: Taller clínico integrado, Clínicas Integradas II, Psicología Médica.",
  cert1: "Sin requisito.",

  clinica4: "Requisito: Clínicas Integradas III y Ética Médica.",
  obstetricia: "Requisito: Clínicas Integradas III, Salud Mental y Psiquiatría, Ética Médica.",
  legal: "Requisito: Clínicas Integradas III, Salud Mental y Psiquiatría, Ética Médica.",
  cert2: "Sin requisito.",

  clinica5: "Requisito: Clínicas Integradas IV, Salud Mental y Psiquiatría, Medicina Legal.",
  pediatria: "Requisito: Clínicas Integradas IV, Salud Mental y Psiquiatría, Ética Médica.",
  hitoClinica: "Requisito: Clínicas Integradas IV, Obstetricia y Ginecología, Medicina Legal.",
  cert3: "Sin requisito.",

  internadoMed: "Requisito: Todos los ramos de semestres 1 a 10.",
  internadoGine: "Requisito: Todos los ramos de semestres 1 a 10.",
  internadoPedia: "Requisito: Todos los ramos de semestres 1 a 10.",
  internadoCirugia: "Requisito: Todos los ramos de semestres 1 a 10.",

  internadoFamiliar: "Requisito: Todos los ramos de semestres 1 a 12.",
  internadoEsp: "Requisito: Todos los ramos de semestres 1 a 12.",
  internadoOpt: "Requisito: Todos los ramos de semestres 1 a 12."
};

function desbloquear(ramoElem) {
  // Verifica si ya está desbloqueado
  if (!ramoElem.classList.contains('desbloqueado')) {
    alert('Este ramo está bloqueado. Completa los requisitos antes.');
    return;
  }

  // Muestra la info del ramo seleccionado
  const contenedor = document.getElementById('info-ramos');
  contenedor.innerText = info[ramoElem.dataset.id] || "Información no disponible.";

  // Desbloquea los ramos hijos
  const desbloquea = ramoElem.dataset.desbloquea;
  if (!desbloquea) {
    return; // No desbloquea nada
  }

  const ids = desbloquea.split(',');
  ids.forEach(id => {
    const siguiente = document.querySelector(`[data-id="${id.trim()}"]`);
    if (siguiente && siguiente.classList.contains('bloqueado')) {
      siguiente.classList.remove('bloqueado');
      siguiente.classList.add('desbloqueado');
    }
  });
}
