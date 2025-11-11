import { emailRx, setInvalid, clearInvalid } from './validators.js';

export function handleRecover(form){
  form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    const email = form.email.value.trim();
    clearInvalid(form.email);
    if(!email || !emailRx.test(email)){ setInvalid(form.email,'Email inválido'); return; }
    alert('Si el correo existe, te enviaremos instrucciones (simulado).');
    location.href = './login.html';
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('frmRecover');
  if(form) handleRecover(form);
});
