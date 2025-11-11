import { getSession, clearSession } from './storage.js';

export function applyNavByRole(){
  const s = getSession();                  // {id, username, role} | null
  const isLogged = !!s;
  const isAdmin = s?.role === 'admin';

  // En el HTML se agrega el data-guard según la visibilidad
  // data-guard="guest" | "user" | "admin"
  document.querySelectorAll('[data-guard]').forEach(el=>{
    const g = el.getAttribute('data-guard');
    let show = true;
    if(g==='guest') show = !isLogged;
    if(g==='user')  show = isLogged;
    if(g==='admin') show = isAdmin;
    el.style.display = show ? '' : 'none';
  });

  // (opcion, probando) para la marca usuario en el navbar
  const badgeUser = document.querySelector('[data-user-badge]');
  if(badgeUser) badgeUser.textContent = isLogged ? (s.username) : 'Visitante';
}

export function logout(){
  clearSession();
  alert('Sesión cerrada.');
  location.reload();
}

// Autoaplicar
document.addEventListener('DOMContentLoaded', applyNavByRole);
