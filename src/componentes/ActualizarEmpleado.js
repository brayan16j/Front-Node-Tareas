import React, { useEffect, useState } from "react";
import crud from "../conexiones/crud";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const ActualizarEmpleado = () => {
  const navigate = useNavigate();
  const { idEmpleado } = useParams();

  const [empleado, setEmpleado] = useState({
    nombre: "",
    fechaIngreso: "",
    salario: "",
  });

  const cargarEmpleado = async () => {
    const response = await crud.GET(`/empleados/${idEmpleado}`);
    console.log(response);
    setEmpleado(response);
  };
  useEffect(() => {
    cargarEmpleado();
  }, []);

  const { nombre, fechaIngreso, salario } = empleado;

  const onChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value,
    });
  };

  const actualizarEmpleado = async () => {
    const data = {
      nombre: empleado.nombre,
      fechaIngreso: empleado.fechaIngreso,
      salario: empleado.salario,
    };
    const response = await crud.PUT(`/empleados/${idEmpleado}`, data);
    console.log(" Actualizar empleado ---> ", response);
    if (response) {
      swal(
        "Empleado actualizado",
        "El empleado se ha actualizado correctamente",
        "success"
      );
      navigate("/ver-empleados");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    actualizarEmpleado();
  };
  return (
    <>
      <main className="container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <div className="flex justify-center">
            <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10">
              Actualizar Empleado
            </h1>
          </div>
          <form
            className="my-10 bg-gray-700 shadow rounded-lg p-10 "
            onSubmit={onSubmit}
          >
            <div className="my-5">
              <label className="uppercase text-white block text-xl font-bold">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="nombre"
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                value={nombre}
                onChange={onChange}
              />
              <label className="uppercase text-white block text-xl font-bold">
                Fecha de Ingreso
              </label>
              <input
                type="date"
                id="fechaIngreso"
                name="fechaIngreso"
                placeholder=""
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                value={fechaIngreso}
                onChange={onChange}
              />
              <label className="uppercase text-white block text-xl font-bold">
                Salario
              </label>
              <input
                type="number"
                id="salario"
                name="salario"
                placeholder="salario"
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                value={salario}
                onChange={onChange}
              />
            </div>

            <input
              type="submit"
              value="Actualizar Solicitud"
              className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300  transition-colors"
            />
          </form>
        </div>
      </main>
    </>
  );
};
export default ActualizarEmpleado;
