import test from 'node:test';
import assert from 'node:assert/strict';
import {stories,difficulties} from '../dist/story.js';
import {createProgressStore} from '../dist/progress.js';
import {isCorrect,makePieces} from '../dist/engine.js';

const memory=()=>{const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};};
test('28 livros completos têm chaves distintas, capas e finais',()=>{
  assert.equal(stories.length,28);
  assert.equal(new Set(stories.map(s=>s.progressKey)).size,28);
  for(const book of stories){
    assert.equal(book.pages.length,6);assert.equal(book.endings.length,3);
    assert.ok(book.cover&&book.endingTitle&&book.endingImage&&book.summary);
    assert.equal(new Set(book.pages.map(p=>p.id)).size,book.pages.length);
    for(const page of book.pages){
      assert.ok(page.alt&&page.narration&&page.instruction&&page.hint&&page.success);
      if(page.type==='sequence'){
        assert.deepEqual([...page.pieces].sort(),[...page.answer].sort());
        assert.equal(isCorrect(page,page.answer),true);
        assert.equal(new Set(makePieces(page).map(p=>p.id)).size,page.pieces.length);
      }else{
        assert.ok(page.choices.some(c=>c.label===page.answer));
        if(page.type==='count')assert.equal(String(page.count),page.answer);
      }
    }
  }
});
test('cada nível tem sete livros e as três histórias originais continuam fáceis',()=>{
  assert.equal(difficulties.length,4);
  for(const level of difficulties)assert.equal(stories.filter(s=>s.difficulty===level.id).length,7);
  assert.ok(stories.slice(0,3).every(s=>s.difficulty==='facil'));
});
test('os níveis avançados incluem textos e ordenação de acontecimentos',()=>{
  for(const book of stories.filter(s=>s.difficulty==='dificil'))assert.ok(book.pages.filter(p=>p.readingText).length>=3);
  for(const book of stories.filter(s=>s.difficulty==='muito-dificil')){
    assert.ok(book.pages.filter(p=>p.readingText).length>=4);
    assert.ok(book.pages.some(p=>p.sequenceUnit==='sentence'));
  }
});
test('progresso de um livro não modifica os outros',()=>{
  const storage=memory(),store=createProgressStore(storage,stories);
  store.save(stories[1].id,{completed:[0,1],current:2,ending:'castelo'});
  assert.deepEqual(store.get(stories[0].id),{completed:[],current:0,ending:null});
  assert.deepEqual(store.get(stories[2].id),{completed:[],current:0,ending:null});
  assert.deepEqual(createProgressStore(storage,stories).get(stories[1].id),{completed:[0,1],current:2,ending:'castelo'});
});
test('atualização preserva a chave antiga do piquenique e rejeita finais de outro livro',()=>{
  const storage=memory();
  storage.setItem('conta-encanta:piquenique:v1',JSON.stringify({completed:[0,1,2],current:3,ending:'rio'}));
  const store=createProgressStore(storage,stories);
  assert.deepEqual(store.get(stories[0].id),{completed:[0,1,2],current:3,ending:'rio'});
  store.save(stories[1].id,{completed:[0],current:1,ending:'rio'});
  assert.equal(store.get(stories[1].id).ending,null);
});
test('progresso continua na sessão quando armazenamento não está disponível',()=>{
  const store=createProgressStore({getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},stories);
  store.save(stories[2].id,{completed:[0,1],current:2,ending:'amizade'});
  assert.equal(store.get(stories[2].id).completed.length,2);
  assert.equal(store.get(stories[0].id).completed.length,0);
});
test('recomeçar um livro preserva conquistas dos outros',()=>{
  const store=createProgressStore(memory(),stories);
  for(const book of stories)store.save(book.id,{completed:[0],current:1});
  store.save(stories[1].id,{});
  assert.equal(store.get(stories[1].id).completed.length,0);
  assert.equal(store.get(stories[0].id).completed.length,1);
  assert.equal(store.get(stories[2].id).completed.length,1);
});
