/** @namespace modules/Format */

import Numeral from 'numeral';
import Moment from 'moment';

var Format = {

	/**
	 * @memberof modules/Format
	 * @param {number} amount Integer representing currency
	 */
	currency: function (amount) {
		return Numeral(amount/100).format('$0,0.00');
	},

	/**
	 * @memberof modules/Format
	 * @param {number} timestamp Integer representing timestamp
	 */
	time: function (timestamp) {
		return Moment(timestamp*1000).fromNow();
	},
};

export default Format;
