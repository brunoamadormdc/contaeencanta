import {cleanProgress} from './engine.js';

// Chaves estáveis por livro: preserva o progresso da primeira versão.
// O cache também mantém as descobertas durante a sessão se o storage falhar.
export function createProgressStore(storage, books) {
  const cache=new Map();
  const find=id=>books.find(book=>book.id===id);
  return {
    get(id) {
      const book=find(id);if(!book)throw new Error('Livro desconhecido');
      if(!cache.has(id)){
        let saved;try{saved=JSON.parse(storage?.getItem(book.progressKey)||'null');}catch{}
        cache.set(id,cleanProgress(saved,book.pages.length,book.endings.map(e=>e.id)));
      }
      return cache.get(id);
    },
    save(id,value){
      const book=find(id);if(!book)throw new Error('Livro desconhecido');
      const normalized=cleanProgress(value,book.pages.length,book.endings.map(e=>e.id));
      cache.set(id,normalized);
      try{storage?.setItem(book.progressKey,JSON.stringify(normalized));}catch{}
    }
  };
}
