# Reto 5: 5. Web Animations API (WAAPI) y Métricas SVG

> **Insignia:** `Animaciones & SVG`  
> **Área Clave:** Vanilla JavaScript (ES6+), DOM y Arquitectura Web

---

## 🎯 Misión
Completa la función animateGauge(circle, percentage) para calcular el desfase perimétrico del SVG y animar la transición con easing cúbico.

## 📋 Descripción
Aprende a crear animaciones declarativas de máximo rendimiento con la Web Animations API nativa (element.animate()) procesadas directamente por la GPU, combinadas con manipulación vectorial SVG mediante strokeDashoffset.

## 💡 Tips y Buenas Prácticas
- El perímetro de un círculo SVG es 2 * Math.PI * radio.
- El offset objetivo es: perimetro - (perimetro * porcentaje) / 100.
- circle.animate([{ strokeDashoffset: inicio }, { strokeDashoffset: fin }], { duration: 600, easing: "ease-out", fill: "forwards" }).

---

## 🛠️ Estructura de Archivos
* **`index.html`**: Interfaz web interactiva del reto con consola en vivo integrada.
* **`app.js`**: Código inicial de trabajo con guías y `// TODO:`.
* **`solution.js`**: Solución de referencia documentada.
* **`styles.css`**: Estilos CSS del componente.

## 🚀 Cómo Ejecutar este Reto
Abre directamente `index.html` en tu navegador web, o sirve la carpeta con:
```bash
npx serve .
# o con la extensión Live Server de VS Code
```
En la parte superior de `index.html` encontrarás botones para alternar entre tu código (`app.js`) y la solución oficial (`solution.js`).
