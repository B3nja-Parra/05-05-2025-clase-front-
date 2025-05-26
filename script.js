const students = [];
let editIndex = -1;

const tableBody = document.querySelector("#studentsTable tbody");
const averageDiv = document.getElementById("average");
const form = document.getElementById("studentForm");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const grade = document.getElementById("grade").value.trim();
    const date = document.getElementById("date").value.trim();

    const gradeValue = parseFloat(grade);

    if (gradeValue < 1 || gradeValue > 7 || !name || !lastName || isNaN(gradeValue)) {
        alert("Error Datos Incorrectos");
        return;
    }

    if (editIndex === -1) {
        // Agregar
        const student = { name, lastName, grade: gradeValue, date };
        students.push(student);
        addStudentToTable(student);
    } else {
        // Editar
        students[editIndex] = { name, lastName, grade: gradeValue, date };
        actualizarTabla();
        submitButton.textContent = "Guardar Estudiante";
        editIndex = -1;
    }

    calcularPromedio();
    actualizarEstadisticas();
    form.reset();
});

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML =
        `<td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>
        <td><button class="delete">Eliminar</button><button class="modify">Editar</button></td>`;

    row.querySelector(".delete").addEventListener("click", function () {
        deleteEstudiante(student, row);
    });

    row.querySelector(".modify").addEventListener("click", function () {
        modificarEstudiante(student);
    });

    tableBody.appendChild(row);
}

function calcularPromedio() {
    if (students.length === 0) {
        averageDiv.textContent = "Promedio General del Curso : N/A";
        return;
    }

    const notas = students.map(s => parseFloat(s.grade));
    const suma = notas.reduce((acc, val) => acc + val, 0);
    const promedio = suma / students.length;

    averageDiv.textContent = `Promedio de Calificaciones: ${promedio.toFixed(2)}`;
}


function deleteEstudiante(student, row) {
    const index = students.indexOf(student);
    if (index > -1) {
        students.splice(index, 1);
        row.remove();
        calcularPromedio();
        actualizarEstadisticas();
    }
}

function modificarEstudiante(student) {
    editIndex = students.indexOf(student);

    document.getElementById("name").value = student.name;
    document.getElementById("lastName").value = student.lastName;
    document.getElementById("grade").value = student.grade;
    document.getElementById("date").value = student.date;

    submitButton.textContent = "Guardar Cambios";
}

function actualizarTabla() {
    tableBody.innerHTML = "";
    students.forEach(student => {
        addStudentToTable(student);
    });
}

function actualizarEstadisticas() {
    const total = students.length;
    const aprobados = students.filter(s => s.grade >= 4.0).length;
    const reprobados = students.filter(s => s.grade < 4.0).length;

    document.getElementById("totalStudents").textContent = `Cantidad de estudiantes: ${total}`;
    document.getElementById("aprobados").textContent = `Aprobados: ${aprobados}`;
    document.getElementById("reprobados").textContent = `Reprobados: ${reprobados}`;
}
