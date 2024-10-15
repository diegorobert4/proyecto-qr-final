import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, PreloadingStrategy, Route } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core'; // Asegúrate de importar Injectable

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return route.data && route.data['preload'] ? load() : of(null); // Acceso usando ['preload']
  }
}

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), data: { preload: true } },
  { path: 'login-alumno', loadChildren: () => import('./login-alumno/login-alumno.module').then(m => m.LoginAlumnoPageModule), data: { preload: true } },
  { path: 'login-docente', loadChildren: () => import('./login-docente/login-docente.module').then(m => m.LoginDocentePageModule), data: { preload: true } },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule), data: { preload: true } },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'registrar-asistencia',
    loadChildren: () => import('./registrar-asistencia/registrar-asistencia.module').then(m => m.RegistrarAsistenciaPageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'mi-perfil',
    loadChildren: () => import('./mi-perfil/mi-perfil.module').then(m => m.MiPerfilPageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'asignaturas',
    loadChildren: () => import('./asignaturas/asignaturas.module').then(m => m.AsignaturasPageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'docente-qr',
    loadChildren: () => import('./docente-qr/docente-qr.module').then(m => m.DocenteQrPageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'home-docente',
    loadChildren: () => import('./home-docente/home-docente.module').then(m => m.HomeDocentePageModule),
    canActivate: [AuthGuard],
    data: { preload: true }
  },
  {
    path: 'marcar-asistencia',
    loadChildren: () => import('./marcar-asistencia/marcar-asistencia.module').then(m => m.MarcarAsistenciaPageModule),
    data: { preload: true }
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundPageModule),
    data: { preload: true }
  },
  { path: '**', redirectTo: 'not-found' },
  {
    path: 'prueba-api',
    loadChildren: () => import('./prueba-api/prueba-api.module').then(m => m.PruebaApiPageModule),
    data: { preload: true }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })
  ],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy] // Incluir la estrategia aquí
})
export class AppRoutingModule { }
