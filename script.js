const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

const pickup = document.querySelector('#pickup-date');
const dropoff = document.querySelector('#return-date');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dateValue = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
pickup.min = dateValue(today);
dropoff.min = dateValue(tomorrow);
pickup.value = dateValue(today);
dropoff.value = dateValue(tomorrow);

pickup.addEventListener('change', () => {
  const minReturn = new Date(`${pickup.value}T00:00:00`);
  minReturn.setDate(minReturn.getDate() + 1);
  dropoff.min = dateValue(minReturn);
  if (dropoff.value <= pickup.value) dropoff.value = dateValue(minReturn);
});

document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const city = document.querySelector('#city').value;
  document.querySelector('#rentals').scrollIntoView({ behavior: 'smooth' });
  showToast(`Showing popular rides for ${city} — pick your car below.`);
});

document.querySelectorAll('.category').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.category').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.car-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.type !== filter;
    });
  });
});

document.querySelectorAll('.favorite').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('saved');
    button.textContent = button.classList.contains('saved') ? '♥' : '♡';
    showToast(button.classList.contains('saved') ? 'Saved to your favourites.' : 'Removed from your favourites.');
  });
});

document.querySelectorAll('.book-car').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#city').focus();
    document.querySelector('#booking-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast(`${button.dataset.car} selected — choose your dates to get started.`);
  });
});

const menuButton = document.querySelector('#menu-button');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const loginModal = document.querySelector('#login-modal');
document.querySelector('#login-button').addEventListener('click', () => loginModal.showModal());
document.querySelector('.modal-close').addEventListener('click', () => loginModal.close());
loginModal.addEventListener('click', event => {
  if (event.target === loginModal) loginModal.close();
});
