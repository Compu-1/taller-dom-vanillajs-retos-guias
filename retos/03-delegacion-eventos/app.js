"use strict";

const servicesList = document.getElementById("services-list");

/**
 * Reto 3: Listener Único Delegado
 * En vez de adjuntar listeners a cada botón, registramos un único listener en el contenedor padre.
 */
if (servicesList) {
  servicesList.addEventListener("click", (event) => {
    // 1. Encuentra el botón que disparó el evento mediante closest('[data-action]')
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return; // Si el clic no fue en un botón de acción, no hacemos nada

    // 2. Encuentra la fila padre asociada con closest('.service-row')
    const row = actionButton.closest(".service-row");
    const serviceId = row ? row.dataset.id : "desconocido";
    const action = actionButton.dataset.action;

    console.log(`🎯 Delegación capturada: acción="${action}" en id="${serviceId}"`);

    // 3. Manejo de acciones
    if (action === "toggle") {
      // Alternar estado pausado
      row.classList.toggle("paused");
      const isPaused = row.classList.contains("paused");
      const badge = row.querySelector(".badge-state");

      if (badge) {
        badge.className = isPaused ? "badge-state offline" : "badge-state online";
        badge.textContent = isPaused ? "PAUSADO" : "ONLINE";
      }
      actionButton.textContent = isPaused ? "Reanudar" : "Pausar";
    } else if (action === "remove") {
      // Eliminar la fila del DOM
      row.remove();
      console.log(`🗑️ Servicio ${serviceId} eliminado del DOM.`);
    }
  });
}

console.log("Delegación de eventos activa. Prueba hacer clic en Pausar, Eliminar o Agregar Dinámico.");
