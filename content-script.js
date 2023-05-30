const navBarEl = document.querySelector('nav.navbar');
console.log(navBarEl);
const buttonEl = document.createElement('button');
buttonEl.classList.add('btn', 'btn-primary', 'btn-sm');
buttonEl.style.margin = '10px';
buttonEl.style.float = 'right';
buttonEl.innerText = 'Export ICS';
buttonEl.addEventListener('click', (e) => {
    e.preventDefault();
    downLoadData();
});
navBarEl.appendChild(buttonEl);