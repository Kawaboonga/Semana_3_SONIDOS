import { getSession, getCart, setCart } from './storage.js';

export function addToCart(item){
  const s = getSession();
  if(!s){ alert('Inicia sesión para agregar al carro.'); return; }
  const cart = getCart();
  cart.push({...item, userId: s.id, ts: Date.now()});
  setCart(cart);
  alert('Agregado al carro');
}

// (opcion, probando aun) listar carrito del usuario actual
export function getMyCart(){
  const s = getSession();
  const all = getCart();
  return s ? all.filter(x=>x.userId===s.id) : [];
}
