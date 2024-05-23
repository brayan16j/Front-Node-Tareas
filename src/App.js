import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrearEmpleados from './componentes/crearEmpleado';
import CargarEmpleados from './componentes/CargarEmpleados';
import Tarea from './componentes/Tarea';
import CargarTareas from './componentes/CargarTareas';
import ActualizarTarea from './componentes/ActualizarTarea';
import Estado from './componentes/Estado';
import ActualizarEstado from './componentes/ActualizarEstado';
import ActualizarEmpleado from './componentes/ActualizarEmpleado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={< CrearEmpleados/>} />
        <Route path="/ver-empleados" exact element={<CargarEmpleados />} />
        <Route path="/Actualizar-empleado/:idEmpleado" exact element={<ActualizarEmpleado/>} />
        <Route path="/crear-tarea/:idEmpleado" exact element={<Tarea />} />
        <Route path="/ver-tareas" exact element={<CargarTareas />} />
        <Route path="/Actualizar-tareas/:idTarea" exact element={<ActualizarTarea />} />
        <Route path="/Actualizar-estados/:idTarea" exact element={<ActualizarEstado />} />
        <Route path="/ver-categorias" exact element={<Estado />} />

      </Routes>
    </Router>
  );
}

export default App;