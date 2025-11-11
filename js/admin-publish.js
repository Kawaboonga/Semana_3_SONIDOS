import { requireAdmin } from './guards.js';
import { getData, setData } from './storage.js';

function collect(form){
  const f = new FormData(form);
  let obj = {};
  f.forEach((v,k)=> obj[k]=v?.toString().trim());
  obj.id = Date.now();
  // normalizar listas coma
  ['estilos','niveles','tags'].forEach(key=>{
    if(obj[key]) obj[key] = obj[key].split(',').map(s=>s.trim()).filter(Boolean);
  });
  return obj;
}

export function bindAdminForms(){
  requireAdmin();
  const store = getData();

  const fTutor = document.getElementById('formTutor');
  if(fTutor){
    fTutor.addEventListener('submit',(e)=>{
      e.preventDefault();
      const obj = collect(fTutor);
      (store.tutors ||= []).push(obj);
      setData(store);
      alert('Tutor agregado');
      fTutor.reset();
    });
  }

  const fInst = document.getElementById('formInstrumento');
  if(fInst){
    fInst.addEventListener('submit',(e)=>{
      e.preventDefault();
      const obj = collect(fInst);
      (store.instruments ||= []).push(obj);
      setData(store);
      alert('Instrumento agregado');
      fInst.reset();
    });
  }

  const fPedal = document.getElementById('formPedal');
  if(fPedal){
    fPedal.addEventListener('submit',(e)=>{
      e.preventDefault();
      const obj = collect(fPedal);
      (store.pedals ||= []).push(obj);
      setData(store);
      alert('Pedal agregado');
      fPedal.reset();
    });
  }

  const fNews = document.getElementById('formNews');
  if(fNews){
    fNews.addEventListener('submit',(e)=>{
      e.preventDefault();
      const obj = collect(fNews);
      (store.news ||= []).push(obj);
      setData(store);
      alert('Noticia agregada');
      fNews.reset();
    });
  }
}

document.addEventListener('DOMContentLoaded', bindAdminForms);
