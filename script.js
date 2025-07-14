// Estado de ramos clickeados (aprobados)
const aprobados = new Set();

// Mapa que define qué ramos desbloquea cada ramo
const desbloquea = {
  // Semestre 1
  intro: ["anatomia1", "infoCom", "tallerSaludCom"],
  bbm1: ["bbm2"],
  quimica: ["anatomia1", "infoCom", "tallerSaludCom"],
  met1: ["met2"],
  tallerAcad: ["anatomia1", "infoCom", "tallerSaludCom"],
  ingles1: ["ingles2"],

  // Semestre 2
  anatomia1: ["anatomia2", "neuroanato", "fisiologiaGen"],
  bbm2: ["fisiologiaGen"],
  infoCom: [],
  met2: ["epidemio"],
  tallerSaludCom: [],
  ingles2: ["ingles3"],

  // Semestre 3
  anatomia2: ["histologia", "patologiaGen", "hitoPreclinica"],
  neuroanato: ["histologia", "basesNeuro", "patologiaSist", "hitoPreclinica"],
  fisiologiaGen: ["fisiologiaSist", "patologiaGen", "hitoPreclinica"],
  epidemio: ["hitoPreclinica"],
  tallerProc: ["hitoPreclinica"],
  ingles3: ["hitoPreclinica"],

  // Semestre 4
  histologia: ["semiologia", "micro1", "farmaco1", "patologiaSist"],
  basesNeuro: ["semiologia", "micro1", "farmaco1", "patologiaSist"],
  fisiologiaSist: ["semiologia", "micro1", "farmaco1", "patologiaSist"],
  patologiaGen: ["semiologia", "micro1", "farmaco1", "patologiaSist"],
  hitoPreclinica: ["semiologia", "micro1", "farmaco1", "patologiaSist"],

  // Semestre 5
  semiologia: ["clinica1", "tallerClinico"],
  micro1: ["clinica1", "tallerClinico", "micro2"],
  farmaco1: ["clinica1", "tallerClinico", "farmaco2"],
  patologiaSist: ["clinica1", "tallerClinico"],

  // Semestre 6
  clinica1: ["clinica2", "psicoMed", "medMol"],
  micro2: ["clinica2"],
  farmaco2: ["clinica2", "medMol"],
  tallerClinico: ["saludPublica", "medMol"],
  fe: [],

  // Semestre 7
  clinica2: ["clinica3", "psiquiatria", "eticaMed"],
  psicoMed: ["psiquiatria", "eticaMed"],
  saludPublica: [],
  medMol: [],
  eticaCristiana: [],

  // Semestre 8
  clinica3: ["clinica4", "obstetricia", "legal"],
  psiquiatria: ["obstetricia", "legal"],
  eticaMed: ["clinica4", "obstetricia", "legal"],
  cert1: [],

  // Semestre 9
  clinica4: ["clinica5", "pediatria", "hitoClinica"],
  obstetricia: [],
  legal: ["clinica5", "hitoClinica"],
  cert2: [],

  // Semestre 10
  clinica5: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"],
  pediatria: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"],
  hitoClinica: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"],
  cert3: [],

  // Semestre 11 y 12
  internadoMed: ["internadoFamiliar", "internadoEsp", "internadoOpt"],
  internadoGine: ["internadoFamiliar", "internadoEsp", "internadoOpt"],
  internadoPedia: ["internadoFamiliar", "internadoEsp", "internadoOpt"],
  internadoCirugia: ["internadoFamiliar", "internadoEsp", "internadoOpt"],

  // Semestre 13 y 14
  internadoFamiliar: [],
  internadoEsp: [],
  internadoOpt: []
};

