document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  // Inicializar estados: bloquea los que tienen requisitos, excepto los desbloqueados manualmente
  ramos.forEach(ramo => {
    const requisitos = ramo.dataset.requisitos.split(",").map(r => r.trim()).filter(Boolean);
    if (requisitos.length > 0 && !ramo.classList.contains("desbloqueado")) {
      ramo.classList.add("bloqueado");
    }
  });

  // Evento click para aprobar/desaprobar
  ramos.forEach(ramo => {
    ramo.addEventListener("click", () => {
      if (ramo.classList.contains("bloqueado")) return;

      ramo.classList.toggle("aprobado");

      actualizarEstado();
    });
  });

  function actualizarEstado() {
    // Revisa cada ramo para ver si se puede desbloquear o debe bloquearse
    ramos.forEach(ramo => {
      const requisitos = ramo.dataset.requisitos.split(",").map(r => r.trim()).filter(Boolean);
      if (requisitos.length === 0) return; // Sin requisitos siempre desbloqueado

      // ¿Todos los requisitos están aprobados?
      const requisitosAprobados = requisitos.every(req => {
        const reqRamo = Array.from(ramos).find(r => r.dataset.nombre === req);
        return reqRamo && reqRamo.classList.contains("aprobado");
      });

      if (requisitosAprobados) {
        ramo.classList.remove("bloqueado");
      } else {
        ramo.classList.add("bloqueado");
        ramo.classList.remove("aprobado");
      }
    });
  }
});
