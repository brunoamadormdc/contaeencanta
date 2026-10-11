# Conta e Encanta

Livro infantil interativo em português, pensado para celular e crianças que já começam a juntar sílabas. 28 histórias completas em quatro níveis, mais um módulo de matemática com sete desafios. Cada livro tem seis atividades, ilustrações e três opções de final.

| Nível | Livros | Foco |
| --- | --- | --- |
| Fácil | 7 | Sílabas, palavras simples, frases e contagem |
| Médio | 7 | Novos sons, palavras maiores, rimas e frases |
| Difícil | 7 | Pequenos textos, causas, referências e ideia principal |
| Muito difícil | 7 | Inferências, sequência de fatos e justificativas |

Os níveis descrevem os desafios relativos desta biblioteca. Todos permanecem acessíveis, com pistas e narração opcional; não são uma classificação escolar ou avaliação formal.

## Rodar localmente

Requisito: Node.js 20 ou superior. Não há dependências para instalar.

```sh
npm run dev
```

Abra http://localhost:3000. Para conferir o projeto:

```sh
npm test
npm run build
```

## Publicar no Vercel

1. Extraia este projeto e envie os arquivos para um repositório Git.
2. Importe esse repositório no Vercel.
3. Selecione o preset **Other**, build `npm run build` e output `dist`.
4. Publique. O arquivo `vercel.json` já contém essas opções.

O app é estático; não precisa de banco, variáveis de ambiente, contas ou serviços pagos para funcionar. Também pode ser publicado em qualquer host estático que sirva `dist/`.

### Instalar como aplicativo

Depois da publicação HTTPS, abra o site no celular. No Android/Chrome, use **Instalar** no convite exibido quando o navegador disponibilizar a instalação; se não aparecer, escolha **Instalar app** no menu do navegador. No iPhone/iPad, abra no Safari e use **Compartilhar → Adicionar à Tela de Início**. O convite não aparece dentro do aplicativo instalado e pode ser dispensado pelo navegador. O manifesto e os ícones ficam em `dist/manifest.webmanifest` e `dist/assets/`.

O service worker `dist/sw.js` armazena a aplicação e todas as ilustrações após o primeiro acesso online completo. Assim, livros e desafios abrem sem conexão nesse aparelho. O progresso continua no armazenamento local do navegador/aplicativo, sem sincronização entre dispositivos; não desinstale nem limpe os dados se quiser preservá-lo. O áudio narrado depende da síntese de voz instalada no dispositivo e pode não funcionar offline. A cada publicação que mudar arquivos precacheados, incremente o nome `CACHE` em `dist/sw.js` para renovar o cache; em abas abertas, a atualização pode entrar em vigor na próxima abertura. Teste instalação e modo avião na URL HTTPS de produção em Android e iOS.

## Estrutura

- `dist/index.html`: página de entrada e metadados.
- `dist/styles.css`, `dist/math.css` e `dist/mobile.css`: aparência, responsividade e animações.
- `dist/app.js`: telas, atividades, navegação, progresso e preferências.
- `dist/story.js`: catálogo, três livros fáceis e personagens.
- `dist/more-stories.js`: nove livros adicionais, definições dos níveis e helpers de conteúdo.
- `dist/birthday-stories.js`: 16 livros adicionais para completar sete por nível.
- `dist/auto-check.js`: conferência automática de respostas completas, com cancelamento ao navegar.
- `dist/math.js` e `dist/math-ui.js`: sete desafios matemáticos, modelos visuais e progresso independente.
- `dist/engine.js`: validação das respostas e movimentação de peças.
- `dist/progress.js`: armazenamento e recuperação de progresso independente por livro.
- `dist/drag.js`: drag and drop com Pointer Events; compatível com toque.
- `dist/audio.js`: efeitos Web Audio e narração SpeechSynthesis.
- `dist/assets/`: ilustrações originais geradas com IA e otimizadas em WebP.
- `dist/manifest.webmanifest`, `dist/sw.js` e `dist/install.js`: instalação, cache offline e convite ao usuário.
- `tests/engine.test.mjs`: testes das regras de montagem e progresso.
- `tests/library.test.mjs`: testes da biblioteca, preservação de progresso anterior e separação entre livros.
- `tests/auto-check.test.mjs` e `tests/math.test.mjs`: conferência automática, cálculos, distribuição e progresso matemático.
- `scripts/`: servidor local e validação da saída estática.

Os arquivos em `dist/` são o próprio código-fonte, sem compilação ou minificação. Eles podem ser editados diretamente no VSCode, Zed ou outra IDE.

## Funcionalidades

São 168 atividades em 28 livros, com filtro por dificuldade e carrosséis horizontais por nível. Os livros podem ser explorados deslizando no celular, pelas setas ou com o foco do teclado. O carrossel mostra um card completo no celular, dois no tablet e três no desktop, sem barra de rolagem visível. O piquenique trabalha CESTA, BANANA, frases, leitura e contagem de bananas. A aventura da Lua trabalha LUA, QUEIJO, ações, ordenação de frase, leitura e contagem de estrelas. O jardim trabalha SEMENTE, VASO, necessidades da planta, ordenação de frase, cores e contagem de flores.