// Mapa de requisitos (lista de ramos que deben estar aprobados para desbloquear el ramo)
const requisitos = {
  // Ejemplo, anatomia1 se desbloquea solo cuando intro, quimica y tallerAcad estén aprobados
  anatomia1: ["intro", "quimica", "tallerAcad"],
  infoCom: ["intro", "quimica", "tallerAcad"],
  tallerSaludCom: ["intro", "quimica", "tallerAcad"],

  bbm2: ["bbm1"],
  met2: ["met1"],
  ingles2: ["ingles1"],

  anatomia2: ["anatomia1"],
  neuroanato: ["anatomia1"],
  fisiologiaGen: ["bbm2", "anatomia1"],
  epidemio: ["met2"],
  tallerProc: ["anatomia1"], // asumiendo tallerProc es desbloqueado con anatomia1? Lo agregué para no romper lógica
  ingles3: ["ingles2"],

  histologia: ["anatomia2", "neuroanato", "fisiologiaGen"],
  basesNeuro: ["neuroanato"],
  fisiologiaSist: ["fisiologiaGen"],
  patologiaGen: ["fisiologiaGen", "anatomia2", "neuroanato"],
  hitoPreclinica: ["anatomia2", "neuroanato", "fisiologiaGen", "epidemio", "tallerProc", "ingles3"],

  semiologia: ["histologia", "basesNeuro", "fisiologiaSist", "patologiaGen", "hitoPreclinica"],
  micro1: ["histologia", "basesNeuro", "fisiologiaSist", "patologiaGen", "hitoPreclinica"],
  farmaco1: ["histologia", "basesNeuro", "fisiologiaSist", "patologiaGen", "hitoPreclinica"],
  patologiaSist: ["histologia", "basesNeuro", "fisiologiaSist", "patologiaGen", "hitoPreclinica"],

  clinica1: ["semiologia", "micro1", "farmaco1", "patologiaSist"],
  micro2: ["micro1"],
  farmaco2: ["farmaco1"],
  tallerClinico: ["semiologia", "micro1", "farmaco1", "patologiaSist"],

  clinica2: ["clinica1", "micro2", "farmaco2", "tallerClinico"],
  psicoMed: ["clinica2"],
  saludPublica: ["tallerClinico"],
  medMol: ["clinica1", "farmaco2", "tallerClinico"],

  eticaCristiana: [],

  clinica3: ["clinica2"],
  psiquiatria: ["psicoMed"],
  eticaMed: ["tallerClinico", "clinica2", "psicoMed"],

  cert1: [],

  clinica4: ["clinica3", "eticaMed"],
  obstetricia: ["clinica3", "psiquiatria", "eticaMed"],
  legal: ["clinica3", "psiquiatria", "eticaMed"],

  cert2: [],

  clinica5: ["clinica4", "obstetricia", "legal"],
  pediatria: ["clinica4", "obstetricia", "eticaMed"],
  hitoClinica: ["clinica4", "obstetricia", "legal"],

  cert3: [],

  internadoMed: ["clinica5", "pediatria", "hitoClinica"],
  internadoGine: ["clinica5", "pediatria", "hitoClinica"],
  internadoPedia: ["clinica5", "pediatria", "hitoClinica"],
  internadoCirugia: ["clinica5", "pediatria", "hitoClinica"],

  internadoFamiliar: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"],
  internadoEsp: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"],
  internadoOpt: ["internadoMed", "internadoGine", "internadoPedia", "internadoCirugia"]
};

