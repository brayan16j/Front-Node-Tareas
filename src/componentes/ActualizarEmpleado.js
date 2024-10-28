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

  const [salarioSinFormato, setSalarioSinFormato] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarEmpleado = async (idEmpleado) => {
    try {
      const response = await crud.GET(`/empleados/${idEmpleado}`);
      const empleadoFormateado = {
        ...response,
        salario: new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(response.salario)
      };
      setEmpleado(empleadoFormateado);
      setSalarioSinFormato(response.salario * 100); // Guardar el valor sin formato
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEmpleado(idEmpleado);
  }, [idEmpleado]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  };

  const { nombre, fechaIngreso, salario } = empleado;

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'salario') {
      const numericValue = value.replace(/\./g, '').replace(/,/g, '').replace(/[^0-9]/g, '');
      setSalarioSinFormato(numericValue);
      setEmpleado({
        ...empleado,
        [name]: formatCurrency(numericValue / 100)
      });
    } else {
      setEmpleado({
        ...empleado,
        [name]: value
      });
    }
  };

  const actualizarEmpleado = async () => {
    const data = {
      nombre: empleado.nombre,
      fechaIngreso: empleado.fechaIngreso,
      salario: parseFloat(salarioSinFormato) / 100
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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
                type="text"
                id="salario"
                name="salario"
                placeholder="salario"
                className="w-full mt-3 p-3 border rounded-lg bg-gray-50"
                value={salario}
                onChange={onChange}
                pattern="^\$\s?\d{1,3}(\.\d{3})*(,\d{2})?$"
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