---
sidebar_position: 1
title: "Taller Interactivo: DOM, Componentes y Eventos en Vanilla JS"
description: "Guía completa y sandbox interactivo: Manipulación reactiva del DOM, arquitectura de componentes, delegación de eventos, promesas, animaciones y modo estricto en Vanilla JavaScript puro."
---







# Guía Práctica Interactiva: Manipulación del DOM, Componentes y Asincronía en Vanilla JS

> **Asignatura:** Computación en Internet I (`09810 - TIC` / NRC: `12378 - 12377`)  
> **Institución:** Universidad Icesi · Departamento de TIC y Sistemas Inteligentes  
> **Semestre:** 2026-2 · **Sesiones de Aplicación:** Sesiones 26, 27 y 28  
> **Alineación:** RAA 3 (Bases de Arquitectura Web Cliente y Dinamización Reactiva)  
> **Entorno Interactivo:** Sandbox en Vivo y Simuladores SVG Vectoriales  



---

## 1. Fundamentos y Modo Estricto (`"use strict";`)

En el desarrollo profesional de aplicaciones web frontend, **JavaScript moderno (ES6+)** opera sobre una premisa crítica: **la erradicación de conductas impredecibles y la prevención de fallos silenciosos**.

El **Modo Estricto** (`"use strict";`) es una directiva introducida en ECMAScript 5 que transforma errores silenciosos y malas prácticas en excepciones explícitas inmediatas (`throw error`), permitiendo a los motores de ejecución (como Google V8) realizar optimizaciones de compilación JIT (Just-In-Time) mucho más agresivas.

![Comparativa de Modo Sloppy vs. Modo Estricto](/img/svg/strict-mode-vs-sloppy.svg)

### Principales Restricciones del Modo Estricto

1. **Prohibición de Variables Globales Accidentales:**
   En modo permisivo (*sloppy mode*), asignar un valor a una variable no declarada (`valor = 42;`) genera automáticamente una propiedad en el objeto global `window`. En modo estricto, lanza inmediatamente un `ReferenceError`.
2. **`this` Léxico e Indefinido:**
   Si una función ordinaria se invoca sin contexto (`f()`), su valor `this` es `undefined` en lugar del objeto `window`. Esto evita modificar accidentalmente el estado global del navegador.
3. **Imposibilidad de Mutar Propiedades de Solo Lectura:**
   Intentar escribir sobre propiedades configuradas con `writable: false` o sobre objetos sellados con `Object.freeze()` arroja un `TypeError` explícito.
4. **Parámetros Duplicados en Funciones:**
   Declarar `function suma(a, a, b)` es un error de sintaxis fatal (`SyntaxError`).
5. **Módulos ES6 (ESM):**
   Todos los archivos cargados con `<script type="module">` ejecutan **automáticamente en modo estricto por especificación**, sin necesidad de declarar `"use strict";` en la primera línea.

```javascript
"use strict";

// 1. Asignación indebida -> Lanza ReferenceError inmediato
function configurarUsuario(nombre) {
  // Sin 'const' o 'let', falla inmediatamente:
  // usuarioActivo = nombre; // ❌ ReferenceError: usuarioActivo is not defined
  const usuarioActivo = nombre; // ✅ Correcto y seguro
  return usuarioActivo;
}

// 2. Comportamiento de 'this'
function mostrarContexto() {
  console.log(this); // Imprime: undefined (en modo sloppy imprimiría: window)
}
mostrarContexto();
```

---

## 2. Sandbox Interactivo de Experimentación en Vivo

Aprovecha el entorno de ejecución nativo del navegador para poner a prueba cada concepto de forma práctica e inmediata.

El **Sandbox Interactivo** cuenta con una arquitectura dividida en dos paneles:
* **Panel Izquierdo (Editor de Código):** Contiene la plantilla inicial con retos guiados (`// TODO:`). Puedes desplegar el botón **"👁️ Ver Harness Oculto"** para examinar el código base de soporte que el entorno inyecta antes y después de tu solución (configuración de nodos, mocks de red y aserciones).
* **Panel Derecho (Renderizado en Vivo & Consola):** Ejecuta tu código en un entorno aislado (`iframe`), renderizando la interfaz en tiempo real e interceptando todos los llamados a `console.log`, advertencias y excepciones del motor JavaScript.

