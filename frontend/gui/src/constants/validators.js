const validators = {
	mobileRegEx: /^\+?[0-9]{7,12}$/,
	emailRegEx: /^\w+[+.\w-]*@([\w-]+.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i,
	numberRegEx: /^-?[0-9]+$/,
	positiveNumberRegEx: /^[0-9]+$/,
};


export default validators;