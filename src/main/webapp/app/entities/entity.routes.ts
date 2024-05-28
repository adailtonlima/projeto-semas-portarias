import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'projetoSemasPortariasApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'topico',
    data: { pageTitle: 'projetoSemasPortariasApp.topico.home.title' },
    loadChildren: () => import('./topico/topico.routes'),
  },
  {
    path: 'ajuda',
    data: { pageTitle: 'projetoSemasPortariasApp.ajuda.home.title' },
    loadChildren: () => import('./ajuda/ajuda.routes'),
  },
  {
    path: 'portaria',
    data: { pageTitle: 'projetoSemasPortariasApp.portaria.home.title' },
    loadChildren: () => import('./portaria/portaria.routes'),
  },
  {
    path: 'assunto',
    data: { pageTitle: 'projetoSemasPortariasApp.assunto.home.title' },
    loadChildren: () => import('./assunto/assunto.routes'),
  },
  {
    path: 'setor',
    data: { pageTitle: 'projetoSemasPortariasApp.setor.home.title' },
    loadChildren: () => import('./setor/setor.routes'),
  },
  {
    path: 'perfil',
    data: { pageTitle: 'projetoSemasPortariasApp.perfil.home.title' },
    loadChildren: () => import('./perfil/perfil.routes'),
  },
  {
    path: 'usuario',
    data: { pageTitle: 'projetoSemasPortariasApp.usuario.home.title' },
    loadChildren: () => import('./usuario/usuario.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
