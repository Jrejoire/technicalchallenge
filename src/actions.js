import { CHANGE_SEARCH_FIELD } from './constants.js';
import { TOKEN_DATA } from './constants.js';
import { DATE } from './constants.js';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD,
	payload: text
})

export const setToken = (token) => ({
	type: TOKEN_DATA,
	payload: token
})

export const setDate = (date) => ({
	type: DATE,
	payload: date
})