:::tip Atajo de Teclado
Puedes pulsar **Ctrl + Enter** (o **Cmd + Enter** en macOS) dentro del editor para ejecutar instantáneamente el código sin levantar las manos del teclado.
:::

> **💡 Entorno Interactivo:** Ejecuta los retos incluidos en la carpeta `retos/` de este repositorio o en el portal desplegado en `http://192.168.131.10/iaslab/compu1/`.

---

## 3. El Árbol DOM y Técnicas de Manipulación Reactiva

El **Document Object Model (DOM)** es la interfaz orientada a objetos proporcionada por el navegador que representa la estructura HTML como un árbol vivo de nodos en memoria.

![Arquitectura del Árbol DOM](/img/svg/dom-tree-architecture.svg)

### Mutación Segura y Prevención de Cross-Site Scripting (XSS)

Uno de los errores más graves en desarrollo frontend es el uso indiscriminado de `element.innerHTML` para insertar datos proporcionados por el usuario. Si un atacante inyecta una cadena con `<img src="x" onerror="maliciousCode()">`, el navegador ejecutará el script malicioso.

| Método de Mutación | Comportamiento | Impacto de Rendimiento | Nivel de Seguridad |
| :--- | :--- | :--- | :---: |
| `element.innerHTML = ...` | Parsea la cadena como HTML y recrea los nodos hijos. | Destruye listeners previos y fuerza *Reflow* completo. | ⚠️ **Alto Riesgo de XSS** |
| `element.textContent = ...` | Inserta texto plano sin interpretar etiquetas. | Rápido y eficiente. | 🛡️ **100% Inmune a XSS** |
| `document.createElement(tag)` | Instancia un nodo elemento desconectado en memoria. | Óptimo para configurar propiedades antes de montar. | 🛡️ **Seguro y Modular** |
| `parent.replaceChildren(...nodes)` | Reemplaza de forma atómica todos los hijos de un contenedor. | Evita parpadeos y minimiza ciclos de repintado. | 🛡️ **Estándar Moderno** |
| `document.createDocumentFragment()` | Contenedor liviano fuera del DOM para ensamblar por lotes. | Genera un único *Reflow* al insertarse en el documento. | 🚀 **Máximo Rendimiento** |

```javascript
// ANTIPATRÓN: Vulnerable y costoso
function renderItemInseguro(tarea, contenedor) {
  // Si tarea.titulo contiene código malicioso, se ejecuta
  contenedor.innerHTML += `<div class="item">${tarea.titulo}</div>`;
}

// PATRÓN SEGURO Y DE ALTO RENDIMIENTO
function renderItemSeguro(tarea, contenedor) {
  const item = document.createElement('article');
  item.className = 'task-card';
  item.dataset.id = tarea.id;

  const title = document.createElement('h4');
  title.textContent = tarea.titulo; // 🛡️ Sanitizado automáticamente

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = '✕ Eliminar';

  item.append(title, deleteBtn);
  contenedor.appendChild(item);
}
```

---

## 4. Arquitectura de Componentes Reutilizables en Vanilla JS

Una de las grandes fortalezas del desarrollo web moderno es estructurar la interfaz mediante **Componentes Funcionales Puros** sin depender de frameworks pesados:

* **¿Qué es un Componente Funcional Vanilla?:** Es una función pura que recibe un objeto de configuración (`props`) y retorna un elemento del DOM listo para ser montado.
* **Flujo Unidireccional de Datos (*Props Down*):** El estado reside en el componente padre (`App`); los componentes hijos solo reciben datos en forma de props de lectura.
* **Notificación Ascendente (*Event Callbacks Up*):** Cuando el usuario interactúa con un componente hijo, este nunca modifica directamente el estado global; invoca una función callback provista por el padre (ej. `onIncrement()`, `onDelete()`).

### Simulador Interactivo: Componentes y Estado

Interactúa con el siguiente simulador para observar el flujo de datos unidireccional y la respuesta inmediata ante errores de modo estricto:

