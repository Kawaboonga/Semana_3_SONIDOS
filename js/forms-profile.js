import { getSession, getUsers, setUsers } from './storage.js';
import { setInvalid, clearInvalid } from './validators.js';
import { requireLogin } from './guards.js';

export function handleProfile(form){
  const s = getSession();
  if(!s) return requireLogin();
  const users = getUsers();
  const me = users.find(u=>u.id===s.id);
  if(!me) return requireLogin();

  // precargar
  ['fullname','address'].forEach(k=>{
    if(form[k]) form[k].value = me[k] || '';
  });

  form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    clearInvalid(form.fullname); clearInvalid(form.address);
    const fullname = form.fullname.value.trim();
    const address  = form.address.value.trim();

    let ok = true;
    if(!fullname){ setInvalid(form.fullname,'Obligatorio'); ok=false; }
    if(!ok) return;

    me.fullname = fullname;
    me.address  = address;
    setUsers(users);
    alert('Perfil actualizado');
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('frmProfile');
  if(form) handleProfile(form);
});
