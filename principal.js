const {cursos} = require ('./datosCurso.js');
const fs = require('fs');
const express = require('express');
const app = express();

const opciones = {
	id:{
		demand: true,
		alias: 'i'
	},
	nombre:{
		demand:true,
		alias: 'n'
	},
	cedula:{
		demand:true,
		alias: 'c'
	}
}
var id = 0;
const argv = require ('yargs').command('inscribirme','Realizar inscripción',opciones).argv;

let listarCurso=(curso,tiempo)=>
{
	setTimeout(function(){
		console.log('Curso de : ' + cursos[curso].nombre + " - id Curso:" + cursos[curso].idCurso + " - Durecaión: " + cursos[curso].duracion + " - Valor: " + cursos[curso].valor);
	},tiempo);	
}

function findCurso(curso) { 
    return curso.idCurso == id;
}


let inscripcion=(idCurso,nombre,cedula,inscribir)=> setTimeout( function()
{
	
	if(inscribir)
	{
		console.log('##############################################');
		id = idCurso;
		resultado = cursos.find(findCurso);	
		if (resultado != null )
		{
			texto = 'El estudiante : ' + nombre + ' identificado con C.C. : ' + cedula + ', se ha inscrito al siguiente curso: ' + '\n' + 
				'NOMBRE: ' + resultado.nombre + ' - ID CURSO: ' + resultado.idCurso + '\n' + 
				'DURACIÓN: ' + resultado.duracion + ' - VALOR: ' + resultado.valor;
			console.log(texto);	
			fs.writeFile('incripcion.txt',texto,(err) => {
				if (err) throw (err);
				console.log('Se ha creado el archivo');
			})
		}
		else
		{
			console.log('El curso ingresado no existe');
		}
	}
},6000);


console.log('Lista de cursos');
listarCurso(0,0);
listarCurso(1,2000);
listarCurso(2,4000);
inscripcion(argv.i,argv.n,argv.c,true);

app.get('/', function (req, res) {
  res.send(texto)
})
 
app.listen(3000)



