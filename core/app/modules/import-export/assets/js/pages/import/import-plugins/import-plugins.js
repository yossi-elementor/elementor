import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../../context/context-provider';
import './import-plugins.scss';
import Layout from '../../../templates/layout';
import ImportButton from '../import-content/components/import-button/import-button';
import Button from 'elementor-app/ui/molecules/button';
import WizardFooter from 'elementor-app/organisms/wizard-footer';

export default function ImportPlugins() {
	const context = useContext( Context );
	const navigation = useNavigate();
	const [ importedPlugins, setImportedPlugins ] = useState( null );
	const [ installedPlugins, setInstalledPlugins ] = useState( null );
	const [ activePlugins, setActivePlugins ] = useState( null );
	const [ selectedPlugins, setSelectedPlugins ] = useState( null );
	const getFooter = () => {
		return (
			<WizardFooter separator justify="end">
				<Button
					text={ __( 'Previous', 'elementor' ) }
					variant="contained"
					onClick={ () => context.dispatch( { type: 'SET_FILE', payload: null } ) }
				/>

				<ImportButton/>
			</WizardFooter>
		);
	};
	useEffect( () => {
		if ( context.data.fileResponse.stage1.manifest.plugins ) {
			setImportedPlugins( context.data.fileResponse.stage1.manifest.plugins );
			setInstalledPlugins( elementorAppConfig[ 'import-export' ].installedPlugins );
			setActivePlugins( elementorAppConfig[ 'import-export' ].activePlugins );
		}
	}, [ context.data.fileResponse.stage1.manifest.plugins ] );

	const getPluginsStatus = ( plugin ) => {
		let status;
		if ( installedPlugins.includes( plugin ) && activePlugins.includes( plugin ) ) {
			status = 'active';
		} else if ( installedPlugins.includes( plugin ) ) {
			status = 'installed';
		} else {
			status = 'not installed';
		}
		return status;
	};

	const install = () => {
		pluginsSlugs.forEach( ( plugin ) => {
			if ( ! installedPlugins.includes( plugin ) ) {
				installPlugin( plugin );
			} else {
				console.log( 'Already installed', plugin );
			}
		} );
	};

	useEffect( () => {
		console.log( context.data.includedPlugins );
		setSelectedPlugins( context.data.includedPlugins );
	}, [ context.data.includedPlugins ] );

	const addPlugin = ( slug ) => {
		const actionType = selectedPlugins.includes( slug ) ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
		context.dispatch( { type: actionType, payload: slug } );
	};

	const installPlugin = ( slug ) => {
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

	return (
		<Layout type="import" footer={ getFooter() }>
			<section className="e-app-export-kit">
				<div>
					{ importedPlugins && importedPlugins.map( ( plugin ) => {
						return (
							<div style={ { margin: '1rem', cursor: 'pointer' } }
								 onClick={ () => addPlugin( plugin ) }
								 key={ plugin }>
								{ selectedPlugins.includes( plugin ) ? '-- ' : '++ ' }
								{ plugin } -
								{ getPluginsStatus( plugin ) }</div>
						);
					} ) }
				</div>
			</section>
		</Layout>
	);
}

