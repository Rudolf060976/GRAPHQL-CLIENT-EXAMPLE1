import gql from 'graphql-tag';

export const GET_IU_STATE = gql`
query GetIuState {
	iuState @client {
		modalOpen
		message
		errorMessage
	}
}
`;

export const GET_AUTHOR_STATE = gql`
query GetAuthorState {
	authorState @client {
		lastAuthorAdded
		authorsList
	}
}

`;



