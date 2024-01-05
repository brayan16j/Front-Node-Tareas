import React from 'react';
import crud from '../conexiones/crud';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export const ViewTareas = ({ tarea }) => {

    const { id, nombre, fechaCreacion, fechaInicioTarea, fechaFinalizacion, empleado, estado } = tarea;
    //const {id} = key;

    const borrarTarea = async (idTarea) => { 
        console.log(idTarea);
        swal({
          title: " Estas Seguro de eliminar la Tarea?",
          text: "Una vez eliminada no se podra recuperar",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              const response = crud.DELETE(`/tareas/${idTarea}`);
              //const mensaje = response;
              if (response) {
                swal("Tu Tarea a sido eliminada correctamente ", {
                  icon: "success",
                });
              }
              window.location.reload();
            } else {
              swal("Se cancelo la accion");
            }
          });
      }
    return (
        <div
            className='border-r p-5 flex justify-between items-center'
        >
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>Tarea : {id}</p>
                <p className='mb-1 text-xl text-gray-50'>Nombre : {nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha Creacion : {fechaCreacion}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha InicioTarea : {fechaInicioTarea}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha Finalizacion : {fechaFinalizacion}</p>
                <p className='mb-1 text-xl text-gray-50'>Empleado : {empleado.nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>Estado : {estado.nombre}</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
            <Link 
                to={`/Actualizar-tareas/${(tarea.id)}`}
                className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg'
                >Editar</Link>

                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold mt-5 text-sm rounded-lg"
                    onClick={() => borrarTarea(tarea.id)} // falta id
                >Eliminar</button>
                <Link 
                to={`/Actualizar-estados/${(tarea.id)}`}
                className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg'
                >Cambio Estado</Link>

            </div>

        </div>
    );

}

export default ViewTareas;