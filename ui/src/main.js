import './styles/main.scss';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { fetchComic } from './fetchData';

fetchComic(null, true, false, false);