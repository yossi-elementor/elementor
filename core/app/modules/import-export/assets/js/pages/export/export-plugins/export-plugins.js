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
import Checkbox from '../../../../../../../assets/js/ui/atoms/checkbox';
import PluginListItem from "../../../shared/kit-content/components/plugin-list-item/plugin-list-item";
import ColumnListItem from "../../../../../../../assets/js/ui/molecules/column-list-item";

export default function ExportPlugins() {
	const context = useContext( Context );
	const navigate = useNavigate();
	const elementorProPluginSlug = 'elementor-pro';
	const [ activePlugins, setActivePlugins ] = useState( [] );
	const [ selectedPlugins, setSelectedPlugins ] = useState( [] );
	const [ elementorProPlugin, setElementorProPlugin ] = useState( null );

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
		const activePluginsArray = elementorAppConfig[ 'import-export' ].activePlugins;
		if ( ! activePluginsArray ) {
			return;
		}
		const indexOfElementorPro = activePluginsArray.findIndex( ( plugin ) => elementorProPluginSlug === plugin.Slug );
		if ( indexOfElementorPro > -1 ) {
			setElementorProPlugin( activePluginsArray[indexOfElementorPro]);
		}
		activePluginsArray.sort( ( a, b ) => {
			if ( a.Title < b.Title ) {
				return -1;
			}
			if ( a.Title > b.Title ) {
				return 1;
			}
			return 0;
		} );
		setActivePlugins( activePluginsArray );
	}, [] );

	useEffect( () => {
		setSelectedPlugins( context.data.includedPlugins );
		console.log(context.data.includedPlugins)
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

	const updateAllPlugins = () => {
		const isAllSelected = selectedPlugins.length === activePlugins.length
		activePlugins.forEach( ( plugin ) => {
			const actionType = isAllSelected ? 'REMOVE_PLUGIN' : 'ADD_PLUGIN';
			context.dispatch( { type: actionType, payload: plugin.Slug } );
		})
	}

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

				<ColumnListItem className="e-app-export-plugins-list__header" padding="20" widths={["80%", "20%"]}>
					<>				<Checkbox className="eps-checkbox e-app-plugins-content__checkbox"
												checked={ selectedPlugins.length === activePlugins.length }
												onChange={updateAllPlugins}/>
						Plugin Name
					</>
					<>Version</>
				</ColumnListItem>

				<Box>
					<List separated className="e-app-export-plugins-list">
						<div>
							{ elementorProPlugin &&
							<PluginListItem
								plugin={ elementorProPlugin }
								selected={ selectedPlugins.includes( elementorProPlugin.Slug ) }
								onPluginSelected={ () => addPlugin( elementorProPlugin.Slug ) }
							/> }

							{ activePlugins && activePlugins.filter( plugin => plugin.Slug !== elementorProPluginSlug).map( ( plugin ) => {
								return (
									<PluginListItem key={ plugin.Slug }
													selected={ selectedPlugins.includes( plugin.Slug ) }
													plugin={ plugin }
													onPluginSelected={ () => addPlugin( plugin.Slug ) }
									/>
								);
							} ) }

						</div>
					</List>
				</Box>
			</section>
		</Layout>
	);
}

