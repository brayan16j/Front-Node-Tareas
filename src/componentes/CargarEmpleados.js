import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import crud from '../conexiones/crud';
import ViewEmpleados from './ViewEmpleados';

const ButtonLink = ({ to, children, className }) => (
  <Link to={to} className={`bg-blue-500 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg mx-4 ${className}`}>
    {children}
  </Link>
);

const CargarEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarEmpleados = async () => {
    try {
      const response = await crud.GET(`/empleados`);
      //setEmpleados(response.empleados); // con dto llega un object con array 
      setEmpleados(response);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const handleEmpleadoDeleted = (idEmpleado) => {
    setEmpleados(empleados.filter(empleado => empleado.id !== idEmpleado));
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='md:flex md:min-h-screen justify-center'>
        <main className='flex-1'>
          <div className='mt-10 flex justify-center'>
            <h1 className="inline bg-gradient-to-r from-indigo-200 via-slate-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Listado de Empleados
            </h1>
          </div>
          <div className='p-12 flex'>
            <ButtonLink to={`/`}>Crear Empleado</ButtonLink>
            <ButtonLink to={`/ver-tareas`}>Ver Tareas</ButtonLink>
          </div>
          <div className="bg-gray-600 shadow mt-10 rounded-lg">
            {empleados.map(empleado =>
              <ViewEmpleados
                key={empleado.id}
                empleado={empleado}
                onEmpleadoDeleted={handleEmpleadoDeleted} // pasar a componente hijo para que pueda eliminar el empleado 
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default CargarEmpleados;