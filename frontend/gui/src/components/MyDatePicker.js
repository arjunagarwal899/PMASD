import React from 'react';

import { DatePicker } from "antd";
import misc from "constants/misc";


const MyDatePicker = React.forwardRef((props, ref) => {
	return (
		<DatePicker ref={ref}
		            format={misc.dateFormats}
		            {...props}
		/>
	);
});

export default MyDatePicker;
