import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crud from '../conexiones/crud';
import ViewTareas from './ViewTareas';

const CargarTareas = () => {
    const [tareas, setTareas] = useState([]);

    const cargarTareas = async () => {
        const response = await crud.GET(`/tareas`);
        console.log(response);
        setTareas(response);
    }

    useEffect(() => {
        cargarTareas();
    }, []);

    const handleDeleteTask = (idTarea) => {
        setTareas(tareas.filter(tarea => tarea.id !== idTarea));
    }

    return (
        <>
            <div className='md:flex md:min-h-screen justify-center'>
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Listado de Tareas
                        </h1>
                    </div>
                    <div className='p-12 flex'>
                        <Link
                            to={`/`}
                            className='bg-blue-500 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg mx-4'
                        >Crear Empleado</Link>
                        <Link
                            to={`/ver-empleados`}
                            className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg mx-4'
                        >Ver Empleados</Link>
                        <Link
                            to={`/ver-categorias`}
                            className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg mx-4'
                        >Tareas por categoria</Link>
                    </div>
                    <div className="bg-gray-600 shadow mt-10 rounded-lg">
                        {tareas && tareas.map((tarea) =>
                            <ViewTareas
                                key={tarea.id}
                                tarea={tarea}
                                onTaskDelete={handleDeleteTask}
                            />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}

export default CargarTareas;
