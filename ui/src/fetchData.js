import { updateComicUI } from './updateUI';
import { saveComicToLocalStorage, getComicFromCache } from './localStorage';

const baseUrl = 'http://localhost:3000/comics'

export async function fetchComic(comicId, isRandom = false, isFirst = false, isLatest = false) {
    
    if (comicId && !isRandom && !isFirst && !isLatest) {
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
        } else if (comicId) {
            url += `/${comicId}`;
        }

        const comicAPIResponse = await fetch(url);

        if (!comicAPIResponse.ok) {
            throw new Error(`HTTP error! status: ${comicAPIResponse.statusCode}\n message: ${comicAPIResponse.message}\n error: ${comicAPIResponse.error}\n code: ${comicAPIResponse.code}`);
        }

        const comicData = await comicAPIResponse.json();

        saveComicToLocalStorage(comicData);

        updateComicUI(comicData);

    } catch (error) {
        console.error('Error fetching comic data:', error);
    }
}