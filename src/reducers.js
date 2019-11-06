import { CHANGE_SEARCH_FIELD } from './constants.js';
import { TOKEN_DATA } from './constants.js';
import { DATE } from './constants.js';

const initialState = {
	searchField:'',
	tokenData: {
	    key: '1',
	    tokenName: 'TTism',
	    tokenTicker: 'TTT',
	    totalSupply: 100000,
	    creationDate: '17 Mai 2019',
	    issuerName: 'Taurus Group SA',
	    template: 'ERC20'
	},
	date: ''
}

export const searchTokens = (state=initialState, action={}) => {
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			return Object.assign({}, state, { searchField: action.payload });
		default:
			return state;
	}
}

export const tokenData = (state=initialState, action={}) => {
	switch(action.type) {
		case TOKEN_DATA:
			return Object.assign({}, state, {tokenData: action.payload})
	}
}

export const getDate = (state=initialState, action={}) => {
	switch(action.type) {
		case DATE:
			return Object.assign({}, state, {date: action.payload})
	}
}