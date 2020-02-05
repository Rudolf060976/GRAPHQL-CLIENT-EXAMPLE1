import React from 'react';
import {useMutation, useQuery} from '@apollo/react-hooks';

import * as mutations from './graphql/mutations';

function App3() {

	const fileInput = React.createRef();

	const [sendFile, { loading, error, data }] = useMutation(mutations.UPLOAD_AUTHOR_IMAGE);
	
	function handleFiles() {
				
		sendFile({
			variables: {
				authorId: '5e3a0f244f9f6b2fe41b192e',
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

	return (
		<div>
			<form>
				<input type="file" ref={fileInput} />
				<button type="button" onClick={handleFiles}>Enviar</button>
			</form>
			{	loading ? <p>Loading ....</p> : null }
			{ data ? fileData(data) : null }
		</div>
	)
}

export default App3;
