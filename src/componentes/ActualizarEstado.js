import React, { useEffect, useState } from 'react';
import crud from '../conexiones/crud';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

const ActualizarEstado = () => {
    const navigate = useNavigate();

    const { idTarea } = useParams();
    console.log(idTarea);

    const [estado, setEstado] = useState({
        idEstado: '',
    })

    const [estados, setEstados] = useState([]);

    useEffect(() => {
        const cargarEstados = async () => {
            const response = await crud.GET(`/estado`);
            //console.log(response);
            setEstados(response);
        }
        cargarEstados();
    }, []);
    
    const { idEstado} = estado;

    const onChange = (e) => {
        setEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
    }

    const actualizarEstado = async () => {
        const data = {
            idEstado: estado.idEstado,
            //categoria: estado.categoria,
        }
        const response = await crud.PUT(`/tareas/${idTarea}/estado`, data);
        const mensaje = response.message;
        console.log(mensaje);
        if(mensaje === "No se puede actualizar al estado deseado"){
            const mensaje = "No se puede actualizar al estado deseado";
            swal({
              title: 'Error',
              text: mensaje,
              icon: 'error',
              buttons:{
                confirm:{
                  text:'OK',
                  value: true,
                  visible: true,
                  className: 'btn btn-danger',
                  closeModal: true
                }
              }
            })
          }else{
            const mensaje = "El estado de la tarea se actualizo correctamente";
            swal({
              title: 'Informacion',
              text: mensaje,
              icon: 'success',
              buttons:{
                confirm:{
                  text:'OK',
                  value: true,
                  visible: true,
                  className: 'btn btn-primary',
                  closeModal: true
                }
              }
            });

        navigate("/ver-tareas");
    }
}

    const onSubmit = (e) => {
        e.preventDefault();
        actualizarEstado();
    }
    return (
        <>
            <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
                <div className='md:w-2/3 lg:w-2/5'>
                    <div className='flex justify-center'>
                        <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10" >
                            Actualizar Estado
                        </h1>
                    </div>
                    <form
                        className='my-10 bg-gray-700 shadow rounded-lg p-10 '
                        onSubmit={onSubmit}
                    >
                        <div className='my-5'>
                        <label className='uppercase text-white block text-xl font-bold' >Estado</label>
                            <select
                                name="idEstado"
                                value={idEstado}
                                onChange={onChange}
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                            >
                                <option value="">Selecciona un estado</option>
                                {estados.map((estado) => (
                                    <option 
                                    key={estado.id} 
                                    value={estado.id}>
                                        {estado.nombre}
                                    </option>
                                ))}
                            </select>
                            {/* <label className='uppercase text-white block text-xl font-bold' >Categoria</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                placeholder='categoria'
                                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                                value={categoria}
                                onChange={onChange}
                            /> */}
                        </div>

                        <input
                            type="submit"
                            value="Actualizar Estado"
                            className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300  transition-colors"
                        />
                    </form>
                </div>

            </main>
        </>
    );
}
export default ActualizarEstado;