import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../../context/context-provider';
import './export-plugins.scss';
import Layout from '../../../templates/layout';
import Button from 'elementor-app/ui/molecules/button';
import WizardFooter from 'elementor-app/organisms/wizard-footer';
import ExportButton from '../export-kit/components/export-button/export-button';
import PageHeader from '../../../ui/page-header/page-header';
import Box from '../../../../../../../assets/js/ui/atoms/box';
import List from '../../../../../../../assets/js/ui/molecules/list';

export default function ExportPlugins() {
	const context = useContext( Context );
	const navigate = useNavigate();
	const [ installedPlugins, setInstalledPlugins ] = useState( null );
	const [ activePlugins, setActivePlugins ] = useState( null );
	const [ selectedPlugins, setSelectedPlugins ] = useState( [] );
	const getFooter = () => {
		return (
			<WizardFooter separator justify="end">
				<Button
					text={ __( 'Previous', 'elementor' ) }
					variant="contained"
					onClick={ () => navigate( '/export' ) }
				/>

				<ExportButton/>
			</WizardFooter>
		);
	};

	useEffect( () => {
		setInstalledPlugins( elementorAppConfig[ 'import-export' ].installedPlugins );
		setActivePlugins( elementorAppConfig[ 'import-export' ].activePlugins );
	}, [] );

	useEffect( () => {
		setSelectedPlugins( context.data.includedPlugins );
	}, [ context.data.includedPlugins ] );

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

	const addPlugin = ( slug ) => {
		const actionType = selectedPlugins.includes( slug ) ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
		context.dispatch( { type: actionType, payload: slug } );
	};

	return (
		<Layout type="export" footer={ getFooter() }>
			<section className="e-app-export-plugins">

				<PageHeader
					heading={ __( 'Choose which plugins to export with your kit', 'elementor' ) }
					description={ [
						<React.Fragment key="description-secondary-line">
							{ __( 'Choose only plugins that are relevant for your kit', 'elementor' ) }
						</React.Fragment>,
					] }
				/>

				<Box>
					<List separated className="e-app-export-plugins-content">
						<div>
							{ installedPlugins && installedPlugins.map( ( plugin ) => {
								return (
									<List.Item padding="20" key={ plugin.Slug } className="e-app-export-plugins-content__item">
										<div
											 onClick={ () => addPlugin( plugin.Slug ) }
											 key={ plugin.Slug }>
											{ selectedPlugins.includes( plugin.Slug ) ? '-- ' : '++ ' }
											{ plugin.Title } - { plugin.Version }
											{ getPluginsStatus( plugin.Slug ) }</div>
									</List.Item>
								);
							} ) }

						</div>
					</List>
				</Box>
			</section>
		</Layout>
	);
}

