import {mathExercises,cleanMathProgress,isMathCorrect,distribution} from './math.js';

const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const units=n=>Array.from({length:n},()=>'<i class="unit-block" aria-hidden="true"></i>').join('');
const tens=n=>Array.from({length:n},()=>'<div class="ten-block" aria-hidden="true">'+Array.from({length:10},()=>'<i></i>').join('')+'</div>').join('');
const blocks=n=>`<div class="base-ten" aria-label="${Math.floor(n/10)} dezenas e ${n%10} unidades">${tens(Math.floor(n/10))}<div class="ones-blocks">${units(n%10)}</div></div>`;

export function createMathUI({storage,onRender,onNavigate,talk,play,celebrate}){
  const key='conta-encanta:matematica:v1';let saved;try{saved=JSON.parse(storage?.getItem(key)||'null');}catch{}
  let progress=cleanMathProgress(saved),index=0,selected=null,solved=false,hint=false,feedback='',steps=0,marked=new Set();
  const save=()=>{try{storage?.setItem(key,JSON.stringify(progress));}catch{}};
  const current=()=>mathExercises[index];
  function start(i){index=i;selected=null;solved=false;hint=false;feedback='';steps=0;marked=new Set();onNavigate('math');}
  function choose(answer){if(solved)return;selected=answer;
    if(isMathCorrect(current(),answer)){solved=true;feedback='Você descobriu!';if(!progress.completed.includes(current().id))progress.completed.push(current().id);save();play(true);celebrate();onRender();talk(current().explanation);}
    else{feedback='Vamos tentar de novo? Use as figuras ou peça uma pista.';play(false);onRender();}
  }
  function visual(e){
    if(e.kind==='place')return `<div class="math-model"><span class="model-caption">BLOCOS PARA EXPLORAR</span>${blocks(e.tens*10+e.ones)}<p>Cada barra tem 10 quadradinhos. Cada quadradinho solto vale 1.</p></div>`;
    if(e.kind==='add'||e.kind==='subtract')return `<div class="math-model"><div class="math-equation">${e.a} <span>${e.kind==='add'?'+':'−'}</span> ${e.b} <span>=</span> ?</div><div class="operation-model"><div><strong>${e.a}</strong>${blocks(e.a)}</div><span>${e.kind==='add'?'+':'−'}</span><div><strong>${e.b}</strong>${blocks(e.b)}</div></div><p>${e.kind==='add'?'Junte as dezenas e as unidades. Dez unidades podem virar uma nova dezena.':'O segundo grupo mostra quanto será retirado do primeiro. A pista ajuda a tirar em duas etapas.'}</p></div>`;
    if(e.kind==='multiply')return `<div class="math-model"><div class="equal-groups">${Array.from({length:e.groups},(_,g)=>`<div class="apple-group" aria-label="Cesta ${g+1}, com ${e.perGroup} maçãs"><small>Cesta ${g+1}</small>${Array.from({length:e.perGroup},(_,i)=>`<button class="math-counter ${marked.has(`${g}-${i}`)?'counted':''}" data-math-counter="${g}-${i}" aria-label="Contar maçã da cesta ${g+1}" aria-pressed="${marked.has(`${g}-${i}`)}">🍎</button>`).join('')}</div>`).join('')}</div><p>Toque nas maçãs para marcar as que já contou.</p></div>`;
    if(e.kind==='divide'){
      const shares=distribution(e.total,e.groups,steps);
      return `<div class="math-model"><div class="share-plates">${shares.map((n,i)=>`<div class="share-plate" aria-label="Amigo ${i+1}, ${n} bolachas"><small>${['Capitu','Pipo','Lulu','Tito'][i]}</small><div>${'🍪'.repeat(n)||'<span class="empty-plate">○</span>'}</div><b>${n}</b></div>`).join('')}</div><div class="share-tools"><button class="secondary" data-math-action="distribute" ${steps===e.total?'disabled':''}>Distribuir uma bolacha</button><button class="text-button" data-math-action="clear-distribution">Recomeçar a distribuição</button></div><p>${e.total-steps} bolachas ainda para distribuir. Dê uma por vez a cada amigo.</p></div>`;
    }
    if(e.kind==='fraction')return `<div class="math-model"><div class="fraction-whole" role="img" aria-label="Um lanche retangular dividido em quatro partes iguais; três partes estão separadas">${Array.from({length:e.parts},(_,i)=>`<div class="fraction-part ${i<e.selectedParts?'separated':''}"><span>${i<e.selectedParts?'✓':''}</span></div>`).join('')}</div><div class="fraction-legend"><span>🟧 Parte separada</span><span>⬜ Parte que ficou</span></div><p>O retângulo inteiro é um lanche. As quatro partes têm o mesmo tamanho.</p></div>`;
    return `<div class="math-model shop-model"><div class="shop-items"><div>📔<strong>Caderno</strong><span>R$ ${e.prices[0]}</span></div><div>✏️<strong>Lápis</strong><span>R$ ${e.prices[1]}</span></div></div><p class="payment-note">Capitu paga com <strong>R$ ${e.paid}</strong>.</p></div>`;
  }
  return {
    get completed(){return progress.completed.length;},
    open:start,
    drop(id){const i=Number(id.replace('math-option-',''));const choice=current().choices[i];if(choice)choose(choice);},
    reset(){progress=cleanMathProgress({});save();onNavigate('math-home');},
    home(){return `<main class="math-home"><button class="text-button" data-action="home">← Biblioteca</button><section class="math-intro"><div><span class="eyebrow">UM MÓDULO ESPECIAL · 7 A 10 ANOS</span><h1>Números também<br>contam histórias.</h1><p>Sete desafios com a turma: explore as figuras, arraste uma resposta ou toque nela. Sem pressa e com pistas sempre por perto.</p><span class="math-total">${progress.completed.length} de 7 desafios descobertos</span></div><img src="/assets/math-fair.webp" alt="A turma brinca com blocos, frutas e uma lojinha no jardim"></section><div class="math-exercise-grid">${mathExercises.map((e,i)=>`<button class="math-exercise-card ${progress.completed.includes(e.id)?'math-done':''}" data-math-open="${i}"><span>${progress.completed.includes(e.id)?'✓':i+1}</span><small>${e.level}</small><h2>${e.title}</h2><p>${e.topic}</p><b>${progress.completed.includes(e.id)?'Brincar de novo ↗':'Explorar ↗'}</b></button>`).join('')}</div><p class="math-home-note">Comece pelo desafio que fizer sentido para você. Eles crescem em complexidade e podem ser repetidos.</p>${progress.completed.length===7?'<button class="primary" data-math-action="finish">Ver minhas descobertas ✦</button>':''}</main>`;},
    exercise(){const e=current();return `<main class="math-reader"><div class="reader-top"><button class="text-button" data-action="math-home">← Matemática</button><span>${e.topic}</span><button class="text-button" data-action="settings">Aa</button></div><div class="math-track" aria-label="Desafios de matemática">${mathExercises.map((x,i)=>`<button data-math-open="${i}" class="chapter-dot ${i===index?'active':''} ${progress.completed.includes(x.id)?'done':''}" aria-label="Desafio ${i+1}: ${x.title}" ${i===index?'aria-current="step"':''}>${progress.completed.includes(x.id)?'✓':i+1}</button>`).join('')}</div><article class="math-workspace"><div class="math-work-title"><span class="eyebrow">DESAFIO ${index+1} DE 7 · ${e.character.toUpperCase()}</span><button class="small-audio" data-math-action="audio" aria-label="Ouvir desafio">♫</button></div><h1>${e.title}</h1><p class="math-question">${escape(e.prompt)}</p>${visual(e)}<div class="math-answer"><span class="eyebrow">SUA DESCOBERTA</span><button class="slot math-slot ${selected?'filled':''}" data-slot="0" data-math-action="clear-answer" ${solved?'disabled':''} aria-label="Solte sua resposta aqui">${escape(selected||'?')}</button><div class="pieces math-options">${e.choices.map((choice,i)=>`<button class="piece ${selected===choice?'math-selected':''}" data-piece="math-option-${i}" ${solved?'disabled':''}>${escape(choice)}</button>`).join('')}</div><p class="interaction-tip">Arraste a resposta para o espaço ou toque nela. O app confere sozinho.</p></div><div class="feedback ${solved?'success':feedback?'encouragement':''}" role="status">${feedback||'Você pode tentar quantas vezes quiser.'}</div>${hint?`<div class="hint-box">💡 ${escape(e.hint)}</div>`:''}${solved?`<div class="math-explanation"><strong>Veja como pensar:</strong><p>${escape(e.explanation)}</p></div>`:''}<div class="activity-actions"><button class="hint-button" data-math-action="hint">☀ Uma pista</button>${solved?`<button class="primary" data-math-action="next">${index===6?'Minhas descobertas':'Próximo desafio'} →</button>`:'<span class="automatic-note">Conferência automática ✦</span>'}</div></article></main>`;},
    finish(){return `<main class="ending-main"><span class="eyebrow">CADA TENTATIVA É UMA DESCOBERTA</span><h1>${progress.completed.length===7?'Sete desafios, muitas ideias!':'Continue explorando os números!'}</h1><p>Você já descobriu ${progress.completed.length} de 7 desafios.</p><div class="ending-art"><img src="/assets/math-fair.webp" alt="A turma celebra as descobertas na feira de matemática"></div><div class="math-skills">${mathExercises.map(e=>`<span class="${progress.completed.includes(e.id)?'skill-done':''}">${progress.completed.includes(e.id)?'✓':'○'} ${e.topic}</span>`).join('')}</div><p class="math-home-note">Contar, juntar, tirar, repartir e pensar em partes: você pode voltar a cada desafio quando quiser.</p><div class="ending-actions"><button class="secondary" data-action="math-home">Explorar de novo ↻</button><button class="primary" data-action="home">Voltar à biblioteca →</button></div></main>`;},
    handle(dataset){
      if(dataset.mathOpen!==undefined){start(Number(dataset.mathOpen));return true;}
      if(dataset.mathCounter!==undefined){if(marked.has(dataset.mathCounter))marked.delete(dataset.mathCounter);else marked.add(dataset.mathCounter);play(false);onRender();return true;}
      const a=dataset.mathAction;if(!a)return false;
      if(a==='audio')talk(current().prompt);
      if(a==='hint'){hint=true;onRender();talk(current().hint);}
      if(a==='clear-answer'&&!solved){selected=null;feedback='';onRender();}
      if(a==='distribute'){steps=Math.min(current().total,steps+1);play(false);onRender();}
      if(a==='clear-distribution'){steps=0;onRender();}
      if(a==='next'){if(index===6)onNavigate('math-finish');else start(index+1);}
      if(a==='finish')onNavigate('math-finish');
      return true;
    }
  };
}
