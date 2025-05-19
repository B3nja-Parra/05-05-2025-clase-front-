const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");


document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();
    const lastName=document.getElementById("lastName").value.trim();
    const grade=document.getElementById("grade").value.trim();
    const date=document.getElementById("date").value.trim();

    if(grade <1 || grade >7 || !name || !lastName || isNaN(grade)){
    alert("Error Datos Incorrecctos")
    return
    }

    //guardar datos en el Array

    const student={name,lastName,grade,date};
    students.push(student);
    addStudentToTable(student)
    calcularPromedio()
    //console.log(student)

    this.reset();

});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.date}</td>
    <td> <button class="delete">Eliminar</button><button class="modify">Editar</button></td>
    `;
    row.querySelector(".delete").addEventListener("click",function(){
        deleteEstudiante(student,row);
    });

    tableBody.appendChild(row);
}

function calcularPromedio(){
    notas=[]
    if (students.length===0){
        averageDiv.textContent="Promedio General del Curso:N/A"
        return;
    }

        for (let alumno of students){
        console.log(alumno) //mostrar lo que recorre la variable alumno
        notas.push(parseFloat(alumno.grade))
    }
    
    const suma = notas.reduce((acumulador, valorActual) => acumulador + valorActual,0);//linea para realizar el calculo de el promedio

    let promedio = suma/students.length
    averageDiv.textContent=`Promedio de Calificaciones: ${promedio.toFixed(2)}`//mostrar el promedio general

}

function deleteEstudiante(student,row){
    const index=students.indexOf(student);
    if(index > -1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}

