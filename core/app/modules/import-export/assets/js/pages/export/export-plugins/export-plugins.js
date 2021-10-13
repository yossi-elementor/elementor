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
import { usePluginSelection } from "../../../PluginsUtils";

export default function ExportPlugins() {
	const context = useContext( Context );
	const navigate = useNavigate();
	const elementorProPluginSlug = 'elementor-pro';
	const [ activePlugins, setActivePlugins ] = useState( [] );
	const [ elementorProPlugin, setElementorProPlugin ] = useState( null );
	const selectedPlugins = usePluginSelection(context);

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
		const minifiedActivePlugins = activePluginsArray.map( plugin => minifiedPlugin( plugin ))
		const indexOfElementorPro = minifiedActivePlugins.findIndex( ( plugin ) => elementorProPluginSlug === plugin.Slug );
		if ( indexOfElementorPro > -1 ) {
			setElementorProPlugin( minifiedActivePlugins[indexOfElementorPro]);
		}
		minifiedActivePlugins.sort( ( a, b ) => {
			if ( a.Title < b.Title ) {
				return -1;
			}
			if ( a.Title > b.Title ) {
				return 1;
			}
			return 0;
		} );
		setActivePlugins( minifiedActivePlugins );
	}, [] );

	const minifiedPlugin = ( plugin ) => {
		return { Slug: plugin.Slug, Title: plugin.Title, Version: plugin.Version, PluginURI: plugin.PluginURI }
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

				<ColumnListItem className="e-app-export-plugins-list__header" padding="20" widths={["90%", "10%"]}>
					<>				<Checkbox className="eps-checkbox e-app-plugins-list-item__checkbox"
												checked={ selectedPlugins.plugins.length === activePlugins.length }
												onChange={ () => selectedPlugins.addRemoveAllPlugins( activePlugins )}/>
						{__( 'Plugin Name', 'elementor' )}
					</>
					<>{__( 'Version', 'elementor' )}</>
				</ColumnListItem>

				<Box>
					<List separated className="e-app-export-plugins-list">
						<div>
							{ elementorProPlugin &&
							<PluginListItem
								plugin={ elementorProPlugin }
								selected={ selectedPlugins.contains( elementorProPlugin ) }
								onPluginSelected={ () => selectedPlugins.addRemovePlugin( elementorProPlugin ) }
							/> }

							{ activePlugins && activePlugins.filter( plugin => plugin.Slug !== elementorProPluginSlug).map( ( plugin ) => {
								return (
									<PluginListItem key={ plugin.Slug }
													selected={ selectedPlugins.contains( plugin ) }
													plugin={ plugin }
													onPluginSelected={ () => selectedPlugins.addRemovePlugin( plugin ) }
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

