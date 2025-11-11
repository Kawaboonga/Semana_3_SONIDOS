(function(){
  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>Array.from(root.querySelectorAll(s));

  /* =========================
     IMG RESOLVER
     ========================= */
  function resolveImg(p){
    // Si es URL absoluta o empieza con "/", úsala tal cual
    if (/^https?:\/\//.test(p) || p.startsWith('/')) return p;
    // Si estás dentro de /pages/, sube un nivel
    const inPages = location.pathname.includes('/pages/');
    return (inPages ? '../img/' : 'img/') + p;
  }

  /* =========================
     DATASETS (demo)
     ========================= */
  const tutores = [
    {id:1, nombre:'Camila Soto', comuna:'Huechuraba', instrumento:'guitarra', nivel:['inicio','intermedio'], estilos:['rock','blues'], desc:'Enfoque práctico, repertorio moderno.', img:'/img/trainers/3.jpg'},
    {id:2, nombre:'Diego Rivas', comuna:'Huechuraba', instrumento:'bajo', nivel:['inicio','intermedio','avanzado'], estilos:['jazz','funk'], desc:'Técnica y groove para todos los niveles.', img:'/img/trainers/2.jpg'},
    {id:3, nombre:'Valentina Núñez', comuna:'Huechuraba', instrumento:'guitarra', nivel:['intermedio','avanzado'], estilos:['metal','rock'], desc:'Ritmo, picking y solos de alta ganancia.', img:'/img/trainers/3.jpg'},
    {id:4, nombre:'Tomás Pérez', comuna:'Huechuraba', instrumento:'bajo', nivel:['inicio'], estilos:['rock'], desc:'Bases sólidas y lenguaje musical.', img:'/img/trainers/4.jpg'},
  ];

  const instrumentos = [
    {id:11, tipo:'guitarra', marca:'Fender', modelo:'Stratocaster Player', cond:'usado', tags:['oferta'], precio:599000, img:'/img/product/1.jpg', desc:'Guitarra versátil para estilos modernos.'},
    {id:12, tipo:'guitarra', marca:'Epiphone', modelo:'Les Paul Standard', cond:'como nuevo', tags:['descontinuado'], precio:459000, img:'/img/product/1.jpg', desc:'Clásico sustain para rock y blues.'},
    {id:13, tipo:'bajo', marca:'Squier', modelo:'Precision Bass', cond:'usado', tags:[], precio:289000, img:'/img/product/1.jpg', desc:'Graves con presencia para banda.'},
    {id:14, tipo:'amplificador', marca:'Fender', modelo:'Champion 40', cond:'usado', tags:['oferta'], precio:199000, img:'/img/product/1.jpg', desc:'Combo con efectos integrados.'},
  ];

  const pedales = [
    {id:21, efecto:'overdrive', marca:'Boss', modelo:'SD-1', estado:'usado', precio:59000, img:'/img/product/2.jpg', desc:'Overdrive clásico para empujar tu ampli.'},
    {id:22, efecto:'delay', marca:'TC Electronic', modelo:'Flashback', estado:'como nuevo', precio:89000, img:'/img/product/3.jpg', desc:'Delay digital con tap tempo.'},
    {id:23, efecto:'reverb', marca:'Electro-Harmonix', modelo:'Holy Grail', estado:'usado', precio:79000, img:'/img/product/4.jpg', desc:'Reverb con personalidad vintage.'},
  ];

  /* =========================
     RENDER HELPERS
     ========================= */
  const money = n => new Intl.NumberFormat('es-CL', {style:'currency',currency:'CLP'}).format(n);

  function cardTutor(t){
    const estilos = t.estilos.map(e=>`<span class="badge text-bg-secondary me-1">${e}</span>`).join('');
    const niveles = t.nivel.map(n=>`<span class="badge text-bg-dark border border-secondary me-1">${n}</span>`).join('');
    return `<div class="col-12 col-md-6 col-lg-4">
      <div class="card-dark p-3 h-100 hover-lift">
        <div class="d-flex gap-3 align-items-start">
          <img src="${resolveImg(t.img)}" alt="Tutor ${t.nombre}" width="96" height="96" style="object-fit:cover">
          <div>
            <h3 class="h6 mb-1">${t.nombre}</h3>
            <div class="small text-secondary">Comuna: ${t.comuna} · ${t.instrumento}</div>
          </div>
        </div>
        <p class="mt-3 text-secondary">${t.desc}</p>
        <div class="mb-2">${estilos}</div>
        <div class="mb-2">${niveles}</div>
        <div class="d-flex gap-2 mt-auto">
          <a href="../pages/contacto.html" class="btn btn-sm btn-primary">Contactar</a>
          <a href="#" class="btn btn-sm btn-outline-light">Ver disponibilidad</a>
        </div>
      </div>
    </div>`;
  }

  function cardItem(it){
    const tagBadges = (it.tags||[]).map(t=>`<span class="badge text-bg-success me-1">${t}</span>`).join('');
    const meta = [it.marca, it.modelo].filter(Boolean).join(" · ");
    return `<div class="col-12 col-md-6 col-lg-4">
      <div class="card-dark p-3 h-100 hover-lift">
        <img class="w-100 mb-2" src="${resolveImg(it.img)}" alt="Producto ${meta}" style="aspect-ratio:4/3;object-fit:cover">
        <h3 class="h6 mb-1">${meta}</h3>
        <div class="small text-secondary">${(it.tipo||it.efecto||'').toString().toUpperCase()} · ${it.cond||it.estado||''}</div>
        <p class="text-secondary mt-2">${it.desc||''}</p>
        <div class="d-flex align-items-center justify-content-between mt-auto">
          <div class="fw-bold">${money(it.precio)}</div>
          <div>${tagBadges}</div>
        </div>
      </div>
    </div>`;
  }

  /* =========================
     FILTER WIRING
     ========================= */
  function onTutores(){
    const grid = $("#grid-tutores"); if(!grid) return;
    function render(list){ grid.innerHTML = list.map(cardTutor).join(""); }
    function apply(){
      const ins = $("#flt-instrumento").value;
      const niv = $("#flt-nivel").value;
      const est = $("#flt-estilo").value;
      const q = ($("#flt-q").value||"").toLowerCase();
      const out = tutores.filter(t=>{
        if(ins && t.instrumento!==ins) return false;
        if(niv && !t.nivel.includes(niv)) return false;
        if(est && !t.estilos.includes(est)) return false;
        if(q && !(t.nombre.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))) return false;
        return true;
      });
      render(out);
    }
    ["flt-instrumento","flt-nivel","flt-estilo","flt-q"].forEach(id=> $("#"+id)?.addEventListener("input",apply));
    render(tutores);
  }

  function onInstrumentos(){
    const grid = $("#grid-instrumentos"); if(!grid) return;
    function render(list){ grid.innerHTML = list.map(cardItem).join(""); }
    function apply(){
      const tipo = $("#flt-tipo").value;
      const cond = $("#flt-cond").value;
      const tag = $("#flt-tag").value;
      const q = ($("#flt-q2").value||"").toLowerCase();
      const out = instrumentos.filter(it=>{
        if(tipo && it.tipo!==tipo) return false;
        if(cond && it.cond!==cond) return false;
        if(tag && !(it.tags||[]).includes(tag)) return false;
        if(q && !( (it.marca||'').toLowerCase().includes(q) || (it.modelo||'').toLowerCase().includes(q) )) return false;
        return true;
      });
      render(out);
    }
    ["flt-tipo","flt-cond","flt-tag","flt-q2"].forEach(id=> $("#"+id)?.addEventListener("input",apply));
    render(instrumentos);
  }

  function onPedales(){
    const grid = $("#grid-pedales"); if(!grid) return;
    function render(list){ grid.innerHTML = list.map(cardItem).join(""); }
    function apply(){
      const ef = $("#flt-efecto").value;
      const est = $("#flt-estado").value;
      const q = ($("#flt-q3").value||"").toLowerCase();
      const out = pedales.filter(p=>{
        if(ef && p.efecto!==ef) return false;
        if(est && p.estado!==est) return false;
        if(q && !( (p.marca||'').toLowerCase().includes(q) || (p.modelo||'').toLowerCase().includes(q) )) return false;
        return true;
      });
      render(out);
    }
    ["flt-efecto","flt-estado","flt-q3"].forEach(id=> $("#"+id)?.addEventListener("input",apply));
    render(pedales);
  }

  document.addEventListener("DOMContentLoaded", function(){
    onTutores(); onInstrumentos(); onPedales();
  });
})();
