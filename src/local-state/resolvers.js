
import gql from 'graphql-tag';

import * as localQueries from './queries';



const resolvers = {
	Query: {

	},
	Mutation: {
		fillAuthorList: (parent, { input }, { cache }) => {
			
			cache.writeQuery({ query: localQueries.GET_AUTHOR_STATE, data: { authorState: { __typename:'AuthorState', authorsList: input }} });


			return true;
		},
		setIUStateModalOpen: (parent, { input }, { cache }) => {

			const { iuState } = cache.readQuery({ query: localQueries.GET_IU_STATE });

			
			cache.writeQuery({
				query: localQueries.GET_IU_STATE,
				data: { iuState: {
					...iuState,
					modalOpen: input
				}}			
			});

			return null;
		}
	}
};

export default resolvers;
