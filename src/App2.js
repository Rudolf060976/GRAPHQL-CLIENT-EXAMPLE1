import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery, useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';

import * as localQueries from './local-state/queries';
import * as localMutations from './local-state/mutations';


function App() {

	const { data: { iuState } } = useQuery(localQueries.GET_IU_STATE);  // ACCESO RÁPIDO AL LOCAL STATE DEL CACHÉ

	const { data: { authorState } } = useQuery(localQueries.GET_AUTHOR_STATE); // ACCESO RÁPIDO AL STATE DEL CACHÉ

	const [setModalOpen] = useMutation(localMutations.SET_IUSTATE_MODAL_OPEN);

	
	return (
		<div>
			<p>MESSAGE: { iuState.message }</p>
			<p>ERRORMESSAGE: { iuState.errorMessage }</p>
			<p>MODAL OPEN: { iuState.modalOpen ? 'SI' : 'NO' }</p>
			<select onChange={(e) => setModalOpen({ variables: { input: e.target.value === 'true' ? true : false } })} defaultValue="false">
				<option value="true">true</option>
				<option value="false">false</option>
			</select>
			
		</div>
	);

}


export default App;