// Información a mostrar al clickear
const infoRamos = {
  intro: "Introducción a la profesión médica. Desbloquea Anatomía y embriología I, Información y comunicación médica, Taller de salud comunitaria.",
  bbm1: "Bases Biológicas de la Medicina I. Desbloquea Bases Biológicas de la Medicina II.",
  quimica: "Química General y Orgánica. Desbloquea Anatomía y embriología I, Información y comunicación médica, Taller de salud comunitaria.",
  met1: "Metodología De la Investigación I. Desbloquea Metodología De la Investigación II.",
  tallerAcad: "Taller De aprendizaje Académico. Desbloquea Anatomía y embriología I, Información y comunicación médica, Taller de salud comunitaria.",
  ingles1: "Inglés I. Desbloquea Inglés II.",

  anatomia1: "Anatomía y embriología I. Desbloquea Anatomía y embriología II, Neuroanatomía, Fisiología médica general.",
  bbm2: "Bases Biológicas de la Medicina II. Desbloquea Fisiología médica general.",
  infoCom: "Información y comunicación médica. No desbloquea ramos.",
  met2: "Metodología De la Investigación II. Desbloquea Epidemiología.",
  tallerSaludCom: "Taller de salud comunitaria. No desbloquea ramos.",
  ingles2: "Inglés II. Desbloquea Inglés III.",

  anatomia2: "Anatomía y embriología II. Desbloquea Histología Médica, Patología y fisiopatología general, Hito evaluativo de integración preclínica.",
  neuroanato: "Neuroanatomía. Desbloquea Histología Médica, Bases neurales de la adaptación humana, Patología y fisiopatología de sistemas, Hito evaluativo de integración preclínica.",
  fisiologiaGen: "Fisiología médica general. Desbloquea Fisiología médica de sistemas, Patología y fisiopatología general, Hito evaluativo de integración preclínica.",
  epidemio: "Epidemiología. Desbloquea Hito evaluativo de integración preclínica.",
  tallerProc: "Taller de procedimientos clínicos. Desbloquea Hito evaluativo de integración preclínica.",
  ingles3: "Inglés III. Desbloquea Hito evaluativo de integración preclínica.",

  histologia: "Histología Médica. Desbloquea Semiología, Microbiología I, Bases farmacológicas de la Medicina I, Patología y fisiopatología de sistemas.",
  basesNeuro: "Bases Neurales de la adaptación humana. Desbloquea Semiología, Microbiología I, Bases farmacológicas de la Medicina I, Patología y fisiopatología de sistemas.",
  fisiologiaSist: "Fisiología médica de sistemas. Desbloquea Semiología, Microbiología I, Bases farmacológicas de la Medicina I, Patología y fisiopatología de sistemas.",
  patologiaGen: "Patología y fisiopatología general. Desbloquea Semiología, Microbiología I, Bases farmacológicas de la Medicina I, Patología y fisiopatología de sistemas.",
  hitoPreclinica: "Hito evaluativo de integración preclínica. Desbloquea Semiología, Microbiología I, Bases farmacológicas de la Medicina I, Patología y fisiopatología de sistemas.",

  semiologia: "Semiología. Desbloquea Clínicas Integradas I y Taller clínico integrado.",
  micro1: "Microbiología I. Desbloquea Clínicas Integradas I, Taller clínico integrado y Microbiología II.",
  farmaco1: "Bases farmacológicas de la Medicina I. Desbloquea Clínicas Integradas I, Taller clínico integrado y Bases farmacológicas de la Medicina II.",
  patologiaSist: "Patología y fisiopatología de sistemas. Desbloquea Clínicas Integradas I y Taller clínico integrado.",

  clinica1: "Clínicas Integradas I. Desbloquea Clínicas Integradas II, Psicología Médica y Medicina Molecular.",
  micro2: "Microbiología II. Desbloquea Clínicas Integradas II.",
  farmaco2: "Bases farmacológicas de la Medicina II. Desbloquea Clínicas Integradas II y Medicina Molecular.",
  tallerClinico: "Taller clínico integrado. Desbloquea Salud Pública y Medicina Preventiva y Medicina Molecular.",
  fe: "Introducción a la fe. No desbloquea ramos.",

  clinica2: "Clínicas Integradas II. Desbloquea Clínicas Integradas III, Salud mental y Psiquiatría, Ética Médica.",
  psicoMed: "Psicología Médica. Desbloquea Salud mental y Psiquiatría, Ética Médica.",
  saludPublica: "Salud Pública y Medicina Preventiva. No desbloquea ramos.",
  medMol: "Medicina Molecular. No desbloquea ramos.",
  eticaCristiana: "Ética Cristiana. No desbloquea ramos.",

  clinica3: "Clínicas Integradas III. Desbloquea Clínicas Integradas IV, Obstetricia y Ginecología y Medicina Legal.",
  psiquiatria: "Salud mental y Psiquiatría. Desbloquea Obstetricia y Ginecología y Medicina Legal.",
  eticaMed: "Ética Médica. Desbloquea Clínicas Integradas IV, Obstetricia y Ginecología y Medicina Legal.",
  cert1: "Certificación I. No desbloquea ramos.",

  clinica4: "Clínicas Integradas IV. Desbloquea Clínicas Integradas V, Pediatría y cirugía infantil, Hito evaluativo de integración clínica.",
  obstetricia: "Obstetricia y Ginecología. No desbloquea ramos.",
  legal: "Medicina Legal. Desbloquea Clínicas Integradas V y Hito evaluativo de integración clínica.",
  cert2: "Certificación II. No desbloquea ramos.",

  clinica5: "Clínicas Integradas V. Desbloquea Internado de Medicina interna, Internado de Obstetricia y Ginecología, Internado de Pediatría e Internado de Cirugía.",
  pediatria: "Pediatría y cirugía infantil. Desbloquea Internado de Medicina interna, Internado de Obstetricia y Ginecología, Internado de Pediatría e Internado de Cirugía.",
  hitoClinica: "Hito evaluativo de integración clínica. Desbloquea Internado de Medicina interna, Internado de Obstetricia y Ginecología, Internado de Pediatría e Internado de Cirugía.",
  cert3: "Certificación III. No desbloquea ramos.",

  internadoMed: "Internado de Medicina interna. Desbloquea Internado de salud familiar, Internado de especialidades e Internado optativo.",
  internadoGine: "Internado de Obstetricia y Ginecología. Desbloquea Internado de salud familiar, Internado de especialidades e Internado optativo.",
  internadoPedia: "Internado de Pediatría. Desbloquea Internado de salud familiar, Internado de especialidades e Internado optativo.",
  internadoCirugia: "Internado de Cirugía. Desbloquea Internado de salud familiar, Internado de especialidades e Internado optativo.",

  internadoFamiliar: "Internado de salud familiar.",
  internadoEsp: "Internado de especialidades.",
  internadoOpt: "Internado optativo."
};

