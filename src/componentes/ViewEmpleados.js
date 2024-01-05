import React from 'react';
import crud from '../conexiones/crud';
import swal from 'sweetalert';
import { Link, useParams } from 'react-router-dom';

export const ViewEmpleados = ({ empleado }) => {
    const { idEmpleado } = useParams();

    console.log(idEmpleado);

    const { fechaIngreso, nombre, salario } = empleado;
    //const {id} = key;

    const borrarEmpleado = async (idEmpleado) => {
        console.log(idEmpleado);
        swal({
            title: " Estas Seguro de eliminar el empleado?",
            text: "Una vez eliminado no se podra recuperar",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const response = crud.DELETE(`/empleados/${idEmpleado}`);
                    const mensaje = response;
                    if (response) {
                        swal("Tu Empleado a sido eliminado correctamente ", {
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
                <p className='mb-1 text-xl text-gray-50'>Nombre : {nombre}</p>
                <p className='mb-1 text-xl text-gray-50'>Fecha Ingreso : {fechaIngreso}</p>
                <p className='mb-1 text-xl text-gray-50 '>Salario : {salario}</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-2'>

                <button
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold mt-5 text-sm rounded-lg"
                    onClick={() => borrarEmpleado(empleado.id)} // falta id
                >Eliminar</button>
                <Link
                    to={`/crear-tarea/${(empleado.id)}`}
                    className='bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg'
                >Crear Tarea</Link>
            </div>

        </div>
    );

}

export default ViewEmpleados;