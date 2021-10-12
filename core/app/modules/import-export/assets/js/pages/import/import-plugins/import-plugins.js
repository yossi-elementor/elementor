import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../../context/context-provider';
import './import-plugins.scss';
import Layout from '../../../templates/layout';
import ImportButton from '../import-content/components/import-button/import-button';
import Button from 'elementor-app/ui/molecules/button';
import WizardFooter from 'elementor-app/organisms/wizard-footer';
import List from "../../../../../../../assets/js/ui/molecules/list";
import PluginListItem from "../../../shared/kit-content/components/plugin-list-item/plugin-list-item";
import Box from "../../../../../../../assets/js/ui/atoms/box";
import ColumnListItem from "../../../../../../../assets/js/ui/molecules/column-list-item";
import Checkbox from "../../../../../../../assets/js/ui/atoms/checkbox";

//context.data.fileResponse.stage1.manifest.plugins
const mock = [ 'akismet', 'classic-editor', 'elementor', 'elementor-pro', 'hello-dolly' ]

export default function ImportPlugins() {
	const context = useContext( Context );
	const navigate = useNavigate();
	const elementorProPluginSlug = 'elementor-pro';
	const [ importedPlugins, setImportedPlugins ] = useState( [] );
	const [ installedPlugins, setInstalledPlugins ] = useState( [] );
	const [ activePlugins, setActivePlugins ] = useState( [] );
	const [ selectedPlugins, setSelectedPlugins ] = useState( [] );
	const getFooter = () => {
		return (
			<WizardFooter separator justify="end">
				<Button
					text={ __( 'Previous', 'elementor' ) }
					variant="contained"
					onClick={ () => context.dispatch( { type: 'SET_FILE', payload: null } ) }
				/>

				<button onClick={ async () => {
					await install();
					navigate( '/import/content' );
				} }> next </button>

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
		const foundInstalled = installedPlugins.find( ( item ) => item.Slug === plugin.Slug );
		const foundActive = activePlugins.find( ( item ) => item.Slug === plugin.Slug );

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

	const install = async () => {
		selectedPlugins.forEach( ( slug ) => {
			if (getPluginsStatus(slug) === 'Not Installed' ) {
				// installPlugin( slug );
			} else {
				console.log( 'Already installed', slug );
			}
		} );
	};

	useEffect( () => {
		console.log( context.data.includedPlugins)
		setSelectedPlugins( context.data.includedPlugins );
	}, [ context.data.includedPlugins ] );

	const addPlugin = ( slug ) => {
		const actionType = selectedPlugins.includes( slug ) ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
		context.dispatch( { type: actionType, payload: slug } );
	};

	const installPlugin = async ( slug ) => {
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

					<ColumnListItem className="e-app-export-plugins-list__header" padding="20"
									widths={ [ "80%", "20%" ] }>
						<>                <Checkbox className="eps-checkbox e-app-plugins-content__checkbox"
													checked={ selectedPlugins.length === activePlugins.length }
													onChange={ () => {
													} }/>
							<span>Plugin Name</span>
						</>
						<>Status</>
						<>Version</>
					</ColumnListItem>

					<Box>
						<List separated className="e-app-export-plugins-list">
							<div>
								{ importedPlugins && importedPlugins.filter( plugin => plugin.Slug !== elementorProPluginSlug && getPluginsStatus( plugin ) !== 'Active' ).map( ( plugin ) => {
									return (
										<PluginListItem key={ plugin.Slug }
														selected={ selectedPlugins.includes( plugin.Slug ) }
														plugin={ plugin }
														status={ getPluginsStatus( plugin ) }
														onPluginSelected={ () => addPlugin( plugin.Slug ) }
										/>
									);
								} ) }
							</div>
						</List>
					</Box>

					<div>
						<apan>Plugins you already have</apan>
						<Box>
							<List separated className="e-app-export-plugins-list">
								<div>
									{ importedPlugins && importedPlugins.filter( plugin => plugin.Slug !== elementorProPluginSlug && getPluginsStatus( plugin ) === 'Active' ).map( ( plugin ) => {
										return (
											<PluginListItem key={ plugin.Slug }
															selected={ true }
															plugin={ plugin }
											/>
										);
									} ) }
								</div>
							</List>
						</Box>
					</div>
				</div>
			</section>
		</Layout>
	);
}

