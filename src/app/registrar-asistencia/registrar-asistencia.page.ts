import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage implements OnInit {

  asignaturas: any[] = [];
  alumnos: any[] = [];
  asignaturaSeleccionada: any;
  fecha: string = '';
  asistencias: any[] = [];
  estados = ['Presente', 'Ausente', 'Justificado'];  // Estados de asistencia

  constructor(private storageService: StorageService) {}

  obtenerFechaActual(): string {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  cargarAsignaturas() {
    this.asignaturas = [
      { nombre: 'ESTADISTICA DESCRIPTIVA_005D', asistencia: [] },
      { nombre: 'INGLES INTERMEDIO_018D', asistencia: [] },
      { nombre: 'PROGRAMACION DE APLICACIONES MOVILES_003D', asistencia: [] },
      { nombre: 'ARQUITECTURA_002D', asistencia: [] },
      { nombre: 'CALIDAD DE SOFTWARE_002D', asistencia: [] },
      { nombre: 'ETICA PARA EL TRABAJO_006D', asistencia: [] },
      { nombre: 'PROCESO DE PORTAFOLIO 4_004D', asistencia: [] }
    ];
  }

  seleccionarAsignatura(asignatura: any) {
    this.asignaturaSeleccionada = asignatura;
    this.cargarAsistencia(asignatura.nombre);
  }

  registrarAsistencia() {
    const fechaActual = this.fecha || this.obtenerFechaActual();
    if (this.asignaturaSeleccionada) {
      const asistenciaId = this.generarIdUnico();
      const asistenciaData = {
        id: asistenciaId,
        asignatura: this.asignaturaSeleccionada.nombre,
        fecha: fechaActual,
        alumnos: this.alumnos.map(alumno => ({ ...alumno, estado: alumno.estado || 'Presente' })) // Inicializar todos como Presente si no tienen estado
      };
      this.storageService.createObject(`asistencia-${asistenciaId}`, asistenciaData);
      this.asistencias.push(asistenciaData);
      alert(`Asistencia registrada para ${this.asignaturaSeleccionada.nombre} en la fecha: ${fechaActual}`);
    } else {
      alert('Por favor, selecciona una asignatura.');
    }
  }

  generarIdUnico(): number {
    return Date.now();
  }

  cargarAsistencia(asignaturaNombre: string) {
    const fechaActual = this.fecha || this.obtenerFechaActual();
    const allAsistencias = Object.keys(localStorage).filter(key => key.startsWith(`asistencia-`));

    this.asistencias = allAsistencias.map(key => this.storageService.getObjectById(key))
      .filter(asistencia => asistencia.asignatura === asignaturaNombre && asistencia.fecha === fechaActual);
      
    if (this.asistencias.length > 0) {
      this.alumnos = this.asistencias[0].alumnos; // Cargar la lista de alumnos de la primera asistencia
    } else {
      console.log(`No hay asistencia registrada para ${asignaturaNombre} en la fecha ${fechaActual}`);
      this.alumnos = [
        { id: 1, nombre: 'Martín Almonacid', estado: 'Presente' },
        { id: 2, nombre: 'Diego Mesias', estado: 'Presente' },
        { id: 3, nombre: 'Diego Robert', estado: 'Presente' }
      ];
    }
  }

  eliminarAsistencia(id: number) {
    this.storageService.deleteObject(`asistencia-${id}`);
    this.asistencias = this.asistencias.filter(asistencia => asistencia.id !== id);
    alert(`Asistencia eliminada con ID: ${id}`);
  }

  editarAsistencia(asistencia: any) {
    // Actualizar la asistencia en el local storage
    this.storageService.updateObject(`asistencia-${asistencia.id}`, asistencia);
    // Actualizar el array de asistencias localmente
    this.asistencias = this.asistencias.map(a => a.id === asistencia.id ? asistencia : a);
    alert(`Asistencia con ID: ${asistencia.id} actualizada`);
  }

  ngOnInit() {
    this.fecha = this.obtenerFechaActual();
    this.cargarAsignaturas();
    this.cargarAsistencia(this.asignaturaSeleccionada?.nombre);
  }
}
