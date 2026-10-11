export function isCorrect(page, selected) {
  if (page.type === 'sequence') return selected.length === page.answer.length && selected.every((word, i) => word === page.answer[i]);
  return selected[0] === page.answer;
}
export function makePieces(page) { return (page.pieces || []).map((label, i) => ({id:`${page.id}-${i}`, label})); }
export function placePiece(slots, pieceId, targetIndex) {
  const next=[...slots]; const origin=next.indexOf(pieceId); const displaced=next[targetIndex];
  if(origin>=0) next[origin]=displaced ?? null;
  next[targetIndex]=pieceId; return next;
}
export function cleanProgress(value, pageCount=6, endingIds=['jardim','rio','lua']) {
  const completed=Array.isArray(value?.completed) ? [...new Set(value.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<pageCount))] : [];
  return { completed, current:Number.isInteger(value?.current)?Math.max(0,Math.min(value.current,pageCount-1)):0, ending:endingIds.includes(value?.ending)?value.ending:null };
}
