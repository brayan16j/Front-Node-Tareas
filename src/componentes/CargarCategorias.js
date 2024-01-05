import React, { useState, useEffect } from 'react';
import crud from '../conexiones/crud';
import { Link } from 'react-router-dom';
import ViewEstados from './ViewEstados';



const CargarCategorias = () => {

    const [estados, setEstados] = useState([]);

    const cargarEstados = async () => {
        const response = await crud.GET(`/estado`);
        console.log(response);
        setEstados(response);
    }
    //console.log(estados);
    useEffect(() => {
        cargarEstados();
    }, []);

    return (
        <>
            <div className='md:flex md:min-h-screen justify-center'>
                <main className='flex-1'>
                    <div className='mt-10 flex justify-center'>
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                            Listado de Estados
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
                            to={`/ver-tareas`}
                            className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg mx-4'
                        >Ver Tareas</Link>
                    </div>
                    <div className="bg-gray-600 shadow mt-10 rounded-lg">
                        {estados.map(estados => (
                            <Link to={`/tarea/${estados.id}`} key={estados.id}>
                                <ViewEstados estados={estados} />
                            </Link>
                        ))}
                    </div>

                </main>
            </div>

        </>
    );

}

export default CargarCategorias;