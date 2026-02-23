// Inicializa animações AOS
AOS.init({
  once: true,
  duration: 800,
  offset: 120,
});

// Contagem regressiva para um evento (ajuste a data como quiser)
// Copa 2026 (exemplo): 11 de Junho de 2026 às 16:00 (Brasil -03:00)
const dataEvento = new Date("2026-06-11T16:00:00-03:00");
const contagemEl = document.getElementById("contagem");

function formatarDoisDigitos(valor) {
  return String(valor).padStart(2, "0");
}

function atualizarContagem() {
  const agora = new Date();
  const diff = dataEvento.getTime() - agora.getTime();

  if (!contagemEl) return;

  if (diff <= 0) {
    contagemEl.textContent = "Chegou a hora!";
    clearInterval(timer);
    return;
  }

  const totalSegundos = Math.floor(diff / 1000);
  const dias = Math.floor(totalSegundos / (60 * 60 * 24));
  const horas = Math.floor((totalSegundos % (60 * 60 * 24)) / (60 * 60));
  const minutos = Math.floor((totalSegundos % (60 * 60)) / 60);
  const segundos = totalSegundos % 60;

  contagemEl.textContent = `${dias}d ${formatarDoisDigitos(horas)}h ${formatarDoisDigitos(minutos)}min ${formatarDoisDigitos(segundos)}s`;
}

const timer = setInterval(atualizarContagem, 1000);
atualizarContagem();

// Simulador de placar em tempo real
const scoreHomeEl = document.getElementById("score-home");
const scoreAwayEl = document.getElementById("score-away");
const liveMatchEvents = document.querySelector(".live-match__events");

if (scoreHomeEl && scoreAwayEl) {
  const eventos = [
    { time: 12, team: "home", player: "Neymar", icon: "⚽" },
    { time: 28, team: "away", player: "Messi", icon: "⚽" },
    { time: 35, team: "home", player: "Vinicius Jr.", icon: "⚽" },
  ];

  let eventoIndex = 0;
  let timeElapsed = 45;

  function simularEvento() {
    if (eventoIndex < eventos.length) {
      const evento = eventos[eventoIndex];

      // Atualizar placar
      if (evento.team === "home") {
        scoreHomeEl.textContent = String(
          parseInt(scoreHomeEl.textContent) + 1
        );
      } else {
        scoreAwayEl.textContent = String(
          parseInt(scoreAwayEl.textContent) + 1
        );
      }

      // Adicionar evento na lista
      if (liveMatchEvents) {
        const novoEvento = document.createElement("div");
        novoEvento.className = "live-match__event";
        novoEvento.innerHTML = `<strong>Gol!</strong> <span>${evento.player} ${evento.icon}</span>`;

        // Inserir no topo da lista de eventos
        liveMatchEvents.insertBefore(novoEvento, liveMatchEvents.firstChild);

        // Manter apenas os últimos 3 eventos visíveis
        const eventosAtuais = liveMatchEvents.querySelectorAll(
          ".live-match__event"
        );
        if (eventosAtuais.length > 3) {
          eventosAtuais[eventosAtuais.length - 1].remove();
        }
      }

      eventoIndex++;
      const proximoIntervalo = eventos[eventoIndex]
        ? (eventos[eventoIndex].time - evento.time) * 800
        : 5000;
      setTimeout(simularEvento, proximoIntervalo);
    }
  }

  // Iniciar simulação após 2 segundos
  setTimeout(simularEvento, 2000);
}