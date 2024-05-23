import React from "react";
import { Link } from "react-router-dom";
import { useDeleteEmpleado } from "../hooks/useDeleteEmpleado"; // Nuevo hook personalizado

export const ViewEmpleados = ({ empleado, onEmpleadoDeleted }) => {
  const { fechaIngreso, nombre, salario } = empleado;
  const [deleteEmpleado] = useDeleteEmpleado(); // Usa el nuevo hook personalizado

  const handleDelete = async () => {
    const confirmed = window.confirm("¿Estás seguro de eliminar el empleado?");
    if (confirmed) {
      try {
        await deleteEmpleado(empleado.id);
        onEmpleadoDeleted(empleado.id);
      } catch (error) {
        console.error(error);
        alert("Hubo un error al eliminar el empleado");
      }
    }
  };

  return (
    <div className="border-r p-5 flex justify-between items-center">
      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl text-gray-50">Nombre : {nombre}</p>
        <p className="mb-1 text-xl text-gray-50">
          Fecha Ingreso : {fechaIngreso}
        </p>
        <p className="mb-1 text-xl text-gray-50 ">Salario : {salario}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <Link
          to={`/Actualizar-empleado/${empleado.id}`}
          className="bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg"
        >Editar</Link>
        <button
          className="bg-red-600 px-4 py-3 text-white uppercase font-bold mt-5 text-sm rounded-lg"
          onClick={handleDelete}
        >Eliminar</button>
        <Link
          to={`/crear-tarea/${empleado.id}`}
          className="bg-blue-500 w-full p-4 text-white uppercase font-bold mt-5 text-center rounded-lg"
        >Crear Tarea</Link>
      </div>
    </div>
  );
};

export default ViewEmpleados;
