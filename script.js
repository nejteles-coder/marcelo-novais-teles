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
    credits: [
      { label: 'Production', value: 'FILMS' },
      { label: 'Avec', value: 'Olivier Broche, Mathieu Amalric, Isabelle Ungaro, Laércio Ribas da Cruz, Bertrand Guillou, Lucien Amalric' },
      { label: 'Image', value: 'Jean-Yves Guéril, Katthy Sebbah' },
      { label: 'Son', value: 'Gabriel Rizzo' },
      { label: 'Montage', value: 'Caroline Detournay' },
      { label: 'Mixage', value: 'Matthieu Deniau' },
      { label: 'Étalonnage', value: 'Paulina Pisarek' },
      { label: 'Musique', value: 'Zeca Baleiro' },
      { label: 'Festivals', value: 'FID de Marseille – États Généraux du Film Documentaire (France) · Cinema Vérité (Iran) · Museum of the Moving Image (New York) · Festival Internacional (Cuba)' }
    ],
    videoUrl: 'https://vimeo.com/1118718017',
    password: 'marceloexilé'
  },
  {
    title: '2017 n’aura pas lieu',
    meta: '2017 · COURT MÉTRAGE · 20 MIN',
    poster: 'affiche-2017-naura-pas-lieu.jpg',
    synopsis: 'Marcel est né au Brésil et vit en France depuis 1981. En 2017 il obtient la nationalité française et va voter pour la première fois de sa vie. Poussé par le doute et soucieux de faire le bon choix, il part à la rencontre de ses amis, chez eux, dans les cafés, les parcs, à la recherche d’une opinion politique qui lui convienne.',
    credits: [
      { label: 'Production', value: 'N4 Films, Sur 1 Fil' },
      { label: 'Avec', value: 'Marcelo Novais Teles, Mathieu Amalric, Olivier Broche, Nathalie Kousnetzoff, Piotr Golemberski, Alain Cianci, Serge Mariani' },
      { label: 'Image', value: 'Georges de Genevraye, Etienne Semelet' },
      { label: 'Son', value: 'Gabriel Rizzo' },
      { label: 'Montage', value: 'Marcelo Novais Teles' },
      { label: 'Mixage', value: 'Jules Jasko' },
      { label: 'Étalonnage', value: 'Reda (Indi Flow)' },
      { label: 'Musique', value: 'Staircase Paradox – Iara Kelly' }
    ],
    videoUrl: 'https://vimeo.com/642730753?share=copy'
  },
  {
    title: 'La maison où je suis né',
    meta: '1992 / 2005 · DOCUMENTAIRE · 35 MIN',
    poster: 'la-maison-ou-je-suis-ne.png',
    synopsis: 'Jorginho (petit Jorge) habite à Rio de Janeiro. Sans emploi fixe et au point d’avoir un premier enfant, il décide de partir à Manhuaçú, dans l’État du Minas-Gerais, afin de vendre la maison où il est né…',
    credits: [
      { label: 'Production', value: 'QSL' },
      { label: 'Avec', value: 'Jorge Novais, Clara Chevaux, Demétrius Damaceno, Mozart Mesquita, Ricardo de Oliveira' },
      { label: 'Image', value: 'Marcelo Novais Teles' },
      { label: 'Montage', value: 'Marcelo Novais Teles' },
      { label: 'Musique', value: 'José Maurício Teles, Belkacem Drif, Orquestra do Fubá' },
      { label: 'Étalonnage', value: 'Emmanuel Blanchard' },
      { label: 'Mixage', value: 'Rémi Stengel' }
    ]
  },
  {
    title: 'Un petit bol d’air',
    meta: '2007 · COURT MÉTRAGE · 8 MIN',
    poster: 'un-petit-bol-dair.jpg',
    synopsis: 'Thomas et son comparse se réfugient dans une maison de campagne pour préparer un casse. L’arrivée d’une belle blonde mettra le projet en péril.',
    credits: [
      { label: 'Avec', value: 'Mathieu Amalric, Marcelo Novais Teles, Emily Barnett' },
      { label: 'Image / Son / Montage', value: 'Marcelo Novais Teles' },
      { label: 'Mixage', value: 'Rémi Stengel' },
      { label: 'Musique', value: 'Sidi Ag Issa (Groupe Tiweti)' }
    ],
    videoUrl: 'https://vimeo.com/1112036117',
    password: 'Petitbol'
  },
  {
    title: 'L’Entre deux',
    meta: '2007 · COURT MÉTRAGE · 10 MIN',
    poster: 'l-entre-deux.png',
    synopsis: 'Laércio vient d’obtenir la nationalité française et va voter pour la première fois. Un compte rendu de la situation politique en France en 2007.',
    credits: [
      { label: 'Production', value: 'QSL' },
      { label: 'Avec', value: 'Laércio Ribas da Cruz, Clara Choveaux, Marcelo Novais Teles' },
      { label: 'Image', value: 'Marcelo Novais Teles' },
      { label: 'Montage', value: 'Marcelo Novais Teles et Arco-iris' },
      { label: 'Son', value: 'Hung-chun Chen' },
      { label: 'Mixage', value: 'Rémi Stengel' },
      { label: 'Musique', value: 'Rémi Stengel – Roda do Cavaco' }
    ]
  },
  {
    title: 'Le Petit Prince de Belleville',
    meta: '2026 · COURT MÉTRAGE · 28 MIN',
    poster: 'le-petit-prince-de-belleville.jpg',
    synopsis: 'Stéphane vit seul avec Lou, sa perruche, qu’il chérit comme un trésor. Développeur informatique, passionné d’échecs et de football, il mène une existence tranquille, partagée entre son travail à domicile et les bars de Belleville, où se produit Gabrielle, une chanteuse dont il est secrètement amoureux.',
    credits: [
      { label: 'Production', value: 'N4 Films' },
      { label: 'Avec', value: 'Stéphane Varnier, Alain Umhauer, Cécile Bouillot' },
      { label: 'Scénario & Réalisation', value: 'Marcelo Novais Teles' },
      { label: 'Image', value: 'Georges de Genevraye, Etienne Semelet' },
      { label: 'Montage', value: 'Etienne Semelet, Marcelo Novais Teles' },
      { label: 'Son', value: 'Julien Chaumat, Nina Gazulet, Charlie Udave, Maël Desreumaux' },
      { label: 'Mixage', value: 'Nina Gazulet' },
      { label: 'Musique', value: 'Gabrielle Sandman, Rémi Stengel' }
    ]
  },
  {
    title: 'Bas-Belleville',
    meta: '2024 · COURT MÉTRAGE · 27 MIN',
    poster: 'bas-belleville.jpeg',
    synopsis: 'Jean-Mi a 73 ans, se sait malade, mais il semble avoir choisi de ne pas se soigner. Il continue donc de se rendre quotidiennement dans un bistro de Belleville, « La vie devant soi », où il a ses habitudes. Au fil de ses échanges avec les habitants du quartier, de toutes origines sociales et ethniques, on découvre, au rythme des verres de rouge qu’il savoure, un homme cultivé et drôle, mais aussi mordant et trivial. Ce film est aussi le portrait du dernier quartier populaire de Paris.',
    credits: [
      { label: 'Production', value: 'N4 Films' },
      { label: 'Avec', value: 'Olivier Saladin, Toussaint Burelli, Cécile Bouillot, Olivier Broche, Stéphane Varnier, Léa Darmon Raphoz, Thibaut Jouy' },
      { label: 'Image', value: 'Georges de Genevraye' },
      { label: 'Son', value: 'Thibaut Jazz, Simon Krzyzanowski' },
      { label: 'Montage', value: 'Etienne Semelet, Marcelo Novais Teles' },
      { label: 'Mixage', value: 'Philippe Grive (Studio Orlando)' },
      { label: 'Étalonnage', value: 'Éric Salleron (Avidia)' },
      { label: 'Musique', value: 'Belkacem Drif' }
    ],
    videoUrl: 'https://vimeo.com/1011028942',
    password: 'laviedevantsoi'
  },
  {
    title: 'Jour de deuil',
    meta: '1987 / 2005 · FICTION · 13 MIN',
    poster: 'Jour de deuil.png',
    synopsis: 'Keita, un jeune homme Japonais est en Europe pour étudier les langues. Son père, un riche industriel a décidé qu’il va épouser la fille de son associé, mais la jeune fille se suicide…',
    credits: [
      { label: 'Avec', value: 'Keita Sato' },
      { label: 'Image / Son / Montage', value: 'Marcelo Novais Teles' },
      { label: 'Mixage', value: 'Su Kahn Mekebe (Léo)' },
      { label: 'Étalonnage', value: 'Bali Mikado' },
      { label: 'Musique', value: 'Yoshito Kiyono' }
    ],
    videoUrl: 'https://vimeo.com/15901078'
  },
  {
    title: 'Pas de stress à Speluncatu',
    meta: '1987 / 2008 · DOCU-FICTION · 52 MIN',
    poster: 'Speluncato.png',
    synopsis: 'Marcelo va rendre visite à son ami François à Speloncato, en Corse. François est venu pour écrire son premier livre, Marcelo passe son temps à filmer les villageois.',
    credits: [
      { label: 'Production', value: 'QSL' },
      { label: 'Avec', value: 'François Magal, Marion Gervais, Ambrosini' },
      { label: 'Image', value: 'Marcelo Novais Teles' },
      { label: 'Son', value: 'François Magal' },
      { label: 'Montage', value: 'Marcelo Novais Teles, Aurore Moureu' },
      { label: 'Mixage', value: 'Rémi Stengel' },
      { label: 'Musique', value: 'Caetano Veloso' }
    ]
  },
  {
    title: 'Scène de la vie conjugale',
    meta: '2021 · COURT MÉTRAGE · 2 MIN 40',
    poster: 'scene-de-la-vie-conjugale.jpg',
    synopsis: 'Un vieux couple de cinéphiles se rend au cinéma Saint-André des Arts pour une rétrospective Ingmar Bergman.',
    credits: [
      { label: 'Production', value: 'N4 Films' },
      { label: 'Avec', value: 'Olivier Broche, Cécile Bouillot, Raphael Marcon' },
      { label: 'Image', value: 'Georges de Genevraye, Gabriel Rizzo, Simrangit Singh' },
      { label: 'Montage', value: 'Etienne Semelet' },
      { label: 'Mixage', value: 'Rémi Stengel' }
    ],
    videoUrl: 'https://vimeo.com/797261332'
  }
];
const filmModal = document.querySelector('.film-modal');
document.querySelectorAll('.film-card').forEach((card) => card.addEventListener('click', () => {
  const film = films[card.dataset.film];
  const creditsMarkup = film.credits.map((credit) => `<p><strong>${credit.label}</strong> : ${credit.value}</p>`).join('');
  const videoMarkup = film.videoUrl
    ? `<a class="film-video-link" href="${film.videoUrl}" target="_blank" rel="noopener noreferrer">VOIR LE FILM SUR VIMEO ↗</a>${film.password ? `<span class="film-password">Mot de passe : ${film.password}</span>` : ''}`
    : '<span class="film-video-pending">VIMEO / YOUTUBE — LIEN À VENIR</span>';
  filmModal.querySelector('.modal-content').innerHTML = `<p class="film-meta">${film.meta}</p><h2>${film.title}</h2><div class="film-detail"><img class="modal-poster" src="${film.poster}" alt="Affiche de ${film.title}"><div><h3>Synopsis</h3><p>${film.synopsis}</p><h3>Distribution & crédits</h3><div class="film-credits">${creditsMarkup}</div>${videoMarkup}</div></div>`;
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
