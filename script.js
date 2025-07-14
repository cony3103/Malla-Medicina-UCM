// script.js
// Lógica para mostrar información y desbloquear los ramos de la malla de Medicina UCM

// Objeto que guarda los ramos y sus dependencias
const info = {
  // Semestre 1
  intro: { 
    text: "Sin requisito.",
    desbloquea: ["anatomia1", "infoCom", "tallerSaludCom"]
  },
  bbm1: {
    text: "Sin requisito.",
    desbloquea: ["bbm2"]
  },
  quimica: {
    text: "Sin requisito.",
    desbloquea: ["anatomia1", "infoCom", "tallerSaludCom"]
  },
  met1: {
    text: "Sin requisito.",
    desbloquea: ["met2"]
  },
  tallerAcad: {
    text: "Sin requisito.",
    desbloquea: ["anatomia1", "infoCom", "tallerSaludCom"]
  },
  ingles1: {
    text: "Sin requisito.",
    desbloquea: ["ingles2"]
  },

  // Semestre 2
  anatomia1: {
    text: "Sin requisito.",
    desbloquea: ["anatomia2", "neuroanato", "fisiologiaGen"]
  },
  bbm2: {
    text: "Requisito: Bases Biológicas de la Medicina I.",
    desbloquea: ["fisiologiaGen"]
  },
  infoCom: {
    text: "Sin requisito.",
    desbloquea: []
  },
  met2: {
    text: "Requisito: Metodología De la Investigación I.",
    desbloquea: ["epidemio"]
  },
  tallerSaludCom: {
    text: "Sin requisito.",
    desbloquea: []
  },
  ingles2: {
    text: "Requisito: Inglés I.",
    desbloquea: ["ingles3"]
  },

  // Semestre 3
  anatomia2: {
    text: "Requisito: Anatomía y embriología I.",
    desbloquea: ["histologia", "patologiaGen", "hitoPreclinica"]
  },
  neuroanato: {
    text: "Requisito: Anatomía y embriología I.",
    desbloquea: ["histologia", "basesNeuro", "patologiaSist", "hitoPreclinica"]
  },
  fisiologiaGen: {
    text: "Requisito: Bases Biológicas de la Medicina II y Anatomía y embriología I.",
    desbloquea: ["fisiologiaSist", "patologiaGen", "hitoPreclinica"]
  },
  epidemio: {
    text: "Requisito: Metodología De la Investigación II.",
    desbloquea: ["hitoPreclinica"]
  },
  tallerProc: {
    text: "Requisito: Anatomía y embriología I.",
    desbloquea: ["hitoPreclinica"]
  },
  ingles3: {
    text: "Requisito: Inglés II.",
    desbloquea: ["hitoPreclinica"]
  },

  // Semestre 4
  histologia: {
    text: "Requisito: Anatomía y embriología II y Neuroanatomía.",
    desbloquea: ["semiologia", "micro1", "farmaco1", "patologiaSist"]
  },
  basesNeuro: {
    text: "Requisito: Neuroanatomía.",
    desbloquea: ["semiologia", "micro1", "farmaco1", "patologiaSist"]
  },
  fisiologiaSist: {
    text: "Requisito: Fisiología médica general.",
    desbloquea: ["semiologia", "micro1", "farmaco1", "patologiaSist"]
  },
  patologiaGen: {
    text: "Requisito: Fisiología médica general, Anatomía y embriología II, Neuroanatomía.",
    desbloquea: ["semiologia", "micro1", "farmaco1", "patologiaSist"]
  },
  hitoPreclinica: {
    text: "Requisito: Todos los ramos del semestre 3.",
    desbloquea: ["semiologia", "micro1", "farmaco1", "patologiaSist"]
  },

  // Semestre 5
  semiologia: {
    text: "Requisito: Todos los ramos de semestres 1 a 4.",
    desbloquea: ["clinica1", "tallerClinico"]
  },
  micro1: {
    text: "Requisito: Todos los ramos de semestres 1 a 4.",
    desbloquea: ["clinica1", "tallerClinico", "micro2"]
  },
  farmaco1: {
    text: "Requisito: Todos los ramos de semestres 1 a 4.",
    desbloquea: ["clinica1", "tallerClinico", "farmaco2"]
  },
  patologiaSist: {
    text: "Requisito: Todos los ramos de semestres 1 a 4.",
    desbloquea: ["clinica1", "tallerClinico"]
  },

  // Semestre 6
  clinica1: {
    text: "Requisito: Semestre 5.",
    desbloquea: ["clinica2", "psicoMed", "medMol"]
  },
  micro2: {
    text: "Requisito: Microbiología I.",
    desbloquea: ["clinica2"]
  },
  farmaco2: {
    text: "Requisito: Bases farmacológicas de la Medicina I.",
    desbloquea: ["clinica2", "medMol"]
  },
  tallerClinico: {
    text: "Requisito: Semestre 5.",
    desbloquea: ["saludPublica", "medMol"]
  },
  fe: {
    text: "Sin requisito.",
    desbloquea: []
  },

  // Semestre 7
  clinica2: {
    text: "Requisito: Clínicas Integradas I, Microbiología II, Bases farmacológicas de la Medicina II, Taller clínico integrado.",
    desbloquea: ["clinica3", "psiquiatria", "eticaMed"]
  },
  psicoMed: {
    text: "Requisito: Clínicas Integradas II.",
    desbloquea: ["saludMental", "eticaMed"]
  },
  saludPublica: {
    text: "Sin requisito.",
    desbloquea: []
  },
  medMol: {
    text: "Sin requisito.",
    desbloquea: []
  },
  eticaCristiana: {
    text: "Sin requisito.",
    desbloquea: []
  },

  // Semestre 8
  clinica3: {
    text: "Requisito: Clínicas Integradas II.",
    desbloquea: ["clinica4", "obstetricia", "medicinaLegal"]
  },
  psiquiatria: {
    text: "Requisito: Clínicas Integradas II y Psicología Médica.",
    desbloquea: ["obstetricia", "medicinaLegal"]
  },
  eticaMed: {
    text: "Requisito: Taller clínico integrado, Clínicas Integradas II, Psicología Médica.",
    desbloquea: ["clinica4", "obstetricia", "medicinaLegal"]
  },
  cert1: {
    text: "Sin requisito.",
    desbloquea: []
  },

  // Semestre 9
  clinica4: {
    text: "Requisito: Clínicas Integradas III y Ética Médica.",
    desbloquea: ["clinica5", "pediatria", "hitoClinica"]
  },
  obstetricia: {
    text: "Requisito: Clínicas Integradas III, Salud Mental y Psiquiatría, Ética Médica.",
    desbloquea: []
  },
  medicinaLegal: {
    text: "Requisito: Clínicas Integradas III, Salud Mental y Psiquiatría, Ética Médica.",
    desbloquea: ["clinica5", "hitoClinica"]
  },
  cert2: {
    text: "Sin requisito.",
    desbloquea: []
  },

  // Semestre 10
  clinica5: {
    text: "Requisito: Clínicas Integradas IV, Salud Mental y Psiquiatría, Medicina Legal.",
    desbloquea: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"]
  },
  pediatria: {
    text: "Requisito: Clínicas Integradas IV, Salud Mental y Psiquiatría, Ética Médica.",
    desbloquea: []
  },
  hitoClinica: {
    text: "Requisito: Clínicas Integradas IV, Obstetricia y Ginecología, Medicina Legal.",
    desbloquea: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"]
  },
  cert3: {
    text: "Sin requisito.",
    desbloquea: []
  },

  // Semestre 11 y 12
  internadoMed: {
    text: "Requisito: Todos los ramos de semestres 1 a 10.",
    desbloquea: ["internadoFamiliar", "internadoEsp", "internadoOpt"]
  },
  internadoGine: {
    text: "Requisito: Todos los ramos de semestres 1 a 10.",
    desbloquea: ["internadoFamiliar", "internadoEsp", "internadoOpt"]
  },
  internadoPedia: {
    text: "Requisito: Todos los ramos de semestres 1 a 10.",
    desbloquea: ["internadoFamiliar", "internadoEsp", "internadoOpt"]
  },
  internadoCirugia: {
    text: "Requisito: Todos los ramos de semestres 1 a 10.",
    desbloquea: ["internadoFamiliar", "internadoEsp", "internadoOpt"]
  },

  // Semestre 13 y 14
  internadoFamiliar: {
    text: "Requisito: Todos los ramos de semestres 1 a 12.",
    desbloquea: []
  },
  internadoEsp: {
    text: "Requisito: Todos los ramos de semestres 1 a 12.",
    desbloquea: []
  },
  internadoOpt: {
    text: "Requisito: Todos los ramos de semestres 1 a 12.",
    desbloquea: []
  }
};

// Función que desbloquea los ramos al hacer clic
function desbloquearRamo(ramo) {
  const ramosDesbloqueados = info[ramo].desbloquea;
  ramosDesbloqueados.forEach(function(r) {
    const ramoElem = document.getElementById(r);
    if (ramoElem) {
      ramoElem.classList.remove('disabled');  // Elimina la clase de "disabled" (no disponible)
      ramoElem.classList.add('enabled');  // Agrega la clase "enabled" (disponible)
    }
  });
}

// Función que muestra la información de cada ramo
function mostrarInfo(ramo) {
  const contenedor = document.getElementById("info-ramos");
  contenedor.innerText = info[ramo].text || "Información no disponible aún.";
  contenedor.style.display = 'block';
}
