import React, { useEffect, useState } from 'react';
import crud from '../conexiones/crud';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const Tarea = () => {
    const { idEmpleado } = useParams();
    console.log(idEmpleado);

    const [tarea, setTarea] = useState({
        nombre: '',
        fechaCreacion: '',
        fechaInicioTarea: '',
        fechaFinalizacion: '',
        idEmpleado: idEmpleado,
        empleadoId: '',
        idEstado: ''
    })
    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const cargarEstados = async () => {
            const response = await crud.GET(`/estado`);
            console.log(response);
            setEstados(response);
        }
        cargarEstados();
    }, []);

    const { nombre, fechaCreacion, fechaInicioTarea, fechaFinalizacion, idEstado } = tarea;

    const onChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    const crearTarea = async () => {
        const data = {
            nombre: tarea.nombre,
            fechaCreacion: tarea.fechaCreacion,
            fechaInicioTarea: tarea.fechaInicioTarea,
            fechaFinalizacion: tarea.fechaFinalizacion,
            idEmpleado: idEmpleado,
            idEstado: tarea.idEstado
        }
        const response = await crud.POST(`/tareas`, data);
        //const mensaje = response.mensaje;
        //console.log(mensaje);
        const mensaje1 = "La tarea fue creada correctamente";
        swal({
            title: 'Información',
            text: mensaje1,
            icon: 'success',
            buttons: {
                confirm: {
                    text: 'OK',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        crearTarea();
    }
    return (
        <>
            <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
                <div className='md:w-2/3 lg:w-2/5'>
                    <div className='flex justify-center'>
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10" >
                            Crear Tareas
                        </h1>
                    </div>
                    <form
                        className='my-10 bg-gray-700 shadow rounded-lg p-10 '
                        onSubmit={onSubmit}
                    >
                        <div className='my-5'>
                            <label className='uppercase text-white block text-xl font-bold' >Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                placeholder='Nombre Tarea'
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                                value={nombre}
                                onChange={onChange}
                                pattern="[A-Za-z\s]+"
                            />
                            <label className='uppercase text-white block text-xl font-bold' >Fecha Creacion</label>
                            <input
                                type="date"
                                id="fechaCreacion"
                                name="fechaCreacion"
                                placeholder=''
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                                value={fechaCreacion}
                                onChange={onChange}
                            />
                            <label className='uppercase text-white block text-xl font-bold' >Fecha Inicio Tarea</label>
                            <input
                                type="date"
                                id="fechaInicioTarea"
                                name="fechaInicioTarea"
                                placeholder=''
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                                value={fechaInicioTarea}
                                onChange={onChange}
                            />
                            <label className='uppercase text-white block text-xl font-bold' >Fecha Finalizacion Tarea</label>
                            <input
                                type="date"
                                id="fechaFinalizacion"
                                name="fechaFinalizacion"
                                placeholder=''
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                                value={fechaFinalizacion}
                                onChange={onChange}
                            />
                            <label className='uppercase text-white block text-xl font-bold' >Estado</label>
                            <select
                                name="idEstado"
                                value={idEstado}
                                onChange={onChange}
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            >
                                <option value="">Selecciona un estado</option>
                                {estados.map((estado) => (
                                    <option key={estado.id} value={estado.id}>
                                        {estado.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <input
                            type="submit"
                            value="Crear Tarea"
                            className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300  transition-colors"
                        />
                        <Link
                            to={"/"}
                            className="block text-center my-5 text-blue-500  uppercase text-sm"
                        >Crear Empleado</Link>

                        <Link
                            to={"/ver-tareas"}
                            className="block text-center my-5 text-blue-500  uppercase text-sm"
                        >Ver Tareas</Link>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Tarea;