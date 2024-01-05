import React, { useState } from 'react';
import crud from '../conexiones/crud';
import { Link } from 'react-router-dom';

const Estado = () => {
    const [categoria, setCategoria] = useState('');
    const [tareas, setTareas] = useState([]);

    const onChange = (e) => {
        setCategoria(e.target.value);

    };

    const obtenerTareasPorCategoria = async () => {
        const response = await crud.GET(`/tareas/categoria/${categoria}`);
        console.log(response);
        setTareas(response);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (categoria) {
          obtenerTareasPorCategoria();
          console.log(categoria);
        }
      };

    return (
        <>
            <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
                <div className='md:w-2/3 lg:w-2/5'>
                    <div className='flex justify-center'>
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10" >
                            Seleccionar Categoria
                        </h1>
                    </div>
                    <form
                        className='my-10 bg-gray-700 shadow rounded-lg p-10 '
                        onSubmit={onSubmit}
                    >
                        <div className='my-5'>
                            <label className='uppercase text-white block text-xl font-bold' >Categorias</label>
                            <select
                                name="categoria"
                                value={categoria}
                                onChange={onChange}
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            >
                                <option value="">Selecciona una categoria</option>
                                <option value="DESARROLLO">DESARROLLO</option>
                                <option value="IMPLEMENTACION">IMPLEMENTACION</option>
                                <option value="ERRORES">ERRORES</option>
                                <option value="FINALIZADA">FINALIZADA</option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Seleccionar Categoria"
                            className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300  transition-colors"
                        />
                        <Link
                            to={"/ver-tareas"}
                            className="block text-center my-5 text-blue-500  uppercase text-sm"
                        >Ver Tareas</Link>
                        <div className="container mx-auto my-5">
                            <h2 className="text-2xl font-bold text-blue-600 mb-3">Tareas:</h2>
                            {tareas ? (
                                tareas.map((tarea) => (
                                    <div key={tarea.id}>
                                        <h3 className="text-lg font-bold text-white ">{tarea.nombre}</h3>
                                        <p className="text-white">Id Empleado:  {tarea.idEmpleado}</p>
                                        <hr />
                                    </div>
                                ))
                            ) : (
                                <p className="text-white">No hay tareas para mostrar</p>
                            )}
                        </div>
                    </form>
                </div>
            </main>

        </>
    );
};

export default Estado;