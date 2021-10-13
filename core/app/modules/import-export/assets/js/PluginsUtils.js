import React, { useEffect, useState } from 'react';

export const usePluginSelection = (context) => {

	const [selectedPlugins, setSelectedPlugins] = useState( { plugins: [] })

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
				})
			},

			contains: function ( plugin ) {
				return this.plugins && this.plugins.find( item => item.Slug === plugin.Slug ) !== undefined
			}
		} );

	}, [ context.data.includedPlugins ] );

	return selectedPlugins
}
