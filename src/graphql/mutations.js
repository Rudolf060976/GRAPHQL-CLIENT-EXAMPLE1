import gql from 'graphql-tag';

export const UPLOAD_AUTHOR_IMAGE = gql`

	mutation UploadAuthorImage($authorId: ID!, $file: Upload!) {
		uploadAuthorImage(authorId: $authorId, file: $file) {
			filename
			mimetype
			encoding
		}
	}

`;