import gql from 'graphql-tag';

export const FILL_AUTHOR_LIST = gql`
	mutation FillAuthorList ($input: [Author]) {
		fillAuthorList(input: $input) @client
	}
`;

export const SET_IUSTATE_MODAL_OPEN = gql`
	mutation setModalOpen($input: Boolean!) {
		setIUStateModalOpen(input: $input) @client
	}

`;