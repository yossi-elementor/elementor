import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from '@reach/router';
import { Context } from '../../../context/context-provider';
import './export-plugins.scss';
import Layout from '../../../templates/layout';
import Button from 'elementor-app/ui/molecules/button';
import WizardFooter from 'elementor-app/organisms/wizard-footer';
import ExportButton from "../export-kit/components/export-button/export-button";

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
		console.log(context.data.includedPlugins)
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
			<section className="e-app-export-kit">

				<div>
					{ installedPlugins && installedPlugins.map( ( plugin ) => {
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

