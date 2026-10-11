// Debounce curto: avalia só uma montagem completa, após o último movimento.
// Cancelar ao sair da página evita que uma resposta antiga avalie outra atividade.
export function createAutoCheck({ready,check,delay=350,setTimer=setTimeout,clearTimer=clearTimeout}){
  let timer=null;
  const cancel=()=>{if(timer!==null)clearTimer(timer);timer=null;};
  return {
    cancel,
    schedule(){cancel();if(!ready())return;timer=setTimer(()=>{timer=null;if(ready())check();},delay);}
  };
}
