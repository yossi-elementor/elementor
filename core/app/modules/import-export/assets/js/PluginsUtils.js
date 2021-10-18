import React, { useEffect, useState } from 'react';
import useAjax from "../../../../assets/js/hooks/use-ajax";

export const usePlugins = () => {
	const [ installedPlugins, setInstalledPlugins ] = useState( [] );
	const [ activePlugins, setActivePlugins ] = useState( [] );
	const { ajaxState, setAjax } = useAjax();

	useEffect( () => {
		const url = '/wp-json/wp/v2/plugins';

		fetch( url, {
			headers: {
				'X-WP-Nonce': wpApiSettings.nonce
			},
			method: 'get',
		} ).then( ( response ) => {
			response.json().then( plugins => {
				setInstalledPlugins( plugins );
				setActivePlugins( plugins.filter( plugin => plugin.status === 'active') );
			} );
		} ).catch( ( error ) => {
			console.log( error );
		} );

	}, [] );

	return { installedPlugins, activePlugins };
}

export const usePluginSelection = ( context ) => {

	const [ selectedPlugins, setSelectedPlugins ] = useState( { plugins: [] } )

	useEffect( () => {

		setSelectedPlugins( {
			plugins: context.data.includedPlugins,

			addRemovePlugin: function ( plugin ) {
				const actionType = this.contains( plugin ) ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
				context.dispatch( { type: actionType, payload: plugin } );
			},

			addRemoveAllPlugins: function ( pluginsArray ) {
				const isAllSelected = this.plugins.length === pluginsArray.length
				pluginsArray.forEach( ( plugin ) => {
					const actionType = isAllSelected ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
					context.dispatch( { type: actionType, payload: plugin } );
				} )
			},

			contains: function ( plugin ) {
				return this.plugins && this.plugins.find( item => item.slug === plugin.slug ) !== undefined
			}
		} );

	}, [ context.data.includedPlugins ] );

	console.log(selectedPlugins.plugins)
	return selectedPlugins
}
