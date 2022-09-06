export default class BaseAnalyticsAgent {
	track() {
		throw new Error( 'track() not implemented.' );
	}
}