<ComponentStateAnimatorSVG />

```javascript
// src/components/TaskCard.js
"use strict";

/**
 * Componente Reutilizable TaskCard
 * @param {Object} props - Parámetros del componente
 * @param {string} props.id - Identificador único de la tarea
 * @param {string} props.title - Título seguro de la tarea
 * @param {boolean} props.completed - Estado de finalización
 * @param {Function} props.onToggle - Callback hacia el padre al cambiar estado
 * @param {Function} props.onDelete - Callback hacia el padre al eliminar
 * @returns {HTMLElement} Nodo elemento configurado
 */
export function TaskCard({ id, title, completed, onToggle, onDelete }) {
  const card = document.createElement('article');
  card.className = `task-card ${completed ? 'is-completed' : ''}`;
  card.dataset.id = id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', () => {
    if (typeof onToggle === 'function') onToggle(id);
  });

  const span = document.createElement('span');
  span.className = 'task-title';
  span.textContent = title;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', () => {
    if (typeof onDelete === 'function') onDelete(id);
  });

  card.append(checkbox, span, deleteBtn);
  return card;
}
```

---

## 5. Propagación de Eventos y el Patrón de Delegación

Cuando ocurre una acción de usuario (clic, pulsación de tecla, envío de formulario), el navegador no dispara el código de forma aislada. El evento atraviesa **tres fases formales**:

1. **Fase de Captura (*Capturing Phase*):** El evento desciende desde `window` y `document` por toda la rama jerárquica hasta llegar al nodo que originó la interacción.
2. **Fase de Destino (*Target Phase*):** El evento se ejecuta en el elemento directo (`event.target`).
3. **Fase de Burbujeo (*Bubbling Phase*):** El evento asciende de regreso hacia la raíz, notificando a cada ancestro que posea un listener registrado.

### ¿Por qué Delegación de Eventos?

Si un listado contiene 1,000 elementos dinámicos, registrar un `addEventListener` independiente en cada botón demanda **1,000 objetos de función en memoria RAM** y obliga a registrar nuevos listeners cada vez que se crea un elemento.

Con **Delegación de Eventos**, registramos **un único listener en el contenedor padre** (`<ul>`) y utilizamos `event.target.closest(selector)` para determinar qué elemento disparó la acción.

### Simulador Interactivo: Fases del Evento y Delegación

Avanza paso a paso en el simulador para seguir la trayectoria descendente y ascendente del evento:

<EventPropagationSimulatorSVG />

```javascript
// Delegación de Eventos Óptima en un Listado
const taskList = document.querySelector('#task-list');

taskList.addEventListener('click', (event) => {
  // 1. Identificar si el clic provino de un botón de eliminación
  const deleteBtn = event.target.closest('.btn-delete');
  if (deleteBtn) {
    const item = deleteBtn.closest('.task-item');
    const taskId = item.dataset.id;
    console.log(`Eliminando tarea con ID: ${taskId}`);
    item.remove();
    return;
  }

  // 2. Identificar si el clic provino del checkbox de completado
  const checkbox = event.target.closest('.task-check');
  if (checkbox) {
    const item = checkbox.closest('.task-item');
    item.classList.toggle('is-completed', checkbox.checked);
  }
});
```

---

## 6. El Modelo Asíncrono de JavaScript: Event Loop y Promesas

JavaScript es un lenguaje de **un solo hilo (*single-threaded*)**, lo que significa que posee una única Pila de Ejecución (*Call Stack*). Para realizar operaciones que toman tiempo (como peticiones de red o temporizadores) sin congelar la pantalla a 60 FPS, el navegador proporciona el **Event Loop**.

### Prioridad de Tareas: Microtasks vs. Macrotasks

* **Microtasks (Cola de Microtareas):** Callbacks de Promesas (`Promise.then()`, `Promise.catch()`, `async/await`, `queueMicrotask`). **Tienen prioridad absoluta**: el Event Loop debe vaciar por completo la cola de microtareas antes de permitir que cualquier macrotarea o repintado visual ocurra.
* **Macrotasks (Cola de Tareas):** Temporizadores (`setTimeout`, `setInterval`), eventos de usuario y operaciones I/O.

