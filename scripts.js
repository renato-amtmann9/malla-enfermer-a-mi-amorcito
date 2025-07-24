document.addEventListener("DOMContentLoaded", () => {
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
    const [titulo, ramos] = semestreData;
    const semestreDiv = document.createElement("div");
    semestreDiv.classList.add("semester");
    const h2 = document.createElement("h2");
    h2.textContent = titulo;
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

        const cursos = semestreDiv.querySelectorAll(".course");
        const aprobadosCursos = semestreDiv.querySelectorAll(".course.aprobado");
        const keyFin = `semestre-${sIndex}-completado`;

        if (cursos.length === aprobadosCursos.length && !localStorage.getItem(keyFin)) {
          alert(`🎉 ¡Felicidades! Completaste ${titulo}. ¡Sigue brillando futura enfermera! 👩‍⚕️💖`);
          confetti();
          localStorage.setItem(keyFin, "true");
        }

        if (cursos.length !== aprobadosCursos.length) {
          localStorage.removeItem(keyFin);
        }
      });

      div.addEventListener("dblclick", () => {
        const nota = prompt("📝 Escribe una nota sobre este ramo:");
        if (nota) alert(`💾 Nota guardada: "${nota}" (solo visible ahora)`);
      });

      semestreDiv.appendChild(div);
    });

    grid.appendChild(semestreDiv);
  });

  function updateProgress() {
    const all = document.querySelectorAll(".course");
    const done = document.querySelectorAll(".course.aprobado");
    const percent = Math.round((done.length / all.length) * 100);
    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("progress-text").textContent = `Progreso: ${percent}%`;
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
});
