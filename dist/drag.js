// Pointer Events: o mesmo arrastar funciona com mouse, toque e caneta.
// Cliques/teclado são tratados pelos botões como alternativa acessível.
let suppressUntil=0;
export function attachDrag(root, onDrop) {
  let drag=null;
  const down=e=>{
    const piece=e.target.closest('[data-piece]'); if(!piece||piece.disabled||e.button!==0) return;
    drag={id:piece.dataset.piece,x:e.clientX,y:e.clientY,pointer:e.pointerId,piece,ghost:null};
    piece.setPointerCapture(e.pointerId);
  };
  const move=e=>{
    if(!drag||e.pointerId!==drag.pointer) return;
    if(!drag.ghost && Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>8){
      drag.ghost=drag.piece.cloneNode(true);drag.ghost.classList.add('drag-ghost');drag.ghost.removeAttribute('id');drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);drag.piece.classList.add('drag-origin');
    }
    if(drag.ghost){e.preventDefault();drag.ghost.style.left=`${e.clientX}px`;drag.ghost.style.top=`${e.clientY}px`;root.querySelectorAll('[data-slot]').forEach(el=>el.classList.toggle('drop-hover',el===document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-slot]')));}
  };
  const finish=e=>{
    if(!drag) return; const current=drag;drag=null;
    if(current.ghost){const slot=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-slot]');current.ghost.remove();current.piece.classList.remove('drag-origin');suppressUntil=performance.now()+350;root.querySelectorAll('.drop-hover').forEach(el=>el.classList.remove('drop-hover'));if(e.type!=='pointercancel'&&slot)onDrop(current.id,Number(slot.dataset.slot));}
  };
  const click=e=>{if(performance.now()<suppressUntil){e.preventDefault();e.stopImmediatePropagation();}};
  root.addEventListener('pointerdown',down);root.addEventListener('pointermove',move);root.addEventListener('pointerup',finish);root.addEventListener('pointercancel',finish);root.addEventListener('click',click,true);
  return ()=>{drag?.ghost?.remove();root.removeEventListener('pointerdown',down);root.removeEventListener('pointermove',move);root.removeEventListener('pointerup',finish);root.removeEventListener('pointercancel',finish);root.removeEventListener('click',click,true);};
}