### Simulador Interactivo: El Event Loop en Acción

Ejecuta el siguiente simulador para comprobar por qué `Promise.resolve()` se ejecuta antes que `setTimeout(..., 0)`:

<DomEventLoopSimulatorSVG />

```javascript
"use strict";

// Servicio asíncrono con Promesa nativa
export function simularPeticionServidor(datos, delayMs = 600) {
  return new Promise((resolve, reject) => {
    if (!datos || datos.length === 0) {
      reject(new Error("No se proporcionaron datos válidos"));
      return;
    }

    setTimeout(() => {
      resolve({
        status: 200,
        payload: datos,
        timestamp: Date.now()
      });
    }, delayMs);
  });
}

// Consumo con async / await y manejo robusto de excepciones
export async function sincronizarEstado(datos) {
  try {
    console.log("Iniciando sincronización...");
    const respuesta = await simularPeticionServidor(datos);
    console.log("Sincronización exitosa:", respuesta);
    return respuesta.payload;
  } catch (error) {
    console.error("Fallo de red:", error.message);
    throw error;
  } finally {
    console.log("Ciclo de petición completado.");
  }
}
```

---

## 7. Animaciones Web Nativas y Gráficos SVG

Las animaciones en el navegador no deben realizarse alterando propiedades de maquetación (`width`, `height`, `margin`) mediante bucles `setInterval`, ya que obligan a recalcular el layout geométrico de toda la página (*Reflow*).

Existen dos aproximaciones de alto rendimiento:

1. **Web Animations API (WAAPI):** Permite programar animaciones imperativas directamente desde JavaScript sobre las propiedades `transform` y `opacity`, las cuales son procesadas directamente por la GPU (*Compositor Thread*):
   ```javascript
   elemento.animate([
     { transform: 'scale(1)', opacity: 1 },
     { transform: 'scale(1.08)', opacity: 0.9 },
     { transform: 'scale(1)', opacity: 1 }
   ], {
     duration: 350,
     easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
   });
   ```

2. **Animación Vectorial SVG Interactiva:** Manipulación matemática de atributos como `stroke-dasharray` y `stroke-dashoffset` para trazar líneas, medidores radiales y gráficos en tiempo real:
   ```javascript
   function actualizarMedidorSvg(circuloSvg, porcentaje) {
     const perimetro = 2 * Math.PI * 45; // Radio 45
     const offset = perimetro - (perimetro * porcentaje) / 100;
     circuloSvg.style.strokeDashoffset = offset;
   }
   ```

---

## 8. Reto de Ingeniería: Construcción del Dashboard "DevPulse"

**DevPulse** es un panel de control corporativo para la observabilidad y monitoreo en tiempo real de servicios distribuidos en la nube (Gateways de API, Microservicios de Pago, Clústeres de Caché, Servidores de Base de Datos y Workers Asíncronos).

El proyecto debe desarrollarse íntegramente como una **Single Page Application (SPA) en Vanilla JavaScript puro (ES6+)**, sin frameworks externos (sin React, sin Vue, sin jQuery), partiendo de un documento HTML mínimo (`<div id="root"></div>`).

### Arquitectura de Carpetas del Proyecto

```text
devpulse-monitor/
├── index.html                  # Contenedor raíz mínimo (<div id="root"></div>)
├── package.json                # Manifiesto y scripts npm
├── .gitignore                  # Exclusión de node_modules
├── src/
│   ├── css/
│   │   ├── variables.css       # Tokens de diseño, temas claro/oscuro y paleta
│   │   └── styles.css          # Estilos del dashboard, tarjetas, badges y SVG
│   └── js/
│       ├── app.js              # Controlador principal, estado central y ciclo de vida
│       ├── components/         # Componentes funcionales puros reutilizables
│       │   ├── Header.js       # Cabecera con selector de tema y reloj UTC
│       │   ├── ServiceCard.js  # Tarjeta de microservicio con telemetría y botones
│       │   ├── MetricGaugeSVG.js # Medidor radial SVG animado con stroke-dashoffset
│       │   ├── FilterBar.js    # Barra con filtros por estado y buscador en tiempo real
│       │   ├── IncidentLog.js  # Consola de telemetría y registro de incidencias
│       │   └── StatsSummary.js # Resumen global de KPIs (uptime medio, latencia p95)
│       ├── services/           # Capa asíncrona de datos con Promesas
│       │   └── healthService.js # fetchHealth(), polling periódico y simulación de fallos
│       └── utils/              # Animaciones WAAPI y ayudantes del DOM
│           ├── animations.js   # Animaciones Web API (pulso, transiciones fluidas)
│           └── domUtils.js     # Helpers seguros de createElement y replaceChildren
```

