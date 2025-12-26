const container = document.getElementById('petals-container');

function createPetal() {
  const petal = document.createElement('span');
  petal.classList.add('petal');

  petal.style.left = Math.random() * window.innerWidth + 'px';
  petal.style.animationDuration = 6 + Math.random() * 6 + 's';
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;

  container.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 12000);
}

setInterval(createPetal, 400);
