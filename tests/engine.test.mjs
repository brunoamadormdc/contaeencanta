import test from 'node:test';
import assert from 'node:assert/strict';
import {isCorrect,makePieces,placePiece,cleanProgress} from '../dist/engine.js';
import {story} from '../dist/story.js';
test('sílabas repetidas são peças independentes e formam BANANA',()=>{
  const page=story.pages[1],pieces=makePieces(page);
  assert.equal(new Set(pieces.map(p=>p.id)).size,3);
  assert.equal(isCorrect(page,['BA','NA','NA']),true);
  assert.equal(isCorrect(page,['NA','BA','NA']),false);
  assert.equal(isCorrect(page,['BA','NA']),false);
});
test('arrastar uma peça ocupada troca as posições sem duplicar peças',()=>{
  const original=['a','b',null];
  assert.deepEqual(placePiece(original,'a',1),['b','a',null]);
  assert.deepEqual(original,['a','b',null]);
  assert.deepEqual(placePiece(original,'a',2),[null,'b','a']);
});
test('uma nova peça substitui uma peça do espaço sem manter duplicatas',()=>assert.deepEqual(placePiece(['a',null],'b',0),['b',null]));
test('respostas de leitura e contagem são verificadas, inclusive erros',()=>{
  assert.equal(isCorrect(story.pages[4],['caixa']),true);
  assert.equal(isCorrect(story.pages[4],['cesta']),false);
  assert.equal(isCorrect(story.pages[5],['3']),true);
  assert.equal(isCorrect(story.pages[5],['2']),false);
});
test('progresso malformado não libera páginas inexistentes',()=>{
  assert.deepEqual(cleanProgress({completed:[0,0,1,9,-1,'2'],current:999,ending:'invalido'}),{completed:[0,1],current:5,ending:null});
  assert.deepEqual(cleanProgress(null),{completed:[],current:0,ending:null});
});
test('todas as páginas têm instrução, pista, narração e solução consistente',()=>{
  assert.equal(story.pages.length,6);
  for(const page of story.pages){assert.ok(page.instruction&&page.hint&&page.narration&&page.alt);if(page.type==='sequence'){assert.deepEqual([...page.pieces].sort(),[...page.answer].sort());assert.equal(isCorrect(page,page.answer),true);}else assert.ok(page.choices.some(c=>c.label===page.answer));}
});
