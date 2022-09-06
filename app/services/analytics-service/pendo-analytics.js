import BaseAnalyticsAgent from './BaseAnalyticsAgent';

export default class PendoAnalytics extends BaseAnalyticsAgent {
	constructor() {
		super();
		( function( apiKey ) {
			( function( p, e, n, d, o ) {
				var v, w, x, y, z;
				o = p[ d ] = p[ d ] || {};
				o._q = o._q || [];
				v = [ 'initialize', 'identify', 'updateOptions', 'pageLoad', 'track' ];
				for ( w = 0, x = v.length; w < x; ++w ) ( function( m ) {
					o[ m ] = o[ m ] || function () {
						o._q[ m === v[ 0 ] ? 'unshift' : 'push' ]( [ m ].concat( [].slice.call( arguments, 0 ) ) );
					};
				} )( v[ w ] );
				y = e.createElement( n );
				y.async = ! 0;
				y.src = 'https://cdn.eu.pendo.io/agent/static/' + apiKey + '/pendo.js';
				z = e.getElementsByTagName( n )[ 0 ];
				z.parentNode.insertBefore( y, z );
			} )( window, document, 'script', 'pendo' );
			// Call this whenever information about your visitors becomes available
			// Please use Strings, Numbers, or Bools for value types.
			pendo.initialize( this.getPendoInitializationData() );
		} )( '74a60915-6da8-431a-57ec-738d1cae324d' );
	}

	getPendoInitializationData() {
		const initOptions = {};

		// dataLayer get populated by the wp-agent
		const [ { elementorSiteID, wordpressRole } ] = window.dataLayer?.filter( x => x.elementorSiteID ) ?? [{}];
		const { uid } = window.userSettings ?? {};

		if ( uid ) {
			initOptions.visitor = {
				id: uid,
				role: wordpressRole,
			};
		}

		if ( elementorSiteID ) {
			initOptions.account = {
				id: elementorSiteID,
			};
		}

		return initOptions;
	}

	track( name, data ) {
		if ( pendo && pendo.isReady && pendo.isReady() ) {
			return pendo.track( name, data );
		}
		setTimeout( () => {
			this.track( name, data );
		}, 500 );
	}
}


