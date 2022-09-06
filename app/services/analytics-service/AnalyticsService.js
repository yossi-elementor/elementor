export default class AnalyticsService {
	constructor( agent ) {
		console.log( 'Hi analyticsService.' );
		agent.track( 'name', { a: 123 } );
	}
}
