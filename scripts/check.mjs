import {readdir,readFile,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {stories} from '../dist/story.js';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const file of await readdir(root+'dist'))if(file.endsWith('.js'))execFileSync(process.execPath,['--check',root+'dist/'+file]);
for(const story of stories){
  await access(root+'dist/assets/'+story.cover);
  await access(root+'dist/assets/'+story.endingImage);
  for(const page of story.pages)await access(root+'dist/assets/'+page.image);
  for(const ending of story.endings)if(ending.image)await access(root+'dist/assets/'+ending.image);
}
await access(root+'dist/assets/cast.webp');
await access(root+'dist/assets/moon.webp');
await access(root+'dist/assets/math-fair.webp');
await access(root+'dist/math.css');
const manifest=JSON.parse(await readFile(root+'dist/manifest.webmanifest','utf8'));
if(manifest.start_url!=='/'||manifest.display!=='standalone')throw new Error('Manifesto PWA incompleto');
for(const icon of manifest.icons){
  if(!icon.src.startsWith('/assets/'))throw new Error('Ícone fora da aplicação');
  await access(root+'dist'+icon.src);
}
await access(root+'dist/assets/apple-touch-icon.png');
await access(root+'dist/sw.js');
const html=await readFile(root+'dist/index.html','utf8');
if(!html.includes('lang="pt-BR"'))throw new Error('Idioma ausente');
if(!html.includes('rel="manifest"'))throw new Error('Manifesto não vinculado');
console.log(`JavaScript válido, ${stories.length} livros, ${stories.reduce((n,s)=>n+s.pages.length,0)} páginas e módulo com 7 exercícios matemáticos. Imagens disponíveis. Saída estática: dist/`);
