const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; //24 hours

export function saveComicToLocalStorage(comicData) {
    if (!comicData) return;
    
    const cacheEntry = {
        data: comicData,
        timestamp: Date.now() 
    };

    localStorage.setItem(`comic_${comicData.comic.index}`, JSON.stringify(cacheEntry));
}

export function getComicFromCache(comicId) {
    if (!comicId) return null;

    const cacheEntryRaw = localStorage.getItem(`comic_${comicId}`);
    if (!cacheEntryRaw) return null;
    
    const cacheEntry = JSON.parse(cacheEntryRaw);

    if (Date.now() - cacheEntry.timestamp > CACHE_EXPIRATION_MS) {
        console.log('Cache expired for comic with id=', comicId);
        localStorage.removeItem(`comic_${comicId}`);
        return null;
    }

    return cacheEntry.data;
}