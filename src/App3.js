import React from 'react';
import {useMutation, useQuery, useLazyQuery} from '@apollo/react-hooks';

import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

function App3() {

	const fileInput = React.createRef();

	const [sendFile, { loading, error, data }] = useMutation(mutations.UPLOAD_AUTHOR_IMAGE);

	const [getFiles, { data: imagesData }] = useLazyQuery(queries.GET_AUTHOR_IMAGES); 
	
	function fromBufferToURL(buffer) {

		return URL.createObjectURL(new Blob([Buffer.from(buffer)]));
		
	}


	function handleFiles() {
				
		sendFile({
			variables: {
				authorId: '5e3ada600c9b072da4453d0e',
				file: fileInput.current.files[0]
			}
		});

	}

	const fileData = datos => (
		<div>
			<p>{datos.filename}</p>
			<p>{datos.mimetype}</p>
			<p>{datos.encoding}</p>
		</div>
	);

	function handleGetFiles() {

		getFiles({
			variables: {
				authorId: '5e3ada600c9b072da4453d0e'
			}
		})

	}

	
	return (
		<div>
			<form>
				<input type="file" ref={fileInput} />
				<button type="button" onClick={handleFiles}>Enviar</button>
			</form>
			{	loading ? <p>Loading ....</p> : null }
			{ data ? fileData(data) : null }
			<div>
				<button type="button" onClick={handleGetFiles}>Get Images</button>
				{
					imagesData ? <p>{ imagesData.getAuthorImages }</p> : null
				}
			</div>
		</div>
	)
}

export default App3;
