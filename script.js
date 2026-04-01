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

// -------------------- 🔥 PRELOAD VIDEO MODOS -------------------- 
const bgVideoModo = document.createElement("video");
bgVideoModo.src = "assets/video/modos.mp4";
bgVideoModo.preload = "auto";
bgVideoModo.loop = true;
bgVideoModo.muted = true;
bgVideoModo.playsInline = true;
bgVideoModo.style.position = "fixed";
bgVideoModo.style.top = "0";
bgVideoModo.style.left = "0";
bgVideoModo.style.width = "100vw";
bgVideoModo.style.height = "100vh";
bgVideoModo.style.objectFit = "cover";
bgVideoModo.style.zIndex = "-2";
bgVideoModo.style.display = "none";
bgVideoModo.load();
document.body.appendChild(bgVideoModo);

// -------------------- 🔥 PRELOAD IMAGEN 14 FEB --------------------
const bgImageSanValentin = document.createElement("img");
bgImageSanValentin.src = "assets/images/sanvalentin.jpg";
bgImageSanValentin.style.position = "fixed";
bgImageSanValentin.style.top = "0";
bgImageSanValentin.style.left = "0";
bgImageSanValentin.style.width = "100vw";
bgImageSanValentin.style.height = "100vh";
bgImageSanValentin.style.objectFit = "cover";
bgImageSanValentin.style.zIndex = "-2";
bgImageSanValentin.style.display = "none";
document.body.appendChild(bgImageSanValentin);

// -------------------- 🔥 PRELOAD IMÁGENES MODOS --------------------
const modo1Img = new Image();
modo1Img.src = "assets/images/sanvalentinmodo.jpg";

const modo2Img = new Image();
modo2Img.src = "assets/images/cumpleañosmodo.jpg";

const modo3Img = new Image();
modo3Img.src = "assets/images/noviamodo.png";

// -------------------- UTILIDADES --------------------
function playTransition() {
  const sfx = new Audio(TRANSITION_SRC);
  sfx.volume = 1;
  sfx.play().catch(() => {});
}

function sceneTransition(changeSceneCallback) {
  playTransition();
  transitionLayer.classList.add("active");

  setTimeout(() => {
    if (changeSceneCallback) changeSceneCallback();
    transitionLayer.classList.remove("active");
  }, TRANSITION_DURATION);
}

// -------------------- EVENTOS --------------------
startBtn.addEventListener("click", () => {

  sceneTransition(() => {

    if (bgVideoInicio) {
      bgVideoInicio.pause();
      bgVideoInicio.style.display = "none";
    }

    bgImageSanValentin.style.display = "none";

    // -------------------- ESCENA ELECCIÓN DE MODOS --------------------
    app.innerHTML = `
      <div class="modos-container">
        <h1>Elección de modos</h1>
        <div class="modos-grid">

          <div class="modo-wrapper">
            <h2>14-Feb</h2>
            <div class="modo-card" id="modo1">
              <img src="${modo1Img.src}">
            </div>
          </div>

          <div class="modo-wrapper">
            <h2>PRÓXIMAMENTE</h2>
            <div class="modo-card">
              <img src="${modo2Img.src}" style="filter: brightness(20%);">
            </div>
          </div>

          <div class="modo-wrapper">
            <h2>PRÓXIMAMENTE</h2>
            <div class="modo-card">
              <img src="${modo3Img.src}" style="filter: brightness(10%);">
            </div>
          </div>

          <div class="modo-wrapper">
            <h2>PRÓXIMAMENTE</h2>
            <div class="modo-card black-locked"></div>
          </div>

        </div>
      </div>
    `;

    // Mostrar video de modos
    bgVideoModo.style.display = "block";
    bgVideoModo.currentTime = 0;
    bgVideoModo.play();

    currentMusic = musicModos;
    currentMusic.currentTime = 0;
    currentMusic.volume = BASE_VOLUME_MODOS;
    currentMusic.play();

    // -------------------- MODO 14-FEB --------------------
    const modo1 = document.getElementById("modo1");
    modo1.addEventListener("click", () => {

      if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
      }

      sceneTransition(() => {

        bgVideoModo.pause();
        bgVideoModo.style.display = "none";

        // -------------------- ESCENA 14 DE FEBRERO --------------------
        app.innerHTML = `
          <div style="width: 100%; height: 100%;"></div>
        `;

        // Mostrar fondo
        bgImageSanValentin.style.display = "block";

        currentMusic = musicSanValentin;
        currentMusic.currentTime = 0;
        currentMusic.volume = BASE_VOLUME_SANVALENTIN;
        currentMusic.play();

      });
    });

  });

});
