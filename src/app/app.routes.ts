import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio-componentes';
import { LoginComponent } from './pages/login/login-componentes';
import { PerfilComponent } from './pages/perfil/perfil-componentes';
import { RegistroComponent } from './pages/registro/registro-componentes';
import { VeterinarioComponent } from './pages/veterinario-component/veterinario-component';
import { LoginVeterinarioComponent } from './pages/login-veterinario/login-veterinario-componentes';
import { RegistroVeterinarioComponent } from './pages/registro-veterinario/registro-veterinario-componentes';
 
export const routes: Routes = [
  { path: '',       component: InicioComponent },
  { path: 'login',  component: LoginComponent  },
  { path: 'perfil', component: PerfilComponent  },
  { path: 'registro', component: RegistroComponent },
  { path: 'veterinario', component: VeterinarioComponent },
  { path: 'login-veterinario', component: LoginVeterinarioComponent },
  { path: 'registro-veterinario', component: RegistroVeterinarioComponent },
  { path: '**',     redirectTo: ''              }

];