import { Component } from '@angular/core';

@Component({
  selector: 'app-asignaturas',
  templateUrl: 'asignaturas.page.html',
  styleUrls: ['asignaturas.page.scss'],
})
export class AsignaturasPage {
  asignaturas = [
    { nombre: 'ESTADISTICA DESCRIPTIVA_005D', asistencia: 1, totalClases: 1 },
    { nombre: 'INGLES INTERMEDIO_018D', asistencia: 2, totalClases: 2 },
    { nombre: 'PROGRAMACION DE APLICACIONES MOVILES_003D', asistencia: 1, totalClases: 2 },
    { nombre: 'ARQUITECTURA_002D', asistencia: 1, totalClases: 1 },
    { nombre: 'CALIDAD DE SOFTWARE_002D', asistencia: 1, totalClases: 1 },
    { nombre: 'ETICA PARA EL TRABAJO_006D', asistencia: 2, totalClases: 2 },
    { nombre: 'PROCESO DE PORTAFOLIO 4_004D', asistencia: 1, totalClases: 2 },
  ];

  constructor() {}

  calcularPorcentaje(asistencia: number, totalClases: number): number {
    return totalClases > 0 ? Math.round((asistencia / totalClases) * 100) : 0;
  }
}
