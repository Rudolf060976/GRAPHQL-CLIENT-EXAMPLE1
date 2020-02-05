import gql from 'graphql-tag';

const schema = gql`

	extend type Query {
		lastAuthorAdded: String		
		lastBookName: String
		iuState: IuState
		authorState: AuthorState		
	}

	extend type Mutation {
		addAuthorToList(id: ID!): Boolean!
		removeAuthorFromList(id: ID!): Boolean!
		fillAuthorList(input: [Author!]): Boolean!
		setIUStateModalOpen(input: Boolean!): Boolean!
	}

	extend type IuState {
		modalOpen: Boolean!
		message: String!
		errorMessage: String!
	}

	extend type AuthorState {
		authorsList: [Author]
		lastAuthorAdded: String
	}

	
	
`;


export default schema;