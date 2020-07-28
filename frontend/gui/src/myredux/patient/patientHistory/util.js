import { isEqual } from "util/comparison";


const deleteLoading = (oldLoading, loadingData) => {
	let newLoading = [...oldLoading];
	let index = null;
	
	for (let counter = 0; counter < newLoading.length; counter++) {
		if (isEqual(newLoading[counter], loadingData)) {
			index = counter;
			break;
		}
	}
	
	newLoading.splice(index, 1);
	return newLoading;
};


export { deleteLoading };