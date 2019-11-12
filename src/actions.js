import { CHANGE_SEARCH_FIELD, TOKEN_DATA, DATE, TOKEN_UPDATE } from './constants.js';

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

export const updateToken = (data) => ({
	type: TOKEN_UPDATE,
	payload: data
})