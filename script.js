const info = {
  intro: "Sin requisitos. Introducción general a la carrera.",
  bbm1: "Sin requisitos. Bases celulares y moleculares de la medicina.",
  quimica: "Sin requisitos. Fundamentos de química general y orgánica.",
  met1: "Sin requisitos. Introducción al método científico.",
  tallerAcad: "Sin requisitos. Estrategias de aprendizaje universitario.",
  ingles1: "Sin requisitos. Inglés básico.",
  // Puedes ir completando aquí los demás ramos con sus requisitos y descripciones
};

function mostrarInfo(ramo) {
  const contenedor = document.getElementById("info-ramos");
  contenedor.innerText = info[ramo] || "Información no disponible aún.";
  contenedor.style.display = 'block';
}
