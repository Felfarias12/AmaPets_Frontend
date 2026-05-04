import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio-componentes';
import { LoginComponent } from './pages/login/login-componentes';
import { PerfilComponent } from './pages/perfil/perfil-componentes';
import { RegistroComponent } from './pages/registro/registro-componentes';
 
export const routes: Routes = [
  { path: '',       component: InicioComponent },
  { path: 'login',  component: LoginComponent  },
  { path: 'perfil', component: PerfilComponent  },
  { path: 'registro', component: RegistroComponent },
  { path: '**',     redirectTo: ''              }

];