import * as API from './src/engineApi';

for ( const key in API ) {
	window[ key ] = API[ key ];
}

export {
	API
};
