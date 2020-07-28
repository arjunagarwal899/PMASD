import _ from 'lodash';

const deleteLoading = (oldLoading, loadingData) => {
	let newLoading = [...oldLoading];
	let index = null;
	
	for (let counter = 0; counter < newLoading.length; counter++) {
		if (_.isEqual(newLoading[counter], loadingData)) {
			index = counter;
			break;
		}
	}
	
	newLoading.splice(index, 1);
	return newLoading;
};


export { deleteLoading };