export const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validatePasswordRules(pwd){
  return {
    length: pwd.length >= 8 && pwd.length <= 64,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[!@#$%^&*()_\-+=\[\]{};:'",.<>/?\\|`~]/.test(pwd)
  };
}

export function isAdult(isoDate){
  if(!isoDate) return false;
  const d = new Date(isoDate);
  const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
  return age >= 18;
}

// Helpers para el UI (Bootstrap)
export function setInvalid(input, msg){
  input.classList.add('is-invalid');
  let fb = input.nextElementSibling;
  if(!fb || !fb.classList.contains('invalid-feedback')){
    fb = document.createElement('div');
    fb.className = 'invalid-feedback';
    input.parentNode.appendChild(fb);
  }
  fb.textContent = msg || 'Campo inválido';
}
export function clearInvalid(input){
  input.classList.remove('is-invalid');
  const fb = input.nextElementSibling;
  if(fb && fb.classList.contains('invalid-feedback')) fb.textContent = '';
}
