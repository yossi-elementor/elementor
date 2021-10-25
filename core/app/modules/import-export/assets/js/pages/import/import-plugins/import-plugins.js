import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../../context/context-provider';
import './import-plugins.scss';
import Layout from '../../../templates/layout';
import Button from 'elementor-app/ui/molecules/button';
import WizardFooter from 'elementor-app/organisms/wizard-footer';
import List from "../../../../../../../assets/js/ui/molecules/list";
import PluginListItem from "../../../shared/kit-content/components/plugin-list-item/plugin-list-item";
import Box from "../../../../../../../assets/js/ui/atoms/box";
import ColumnListItem from "../../../../../../../assets/js/ui/molecules/column-list-item";
import Checkbox from "../../../../../../../assets/js/ui/atoms/checkbox";
import PageHeader from "../../../ui/page-header/page-header";
import { usePlugins, usePluginSelection } from "../../../PluginsUtils";

export default function ImportPlugins() {
	const context = useContext( Context );
	const navigate = useNavigate();
	const elementorProPluginSlug = 'elementor-pro';
	const [ importedPlugins, setImportedPlugins ] = useState( [] );
	const { installedPlugins, activePlugins } = usePlugins( elementorAppConfig )
	const selectedPlugins = usePluginSelection( context );

	const getFooter = () => {
		return (
			<WizardFooter separator justify="end">
				<Button
					text={ __( 'Previous', 'elementor' ) }
					variant="contained"
					onClick={ () => context.dispatch( { type: 'SET_FILE', payload: null } ) }
				/>

				<div className="eps-button eps-button--primary eps-button--contained" onClick={ async () => {
					//await install();
					navigate( '/import/content' );
				} }><span>{ __( 'Next', 'elementor' ) }</span>
				</div>

			</WizardFooter>
		);
	};
	useEffect( () => {
		if ( context.data.uploadedData.manifest.plugins ) {
			setImportedPlugins( context.data.uploadedData.manifest.plugins );
		}
	}, [ context.data.uploadedData.manifest.plugins ] );

	useEffect( () => {
		if ( ! context.data.file ) {
			navigate( 'import' );
		}
	}, [ context.data.file ] );

	const getActionRequiredPlugins = () => {
		return importedPlugins.filter( plugin => plugin.slug !== elementorProPluginSlug && getPluginsStatus( plugin ) !== 'Active' )
	}

	const getPluginsStatus = ( plugin ) => {
		const foundInstalled = installedPlugins.find( ( item ) => item.plugin === plugin.slug );
		const foundActive = activePlugins.find( ( item ) => item.plugin === plugin.slug );
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

	return (
		<Layout type="import" footer={ getFooter() }>
			<section className="e-app-import-plugins">
				<PageHeader
					heading={ __( 'Import a Template Kit to your site', 'elementor' ) }
					description={ [
						<React.Fragment key="description-secondary-line">
							{ __( 'These are the plugins required with your kit. You can deselect them, but it can impact the functionality of your kit.', 'elementor' ) }
						</React.Fragment>,
					] }
				/>

				<Box className="e-app-import-plugins__pro-banner">
					<div className="e-app-import-plugins__pro-banner-text">
						<h5>{ __( 'Install Elementor Pro', 'elementor' ) }</h5>
						<span>{ __( 'Without Elementor Pro, importing components like templates, widgets and popups won\'t work.', 'elementor' ) }</span>
					</div>
					<button onClick={ () => {
						window.open( 'https://go.elementor.com/go-pro-import-export', '_blank' ).focus();
					} }>{ __( 'Go Pro', 'elementor' ) }</button>
				</Box>
				<div>
					{/*needs to install*/ }
					<div className="e-app-import-plugins-section">
						<span className="e-app-import-plugins-section__description">Plugins to add:</span>
						{/*header*/ }
						<ColumnListItem className="e-app-import-plugins-list__header" padding="20"
										widths={ [ "70%", "20%", "10%" ] }>
							<>
								<Checkbox className="eps-checkbox e-app-plugins-list-item__checkbox"
										  checked={ selectedPlugins.plugins.length === getActionRequiredPlugins().length }
										  onChange={ () => selectedPlugins.addRemoveAllPlugins( getActionRequiredPlugins() ) }/>

								<span>{ __( 'Plugin Name', 'elementor' ) }</span>
							</>
							{ __( 'Status', 'elementor' ) }
							{ __( 'Version', 'elementor' ) }
						</ColumnListItem>

						<Box>
							<List separated className="e-app-import-plugins-list__not-installed">
								<div>
									{ importedPlugins && getActionRequiredPlugins().map( ( plugin ) => {
										return (
											<PluginListItem key={ plugin.slug }
															selected={ selectedPlugins.contains( plugin ) }
															plugin={ plugin }
															status={ getPluginsStatus( plugin ) }
															onPluginSelected={ () => selectedPlugins.addRemovePlugin( plugin ) }
											/>
										);
									} ) }
								</div>
							</List>
						</Box>
					</div>

					{/*already installed*/ }
					<div className="e-app-import-plugins-section">
						<span className="e-app-import-plugins-section__description">Plugins you already have:</span>
						<Box>
							<List separated className="e-app-import-plugins-list__installed">
								<div>
									{ importedPlugins && importedPlugins.filter( plugin => getPluginsStatus( plugin ) === 'Active' ).map( ( plugin ) => {
										return (
											<PluginListItem key={ plugin.slug }
															selected={ true }
															disabled={ true }
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

