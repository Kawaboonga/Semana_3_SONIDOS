export const LS_KEYS = {
  users: 'ss_users',
  session: 'ss_session',
  cart: 'ss_cart',
  data: 'ss_data' // {tutors:[], instruments:[], pedals:[], news:[]}
};

// inicial (admin demo) solo si no existe
(function seed(){
  if(!localStorage.getItem(LS_KEYS.users)){
    const admin = {
      id: 1,
      fullname: "Admin SoundSeeker",
      username: "admin",
      email: "admin@soundseeker.cl",
      role: "admin",
      birthdate: "1990-01-01",
      address: "Huechuraba",
      passwordHash: btoa("Admin#2025") // DEMO demo DEMO demo 
    };
    localStorage.setItem(LS_KEYS.users, JSON.stringify([admin]));
  }
  if(!localStorage.getItem(LS_KEYS.data)){
    localStorage.setItem(LS_KEYS.data, JSON.stringify({
      tutors: [], instruments: [], pedals: [], news: []
    }));
  }
  if(!localStorage.getItem(LS_KEYS.cart)){
    localStorage.setItem(LS_KEYS.cart, JSON.stringify([]));
  }
})();

export const getUsers = () => JSON.parse(localStorage.getItem(LS_KEYS.users)||'[]');
export const setUsers = (arr) => localStorage.setItem(LS_KEYS.users, JSON.stringify(arr));

export const getSession = () => JSON.parse(localStorage.getItem(LS_KEYS.session)||'null');
export const setSession = (obj) => localStorage.setItem(LS_KEYS.session, JSON.stringify(obj));
export const clearSession = () => localStorage.removeItem(LS_KEYS.session);

export const getData = () => JSON.parse(localStorage.getItem(LS_KEYS.data)||'{}');
export const setData = (obj) => localStorage.setItem(LS_KEYS.data, JSON.stringify(obj));

export const getCart = () => JSON.parse(localStorage.getItem(LS_KEYS.cart)||'[]');
export const setCart = (arr) => localStorage.setItem(LS_KEYS.cart, JSON.stringify(arr));
