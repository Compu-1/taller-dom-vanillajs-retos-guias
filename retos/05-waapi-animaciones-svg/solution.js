"use strict";

const circle = document.getElementById("meter-circle");
const valueLabel = document.getElementById("meter-value");
const slider = document.getElementById("cpu-slider");
const sliderTxt = document.getElementById("slider-txt");

const PERIMETRO = window.PERIMETRO || 2 * Math.PI * 42;

function animateGauge(circleEl, percentage) {
  if (!circleEl) return;
  const targetOffset = PERIMETRO - (PERIMETRO * percentage) / 100;
  const currentOffset = parseFloat(circleEl.dataset.offset || PERIMETRO);

  circleEl.animate([
    { strokeDashoffset: currentOffset },
    { strokeDashoffset: targetOffset }
  ], {
    duration: 550,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    fill: "forwards"
  });

  circleEl.dataset.offset = targetOffset;
  if (valueLabel) valueLabel.textContent = `${percentage}%`;
  if (sliderTxt) sliderTxt.textContent = `${percentage}%`;
  circleEl.style.stroke = percentage > 85 ? "#ef4444" : (percentage > 60 ? "#f59e0b" : "#4cb978");
}

if (slider) {
  slider.addEventListener("input", (e) => {
    animateGauge(circle, parseInt(e.target.value, 10));
  });
}

if (circle) animateGauge(circle, 75);
