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
h// default RANDOM
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

function iniciarDialogo() {

  const dialogos = [

    { personaje: "yo", texto: "Ahhh que puedo hacer..." },
    { personaje: "link", texto: "Hola extraño ¿que te está pasando?" },
    { personaje: "yo", texto: "Hola Link pasa que..." },
    { personaje: "yo", texto: "¡¿LINK?!" },
    { personaje: "yo", texto: "Pero pero ¿Que haces acá?" },
    { personaje: "link", texto: "¿Yo? No, ¿Tú que haces acá?" },
    { personaje: "link", texto: "Usas prendas muy finas, nunca antes las había visto en estas tierras." },
    { personaje: "link", texto: "Y tienes una forma singular, un cabello extraño y tus orejas... Creo que no eres de acá" },
    { personaje: "yo", texto: "Mmmm si tienes razón, soy bobo, acabo de invadir tú mundo por una razón inexplicable." },
    { personaje: "yo", texto: "Pero bueno ignoramos eso por ahora tengo un pequeño problema..." },
    { personaje: "link", texto: "Lo sabía, siempre lo supe, desde lejos te vi golpeandote la cabeza en un muro." },
    { personaje: "link", texto: "Cómo un loc...yyyy la cosa es que por eso fue que vine hasta acá, pensé que podria ayudarte." },
    { personaje: "yo", texto: "Si me vendría bien una mano, pasa que..." },
    { personaje: "yo", texto: "Me la pasé días, DÍAS, pensando en conseguir un buen regalo, como un premio para alguien que es muy importante para mí." },
    { personaje: "link", texto: "Oh ya entiendo ¿Están celebrando su nuevo año cumplido?" },
    { personaje: "yo", texto: "Cumpleaños, si" },
    { personaje: "yo", texto: "Digo ¡No! Disculpa ando nervioso y me confundo. No es su cumpleaños." },
    { personaje: "link", texto: "¿Entonces? Porque tanto afán por un regalo en una fecha que no es su... ¿Cumpleaños?" },
    { personaje: "yo", texto: "En nuestro mundo hay un día llamado San Valentín, se celebra el día del amor y la amistad, y pues..." },
    { personaje: "yo", texto: "Ella es alguien muy especial para mí, ella no suele celebrar fechas que para los demás son importantes, y ahí mi dilema." },
    { personaje: "yo", texto: "No sabía si debía celebrarlo e incluirla dándole un obsequio o un detalle, y decidí que lo haría, un pequeño salto de fé." },
    { personaje: "link", texto: "Y ahí está tu problema, no sabes que darle." },
    { personaje: "yo", texto: "Si se que darle, Hay mucho que podría darle, el problema es que no quiero hacerlo muy grande para no ir en contra de su forma de ser, osea que no celebre ciertas fechas" },
    { personaje: "yo", texto: "Pero a la vez, me gustaría que sienta que realmente me importa, que yo la quiero mucho a pesar de todo y sobre todo." },
    { personaje: "link", texto: "Podrías regalarle un castillo." },
    { personaje: "yo", texto: "Eh si... En mi mundo eso es muy difícil de conseguir, y más por el costo que tienen." },
    { personaje: "yo", texto: "Eso me deprime un poco, no tengo dinero en abundancia para darle lujos." },
    { personaje: "link", texto: "Oh... Podrías darle un animalito, hay muchos lindos por acá." },
    { personaje: "yo", texto: "Para poder dárselo tendría que primero, atravesar barreras dimensionales para poder llevar un ser animado a la vida real que es mi mundo... Bla...bla...bla" },
    { personaje: "navi", texto: "Hey, listen (creo que deberíamos dejarlo acá, es algo raro)" },
    { personaje: "yo", texto: "¿Que dijo?" },
    { personaje: "link", texto: "EHHH dice que deberías calmarte un poco para pensar con claridad, eso, ¿VERDAD?" },
    { personaje: "navi", texto: "Hey, listen. (Lo estaré vigilando)" },
    { personaje: "link", texto: "Viste, dice que sí." },
    { personaje: "yo", texto: "Ah que linda es verdad. Bueno en lo que estaba." },
    { personaje: "yo", texto: "Ese es mi gran pecado Link. Me preocupo demasiado, en vez de simplemente ser." },
    { personaje: "link", texto: "quieres que sea perfecto verdad?" },
    { personaje: "yo", texto: "Si, quiero que lo sea, es que ella merece lo mejor de lo mejor y me da temor no darle algo muy bueno." },
    { personaje: "link", texto: "No sé mucho de regalos, pero algo si se, y es que a veces no me gustaría recibir tesoros, dinero y esas cosas, a veces me gustaría algo simbólico" },
    { personaje: "link", texto: "Algo que me hiciera sentir que alguien me quiere, que me conoce"},
    { personaje: "link", texto: "puede no ser algo grande, pero si a mí me gusta me haría feliz. Podrías darle algo así a ella. Que cosas le gusta?" },
    { personaje: "yo", texto: "Le gustan los koalas, los gatitos." },
    { personaje: "link", texto: "Esos suenan difíciles de conseguir." },
    { personaje: "yo", texto: "Lo sé... Talvez..." },
    { personaje: "yo", texto: "Oye link, tengo una idea, iré a buscar algo, nos vemos acá en un rato, está bien?" },
    { personaje: "link", texto: "Y allá va, que se le habrá ocurrido" },
    { personaje: "navi", texto: "no sé, yo digo que deberíamos dejarlo y no volver, da miedo." },
    { personaje: "link", texto: "No estoy seguro, puede que tenga una buena opción, tendré que confiar? Será que viene con algo lindo? O vendrá con las manos vacías?" },
    { personaje: "link", texto: "HEY TU, si usted que se ve tan linda a través de este muro invisible, me ayudarías a decidir?" },

    // 🔥 OPCIÓN 1
    {
      tipo: "opcion",
      opciones: [
        { texto: "Confiar en él 💖", siguiente: 100 },
        { texto: "Dejarlo como loquito 😂", siguiente: 200 }
      ]
    },

    // ---------------- RUTA A ----------------
    { id: 100, personaje: "link", texto: "Muy bien, vamos a ver qué tiene para mostrarnos, gracias por ayudarme con la decisión linda Kelly" },
    { personaje: "link", texto: "¿Cómo se tu nombre? Hehe tal vez lo presentí. Bueno sigamos con el tipo extraño." },

    { id: 300, personaje: "link", texto: "Oh hola otra vez, ya estamos aquí." },

    // ---------------- RUTA B ----------------
    { id: 200, personaje: "link", texto: "Estaría chistoso hahaha me agrada tu sentido del humor linda Kelly" },
    { personaje: "link", texto: "Aunque me da algo de pena, se ve muy indefenso y débil" },
    { personaje: "link", texto: "¿Estás segura que lo dejaremos solo?" },

    // 🔥 OPCIÓN 2
    {
      tipo: "opcion",
      opciones: [
        { texto: "Sí, dejémoslo", siguiente: 400 },
        { texto: "No, vamos con él", siguiente: 500 }
      ]
    },

    { id: 400, personaje: "link", texto: "Okey dejémoslo, aunque... Mejor acompáñame un ratito a ver qué quiere si? Solo por si acaso, y luego nos vamos." },

    { id: 500, personaje: "link", texto: "Perfecto, me gusta esa forma de ser, tienes un lindo corazón. Vayamos a verlo." },

    { id: 600, personaje: "link", texto: "Oh hola otra vez, ya estamos aquí." },
    { personaje: "yo", texto: "Estamos? Cómo que... Estamos...?" },
    { personaje: "link", texto: "AH EH me refiero a mi y a navi hehe" },
    { personaje: "navi", texto: "listen (yo no quería venir)" },
    { personaje: "yo", texto: "Ohhh jajaja está bien gracias por venir, mira lo que encontré." },
    { personaje: "link", texto: "Wow esa flor es muy linda, le quieres regalar flores?" },
    { personaje: "yo", texto: "Si y no, si pensé en darle un ramo de flores, pero..." },
    { personaje: "yo", texto: "Esta mujer es algo diferente, ya te dije, es muy especial, me encanta así, y no quiero que me tiren el ramo de flores en la cara jajaja" },
    { personaje: "link", texto: "Uh que ruda, eso es cool. Entonces le regalarás una flor en una, maceta?" },
    { personaje: "yo", texto: "Si exactamente, es el mejor regalo que existe." },
    { personaje: "link", texto: "Si..." },
    { personaje: "link", texto: "(Susurra) Sabes Kelly, yo pensaba que traería un cristal en forma de corazón, uno muy valioso." },
    { personaje: "yo", texto: "Que dijiste Link?" },
    { personaje: "link", texto: "Oh nada nada, solo decía que ese regalo está lindo, aunque yo pensé que traerlas algo más..." },
    { personaje: "yo", texto: "Mas grande? Mas valioso? Creeme, esto es muy valioso." },
    { personaje: "yo", texto: "Te lo explicaré, está flor, fue difícil de conseguir, de hecho después de 25minutos buscando, pude encontrarla." },
    { personaje: "yo", texto: "Habían muchísimas flores pero, está es la flor que a ella le gusta mucho" },
    { personaje: "link", texto: "Y era necesario la maceta? Supongo que para que no se muera" },
    { personaje: "yo", texto: "¡EXACTO! La extracción que hice fue muy cuidadosa, no lastime ni una sola raíz, y la traje en una maceta para que podamos seguirla haciendo crecer y vivir, por mucho mucho tiempo." },
    { personaje: "yo", texto: "se que es algo pequeño, y no es muy valioso para los demás. Pero es muy significativo." },
    { personaje: "yo", texto: "Ahora, también pensé en regalarle una estrella real, pero eso ya es casi imposible. Así que creo que está florcita está bien." },
    { personaje: "link", texto: "Tu gesto es muy bueno y es de admirar, déjame decirte que, creo que si es una buena decisión." },
    { personaje: "yo", texto: "Muchas gracias Link. En serio me siento muy agradecido por tu ayuda, y sobre todo por regresar, bueno que regresaran jaja" },
    { personaje: "navi", texto: "listen (yo no quería venir, me das miedo, parece que perdiste la cordura)" },
    { personaje: "link", texto: "A NOSOTROSSS nos alegra haberte ayudado, espero que nos veamos en otro momento" },
    { personaje: "link", texto: "Sin duda esta experiencia es algo curiosa, me gustaría volver a verte" },
    { personaje: "link", texto: "(Susurra a la pantalla) En realidad me gustaría verte más a ti, me caes mejor que este loquito..." },
    { personaje: "yo", texto: "como dices Link?" },
    { personaje: "link", texto: "EHHHH... REGRESA A TU MUNDO! adiooooos." },
    { personaje: "yo", texto: "ahhhhhhh" },
    { personaje: "yo", texto: "Eh hola cariñito mío, hoy te ves más hermosa de lo habitual sabías?" },
    { personaje: "yo", texto: "Yo te traje algo hoy, no es mucho pero..." },
    { personaje: "yo", texto: "Ten, es para tí." },
    { personaje: "yo", texto: "La verdad me siento muy feliz, no sabes lo que pasé para poder darte finalmente esto, de la nada estaba...bla...bla...bla." },
// 🔥 OPCIÓN FINAL
    {
  tipo: "opcion",
  opciones: [
    { texto: "Dejar que diga algo más 💬", siguiente: 900 },
    { texto: "Callarlo con un beso 😘", siguiente: 950 }
  ]
},

// RUTA A
{ id: 900, personaje: "yo", texto: "Preciosa..." },
{ personaje: "yo", texto: "Te amo, mucho mucho." },

// RUTA B
{ id: 950, personaje: "yo", texto: "muak, te amo cariño." }
  ];

  let i = 0;

  function buscarIndicePorId(id) {
    return dialogos.findIndex(d => d.id === id);
  }

  function actualizar() {
    const d = dialogos[i];

    // 👇 SI ES OPCIÓN
    if (d.tipo === "opcion") {
      mostrarOpciones(d.opciones);
      return;
    }

    document.getElementById("dialogue-box").innerText = d.texto;

    if (d.imagen) {
      personaje.src = d.imagen;
    } else {
      personaje.src = getRandomDefault();
    }
  }

  function mostrarOpciones(opciones) {
    const box = document.getElementById("dialogue-box");

    box.innerHTML = "<b>Elige una opción:</b><br><br>";

    opciones.forEach(op => {
      const btn = document.createElement("button");

      btn.innerText = op.texto;

      btn.style.display = "block";
      btn.style.margin = "10px auto";
      btn.style.padding = "10px";
      btn.style.width = "90%";

      btn.onclick = () => {
        i = buscarIndicePorId(op.siguiente);
        actualizar();
      };

      box.appendChild(btn);
    });
  }

  actualizar();

  app.addEventListener("click", avanzar);

  function avanzar() {
    i++;

    if (i >= dialogos.length) return;

    actualizar();
  }
  }
