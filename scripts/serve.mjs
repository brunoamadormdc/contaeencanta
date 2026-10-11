import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.webmanifest':'application/manifest+json','.json':'application/json'};
http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
    if(!target.startsWith(root))throw new Error('Forbidden');
    if(!(await stat(target)).isFile())throw new Error('Not found');
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(await readFile(target));
  }catch{res.writeHead(404);res.end('Arquivo não encontrado');}
}).listen(Number(process.env.PORT)||3000,'0.0.0.0',()=>console.log('Conta e Encanta: http://localhost:3000'));
