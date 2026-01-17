import { updateComicUI } from './updateUI';
import { saveComicToLocalStorage, getComicFromCache } from './localStorage';
import { showToast } from './toast';

const baseUrl = 'http://localhost:3000/comics'

export async function fetchComic(comicId, isRandom = false, isFirst = false, isLatest = false) {
    
    if (comicId !== null && comicId !== undefined && !isRandom && !isFirst && !isLatest) {
        const cachedData = getComicFromCache(comicId);
        if (cachedData) {
            console.log('Serving from cache comic with id=', comicId,' and its data', cachedData);
            updateComicUI(cachedData);
            return;
        }
    }
    
    try{

        let url = baseUrl;

        if (isRandom) {
            url += '?position=random';
        } else if (isFirst) {
            url += '?position=first';
        } else if (isLatest) {
            url += '?position=latest';
        } else if (comicId !== null && comicId !== undefined) {
            url += `/${comicId}`;
        }

        const comicAPIResponse = await fetch(url);

        if (!comicAPIResponse.ok) {
            if (comicAPIResponse.status === 404) {
                showToast('Comic not found. Try another one!');
            } else if (comicAPIResponse.status >= 500) {
                showToast('Server error. Please try again later.');
            } else {
                showToast('Something went wrong. Please try again.');
            }
            return;
        }

        const comicData = await comicAPIResponse.json();

        saveComicToLocalStorage(comicData);

        updateComicUI(comicData);

    } catch (error) {
        console.error('Error fetching comic data:', error);
        showToast('Cannot connect to server. Check your connection.');
    }
}