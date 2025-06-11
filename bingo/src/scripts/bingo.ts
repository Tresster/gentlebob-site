import { emotes } from './emotes.ts';
import { messages } from './messages.ts';

declare global {
  interface Window {
    toggleCell: (id: string) => void;
    untoggleCell: (id: string) => void;
  }
}

function toggleCell(id: string): void {
  const e = document.getElementById(id);
  if (e === null) return;

  e.classList.replace('untoggled', 'toggled');
  e.setAttribute('onclick', 'untoggleCell(this.id)');
}

function untoggleCell(id: string): void {
  const e = document.getElementById(id);
  if (e === null) return;

  e.classList.replace('toggled', 'untoggled');
  e.setAttribute('onclick', 'toggleCell(this.id)');
}

window.toggleCell = toggleCell;
window.untoggleCell = untoggleCell;

((): void => {
  function shuffle(array: unknown[]): void {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }

  function populateEmotes(): void {
    shuffle(emotes);

    let i = 0;
    for (; i < 4; i++) {
      const e = document.getElementById(`e${i}`);
      if (e === null) continue;

      e.setAttribute('src', 'https://cdn.7tv.app/emote/' + emotes[i] + '/1x.webp');
    }

    setInterval(function () {
      const e = document.getElementById(`e${[0, 2, 1, 3][i % 4 | 0]}`);
      if (e === null) return;

      e.setAttribute('src', 'https://cdn.7tv.app/emote/' + emotes[i % emotes.length] + '/1x.webp');
      i++;
    }, 1000);
  }

  function populateCards(): void {
    shuffle(messages);

    for (let id = 0; id < 12; id++) {
      const e = document.getElementById(id.toString());
      if (e === null) continue;

      e.innerText = messages[id];
    }

    for (let id = 12; id < 24; id++) {
      const e = document.getElementById((id + 1).toString());
      if (e === null) continue;

      e.innerText = messages[id];
    }
  }

  function displayTimer(): void {
    const countdown = document.getElementById('countdown');
    if (countdown === null) return;

    countdown.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
    setInterval(function () {
      countdown.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Chicago' });
    }, 1000);
  }

  populateEmotes();
  populateCards();
  displayTimer();
})();
