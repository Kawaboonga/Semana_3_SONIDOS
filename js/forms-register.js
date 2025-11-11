import { getUsers, setUsers } from './storage.js';
import { emailRx, validatePasswordRules, isAdult, setInvalid, clearInvalid } from './validators.js';

export function handleRegister(form){
  form.addEventListener('submit', (ev)=>{
    ev.preventDefault();
    const f = new FormData(form);
    const fullname = f.get('fullname')?.trim();
    const username = f.get('username')?.trim();
    const email = f.get('email')?.trim();
    const pwd = f.get('password') || '';
    const rep = f.get('password2') || '';
    const birth = f.get('birthdate');
    const address = f.get('address')?.trim();

    form.querySelectorAll('input,select,textarea').forEach(i=>clearInvalid(i));

    let ok = true;
    if(!fullname){ setInvalid(form.fullname,'Obligatorio'); ok=false; }
    if(!username){ setInvalid(form.username,'Obligatorio'); ok=false; }
    if(!email || !emailRx.test(email)){ setInvalid(form.email,'Email inválido'); ok=false; }
    if(!birth || !isAdult(birth)){ setInvalid(form.birthdate,'Debes ser mayor de 18'); ok=false; }
    if(!pwd){ setInvalid(form.password,'Obligatorio'); ok=false; }

    const rules = validatePasswordRules(pwd);
    if(!rules.length || !rules.upper || !rules.lower || !rules.number || !rules.special){
      setInvalid(form.password,'8–64, mayús, minús, número y símbolo'); ok=false;
    }
    if(pwd !== rep){ setInvalid(form.password2,'Las contraseñas no coinciden'); ok=false; }

    const users = getUsers();
    if(users.some(u=>u.username.toLowerCase()===username.toLowerCase())){
      setInvalid(form.username,'Usuario ya existe'); ok=false;
    }
    if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())){
      setInvalid(form.email,'Email ya registrado'); ok=false;
    }

    if(!ok) return;

    users.push({
      id: Date.now(),
      fullname, username, email, birthdate: birth, address,
      role: 'user',
      passwordHash: btoa(pwd) // demo
    });
    setUsers(users);
    alert('Registro exitoso. Inicia sesión.');
    location.href = './login.html';
  });
}

// Auto-bind si existe el form
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('frmRegister');
  if(form) handleRegister(form);
});
