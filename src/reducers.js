import {
	CHANGE_SEARCH_FIELD
} from './constants.js';
import {
	TOKEN_DATA
} from './constants.js';
import {
	DATE
} from './constants.js';

const initialStateSearch = {
	searchField: ''
}

export const searchTokens = (state = initialStateSearch, action = {}) => {
	switch (action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, {
				searchField: action.payload
			});
		default:
			return state;
	}
}

const initialStateToken = {
	tokenData: [{
		key: '1',
		tokenName: 'TTism',
		tokenTicker: 'TTT',
		totalSupply: 100000,
		creationDate: '17 Mai 2019',
		issuerName: 'Taurus Group SA',
		template: 'ERC20'
	}]
}

export const getTokenData = (state = initialStateToken, action = {}) => {
	switch (action.type) {
		case TOKEN_DATA:
			return { ...state,
				tokenData: [...state.tokenData, action.payload]
			};
		default:
			return state;
	}
}

const initialStateDate = {
	date: ''
}

export const getDate = (state = initialStateDate, action = {}) => {
	switch (action.type) {
		case DATE:
			return Object.assign({}, state, {
				date: action.payload
			});
		default:
			return state;
	}
}