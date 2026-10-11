import test from 'node:test';
import assert from 'node:assert/strict';
import {mathExercises,isMathCorrect,cleanMathProgress,distribution} from '../dist/math.js';
import {createMathUI} from '../dist/math-ui.js';

test('sete exercícios têm respostas matemáticas consistentes',()=>{
  assert.equal(mathExercises.length,7);
  for(const e of mathExercises){
    let expected;
    if(e.kind==='place')expected=String(e.tens*10+e.ones);
    if(e.kind==='add')expected=String(e.a+e.b);
    if(e.kind==='subtract')expected=String(e.a-e.b);
    if(e.kind==='multiply')expected=String(e.groups*e.perGroup);
    if(e.kind==='divide')expected=String(e.total/e.groups);
    if(e.kind==='fraction')expected=`${e.selectedParts}/${e.parts}`;
    if(e.kind==='money')expected=`R$ ${e.paid-e.prices.reduce((a,b)=>a+b,0)}`;
    assert.equal(e.answer,expected);
    assert.ok(e.choices.includes(expected));
    assert.equal(new Set(e.choices).size,e.choices.length);
    assert.ok(e.hint&&e.explanation);
    assert.equal(isMathCorrect(e,expected),true);
    assert.equal(isMathCorrect(e,e.choices.find(c=>c!==expected)),false);
  }
});
test('distribuição conserva a quantidade e termina com grupos iguais',()=>{
  for(let n=0;n<=20;n++)assert.equal(distribution(20,4,n).reduce((a,b)=>a+b,0),n);
  assert.deepEqual(distribution(20,4,20),[5,5,5,5]);
  assert.deepEqual(distribution(20,4,7),[2,2,2,1]);
  assert.deepEqual(distribution(20,4,99),[5,5,5,5]);
});
test('progresso matemático ignora dados inválidos e repetições',()=>{
  assert.deepEqual(cleanMathProgress({completed:['somar','somar','inexistente',1]}),{completed:['somar']});
  assert.deepEqual(cleanMathProgress(null),{completed:[]});
});
test('seleção e arrastar conferem automaticamente sem marcar respostas erradas',()=>{
  const values=new Map(),storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
  const ui=createMathUI({storage,onRender(){},onNavigate(){},talk(){},play(){},celebrate(){}});
  ui.open(0);ui.drop('math-option-1');assert.equal(ui.completed,0);
  assert.ok(ui.exercise().includes('Vamos tentar de novo'));
  ui.drop('math-option-0');assert.equal(ui.completed,1);
  assert.ok(ui.exercise().includes('Você descobriu!'));
  ui.open(0);ui.drop('math-option-0');assert.equal(ui.completed,1);
  const restored=createMathUI({storage,onRender(){},onNavigate(){},talk(){},play(){},celebrate(){}});
  assert.equal(restored.completed,1);
  restored.reset();assert.equal(restored.completed,0);
});
