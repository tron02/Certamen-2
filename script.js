const students=[]

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

 const student={name,lastName,date,grade}
 students.push(student)
 //console.log(students)
addStudentToTable(student);
actualizarPromedio();
 this.reset()

});

const tableBody=document.querySelector("#studentsTable tbody");
function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=`
    <td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${formatearFecha(student.date)}</td>
    <td>${student.grade.toFixed(1)}</td>
    `;
 tableBody.appendChild(row);
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