### Especificación de Requerimientos del Sistema

#### Requerimientos Funcionales (RF)

* **RF-1: Renderizado Seguro del Catálogo de Servicios:**  
  La aplicación debe cargar una lista inicial de al menos 5 microservicios con sus propiedades (`id`, `name`, `endpoint`, `version`, `status`: `'online' | 'degraded' | 'offline'`, `latencyMs`, `errorRatePercent`). Todas las mutaciones del DOM deben crearse imperativamente con `document.createElement`, `dataset` y `textContent`. **Queda estrictamente prohibido el uso de `innerHTML` para datos dinámicos.**

* **RF-2: Arquitectura de Componentes Funcionales (Props Down, Callbacks Up):**  
  Cada módulo en `src/js/components/` debe ser una función pura que retorne un nodo DOM. Los datos fluyen desde el estado central en `app.js` hacia abajo mediante argumentos (`props`), y las interacciones del usuario notifican hacia arriba mediante callbacks (`onToggleCircuitBreaker`, `onRestart`, `onDelete`, `onFilterChange`).

* **RF-3: Delegación de Eventos en el Grid de Servicios:**  
  El contenedor `#services-grid` debe registrar **un único event listener** delegado para capturar las acciones de las tarjetas (`data-action="restart"`, `data-action="toggle"`, `data-action="delete"`) utilizando `event.target.closest()`. No se permite asociar listeners individuales a cada tarjeta.

* **RF-4: Capa Asíncrona con Promesas y Async/Await:**  
  El módulo `healthService.js` debe proveer funciones asíncronas basadas en `Promise` para sondear el estado de los servicios con latencia simulada (`setTimeout`), gestionando adecuadamente los 3 estados:
  1. **Pending:** La tarjeta o botón entra en estado de carga visual (`loading`), deshabilitando interacciones conflictivas.
  2. **Fulfilled:** Se actualizan las métricas en tiempo real con datos de respuesta.
  3. **Rejected:** Se capturan fallos simulados (HTTP 500/503 o timeouts) mediante bloques `try...catch...finally` sin romper la ejecución del resto de la interfaz.

* **RF-5: Métricas Vectoriales SVG en Tiempo Real:**  
  El componente `MetricGaugeSVG` debe renderizar un gráfico radial interactivo mediante SVG (`<svg viewBox="0 0 100 100">` con elementos `<circle>`), calculando dinámicamente el `stroke-dashoffset` en función del porcentaje de uso de CPU o memoria del clúster.

* **RF-6: Animaciones de Alto Rendimiento con Web Animations API (WAAPI):**  
  Las mutaciones de estado (reinicio de servicio, alertas críticas, cambios en los medidores) deben acompañarse de animaciones ejecutadas con `element.animate()` sobre `transform` y `opacity` para garantizar 60 FPS en el hilo de composición de la GPU.

* **RF-7: Filtrado Dinámico y Persistencia:**  
  La barra `FilterBar` debe permitir filtrar los servicios por su estado (`Todos`, `Operativos`, `Degradados`, `Caídos`) y filtrar en vivo mediante un campo de búsqueda por texto. El estado de la aplicación debe persistir en `localStorage`.

* **RF-8: Modo Estricto Global:**  
  Todos los archivos deben operar obligatoriamente bajo `"use strict";` (o módulos ESM nativos), con cero variables globales accidentales en `window` y validación tipológica básica de props.

#### Requerimientos No Funcionales (RNF)

