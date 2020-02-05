

const initialState = {
	lastAuthorAdded: 'There is no Author Yet',
	lastBookName: '',
	iuState: {
		__typename: 'IuState',
		modalOpen: false,
		message: 'Hello from Modal Open!!',
		errorMessage: 'Hubo un Error en la Aplicación!'
	},
	authorState: {
		__typename: 'AuthorState',
		authorsList: [],
		lastAuthorAdded: 'Ninguno'
	}	
};

export default initialState;
