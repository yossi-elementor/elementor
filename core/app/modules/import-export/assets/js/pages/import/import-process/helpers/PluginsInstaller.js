import useAjax from 'elementor-app/hooks/use-ajax';

export const usePluginHelper = ( installNonce ) => {
	const { ajaxState, setAjax } = useAjax();

	return {
		helper: {
			install: function ( slug ) {
				setAjax( {
					data: {
						slug: slug,
						action: 'install-plugin',
						_ajax_nonce: installNonce,
					},
					url: 'http://localhost:8888/wp-admin/admin-ajax.php',
				} );
			}
		},
		pluginHelperState: ajaxState
	}

}

export default class PluginsInstaller {
	constructor( installedPlugins, activePlugins ) {
		this.installedPlugins = installedPlugins;
		this.activePlugins = activePlugins;
	}

	getPluginsStatus = ( plugin ) => {
		const foundInstalled = this.installedPlugins.find( ( item ) => item.Slug === plugin.Slug );
		const foundActive = this.activePlugins.find( ( item ) => item.Slug === plugin.Slug );

		let status;
		if ( foundInstalled && foundActive ) {
			status = 'Active';
		} else if ( foundInstalled ) {
			status = 'Inactive';
		} else {
			status = 'Not Installed';
		}
		return status;
	};

	install = async ( pluginSlug ) => {
		const status = this.getPluginsStatus( pluginSlug );
		if ( status === 'Not Installed' ) {
			console.log( 'Installing ', pluginSlug )
		} else if ( status === 'Inactive' ) {
			console.log( 'Inactive :(' )
		} else {
			console.log( 'Already installed' )
		}
	};
}

// export const install = async () => {
// 	selectedPlugins.forEach( ( slug ) => {
// 		if ( getPluginsStatus( slug ) === 'Not Installed' ) {
// 			installPlugin( slug );
// 		} else if ( getPluginsStatus( slug ) === 'Inactive' ) {
// 			//activatePlugin( slug );
// 			console.log( 'Inactive', slug );
// 		} else {
// 			console.log( 'Already installed', slug );
// 		}
// 	} );
// };
//
// export const activatePlugin = async ( slug ) => {
// 	console.log( 'Activating Plugin', slug );
// 	const installNonce = elementorAppConfig[ 'import-export' ].pluginsActivationNonce;
// 	const formData = new FormData();
// 	formData.append( 'slug', slug );
// 	formData.append( 'action', 'activate' );
// 	formData.append( '_ajax_nonce', installNonce );
// 	const url = 'http://localhost:8888/wp-admin/admin-ajax.php';
// 	fetch( url, {
// 		body: formData,
// 		method: 'post',
// 	} ).then( ( response ) => {
// 		console.log( 'Activated', slug, response );
// 	} ).catch( ( error ) => {
// 		console.log( 'Activation error', slug, error );
// 	} );
// };
//
export const installPlugin = async ( slug ) => {
	console.log( 'Installing Plugin', slug );
	const installNonce = elementorAppConfig[ 'import-export' ].pluginsInstallNonce;
	const formData = new FormData();
	formData.append( 'slug', slug );
	formData.append( 'action', 'install-plugin' );
	formData.append( '_ajax_nonce', installNonce );
	const url = 'http://localhost:8888/wp-admin/admin-ajax.php';
	fetch( url, {
		body: formData,
		method: 'post',
	} ).then( ( response ) => {
		console.log( 'Installed', slug, response );
	} ).catch( ( error ) => {
		console.log( 'Installing error', slug, error );
	} );
};
