const initialState = {
	mobileRegEx: /^\+?[0-9]{7,12}$/,
	emailRegEx: /^\w+[+.\w-]*@([\w-]+.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
	// emailRegEx: /^\w+$/
};


const validatorsReducer = (state = initialState) => {
	return state;
};


export default validatorsReducer;