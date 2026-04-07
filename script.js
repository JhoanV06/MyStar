// -------------------- CONFIG --------------------
const TRANSITION_SRC = "assets/audio/transicion.mp3";
const TRANSITION_DURATION = 1500;

// 🎵 Música
const musicModos = new Audio("assets/audio/modos.mp3");
musicModos.loop = true;

const musicSanValentin = new Audio("assets/audio/14febrero.mp3");
musicSanValentin.loop = true;

const BASE_VOLUME_MODOS = 0.50;
const BASE_VOLUME_SANVALENTIN = 0.70;

let currentMusic = null;

// -------------------- DOM --------------------
const startBtn = document.getElementById("start-btn");
const app = document.getElementById("app");
const transitionLayer = document.getElementById("transition-layer");
const bgVideoInicio = document.getElementById("background-video");

// -------------------- 🎭 IMÁGENES --------------------

// default RANDOM
const defaultImagenes = [
  "assets/images/default/1.png",
  "assets/images/default/2.png",
  "assets/images/default/3.png"
];

function getRandomDefault() {
  return defaultImagenes[Math.floor(Math.random() * defaultImagenes.length)];
}

// por personaje
const imagenes = {
  yo: "assets/images/yo/normal.png",
  link: "assets/images/link/normal.png",
  navi: "assets/images/navi/normal.png"
};

// personaje en pantalla
const personaje = document.createElement("img");
personaje.style.position = "absolute";
personaje.style.bottom = "0px";
personaje.style.left = "50%";
personaje.style.transform = "translateX(-50%)";
personaje.style.width = "220px";
personaje.style.zIndex = "2";
personaje.style.display = "none";
document.body.appendChild(personaje);

// -------------------- PRELOAD --------------------
const bgVideoModo = document.createElement("video");
bgVideoModo.src = "assets/video/modos.mp4";
bgVideoModo.preload = "auto";
bgVideoModo.loop = true;
bgVideoModo.muted = true;
bgVideoModo.playsInline = true;
bgVideoModo.style.position = "fixed";
bgVideoModo.style.inset = "0";
bgVideoModo.style.objectFit = "cover";
bgVideoModo.style.zIndex = "-2";
bgVideoModo.style.display = "none";
bgVideoModo.load();
document.body.appendChild(bgVideoModo);

const bgImageSanValentin = document.createElement("img");
bgImageSanValentin.src = "assets/images/sanvalentin.jpg";
bgImageSanValentin.style.position = "fixed";
bgImageSanValentin.style.inset = "0";
bgImageSanValentin.style.objectFit = "cover";
bgImageSanValentin.style.zIndex = "-2";
bgImageSanValentin.style.display = "none";
document.body.appendChild(bgImageSanValentin);

// -------------------- UTILIDADES --------------------
function playTransition() {
  const sfx = new Audio(TRANSITION_SRC);
  sfx.play().catch(() => {});
}

function sceneTransition(callback) {
  playTransition();
  transitionLayer.classList.add("active");

  setTimeout(() => {
    if (callback) callback();
    transitionLayer.classList.remove("active");
  }, TRANSITION_DURATION);
}

// -------------------- EVENTO INICIO --------------------
startBtn.addEventListener("click", () => {

  sceneTransition(() => {

    if (bgVideoInicio) {
      bgVideoInicio.pause();
      bgVideoInicio.style.display = "none";
    }

    bgImageSanValentin.style.display = "none";

    // ---------------- MODOS ----------------
    app.innerHTML = `
      <div class="modos-container">
        <h1>Elección de modos</h1>
        <div class="modos-grid">

          <div class="modo-wrapper">
            <h2>14-Feb</h2>
            <div class="modo-card" id="modo1">
              <img src="assets/images/sanvalentinmodo.jpg">
            </div>
          </div>

          <div class="modo-wrapper">
            <h2>PRÓXIMAMENTE</h2>
            <div class="modo-card">
              <img src="assets/images/cumpleañosmodo.jpg" style="filter: brightness(20%);">
            </div>
          </div>

          <div class="modo-wrapper">
            <h2>PRÓXIMAMENTE</h2>
            <div class="modo-card">
              <img src="assets/images/noviamodo.png" style="filter: brightness(10%);">
            </div>
          </div>

        </div>
      </div>
    `;

    bgVideoModo.style.display = "block";
    bgVideoModo.play();

    currentMusic = musicModos;
    currentMusic.volume = BASE_VOLUME_MODOS;
    currentMusic.play();

    // ---------------- MODO 14 FEB ----------------
    document.getElementById("modo1").addEventListener("click", () => {

      currentMusic.pause();

      sceneTransition(() => {

        bgVideoModo.pause();
        bgVideoModo.style.display = "none";

        app.innerHTML = `
          <div id="dialogue-box" style="
            position: absolute;
            bottom: 160px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 800px;
            background: white;
            color: black;
            border: 3px solid black;
            border-radius: 12px;
            padding: 20px;
            font-size: 16px;
            z-index: 3;
          "></div>
        `;

        bgImageSanValentin.style.display = "block";
        personaje.style.display = "block";

        currentMusic = musicSanValentin;
        currentMusic.volume = BASE_VOLUME_SANVALENTIN;
        currentMusic.play();

        iniciarDialogo();

      });

    });

  });

});

// -------------------- DIÁLOGO --------------------

function iniciarDialogo() {

  const dialogos = [
    { personaje: "yo", texto: "Ahhh que puedo hacer..." },
    { personaje: "link", texto: "Hola extraño ¿que te está pasando?" },
    { personaje: "yo", texto: "Hola Link pasa que..." },
    { personaje: "yo", texto: "¡¿LINK?!", imagen: "assets/images/yo/sorprendido.png" },
    { personaje: "yo", texto: "Pero pero ¿Que haces acá?" },
    { personaje: "link", texto: "¿Yo? No, ¿Tú que haces acá?" },
    { personaje: "link", texto: "Usas prendas muy finas..." },
    { personaje: "yo", texto: "Mmmm si tienes razón..." },
    { personaje: "link", texto: "Lo sabía, siempre lo supe..." },
    { personaje: "yo", texto: "Si me vendría bien una mano..." },
    { personaje: "navi", texto: "Hey, listen..." },
    { personaje: "link", texto: "HEY TU... me ayudarías a decidir?" }
  ];

  let i = 0;

  function actualizar() {
    const d = dialogos[i];

    document.getElementById("dialogue-box").innerText = d.texto;

    if (d.imagen) {
      personaje.src = d.imagen;
    } else {
      personaje.src = getRandomDefault();
    }
  }

  actualizar();

  app.addEventListener("click", avanzar);

  function avanzar() {
    i++;
    if (i < dialogos.length) {
      actualizar();
    } else {
      app.removeEventListener("click", avanzar);
      console.log("AQUÍ VAN OPCIONES 🔥");
    }
  }
  }
