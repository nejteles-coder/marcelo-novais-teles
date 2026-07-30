// Interactions : apparition douce, menu mobile, modales de films et visionneuse de galerie.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Effet de parallaxe léger, désactivé implicitement sur les petits écrans pour le confort.
const parallax = document.querySelector('.parallax img');
window.addEventListener('scroll', () => {
  if (parallax && window.innerWidth > 760) parallax.style.transform = `translateY(${window.scrollY * -.08}px)`;
}, { passive: true });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

// Les fiches restent facilement éditables dans un seul tableau de données.
const films = [
  {
    title: "L'exilé",
    meta: '2017 · DOCU-FICTION · 90 MIN',
    poster: 'affiche-exile.jpg',
    synopsis: 'Marcelo est à Paris depuis un an lorsqu’il reçoit une lettre du Brésil annonçant qu’il est peut-être père d’une petite fille. Vu les circonstances, il n’est pas question de faire un test de paternité. Vingt ans plus tard, Marcelo est toujours en France. Sa vie, il la construit au jour le jour, s’engageant dans celle des autres plutôt que dans la sienne. En attendant, la solitude guette.',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Marcelo Novais Teles, Mathieu Amalric, Olivier Broche',
    videoUrl: 'https://vimeo.com/1118718017',
    password: 'marceloexilé'
  },
  {
    title: '2017 n’aura pas lieu',
    meta: '2017 · COURT MÉTRAGE · 20 MIN',
    poster: 'affiche-2017-naura-pas-lieu.jpg',
    synopsis: 'Marcel, né au Brésil, vit en France depuis 1981. En 2017, il obtient la nationalité française et va voter pour la première fois de sa vie. Poussé par le doute et soucieux de faire le bon choix, il part à la rencontre de ses amis, chez eux, dans les cafés, les parcs, à la recherche d’une opinion politique qui lui convienne.',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Marcelo Novais Teles, Mathieu Amalric, Olivier Broche, Nathalie Kousnetzoff',
    videoUrl: 'https://vimeo.com/642730753?share=copy'
  },
  {
    title: 'La maison où je suis né',
    meta: '1992 / 2005 · DOCUMENTAIRE · 35 MIN',
    poster: 'la-maison-ou-je-suis-ne.png',
    synopsis: 'Jorginho vit à Rio de Janeiro. Sans emploi fixe et sur le point de devenir père, il voyage à Manhuaçu, dans l’État du Minas Gerais, afin de vendre la maison où il est né…',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Jorge Novais'
  },
  {
    title: 'Un petit bol d’air',
    meta: '2007 · COURT MÉTRAGE · 8 MIN',
    poster: 'un-petit-bol-dair.jpg',
    synopsis: 'Thomas et son comparse se réfugient dans une maison de campagne pour préparer un casse. L’arrivée d’une belle blonde mettra le projet en péril.',
    credits: 'Réalisation : Marcelo Novais Teles',
    videoUrl: 'https://vimeo.com/1112036117',
    password: 'Petitbol'
  },
  {
    title: 'L’entre deux',
    meta: '2007 · COURT MÉTRAGE · 10 MIN',
    poster: 'l-entre-deux.png',
    synopsis: 'Laércio vient d’obtenir la nationalité française et va voter pour la première fois. Un compte rendu de la situation politique en France en 2007.',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Laércio Ribas da Cruz, Clara Choveaux'
  },
  {
    title: 'Le Petit Prince de Belleville',
    meta: '2026 · COURT MÉTRAGE · 28 MIN',
    poster: 'le-petit-prince-de-belleville.jpg',
    synopsis: 'Stéphane vit seul avec Lou, sa perruche, qu’il chérit comme un trésor. Développeur informatique, passionné d’échecs et de football, il mène une existence tranquille, partagée entre son travail à domicile et les bars de Belleville, où se produit Gabrielle, une chanteuse dont il est secrètement amoureux.',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Stéphane Varnier, Alain Umhauer, Cécile Bouillot'
  },
  {
    title: 'Bas-Belleville',
    meta: '2024 · COURT MÉTRAGE · 27 MIN',
    poster: 'bas-belleville.jpeg',
    synopsis: 'Jean-Mi a 73 ans, se sait malade, mais il semble avoir choisi de ne pas se soigner. Il continue donc de se rendre quotidiennement dans un bistro de Belleville, « La vie devant soi », où il a ses habitudes. Au fil de ses échanges avec les habitants du quartier, de toutes origines sociales et ethniques, on découvre, au rythme des verres de rouge qu’il savoure, un homme cultivé et drôle, mais aussi mordant et trivial. Ce film est aussi le portrait du dernier quartier populaire de Paris.',
    credits: 'Réalisation : Marcelo Novais Teles<br>Avec : Olivier Saladin, Olivier Broche, Cécile Bouillot, Stéphane Varnier',
    videoUrl: 'https://vimeo.com/1011028942',
    password: 'laviedevantsoi'
  },
  {
    title: 'Jour de deuil',
    meta: '1987 / 2005 · FICTION · 13 MIN',
    poster: 'Jour de deuil.png',
    synopsis: 'Keita, un jeune homme Japonais est en Europe pour étudier les langues. Son père, un riche industriel a décidé qu’il va épouser la fille de son associé, mais la jeune fille se suicide…',
    credits: 'Réalisation : Marcelo Novais Teles',
    videoUrl: 'https://vimeo.com/15901078'
  },
  {
    title: 'Pas de stress à Speluncatu',
    meta: '1987 / 2008 · DOCU-FICTION · 52 MIN',
    poster: 'Speluncato.png',
    synopsis: 'Marcelo va rendre visite à son ami François à Speloncato, en Corse. François est venu pour écrire son premier livre, Marcelo passe son temps à filmer les villageois.',
    credits: 'Réalisation : Marcelo Novais Teles'
  }
];
const filmModal = document.querySelector('.film-modal');
document.querySelectorAll('.film-card').forEach((card) => card.addEventListener('click', () => {
  const film = films[card.dataset.film];
  const videoMarkup = film.videoUrl
    ? `<a class="film-video-link" href="${film.videoUrl}" target="_blank" rel="noopener noreferrer">VOIR LE FILM SUR VIMEO ↗</a>${film.password ? `<span class="film-password">Mot de passe : ${film.password}</span>` : ''}`
    : '<span class="film-video-pending">VIMEO / YOUTUBE — LIEN À VENIR</span>';
  filmModal.querySelector('.modal-content').innerHTML = `<p class="film-meta">${film.meta}</p><h2>${film.title}</h2><div class="film-detail"><img class="modal-poster" src="${film.poster}" alt="Affiche de ${film.title}"><div><h3>Synopsis</h3><p>${film.synopsis}</p><h3>Distribution & crédits</h3><p>${film.credits}</p>${videoMarkup}</div></div>`;
  filmModal.showModal();
}));

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
  const image = item.querySelector('img');
  const target = lightbox.querySelector('img');
  target.src = image.src.replace('w=900', 'w=1800').replace('w=1200', 'w=1800');
  target.alt = image.alt;
  lightbox.showModal();
}));
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.modal-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
});

// Mémorise le choix de lecture dans le navigateur de la visiteuse ou du visiteur.
const themeButton = document.querySelector('.theme-toggle');
if (localStorage.getItem('camille-theme') === 'light') document.body.classList.add('light');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('camille-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
