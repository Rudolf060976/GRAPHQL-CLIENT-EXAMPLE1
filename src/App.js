import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'



const ALL_AUTHORS = gql`
	query GetAuthors {
		getAllAuthors {
			edges {
				node {
					id
					name
					born
				}
				cursor
			}
			nodes {
				__typename
				id
				name
				born
			}
			totalCount
			pageInfo {
				endCursor
				hasNextPage
				hasPreviousPage
				startCursor
			}
		}
	}
`;

const ADD_AUTHOR = gql`
	mutation AddAuthor($name: String!, $born: String!) {
		addNewAuthor(name: $name, born: $born) {
			code
			success
			message
			author {
				name
				born
			}
		}

	}
`;

const GET_IU_STATE = gql`
	query GetIuState {
		iuState @client {
			errorMessage
		}
	}
`;

const GET_AUTHOR_STATE = gql`
	query GetAuthorState {
		authorState @client {
			lastAuthorAdded
			authorsList
		}
	}

`;

const FILL_AUTHOR_LIST = gql`
	mutation FillAuthorList ($input: [Author]) {
		fillAuthorList(input: $input) @client
	}
`;


function App() {

	
	const [fillAuthors] = useMutation(FILL_AUTHOR_LIST);

	const [ getAuthors, { loading: queryLoading, error: queryError, data } ] = useLazyQuery(ALL_AUTHORS, { onCompleted: data => {
		
		const { getAllAuthors: { nodes }} = data;

		fillAuthors({ variables: { input: nodes } })

	}});

	const { data: { iuState } } = useQuery(GET_IU_STATE);

	const { data: { authorState } } = useQuery(GET_AUTHOR_STATE);

	const [addAuthor, { loading: mutationLoading, error: mutationError, data: mutationData }] = useMutation(ADD_AUTHOR,{ refetchQueries: ['GetAuthors']}); // PUEDO HACER UN REFETCH DE LAS QUERIES CUYOS NOMBRES ESTÉN EN EL ARRAY


	const [name, setName] = useState('');
	const [born, setBorn] = useState('');

	if (queryLoading) return <p>Loading ...</p>;

	if (queryError) return <p>Error :</p>;

		//console.log(JSON.stringify(data, null, 2));

	const dataOutput = input => {

		return input.getAllAuthors.edges.map(({ node }) => {
				return (
					<div key={node.id}>
				   	<p>{node.id}</p>
				   	<p>{node.name}</p>
					<p>{node.born}</p>
					</div>
				);
		});
		
	};



	const output = (
		<div>
			<form>
				<label htmlFor="name">Name :</label>
				<input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}  />
				<label htmlFor="born">Was Born :</label>
				<input id="born" type="text" value={born} onChange={(e) => setBorn(e.target.value)} />
				<button type="button" onClick={() => getAuthors()}>Ejecutar Fetch!</button>
				
				<button type="button" onClick={() => addAuthor({ variables: { name, born } })}>Añadir Author!</button>
			</form>
				{mutationError ? <div>{JSON.stringify(mutationError, null, 2)}</div> : null }
				{mutationData ? <div>{JSON.stringify(mutationData, null, 2)}</div> : null }
			<div>
				{	data ? dataOutput(data) : <p>AUN NADA....</p>	}
			</div>
			<div>
				<p>{iuState.errorMessage}</p>
			</div>
			<div>
				<p>{authorState.lastAuthorAdded}</p>
			</div>
			<div>
				{authorState.authorsList.length > 0 ? authorState.authorsList.map(author => author.name) : 'LISTA VACÍA'}
			</div>
		</div>
	);



	  return output;
	  

}

export default App;