Peças podem ser arrastadas ou escolhidas por toque/teclado. Ao escolher uma alternativa, a resposta é conferida automaticamente. Na montagem, a conferência ocorre 350 ms após preencher todos os espaços; respostas incompletas não recebem erro. A criança continua para a próxima página quando quiser. Inclui pistas, tentativa livre, narração opcional, efeitos curtos, animações, letras maiúsculas/minúsculas e progresso local. As contagens usam os ícones na atividade abaixo da cena, evitando depender da quantidade de objetos nas ilustrações.

O módulo matemático reúne dezenas e unidades, adição, subtração, multiplicação, divisão, fração e troco. Foi pensado para exploração dos 7 aos 10 anos, com dificuldade crescente e escolha livre; a idade não substitui o acompanhamento de um responsável. Blocos e partes são desenhados no HTML, com quantidades exatas; maçãs podem ser marcadas ao contar, e 20 bolachas podem ser distribuídas uma a uma em quatro pratos. As alternativas matemáticas também são conferidas automaticamente. O progresso usa a chave independente `conta-encanta:matematica:v1`.

O progresso é salvo por livro no `localStorage` deste navegador. Abrir ou recomeçar um livro não apaga o progresso dos outros. A chave original do piquenique foi preservada. Se o armazenamento estiver bloqueado, o progresso é mantido durante a sessão. Não é sincronizado entre dispositivos. Não há analytics, anúncios ou envio de dados da criança.

## Experiência no celular

A apresentação prioriza telas pequenas e se expande para duas colunas a partir de 900 px. As narrativas ficam abaixo das ilustrações, com leitura de 18–19 px, sem texto sobreposto. Controles principais têm áreas de toque de 48–64 px. As ações de pista e próxima página ficam na parte inferior da tela, respeitando a área segura do aparelho. Na abertura, a biblioteca aparece antes do convite de matemática; uma barra inferior oferece acesso direto às duas áreas. A posição da biblioteca e de cada carrossel é preservada ao voltar de uma história durante a sessão.

Toque nas peças é a alternativa mais simples ao arrastar. A rolagem continua disponível sobre textos e espaços entre as peças. Filtros e marcadores de páginas rolam horizontalmente em telefones estreitos. Não há bloqueio de zoom do navegador.

## Áudio e acessibilidade

A voz em português depende das vozes instaladas no sistema e do suporte do navegador. Ela é iniciada por interação da criança. Em dispositivos sem síntese de voz, todos os textos e atividades continuam disponíveis. Para vozes consistentes em produção, substitua a síntese por arquivos de áudio gravados ou pré-gerados e mantenha legendas.

O app respeita `prefers-reduced-motion`, oferece alternativa ao arrastar, foco visível, opções sem cronômetro e avisos por região viva. O modo padrão usa letras maiúsculas.

## Como adicionar conteúdo

Edite `story.js`. A coleção `stories` alimenta as capas, o leitor e os finais. Cada livro tem `id`, `progressKey`, `difficulty`, `title`, `cover`, `coverAlt`, `tagline`, `pages`, `endings`, `endingTitle`, `endingPrompt`, `endingImage`, `endingAlt` e `summary`.

Cada página tem `id`, `chapter`, `image`, `alt`, `narration`, `instruction`, `type`, `answer`, `hint` e `success`. O tipo `sequence` usa `pieces` e um array `answer`; `choice` usa `choices` e uma resposta textual. Para completar frases, use `prompt`, `blank: true` e `suffix`. O tipo `count` inclui `count`, `countIcon` e `countNoun`. Para compreensão textual, use `readingText`; o leitor apresenta o trecho em uma caixa com áudio próprio. Para ordenar acontecimentos, use `sequenceUnit: "sentence"`; as peças e espaços passam a ter layout vertical. Cada final tem `id`, `label`, `icon`, `sentence` e, opcionalmente, `image`.

Use uma nova chave de progresso ao mudar profundamente uma história. Mantenha a chave existente quando apenas corrigir texto ou imagens. Novos livros usam o mesmo leitor sem copiar telas. Os números de páginas, validação dos finais e progresso são derivados dos dados de cada livro.

## Verificação

Vinte testes automatizados cobrem respostas, sílabas repetidas, troca de peças, conteúdo dos 28 livros, distribuição de níveis, atividades avançadas, recuperação de progresso, separação entre livros, compatibilidade com a primeira versão, conferência automática e os sete desafios matemáticos. A validação de build verifica sintaxe, manifesto e presença dos assets. Em Chromium local, foram verificados visualmente o convite, a biblioteca, um livro e a matemática sem rede após o cache inicial; a instrução iOS foi conferida com agente de usuário simulado. Antes de distribuir amplamente, validar em aparelhos reais Android/Chrome e iPhone/Safari, principalmente instalação, modo avião, arrastar e vozes locais.

## Orientação para continuidade com IA

Preserve o conteúdo didático em português e a identidade dos quatro personagens. Não transforme o app em um feed de vídeos. Mantenha uma atividade por página, suporte a toque e arrastar, sem punição por erro. Verifique as respostas contra o conteúdo ilustrado e os trechos de leitura. Cada livro tem uma ilustração principal reutilizada nas suas páginas; os 16 livros novos compartilham oito cenários ilustrados entre aventuras relacionadas; futuras expansões podem dar uma imagem diferente a cada página por meio de `image`. Novas funcionalidades devem funcionar sem credenciais no cliente. Rode os testes após alterar `engine.js` e valide o build antes de publicar.
