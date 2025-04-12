/***** WebKit (Safari)**********/
function fixViewport() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

window.addEventListener("resize", fixViewport);
fixViewport();

/*--------effet-section-3----+-------dark-mode--------------------------*/

document.addEventListener("DOMContentLoaded", function () {
  const darkModeSwitch = document.querySelector("#toggleButton");

  // Vérifier si le mode sombre est activé et l'appliquer
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (darkModeSwitch) darkModeSwitch.checked = true;
  }

  // Gestion du mode sombre
  if (darkModeSwitch) {
    darkModeSwitch.addEventListener("change", () => {
      document.body.classList.toggle("dark-mode");

      // Sauvegarde de l'état du mode sombre
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });
  }

  // Vérifier si on est sur la page index.html avant d'exécuter le code lié à "h3#text"
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    const colors = [
      [
        "#FFFFFF",
        "#1a1a1a", // Couleur 0 (light mode)
        "#050113", // Couleur 1 (dark mode)
        "#090227",
        "#0E033A",
        "#13044E",
        "#170561",
        "#1C0675",
        "#200688",
        "#25079C",
        "#2A08AF",
        "#2E09C3",
        "#330AD6",
        "#380BEA",
        "#4215F4",
        "#4A20F5",
        "#613CF6",
      ],
    ];

    const random = (times) => Math.floor(Math.random() * times);
    const select = (el) => document.querySelector(el);
    const selects = (el) => document.querySelectorAll(el);

    const textElement = select("h3#text");
    if (textElement) {
      const words = textElement.textContent.split(/\s+/g);
      let key = 0;
      let color = colors[random(colors.length)];

      function updateSpanColors() {
        const isDarkMode = document.body.classList.contains("dark-mode");
        for (let span of selects(".container_effet > span")) {
          span.style.color = isDarkMode ? color[1] : color[0];
        }
      }

      setInterval(() => {
        color = colors[random(colors.length)];
        updateSpanColors();
      }, 8000);

      for (let word of words) {
        let span = select(".container_effet").appendChild(
          document.createElement("span")
        );
        span.addEventListener("mouseover", function () {
          key = (key + 1) % color.length;
          this.style.color = color[key];
        });
        if (word) span.textContent = word + " ";
      }
    }
  }
});

/*---------------timeline--------------*/

(function () {
  "use strict";

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

(function () {
  "use strict";

  // Sélectionnez tous les éléments <li> de la timeline
  const items = document.querySelectorAll(".timeline li");
  const timeline = document.querySelector(".timeline"); // Cible la timeline

  // Ajoutez des écouteurs d'événements pour chaque <li>
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const bgClass = item.getAttribute("data-bg-image"); // Récupère la classe de l'attribut
      timeline.className = "timeline"; // Réinitialise les classes de la timeline
      timeline.classList.add(bgClass); // Applique la classe correspondante
    });

    item.addEventListener("mouseleave", () => {
      timeline.className = "timeline"; // Réinitialise le fond de la timeline
    });
  });
})();

/*-------modifier-programmation-to-ptog----------*/

function updateMenuText() {
  let links = document.querySelectorAll(".menu__link");
  links.forEach((link) => {
    if (
      window.innerWidth <= 698 &&
      link.textContent.includes("Programmation")
    ) {
      link.textContent = "Prog";
    } else if (window.innerWidth > 698 && link.textContent === "Prog") {
      link.textContent = "Programmation";
    }
  });
}
window.addEventListener("resize", updateMenuText);
window.addEventListener("DOMContentLoaded", updateMenuText);
