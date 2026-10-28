# Taller y Retos: DOM, Componentes Funcionales, Eventos y Asincronía en Vanilla JS

![Universidad Icesi](https://img.shields.io/badge/Universidad-Icesi-blue?style=for-the-badge)
![Curso](https://img.shields.io/badge/Curso-Computación%20en%20Internet%20I-orange?style=for-the-badge)
![Semestre](https://img.shields.io/badge/Semestre-2026--2-green?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

Repositorio oficial con los **6 retos interactivos prácticos**, la **guía de clase en PDF** y la **documentación técnica** para las sesiones 26, 27 y 28 de *Computación en Internet I* (`09810 - TIC`), enfocado en la construcción de interfaces web reactivas mediante **JavaScript Puro (Vanilla JS)** sin dependencias de frameworks externos.

---

## 🌐 Recursos y Enlaces Directos
* 🚀 **Portal Interactivo Desplegado (Docusaurus en Grid100):**  
  [http://192.168.131.10/iaslab/compu1/docs/talleres/taller-dom-vanillajs-componentes/](http://192.168.131.10/iaslab/compu1/docs/talleres/taller-dom-vanillajs-componentes/)
* 📄 **Guía Institucional en PDF (Plantilla Icesi):**  
  [`guias/Taller_DOM_VanillaJS_Componentes_Eventos.pdf`](./guias/Taller_DOM_VanillaJS_Componentes_Eventos.pdf)
* 📖 **Guía Teórica de la Sesión en Markdown:**  
  [`guias/guia-interactiva-sesion.md`](./guias/guia-interactiva-sesion.md)

---

## 🧩 Catálogo de los 6 Retos Prácticos

Cada reto cuenta con su propia carpeta dentro de [`retos/`](./retos/), un `README.md` explicativo, la plantilla inicial de trabajo (`app.js`), la solución de referencia (`solution.js`), los estilos (`styles.css`) y una interfaz gráfica interactiva con consola en vivo (`index.html`).

| # | Reto | Insignia | Conceptos Clave | Directorio |
| :-: | :--- | :--- | :--- | :--- |
| **1** | **Manipulación Segura del DOM y Prevención XSS** | `DOM & Seguridad` | `document.createElement`, `className`, `append`, prevención XSS con `textContent`. | [`retos/01-dom-seguro-xss`](./retos/01-dom-seguro-xss/) |
| **2** | **Componentes Funcionales (Props Down, Callbacks Up)** | `Componentes & Estado` | Funciones puras que retornan nodos DOM, flujo unidireccional de datos y notificación de eventos. | [`retos/02-componentes-funcionales`](./retos/02-componentes-funcionales/) |
| **3** | **Delegación de Eventos con closest()** | `Eventos & Rendimiento` | Listener único en el contenedor padre, `event.target.closest('[data-action]')`, soporte para filas dinámicas. | [`retos/03-delegacion-eventos`](./retos/03-delegacion-eventos/) |
| **4** | **Asincronía: Promesas, Async/Await y Manejo de Errores** | `Asincronía & Red` | Peticiones no bloqueantes con `mockPing`, estados *Pending*, *Fulfilled*, *Rejected* y bloque `finally`. | [`retos/04-promesas-asincronia`](./retos/04-promesas-asincronia/) |
| **5** | **Web Animations API (WAAPI) y Métricas SVG** | `Animaciones & SVG` | Animaciones aceleradas por GPU con `element.animate()`, interpolación perimétrica con `strokeDashoffset`. | [`retos/05-waapi-animaciones-svg`](./retos/05-waapi-animaciones-svg/) |
| **6** | **Modo Estricto ("use strict") y Depuración Temprana** | `Modo Estricto & ES6` | Prevención de variables globales accidentales (`ReferenceError`) e inmutabilidad con `Object.freeze` (`TypeError`). | [`retos/06-modo-estricto-diagnostico`](./retos/06-modo-estricto-diagnostico/) |

---

## 🚀 Cómo Trabajar en los Retos

### Opción 1: Servidor Local de Desarrollo
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Compu-1/taller-dom-vanillajs-retos-guias.git
   cd taller-dom-vanillajs-retos-guias
   ```
2. Levanta un servidor web estático liviano:
   ```bash
   npx serve .
   ```
3. Abre tu navegador en `http://localhost:3000` para ver el lanzador principal y acceder a cada reto.

### Opción 2: Extensión Live Server (VS Code)
1. Abre la carpeta del repositorio en VS Code.
2. Haz clic derecho sobre `index.html` (del raíz o de cualquier carpeta de reto) y selecciona **"Open with Live Server"**.

---

## 🏛️ Créditos Institucionales
* **Profesor:** Alejandro Muñoz Bravo (`amunoz@icesi.edu.co`)
* **Asignatura:** Computación en Internet I (09810 - TIC)
* **Institución:** Universidad Icesi · Departamento de TIC y Sistemas Inteligentes
* **Semestre:** 2026-2
