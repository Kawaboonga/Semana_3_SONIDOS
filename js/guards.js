import { getSession } from './storage.js';

export function requireLogin(){
  if(!getSession()){
    alert('Debes iniciar sesión.');
    const go = location.pathname.includes('/pages/') ? './login.html' : 'pages/login.html';
    location.href = go;
  }
}

export function requireAdmin(){
  const s = getSession();
  if(!s || s.role!=='admin'){
    alert('Acceso solo administrador.');
    const go = location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
    location.href = go;
  }
}
