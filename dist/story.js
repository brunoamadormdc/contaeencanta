import {moreStories} from './more-stories.js';
import {birthdayStories} from './birthday-stories.js';
export {difficulties} from './more-stories.js';
// Conteúdo independente da interface: novos livros podem seguir este contrato.
export const characters = [
  { name: 'Capitu', icon: '🚀', description: 'A capivara-foguete que voa soltando bolhas.', color: '#c8e7df' },
  { name: 'Pipo', icon: '🍿', description: 'Uma pipoca de patins, cheia de ideias!', color: '#ffe8b0' },
  { name: 'Lulu', icon: '🩰', description: 'A gelatina bailarina com pernas de colher.', color: '#f9d5dc' },
  { name: 'Tito', icon: '🐢', description: 'Uma tartaruga com um bule-morango no casco.', color: '#dce9c7' }
];
export const story = {
  id: 'piquenique-v1', title: 'O piquenique que saiu voando',
  pages: [
    { id:'cesta', chapter:'Um espirro e… lá vai ela!', image:'launch.webp', alt:'Capitu espirra e a cesta do piquenique voa; seus amigos tentam alcançá-la.',
      narration:'A turma vai fazer um piquenique. Capitu espirra. Atchim! A cesta saiu voando!',
      instruction:'Monte a palavra CESTA.', type:'sequence', pieces:['TA','CES'], answer:['CES','TA'], hint:'A palavra começa com CES.', success:'CESTA! Vamos buscar o que caiu?' },
    { id:'banana', chapter:'Uma descoberta do Pipo', image:'banana.webp', alt:'Pipo encontra uma banana no jardim e Lulu o ajuda.',
      narration:'Pipo corre de patins. Ele encontra uma banana no jardim.',
      instruction:'Monte a palavra BANANA.', type:'sequence', pieces:['NA','BA','NA'], answer:['BA','NA','NA'], hint:'Comece com BA. Depois, use as duas peças NA.', success:'BANANA! Pipo guardou a fruta.' },
    { id:'frase', chapter:'Lulu entra na brincadeira', image:'banana.webp', alt:'Lulu ajuda Pipo a encontrar a fruta para o piquenique.',
      narration:'Lulu ajuda Pipo. Ela vê a banana perto da flor.',
      instruction:'Complete a frase.', prompt:'Lulu vê a', blank:true, suffix:'.', type:'choice', choices:[{label:'banana',icon:'🍌'},{label:'lua',icon:'🌙'},{label:'casa',icon:'🏠'}], answer:'banana', hint:'É a fruta amarela que Pipo encontrou.', success:'Lulu vê a banana. Mais uma coisa encontrada!' },
    { id:'ordem', chapter:'Uma frase fora do lugar', image:'search.webp', alt:'Tito ajuda Lulu a procurar os objetos entre uma caixa, uma bolsa e uma cesta.',
      narration:'Tito chegou para ajudar. Pipo misturou as palavras. Vamos organizar?',
      instruction:'Monte a frase: Tito ajuda Lulu.', type:'sequence', pieces:['Lulu.','ajuda','Tito'], answer:['Tito','ajuda','Lulu.'], hint:'Comece com Tito. Quem ele ajuda?', success:'Tito ajuda Lulu. Juntos fica mais fácil!' },
    { id:'leitura', chapter:'Onde está a bola?', image:'search.webp', alt:'Uma bola vermelha está na caixa de madeira, ao lado de uma bolsa azul e uma cesta.',
      narration:'Falta encontrar a bola para brincar depois do lanche.',
      instruction:'Leia a pista e escolha o lugar.', prompt:'A bola está na caixa.', type:'choice', choices:[{label:'caixa',icon:'📦'},{label:'bolsa',icon:'👜'},{label:'cesta',icon:'🧺'}], answer:'caixa', hint:'Procure a palavra CAIXA na pista.', success:'Isso! A bola está na caixa.' },
    { id:'final', chapter:'Um final do seu jeitinho', image:'picnic.webp', alt:'Os quatro amigos fazem um piquenique com frutas e pão perto de um riacho.',
      narration:'A turma encontrou tudo. Agora, você escolhe onde será o piquenique!',
      instruction:'Conte as bananas abaixo e escolha o número.', type:'count', count:3, countIcon:'🍌', countNoun:'banana', answer:'3', choices:[{label:'2'},{label:'3'},{label:'4'}], hint:'Conte devagar: uma, duas, três.', success:'Três bananas! Agora escolha o lugar do piquenique.' }
  ],
  endings:[{id:'jardim',label:'No jardim',icon:'🌷',sentence:'A turma faz um piquenique no jardim.'},{id:'rio',label:'Perto do rio',icon:'🌊',sentence:'A turma faz um piquenique perto do rio.'},{id:'lua',label:'Na Lua!',icon:'🌙',sentence:'Capitu leva a turma para um piquenique na Lua!'}]
};

