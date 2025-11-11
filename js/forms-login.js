import { getUsers, setSession } from './storage.js';
import { setInvalid, clearInvalid } from './validators.js';

export function handleLogin(form){
  form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    const f = new FormData(form);
    const username = f.get('username')?.trim();
    const pwd = f.get('password') || '';
    clearInvalid(form.username); clearInvalid(form.password);

    const users = getUsers();
    const user = users.find(u =>
      u.username.toLowerCase()===username.toLowerCase() ||
      u.email.toLowerCase()===username.toLowerCase()
    );
    if(!user || user.passwordHash !== btoa(pwd)){
      setInvalid(form.username,'Credenciales inválidas');
      setInvalid(form.password,'Credenciales inválidas');
      return;
    }
    setSession({id:user.id, username:user.username, role:user.role});
    alert(`Bienvenido, ${user.fullname}`);
    location.href = '../index.html';
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('frmLogin');
  if(form) handleLogin(form);
});
