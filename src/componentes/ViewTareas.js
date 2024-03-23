import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTask } from '../hooks/useDeleteTask'; // Nuevo hook personalizado

export const ViewTareas = ({ tarea, onTaskDelete }) => {
    const { id, nombre, fechaCreacion, fechaInicioTarea, fechaFinalizacion, empleado, estado } = tarea;
    const [deleteTask] = useDeleteTask();
    
    const handleDelete = async () => {
      const confirmed = window.confirm("¿Estás seguro de eliminar la tarea?");
      if (confirmed) {
        try {
          await deleteTask(tarea.id);
          onTaskDelete(tarea.id);
        } catch (error) {
          console.error(error);
          alert("Hubo un error al eliminar la tarea");
        }
      }
    };
     
    return (
        <div className='border-r p-5 flex justify-between items-center'>
            <div className='flex flex-col items-start'>
                <p className='mb-1 text-xl text-gray-50'>Tarea : {id}</p>
                <p className='mb-1 text-xl text-gray-50'>Nombre : {nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha Creacion : {fechaCreacion}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha InicioTarea : {fechaInicioTarea}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha Finalizacion : {fechaFinalizacion}</p>
                <p className='mb-1 text-xl text-gray-50'>Empleado : {empleado ? empleado.nombre : 'No asignado'}</p>
                <p className='mb-1 text-xl text-gray-50'>Estado : {estado ? estado.nombre : 'No asignado'}</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
                <Link 
                    to={`/Actualizar-tareas/${(tarea.id)}`}
                    className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg'
                >Editar</Link>

                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold mt-5 text-sm rounded-lg"
                    onClick={handleDelete}
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
