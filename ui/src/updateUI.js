import { fetchComic } from "./fetchData";

const comicTitle = document.querySelector('.comic-title');
const comicImage = document.querySelector('.comic-image img');

const firstButtonUpper = document.querySelector('.comic-buttons-upper__first');
const prevButtonUpper = document.querySelector('.comic-buttons-upper__prev');
const randomButtonUpper = document.querySelector('.comic-buttons-upper__random');
const nextButtonUpper = document.querySelector('.comic-buttons-upper__next');
const latestButtonUpper = document.querySelector('.comic-buttons-upper__last');

const firstButtonLower = document.querySelector('.comic-buttons-lower__first');
const prevButtonLower = document.querySelector('.comic-buttons-lower__prev');
const randomButtonLower = document.querySelector('.comic-buttons-lower__random');
const nextButtonLower = document.querySelector('.comic-buttons-lower__next');
const latestButtonLower = document.querySelector('.comic-buttons-lower__last');

let totalComics = 0;
let currentComicId = 0;

export function updateComicUI(comicData) {
    if (!comicData) {
        console.error('No comic data provided to update UI.');
        return;
    }

    const { comic, prev, next, total } = comicData;
    totalComics = total;
    currentComicId = comic.index;
    comicTitle.textContent = `${comic.title}`;
    comicImage.src = comic.imgUrl;
    comicImage.alt = comic.alt;

    prevButtonUpper.classList.toggle('hide-button', prev === null);
    prevButtonLower.classList.toggle('hide-button', prev === null);
    nextButtonUpper.classList.toggle('hide-button', next === null);
    nextButtonLower.classList.toggle('hide-button', next === null);

}

firstButtonLower.addEventListener('click', () => fetchComic(-1, false, true, false));
firstButtonUpper.addEventListener('click', () => fetchComic(-1, false, true, false));

prevButtonLower.addEventListener('click', () => {
    if (currentComicId <= 1) return;
    fetchComic(currentComicId - 1);
});
prevButtonUpper.addEventListener('click', () => {
    if (currentComicId <= 1) return;
    fetchComic(currentComicId - 1);
});

randomButtonLower.addEventListener('click', () => fetchComic(null, true, false, false));
randomButtonUpper.addEventListener('click', () => fetchComic(null, true, false, false));

nextButtonLower.addEventListener('click', () => {
    if (currentComicId >= totalComics) return;
    fetchComic(currentComicId + 1);
});
nextButtonUpper.addEventListener('click', () => {
    if (currentComicId >= totalComics) return;
    fetchComic(currentComicId + 1);
});

latestButtonLower.addEventListener('click', () => fetchComic(-1, false, false, true));
latestButtonUpper.addEventListener('click', () => fetchComic(-1, false, false, true));


const clearCacheButton = document.querySelector('.clear-cache-button');
clearCacheButton.addEventListener('click', () => {
    localStorage.clear();
});