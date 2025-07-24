document.addEventListener("DOMContentLoaded", () => {
  // 💬 Mostrar frase motivadora aleatoria
  const frases = [
    "¡Tú puedes, futura enfermera! 💪",
    "Un día a la vez, ¡pero sin rendirse! 🌟",
    "Recuerda por qué empezaste 🩺❤️",
    "¡Cada clic es un paso más cerca de tu título! 🎓",
    "Estás hecha para esto. ¡Ánimo! 💖"
  ];
  alert(frases[Math.floor(Math.random() * frases.length)]);

  const data = [
    ["1° Año - Primer Semestre", ["🧬 Biología Celular", "🧠 Razonamiento Matemático", "👩‍⚕️ Bases Teóricas de la Enfermería", "🧠 Morfología Integral", "🧪 Química General y Orgánica"]],
    ["1° Año - Segundo Semestre", ["🧪 Bioquímica", "🧠 Psicología Evolutiva", "🌎 Socioantropología", "👩‍⚕️ Bases del Cuidado de Enfermería", "🦠 Microbiología", "🗣 Habilidades Comunicativas"]],
    ["2° Año - Tercer Semestre", ["🧬 Fisiología", "👩‍⚕️ Enfermería en la Promoción y Prevención en Salud", "👶 Cuidado de Enfermería en el Ciclo Vital", "🌎 Salud Pública I", "🗣 Inglés I"]],
    ["2° Año - Cuarto Semestre", ["🧬 Fisiopatología", "👵 Cuidado de Enfermería en el Adulto y Adulto Mayor", "💊 Farmacología General", "🌎 Salud Pública II", "👨‍👩‍👧 Bases de Enfermería en Salud Familiar y Comunitaria", "🗣 Inglés II"]],
    ["3° Año - Quinto Semestre", ["💊 Farmacología Clínica y Farmacovigilancia", "🏡 Cuidados de Enfermería en Salud Familiar", "👶 Cuidado de Enfermería en el Niño y Adulto", "📊 Fundamento de Gestión y Liderazgo en Enfermería", "🩺 Integrador I: Cuidado de Enfermería I", "🗣 Inglés III"]],
    ["3° Año - Sexto Semestre", ["🧠 Cuidado de Enfermería en Salud Mental y Comunidad", "👵 Cuidado de Enfermería en el Adulto y Adulto Mayor con Alteración de Salud", "📊 Método de Análisis de Enfermería", "🏥 Administración de Unidades de Enfermería", "💻 Razonamiento Científico y TICs", "🗣 Inglés IV"]],
    ["4° Año - Séptimo Semestre", ["⚖️ Ética y Legislación en Enfermería", "👨‍👩‍👧 Cuidado de Enfermería en Salud Familiar y Comunitaria", "👶 Cuidado de Enfermería en el Niño y Adolescente con Alteración de la Salud", "📚 Desarrollo de Proyectos en Enfermería", "🧠 Pensamiento Crítico"]],
    ["4° Año - Octavo Semestre", ["👶 Cuidado Integral del Niño y Adulto", "🔬 Seminario de Investigación en Enfermería", "🩺 Integrador II: Cuidado de Enfermería II", "🌱 Responsabilidad Social"]],
    ["5° Año - Noveno Semestre", ["🏥 Integrador III: Gestión del Cuidado en Unidades de Enfermería"]],
    ["5° Año - Décimo Semestre", ["🏡 Integrador IV: Gestión del Cuidado en Salud Familiar y Comunitaria"]]
  ];

  const grid = document.querySelector(".grid");
  data.forEach((semestreData, sIndex) => {
    const [tituloOriginal, ramos] = semestreData;
    const semestreDiv = document.createElement("div");
    semestreDiv.classList.add("semester");
    const h2 = document.createElement("h2");
    h2.textContent = tituloOriginal;
    semestreDiv.appendChild(h2);

    ramos.forEach((ramo, cIndex) => {
      const div = document.createElement("div");
      div.classList.add("course");
      div.textContent = ramo;

      const clave = `curso-${sIndex}-${cIndex}`;
      if (localStorage.getItem(clave) === "true") {
        div.classList.add("aprobado");
      }

      div.addEventListener("click", () => {
        div.classList.toggle("aprobado");
        const aprobado = div.classList.contains("aprobado");
        localStorage.setItem(clave, aprobado);

        updateProgress();
        checkSemestre(semestreDiv, h2, tituloOriginal, sIndex);
      });

      div.addEventListener("dblclick", () => {
        const nota = prompt("📝 Escribe una nota sobre este ramo:");
        if (nota) alert(`💾 Nota guardada: "${nota}" (visible solo ahora)`);
      });

      semestreDiv.appendChild(div);
    });

    grid.appendChild(semestreDiv);
    checkSemestre(semestreDiv, h2, tituloOriginal, sIndex);
  });
  function checkSemestre(semDiv, h2, titulo, sIndex) {
    const cursos = semDiv.querySelectorAll(".course");
    const aprobados = semDiv.querySelectorAll(".course.aprobado");
    const keyFin = `semestre-${sIndex}-completado`;

    if (cursos.length === aprobados.length && !localStorage.getItem(keyFin)) {
      alert(`🎉 ¡Felicidades! Completaste ${titulo}. ¡Sigue brillando futura enfermera! 👩‍⚕️💖`);
      h2.innerHTML = `${titulo} 🏅`;
      confetti();
      localStorage.setItem(keyFin, "true");
    } else if (cursos.length !== aprobados.length) {
      h2.innerHTML = titulo;
      localStorage.removeItem(keyFin);
    }
  }

  function updateProgress() {
    const all = document.querySelectorAll(".course");
    const done = document.querySelectorAll(".course.aprobado");
    const percent = Math.round((done.length / all.length) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").textContent = `Progreso: ${done.length} aprobados / ${all.length} ramos (${percent}%)`;
  }

  document.getElementById("reset-btn").addEventListener("click", () => {
    if (confirm("¿Estás segura de que quieres reiniciar todo?")) {
      localStorage.clear();
      location.reload();
    }
  });

  document.getElementById("study-mode-btn").addEventListener("click", () => {
    document.querySelectorAll(".semester").forEach(sem => {
      const hasIncompleto = [...sem.querySelectorAll(".course")].some(c => !c.classList.contains("aprobado"));
      sem.style.display = hasIncompleto ? "block" : "none";
    });
  });

  updateProgress();
  // 📅 Calendario interactivo
  function generateCalendar() {
    const calendar = document.getElementById("calendar");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = now.toLocaleString('default', { month: 'long' });

    let html = `<h3>${monthName.toUpperCase()} ${year}</h3><div style='display:flex;flex-wrap:wrap;'>`;

    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    weekDays.forEach(d => {
      html += `<div class="calendar-day" style="background:#f9d3e0;font-weight:bold">${d}</div>`;
    });

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="calendar-day empty"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const key = `nota-${year}-${month}-${day}`;
      const nota = localStorage.getItem(key) || "";
      html += `<div class="calendar-day" data-day="${day}" onclick="agendar(${day})">${day}<span class="note">${nota}</span></div>`;
    }

    html += "</div>";
    calendar.innerHTML = html;
  }

  window.agendar = function(day) {
    const now = new Date();
    const key = `nota-${now.getFullYear()}-${now.getMonth()}-${day}`;
    const nota = prompt("📝 ¿Qué quieres agendar para el día " + day + "?");
    if (nota !== null) {
      localStorage.setItem(key, nota);
      generateCalendar();
    }
  };

  generateCalendar();
});
