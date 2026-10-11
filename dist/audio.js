let context;
export function chime(enabled, success=true) {
  if(!enabled) return;
  try {
    context ||= new (window.AudioContext||window.webkitAudioContext)();
    context.resume();
    (success?[523.25,659.25,783.99]:[392,440]).forEach((f,i)=>{
      const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+i*.11;
      o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.065,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+.3);
      o.connect(g);g.connect(context.destination);o.start(t);o.stop(t+.32);
    });
  } catch { /* Áudio é opcional; a atividade segue sem ele. */ }
}
export function speak(text, {enabled=true,onEnd=()=>{}}={}) {
  if(!enabled||!('speechSynthesis' in window)) { onEnd(); return false; }
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);utterance.lang='pt-BR';utterance.rate=.82;
  const voices=window.speechSynthesis.getVoices();utterance.voice=voices.find(v=>v.lang==='pt-BR')||voices.find(v=>v.lang.startsWith('pt'))||null;
  utterance.onend=onEnd;utterance.onerror=onEnd;window.speechSynthesis.speak(utterance);return true;
}
export function stopSpeech() { window.speechSynthesis?.cancel(); }
