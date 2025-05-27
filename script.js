const students=[]
let editIndex = null;

document.getElementById("studentForm").addEventListener("submit",function(e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const gradeValue = document.getElementById("grade").value.trim();
 const grade=parseFloat(gradeValue);
 const date=document.getElementById("date").value.trim();

 clearErrors();

 let error = false;
 
 if (!name) {
    showError("errorName", "El nombre es obligatorio.");
    error = true;
 }
 
 if (!lastName) {
    showError("errorLastName", "El apellido es obligatorio.");
 }
 
 if (!date) {
    showError("errorDate", "La fecha es obligatoria.");
    error = true;
 }
 
 if (!gradeValue || isNaN(grade) || grade < 1 || grade > 7) {
    showError("errorGrade", "La nota debe estar entre 1.0 y 7.0.");
    error = true;
 }
 
 if (error) return;

 const student = { name, lastName, date, grade };

    if (editIndex !== null) {
        students[editIndex] = student;
        renderTable();
        editIndex = null;
    } else {
        students.push(student);
        addStudentToTable(student, students.length - 1);
    }

    actualizarPromedio();
    actualizarEstadisticas();
    document.getElementById("studentForm").reset();
});

const tableBody=document.querySelector("#studentsTable tbody");
function addStudentToTable(student, index){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${formatearFecha(student.date)}</td>
    <td>${student.grade.toFixed(1)}</td>
    <td>
            <button onclick="editarEstudiante(${index})">Editar</button>
            <button onclick="eliminarEstudiante(${index})">Eliminar</button>
        </td>
    `;
 tableBody.appendChild(row);
}

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        addStudentToTable(student, index);
    });
}

function editarEstudiante(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("date").value = student.date;
    document.getElementById("grade").value = student.grade;
    editIndex = index;
}

function eliminarEstudiante(index) {
    students.splice(index, 1);
    renderTable();
    actualizarPromedio();
    actualizarEstadisticas();
}

const promedioDiv = document.getElementById("average")
function actualizarPromedio() {
   let suma = 0;
   for (const student of students) {
      suma += student.grade;
   }
   const promedio = (suma / students.length).toFixed(2);
   promedioDiv.textContent = `Promedio General del curso: ${promedio}`;
}

function actualizarEstadisticas(){
   const total = students.length;
   const aprobados = students.filter(s => s.grade >= 4.0).length;
   const reprobados = total - aprobados;

   const porcentajeAprobados = total ? ((aprobados / total) * 100).toFixed(1) : 0;
   const porcentajeReprobados =total ? ((reprobados / total) * 100).toFixed(1) : 0;

   document.getElementById("totalEstudiantes").textContent = total;
   document.getElementById("porcentajeAprobados").textContent = `${porcentajeAprobados}%`;
   document.getElementById("porcentajeReprobados").textContent = `${porcentajeReprobados}%`;
}

function showError(id, message) {
   document.getElementById(id).textContent = message;
}

function clearErrors() {
   const errors = document.querySelectorAll(".error");
   errors.forEach(error => error.textContent="");
}

function formatearFecha(fechaISO) {
   const [año, mes, dia] = fechaISO.split("-");
   return `${dia}/${mes}/${año}`;
}