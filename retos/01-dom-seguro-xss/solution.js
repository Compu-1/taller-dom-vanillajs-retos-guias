"use strict";

const root = document.getElementById("sandbox-root");
const maliciousService = window.maliciousService;

function createSafeServiceCard(service) {
  const card = document.createElement("article");
  card.className = "service-card";
  card.dataset.id = service.id;

  const badge = document.createElement("span");
  badge.className = "status-badge active";
  badge.textContent = "● OPERATIVO";

  const title = document.createElement("h3");
  title.textContent = service.name; // Inmune a XSS gracias a textContent

  const details = document.createElement("p");
  details.className = "metric-text";
  details.textContent = `Latencia: ${service.latency} ms | Versión: ${service.version}`;

  card.append(badge, title, details);
  return card;
}

const cardElement = createSafeServiceCard(maliciousService);
if (root) {
  root.appendChild(cardElement);
  console.log("Nodo montado exitosamente en el DOM:", cardElement.tagName);
}
