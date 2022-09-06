import BaseAnalyticsAgent from "./BaseAnalyticsAgent";

export default class ConsoleAnalyticsAgent extends BaseAnalyticsAgent {

	track( name, data ) {
		console.log( 'Event: ', name, data );
	}
}
