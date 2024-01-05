import React from 'react';
import crud from '../conexiones/crud';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export const ViewEstados = ({ estados }) => {
    const { id, nombre, categoria } = estados;
    //const {id} = key;

    const borraEstado = async (idEstado) => {
        console.log(idEstado);
        swal({
            title: " Estas Seguro de eliminar el Estado?",
            text: "Una vez eliminado no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/estado/${idEstado}`);
                    const mensaje = response;
                    if (response) {
                        swal("Tu Estado a sido eliminado correctamente ", {
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
                <p className='mb-1 text-xl text-gray-50'>Id : {id}</p>
                <p className='mb-1 text-xl text-gray-50'>Estado : {nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>Categoria : {categoria}</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>
            <Link 
                to={`/Actualizar-estados/${(estados.id)}`}
                className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg'
                >Actualizar</Link>

                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold mt-5 text-sm rounded-lg"
                    onClick={() => borraEstado(estados.id)} // falta id
                >Eliminar</button>
            </div>

        </div>
    );
}
export default ViewEstados;