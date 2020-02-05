import gql from 'graphql-tag';

export const GET_AUTHOR_IMAGES = gql`
	query GetAuthorImages($authorId: ID!) {
		getAuthorImages(authorId: $authorId) 
	}
`;

