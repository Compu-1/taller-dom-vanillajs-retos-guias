"use strict";

const root = document.getElementById("sandbox-root");
const maliciousService = window.maliciousService;

/**
 * Reto 1: Construcción Segura de Tarjetas
 * Completa la función para crear la estructura DOM de forma imperativa y segura.
 * @param {Object} service - Objeto con datos del servicio
 * @returns {HTMLElement} Elemento article ensamblado
 */
function createSafeServiceCard(service) {
  // 1. Crear el contenedor principal <article>
  const card = document.createElement("article");
  card.className = "service-card";
  card.dataset.id = service.id;

  // 2. Badge de estado <span class="status-badge active">
  const badge = document.createElement("span");
  badge.className = "status-badge active";
  badge.textContent = "● OPERATIVO";

  // 3. Título del servicio <h3>
  // TODO: Crea el elemento <h3> y asigna el título usando .textContent para neutralizar inyecciones XSS
  // const title = document.createElement("h3");
  // title.textContent = service.name;

  // 4. Detalle métrico <p class="metric-text">
  // TODO: Crea el elemento <p>, asígnale la clase 'metric-text' y su texto
  // const details = document.createElement("p");
  // details.className = "metric-text";
  // details.textContent = `Latencia: ${service.latency} ms | Versión: ${service.version}`;

  // 5. Ensamblar todos los nodos en la tarjeta
  // TODO: Usa card.append(badge, title, details) para ensamblar los nodos creados
  card.append(badge);

  return card;
}

// Ejecutar la creación y montar en el DOM
const cardElement = createSafeServiceCard(maliciousService);
if (root) {
  root.appendChild(cardElement);
  console.log("Nodo montado exitosamente en el DOM:", cardElement.tagName);
}
