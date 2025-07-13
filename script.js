<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Malla Curricular Interactiva</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f4f8;
      padding: 20px;
    }
    h1 {
      text-align: center;
      margin-bottom: 20px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 15px;
    }
    .semestre {
      background-color: #e3f2fd;
      padding: 10px;
      border-radius: 12px;
      border: 2px solid #2196f3;
    }
    .semestre h2 {
      text-align: center;
      font-size: 16px;
    }
    .curso {
      margin: 8px 0;
      padding: 10px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: 0.3s;
    }
    .curso:hover {
      background-color: #e0f7fa;
    }
    .curso.bloqueado {
      background-color: #cfd8dc;
      color: #757575;
      cursor: not-allowed;
      pointer-events: none;
    }
    .curso.tachado {
      text-decoration: line-through;
      background-color: #b2dfdb !important;
      color: #004d40;
    }
  </style>
</head>
<body>

<h1>Malla Curricular Interactiva</h1>

<div class="grid">
  <!-- Aquí se insertarán dinámicamente los semestres y cursos -->
</div>

<script>
  const cursos = {
    "I Semestre": [
      { id: "FundamentosEnf1", nombre: "Fundamentos de Enfermería I", abre: ["DesempenoProf1"] },
      { id: "Quimica", nombre: "Química General y Orgánica", abre: ["Bioquimica"] },
      { id: "BiologiaCelular", nombre: "Biología Celular y Genética", abre: ["Histologia", "Anatomia", "Fisiologia", "Embriologia", "Bioquimica"] },
      { id: "Matematicas", nombre: "Matemáticas", abre: ["Investigacion1"] },
      { id: "Fisica", nombre: "Física", abre: ["Fisiologia", "Investigacion1"] },
      { id: "Sociales1", nombre: "Ciencias Sociales y Salud I", abre: ["Sociales2"] },
      { id: "Educacion1", nombre: "Educación en Salud I", abre: ["Educacion2", "ClinicaComunitaria"] },
      { id: "Ingles1", nombre: "Inglés I", abre: ["Ingles2"] }
    ],
    "II Semestre": [
      { id: "SaludComunitaria1", nombre: "Salud Comunitaria I", abre: ["SaludComunitaria2", "ClinicaComunitaria"], bloqueado: true },
      { id: "DesempenoProf1", nombre: "Integración al Desempeño Profesional I", abre: ["Neonatologia1"], bloqueado: true },
      { id: "Bioquimica", nombre: "Bioquímica", abre: ["Farmacologia"], bloqueado: true },
      { id: "Embriologia", nombre: "Biología del Desarrollo y Embriología Humana", abre: ["Obstetricia1"], bloqueado: true },
      { id: "Fisiologia", nombre: "Fisiología General", abre: ["FundamentosEnf2", "Agentes", "Neonatologia1", "FisiologiaSistemas", "Obstetricia1", "Inmunologia"], bloqueado: true },
      { id: "Anatomia", nombre: "Anatomía", abre: ["Ginecologia", "FundamentosEnf2", "Agentes", "Neonatologia1", "Obstetricia1"], bloqueado: true },
      { id: "Histologia", nombre: "Histología", abre: ["Ginecologia", "FundamentosEnf2", "Agentes", "Neonatologia1", "Obstetricia1"], bloqueado: true },
      { id: "Ingles2", nombre: "Inglés II", abre: ["Ingles3"], bloqueado: true }
    ]
    // Agrega aquí los semestres III al X con el mismo formato
  };

  const grid = document.querySelector('.grid');

  for (let semestre in cursos) {
    const divSemestre = document.createElement('div');
    divSemestre.className = 'semestre';
    divSemestre.innerHTML = `<h2>${semestre}</h2>`;

    cursos[semestre].forEach(c => {
      const divCurso = document.createElement('div');
      divCurso.className = 'curso' + (c.bloqueado ? ' bloqueado' : '');
      divCurso.id = c.id;
      divCurso.dataset.desbloquea = c.abre.join(',');
      divCurso.textContent = c.nombre;
      divSemestre.appendChild(divCurso);
    });

    grid.appendChild(divSemestre);
  }

  document.querySelectorAll('.curso').forEach(curso => {
    curso.addEventListener('click', () => {
      if (curso.classList.contains('bloqueado')) return;
      curso.classList.toggle('tachado');
      if (curso.classList.contains('tachado')) {
        const desbloquear = curso.dataset.desbloquea?.split(',');
        if (!desbloquear) return;
        desbloquear.forEach(id => {
          const siguiente = document.getElementById(id.trim());
          if (siguiente && siguiente.classList.contains('bloqueado')) {
            siguiente.classList.remove('bloqueado');
          }
        });
      }
    });
  });
</script>

</body>
</html>
