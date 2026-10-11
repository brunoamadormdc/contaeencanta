import test from 'node:test';
import assert from 'node:assert/strict';
import {createAutoCheck} from '../dist/auto-check.js';

function setup(){
  const timers=new Map();let id=0,ready=false,checks=0;
  const automatic=createAutoCheck({ready:()=>ready,check:()=>checks++,setTimer:fn=>{timers.set(++id,fn);return id;},clearTimer:id=>timers.delete(id)});
  return {automatic,timers,setReady:value=>ready=value,get checks(){return checks;},flush(){const pending=[...timers.values()];timers.clear();pending.forEach(fn=>fn());}};
}
test('montagem incompleta não é avaliada e a completa é avaliada uma vez',()=>{
  const s=setup();s.automatic.schedule();s.flush();assert.equal(s.checks,0);
  s.setReady(true);s.automatic.schedule();s.automatic.schedule();assert.equal(s.timers.size,1);
  s.flush();assert.equal(s.checks,1);
});
test('retirar uma peça antes da avaliação impede feedback prematuro',()=>{
  const s=setup();s.setReady(true);s.automatic.schedule();s.setReady(false);s.automatic.schedule();s.flush();assert.equal(s.checks,0);
});
test('sair de uma página cancela a avaliação antiga',()=>{
  const s=setup();s.setReady(true);s.automatic.schedule();s.automatic.cancel();s.flush();assert.equal(s.checks,0);
});