Object.assign(story, {
  progressKey:'conta-encanta:piquenique:v1', cover:'launch.webp', coverAlt:'A cesta do piquenique voando',
  tagline:'PALAVRAS, FRASES E UMA PITADA DE CONFUSÃO',
  endingTitle:'O piquenique pode começar!', endingPrompt:'Escolha onde a turma vai celebrar essa aventura.',
  endingImage:'picnic.webp', endingAlt:'A turma reunida para o piquenique.',
  summary:'Você montou palavras, leu frases e contou três bananas. Que aventura!'
});
story.endings.find(e=>e.id==='lua').image='moon.webp';

export const moonStory = {
  id:'lua-queijo-v1', progressKey:'conta-encanta:lua-queijo:v1', title:'Capitu e a Lua de queijo',
  cover:'lunar-ride.webp', coverAlt:'Capitu leva os amigos em uma viagem de bolhas em direção à Lua.',
  tagline:'SÍLABAS, PISTAS E UMA VIAGEM ESPACIAL',
  endingTitle:'Uma descoberta de outro mundo!', endingPrompt:'O queijo mágico pode virar um presente. O que a turma vai fazer com ele?',
  endingImage:'lunar-cheese.webp', endingAlt:'A turma encontra um queijo mágico na Lua.',
  summary:'Você juntou letras e sílabas, organizou uma frase e contou estrelas. A turma chegou à Lua!',
  pages:[
    {id:'lua',chapter:'Uma ideia lá no alto',image:'lunar-ride.webp',alt:'Capitu e os amigos partem em uma viagem de bolhas; a Lua aparece no céu.',narration:'Capitu olha para o céu. A Lua parece um queijo! Será? Vamos descobrir nessa história maluca.',instruction:'Junte as letras para formar LUA.',type:'sequence',pieces:['A','L','U'],answer:['L','U','A'],hint:'Comece com L. Depois vêm U e A.',success:'LUA! Nosso destino está lá no alto.'},
    {id:'viagem',chapter:'Prontos para decolar',image:'lunar-ride.webp',alt:'Capitu voa levando os amigos em uma pequena carruagem de bolhas.',narration:'Capitu solta bolhas e sobe. A turma vai junto. Pipo dá uma risada!',instruction:'Complete a frase.',prompt:'Capitu',blank:true,suffix:'.',type:'choice',choices:[{label:'voa',icon:'🚀'},{label:'nada',icon:'🏊'},{label:'dorme',icon:'💤'}],answer:'voa',hint:'Ela está subindo pelo céu. Capitu VOA.',success:'Capitu voa. Lá vamos nós!'},
    {id:'queijo',chapter:'Que surpresa gostosa!',image:'lunar-cheese.webp',alt:'Capitu e Pipo encontram um grande pedaço de queijo no chão da Lua.',narration:'A turma pousa. Pipo acha um queijo mágico perto de uma pedra. Nesta aventura, até a Lua guarda surpresas!',instruction:'Monte a palavra QUEIJO.',type:'sequence',pieces:['JO','QUEI'],answer:['QUEI','JO'],hint:'A primeira sílaba é QUEI. A segunda é JO.',success:'QUEIJO! Um achado bem diferente.'},
    {id:'pipo-ve',chapter:'Pipo conta a descoberta',image:'lunar-cheese.webp',alt:'Pipo aponta com alegria para o queijo mágico.',narration:'Pipo quer contar o que viu. Mas as palavras ficaram fora de ordem!',instruction:'Monte a frase: Pipo vê queijo.',type:'sequence',pieces:['queijo.','Pipo','vê'],answer:['Pipo','vê','queijo.'],hint:'Comece com Pipo. Depois coloque vê.',success:'Pipo vê queijo. Agora a frase está no lugar!'},
    {id:'pista-lunar',chapter:'Uma pista na Lua',image:'lunar-cheese.webp',alt:'Um pedaço de queijo está perto de uma pedra, no chão da Lua.',narration:'Tito escreve uma pista para Lulu. Leia e descubra onde está o queijo.',instruction:'Leia a pista e escolha o lugar.',prompt:'O queijo está na Lua.',type:'choice',choices:[{label:'Lua',icon:'🌙'},{label:'casa',icon:'🏠'},{label:'mar',icon:'🌊'}],answer:'Lua',hint:'A última palavra da pista é LUA.',success:'Na Lua! Você leu a pista.'},
    {id:'estrelas',chapter:'Estrelas para o caminho',image:'moon.webp',alt:'Os amigos descansam na Lua, sob um céu estrelado.',narration:'Antes de voltar, a turma olha as estrelas. Vamos contar as estrelas da atividade?',instruction:'Conte as estrelas abaixo.',type:'count',count:4,countIcon:'⭐',countNoun:'estrela',answer:'4',choices:[{label:'3'},{label:'4'},{label:'5'}],hint:'Conte uma de cada vez: uma, duas, três, quatro.',success:'Quatro estrelas! Agora você escolhe o presente da turma.'}
  ],
  endings:[
    {id:'lanche',label:'Um lanche',icon:'🧀',sentence:'A turma divide o queijo em um lanche na Lua.',image:'moon.webp'},
    {id:'presente',label:'Um presente',icon:'🎁',sentence:'A turma leva um queijo mágico de presente para os amigos.'},
    {id:'castelo',label:'Um castelo!',icon:'🏰',sentence:'Pipo imagina um castelo de queijo. Que ideia maluca!'}
  ]
};