// Inicializar estados en la carga
window.onload = () => {
  // Solo desbloquear ramos sin requisitos (semestre 1 ramos y otros desbloqueados)
  for (const id in requisitos) {
    const boton = document.getElementById(id);
    if (!boton) continue;
    if (requisitos[id].length === 0) {
      boton.disabled = false;
    }
  }
  // Semestre 1 ramos también desbloqueados al principio
  ["intro","bbm1","quimica","met1","tallerAcad","ingles1"].forEach(id => {
    const boton = document.getElementById(id);
    if(boton) boton.disabled = false;
  });
  // Introducción a la fe y Ética Cristiana ya desbloqueados
  ["fe", "eticaCristiana", "cert1", "cert2", "cert3"].forEach(id => {
    const boton = document.getElementById(id);
    if (boton) boton.disabled = false;
  });
};

function desbloquear(id) {
  const boton = document.getElementById(id);
  if (!boton || boton.disabled) return;

  // Marcar como aprobado
  aprobados.add(id);
  boton.classList.add("aprobado");
  boton.disabled = true; // Ya aprobado no se puede volver a clickear

  // Mostrar info
  mostrarInfo(id);

  // Revisar ramos que este desbloquea
  if (desbloquea[id]) {
    desbloquea[id].forEach(ramoId => {
      // Comprobar que todos los requisitos del ramo a desbloquear están aprobados
      const reqs = requisitos[ramoId] || [];
      const todosAprobados = reqs.every(r => aprobados.has(r));
      if (todosAprobados) {
        const botonDesbloqueado = document.getElementById(ramoId);
        if (botonDesbloqueado) {
          botonDesbloqueado.disabled = false;
        }
      }
    });
  }
}

function mostrarInfo(id) {
  const info = document.getElementById("info-text");
  info.textContent = infoRamos[id] || "Información no disponible.";
}