* **RNF-1 (Zero Dependencias Externas):** Prohibido el uso de React, Vue, Svelte, jQuery, Lodash, Bootstrap o librerías de componentes UI. Solo Vanilla JavaScript ES6+, CSS nativo y HTML5.
* **RNF-2 (Seguridad contra Inyección):** Código 100% inmune a ataques XSS. Todo payload debe renderizarse mediante `textContent` o `setAttribute` validado.
* **RNF-3 (Eficiencia de Memoria):** Erradicación de fugas de memoria (*memory leaks*): evitar listeners huérfanos mediante el patrón de delegación.
* **RNF-4 (Diseño Responsivo):** La interfaz debe adaptarse fluidamente a pantallas de escritorio (grid de 3 columnas), tablets (2 columnas) y móviles (1 columna).

---

## 9. Rúbrica de Evaluación Modular (Sobre 5.0)

| Criterio | Ponderación | Desempeño Sobresaliente (4.5 - 5.0) | Desempeño Aceptable (3.0 - 4.4) | Insuficiente (0.0 - 2.9) |
| :--- | :---: | :--- | :--- | :--- |
| **Manipulación del DOM y Erradicación de XSS** | 20% | Construcción 100% programática con `createElement()`, inyección segura de texto plano con `textContent` y actualización atómica del árbol con `replaceChildren()`. Cero vulnerabilidades XSS. | Manipula el DOM pero recurre a `innerHTML` en componentes o no escapa entradas adecuadamente. | Concatenación descontrolada de strings HTML con fallos de inyección o renderizado roto. |
| **Arquitectura de Componentes y Estado Central** | 20% | Desacoplamiento modular riguroso: componentes funcionales puros, flujo *Props Down / Callbacks Up*, estado centralizado único y separación de responsabilidades en carpetas. | Crea componentes pero mantiene dependencias cruzadas con el estado global o lógica de negocio mezclada en la vista. | Código monolítico en un único archivo sin arquitectura modular. |
| **Delegación de Eventos y Manejo de Memoria** | 20% | Implementación impecable de la delegación en el contenedor grid con `event.target.closest('[data-action]')`. Soporta adición y eliminación dinámica sin recrear listeners. | Registra listeners individuales en cada tarjeta o botón generado dinámicamente. | Fallos en el manejo de eventos, listeners duplicados o pérdida de reactividad al mutar el DOM. |
| **Asincronía, Promesas y Event Loop** | 20% | Integración sólida de Promesas nativas y `async/await` con control riguroso de estados (Pending, Fulfilled, Rejected), manejo de errores con `try...catch...finally` y simulación de fallos HTTP. | Consume promesas pero no maneja el estado de carga visual o deja errores no capturados (*unhandled rejections*). | Código bloqueante que congela el hilo de renderizado o callbacks profundamente anidados (*callback hell*). |
| **Animaciones WAAPI, Métricas SVG y Modo Estricto** | 20% | Animaciones de alto impacto con Web Animations API (`element.animate()`), medidor radial dinámico SVG con cálculo perimétrico y cumplimiento estricto de `"use strict";`. | Animaciones CSS básicas sin uso de WAAPI o medidor estático sin animación SVG. | Código sin animaciones, en modo sloppy con variables globales accidentales en `window`. |

---

### Instrucciones de Entrega y Verificación Local

1. Inicializa tu proyecto en una carpeta limpia:
   ```bash
   mkdir devpulse-monitor && cd devpulse-monitor
   npm init -y
   npm install -D live-server
   ```
2. Agrega el script en tu `package.json`:
   ```json
   "scripts": {
     "start": "live-server --port=3000 --entry-file=index.html"
   }
   ```
3. Ejecuta `npm start`, abre la consola de herramientas de desarrollo (`F12`) y verifica:
   * **Pestaña Console:** Cero errores de modo estricto, advertencias o excepciones no capturadas.
   * **Pestaña Performance:** Transiciones a 60 FPS sin picos de *Forced Synchronous Layout* (Reflow).
   * **Pestaña Application / Storage:** Persistencia adecuada de las preferencias en `localStorage`.