export const gardenStory = {
  id:'jardim-historias-v1',progressKey:'conta-encanta:jardim-historias:v1',title:'O jardim que contava histórias',
  cover:'garden-flowers.webp',coverAlt:'A turma cuida de flores coloridas em um jardim mágico.',tagline:'PALAVRAS, FLORES E HISTÓRIAS PARA CULTIVAR',
  endingTitle:'O jardim tem uma história para contar!',endingPrompt:'Qual história as flores vão contar para a turma?',
  endingImage:'garden-flowers.webp',endingAlt:'A turma reunida entre as flores do jardim mágico.',summary:'Você montou palavras, leu uma pista e contou flores. O jardim cresceu com a sua ajuda!',
  pages:[
    {id:'semente',chapter:'Um presente pequenininho',image:'garden-seed.webp',alt:'Tito prepara um buraco na terra para plantar uma semente.',narration:'Tito acha uma semente. Ela é pequena, mas guarda uma grande surpresa.',instruction:'Monte a palavra SEMENTE.',type:'sequence',pieces:['TE','SE','MEN'],answer:['SE','MEN','TE'],hint:'Comece com SE. Depois vêm MEN e TE.',success:'SEMENTE! Vamos plantar?'},
    {id:'vaso',chapter:'Uma casa para a semente',image:'garden-seed.webp',alt:'Pipo segura um vaso de barro enquanto Tito cuida da terra.',narration:'Pipo trouxe um vaso. Tito põe a semente na terra. Lulu ajuda com carinho.',instruction:'Monte a palavra VASO.',type:'sequence',pieces:['SO','VA'],answer:['VA','SO'],hint:'A palavra começa com VA e termina com SO.',success:'VASO! Uma casinha para a planta.'},
    {id:'regar',chapter:'Uma gotinha faz diferença',image:'garden-flowers.webp',alt:'Lulu e Tito usam um regador azul para cuidar das flores.',narration:'Lulu pega o regador. A planta precisa de água para crescer.',instruction:'Complete a frase.',prompt:'A planta precisa de',blank:true,suffix:'.',type:'choice',choices:[{label:'água',icon:'💧'},{label:'sapato',icon:'👟'},{label:'bola',icon:'⚽'}],answer:'água',hint:'O regador leva ÁGUA para a planta.',success:'A planta precisa de água. Muito bem!'},
    {id:'tito-rega',chapter:'Palavras que florescem',image:'garden-flowers.webp',alt:'Tito ajuda a regar uma flor no jardim.',narration:'Tito também cuida das flores. Vamos colocar a frase na ordem?',instruction:'Monte a frase: Tito rega a flor.',type:'sequence',pieces:['flor.','a','Tito','rega'],answer:['Tito','rega','a','flor.'],hint:'Comece com Tito. Depois: rega a flor.',success:'Tito rega a flor. A frase floresceu!'},
    {id:'pista-flor',chapter:'O segredo da flor',image:'garden-flowers.webp',alt:'Flores vermelhas, rosas e amarelas crescem no jardim.',narration:'Uma flor começa a contar uma história. Leia a pista para descobrir sua cor.',instruction:'Leia a pista e escolha a cor.',prompt:'A flor que fala é vermelha.',type:'choice',choices:[{label:'vermelha',icon:'🔴'},{label:'azul',icon:'🔵'},{label:'amarela',icon:'🟡'}],answer:'vermelha',hint:'A última palavra da pista é VERMELHA.',success:'Vermelha! Essa é a flor da história.'},
    {id:'flores',chapter:'Um jardim cheio de histórias',image:'garden-flowers.webp',alt:'Os quatro amigos admiram as flores do jardim mágico.',narration:'As flores querem contar histórias para a turma. Primeiro, vamos contar as flores da atividade.',instruction:'Conte as flores abaixo.',type:'count',count:5,countIcon:'🌸',countNoun:'flor',answer:'5',choices:[{label:'4'},{label:'5'},{label:'6'}],hint:'Conte devagar: uma, duas, três, quatro, cinco.',success:'Cinco flores! Escolha a história que elas vão contar.'}
  ],
  endings:[
    {id:'amizade',label:'Uma amizade',icon:'💛',sentence:'A flor conta a história de dois amigos que cuidam de um jardim.'},
    {id:'aventura',label:'Uma aventura',icon:'🦋',sentence:'A flor conta a aventura de uma borboleta que encontrou um tesouro.'},
    {id:'maluca',label:'Uma surpresa',icon:'🍿',sentence:'A flor conta uma história maluca: Pipo virou uma árvore de pipoca!'}
  ]
};

for(const book of [story,moonStory,gardenStory])book.difficulty='facil';
export const stories=[story,moonStory,gardenStory,...moreStories,...birthdayStories];
