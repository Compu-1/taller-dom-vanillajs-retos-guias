"use strict";

const circle = document.getElementById("meter-circle");
const valueLabel = document.getElementById("meter-value");
const slider = document.getElementById("cpu-slider");
const sliderTxt = document.getElementById("slider-txt");

// Constante geométrica: 2 * Math.PI * 42 ≈ 263.89
const PERIMETRO = 2 * Math.PI * 42;

/**
 * Reto 5: Web Animations API sobre SVG
 * Anima el trazo del círculo hacia el porcentaje indicado
 * @param {SVGCircleElement} circleEl - Elemento SVG del medidor
 * @param {number} percentage - Porcentaje entre 0 y 100
 */
function animateGauge(circleEl, percentage) {
  if (!circleEl) return;

  // 1. Calcular el desfase objetivo
  const targetOffset = PERIMETRO - (PERIMETRO * percentage) / 100;

  // 2. Leer el offset actual guardado en dataset (o el perímetro si es el inicio)
  const currentOffset = parseFloat(circleEl.dataset.offset || PERIMETRO);

  // 3. Ejecutar la Web Animations API nativa (GPU Composited)
  circleEl.animate([
    { strokeDashoffset: currentOffset },
    { strokeDashoffset: targetOffset }
  ], {
    duration: 550,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    fill: "forwards"
  });

  // Guardar estado
  circleEl.dataset.offset = targetOffset;
  if (valueLabel) valueLabel.textContent = `${percentage}%`;
  if (sliderTxt) sliderTxt.textContent = `${percentage}%`;

  // Cambiar color si supera el 85% (alerta)
  circleEl.style.stroke = percentage > 85 ? "#ef4444" : (percentage > 60 ? "#f59e0b" : "#4cb978");
}

if (slider) {
  slider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    animateGauge(circle, val);
  });
}

// Prueba inicial con 75%
if (circle) animateGauge(circle, 75);
console.log("Animación WAAPI inicializada. Mueve el slider para observar la interpolación matemática.");
