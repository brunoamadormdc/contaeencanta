if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => console.warn('Cache offline indisponível:', error));
  });
}

const installed = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const mobile = ios || /Android/.test(navigator.userAgent);
const dismissedKey = 'conta-encanta:install-dismissed';
let deferredPrompt;
let dismissed = false;
try { dismissed = localStorage.getItem(dismissedKey) === '1'; } catch { /* Armazenamento opcional. */ }

const banner = document.createElement('aside');
banner.className = 'install-banner';
banner.setAttribute('aria-label', 'Instalar Conta e Encanta');

function hide(remember = false) {
  banner.remove();
  if (remember) {
    dismissed = true;
    try { localStorage.setItem(dismissedKey, '1'); } catch { /* Sem armazenamento persistente. */ }
  }
}

function render() {
  if (installed() || dismissed || (!mobile && !deferredPrompt)) { hide(); return; }
  const instructions = ios
    ? 'No Safari, toque em Compartilhar e escolha Adicionar à Tela de Início.'
    : 'No menu do navegador, escolha Instalar app ou Adicionar à tela inicial.';
  banner.innerHTML = `<img src="/assets/icon-192.png" alt="" width="48" height="48">
    <div class="install-copy"><strong>Leve as histórias com você</strong>
    <p>Instale o Conta e Encanta para abrir como aplicativo e ler sem internet após o primeiro acesso.</p>
    ${deferredPrompt ? '' : `<p class="install-instructions">${instructions}</p>`}</div>
    ${deferredPrompt ? '<button type="button" class="install-accept">Instalar</button>' : ''}
    <button type="button" class="install-dismiss" aria-label="Dispensar convite de instalação">Agora não</button>`;
  if (!banner.isConnected) document.body.append(banner);
}

banner.addEventListener('click', async event => {
  if (event.target.closest('.install-dismiss')) { hide(true); return; }
  if (!event.target.closest('.install-accept') || !deferredPrompt) return;
  const prompt = deferredPrompt;
  deferredPrompt = undefined;
  hide();
  await prompt.prompt();
  const {outcome} = await prompt.userChoice;
  if (outcome !== 'accepted') render();
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  if (ios) return;
  deferredPrompt = event;
  render();
});
window.addEventListener('appinstalled', () => hide(true));
window.matchMedia('(display-mode: standalone)').addEventListener('change', render);
render();
