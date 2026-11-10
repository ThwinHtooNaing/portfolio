const buttons = document.querySelectorAll('.choices button');
const preview = document.querySelector('#preview');
const full = document.querySelector('#full');
for (const button of buttons) {
  button.addEventListener('click', () => {
    const path = 'assets/' + button.dataset.file + '.webp';
    preview.src = path;
    preview.alt = button.dataset.alt;
    full.href = path;
    const index = Array.from(buttons).indexOf(button) + 1;
    document.querySelector('.gallery-caption').textContent = index + ' / ' + buttons.length + ' · ' + button.dataset.alt;
    for (const option of buttons) option.setAttribute('aria-pressed', String(option === button));
  });
}

const theme = document.querySelector('#theme');
function reflectTheme() {
  const light = document.documentElement.dataset.theme === 'light';
  theme.textContent = light ? '☾ Dark' : '☼ Light';
  theme.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  document.querySelector('meta[name="theme-color"]').content = light ? '#fafafa' : '#101010';
}
reflectTheme();
theme.onclick = () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('portfolio-theme', next); } catch {}
  reflectTheme();
};
const cards = document.querySelectorAll('.project-card');
for (const card of cards) {
  card.querySelector('.feature-toggle').onclick = () => {
    for (const item of cards) {
      const selected = item === card;
      item.classList.toggle('selected', selected);
      const toggle = item.querySelector('.feature-toggle');
      toggle.setAttribute('aria-pressed', String(selected));
      toggle.textContent = selected ? 'Featured project' : 'Feature project';
    }
    card.scrollIntoView({block:'nearest'});
  };
}
document.querySelector('#message').onsubmit = async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const text = form.elements.body.value.trim() + '\n\n' + form.elements.sender.value.trim();
  try {
    await navigator.clipboard.writeText(text);
    form.querySelector('output').textContent = 'Copied. Open LinkedIn to send your message.';
  } catch {
    form.elements.body.select();
    form.querySelector('output').textContent = 'Select and copy your message, then open LinkedIn.';
  }
};
