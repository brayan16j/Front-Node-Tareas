import React, { useState } from 'react';
import crud from '../conexiones/crud';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const CrearEmpleados = () => {
  const [empleado, setEmpleado] = useState({
    nombre: '',
    fechaIngreso: '',
    salario: '',
  });

  const [salarioSinFormato, setSalarioSinFormato] = useState('');

  const { fechaIngreso, nombre, salario } = empleado;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  };

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

  const crearEmpleado = async () => {
    const data = {
      fechaIngreso: empleado.fechaIngreso,
      nombre: empleado.nombre,
      salario: parseFloat(salarioSinFormato) / 100
    };

    const response = await crud.POST(`/empleados`, data);
    const mensaje = response.errors;

    if (mensaje?.[0]?.msg === "La fecha de ingreso no puede ser superior al dia actual ") {
      const mensaje = "La fecha de ingreso no puede ser superior al dia actual ";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else if (mensaje?.[0]?.msg === "Invalid value") {
      const mensaje = "Hay valores invalidos";
      swal({
        title: 'Error',
        text: mensaje,
        icon: 'error',
        buttons: {
          confirm: {
            text: 'OK',
            value: true,
            visible: true,
            className: 'btn btn-danger',
            closeModal: true
          }
        }
      });
    } else {
      const mensaje = "El empleado fue creado correctamente";
      swal({
        title: 'Informacion',
        text: mensaje,
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
      setEmpleado({
        fechaIngreso: '',
        nombre: '',
        salario: '',
      });
      setSalarioSinFormato('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    crearEmpleado();
  };

  return (
    <>
      <main className='container mx-auto mt-5 md:mt-20 p-5 md:flex md:justify-center'>
        <div className='md:w-2/3 lg:w-2/5'>
          <div className='flex justify-center'>
            <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent m-10" >
              Crear Empleados
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
                placeholder='Ingrese el Nombre'
                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                value={nombre}
                onChange={onChange}
                pattern="[A-Za-z\s]+"
              />

              <label className='uppercase text-white block text-xl font-bold' >Fecha de Ingreso</label>
              <input
                type="date"
                id="fechaIngreso"
                name="fechaIngreso"
                placeholder='fechaIngreso'
                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                value={fechaIngreso}
                onChange={onChange}
              />
              <label className='uppercase text-white block text-xl font-bold' >Salario</label>
              <input
                type="text"
                id="salario"
                name="salario"
                placeholder='Ingrese Salario valor numerico'
                className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                value={salario}
                onChange={onChange}
                pattern="^\$\s?\d{1,3}(\.\d{3})*(,\d{2})?$"
              />
            </div>
            <input
              type="submit"
              value="Crear Empleado"
              className="bg-blue-500 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-blue-300  transition-colors"
            />
            <Link
              to={"/ver-empleados"}
              className="block text-center my-5 text-blue-500  uppercase text-sm"
            >Ver Empleados</Link>

          </form>
        </div>

      </main>
    </>
  );
}
export default CrearEmpleados;