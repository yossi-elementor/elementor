import { useEffect, useContext, useRef } from 'react';
import { useNavigate } from '@reach/router';

import Layout from '../../../templates/layout';
import FileProcess from '../../../shared/file-process/file-process';

import { Context } from '../../../context/context-provider';

import useAjax from 'elementor-app/hooks/use-ajax';

export default function ImportProcess() {
	const { ajaxState, setAjax } = useAjax(),
		context = useContext( Context ),
		navigate = useNavigate(),
		fileURL = location.hash.match( 'file_url=([^&]+)' ),
		onLoad = () => {
			console.log( 'onLoad()' );
			const ajaxConfig = {
				data: {
					action: 'elementor_import_kit',
				},
			};

			if ( fileURL || context.data.fileResponse ) {
				if ( fileURL ) {
					fileURL[ 1 ] = decodeURIComponent( fileURL[ 1 ] );

					context.dispatch( { type: 'SET_FILE', payload: fileURL } );

					ajaxConfig.data.e_import_file = fileURL[ 1 ];
					ajaxConfig.data.data = JSON.stringify( {
						stage: 1,
					} );

					const referrer = location.hash.match( 'referrer=([^&]+)' );

					if ( referrer ) {
						context.dispatch( { type: 'SET_REFERRER', payload: referrer[ 1 ] } );
					}
				} else {
					ajaxConfig.data.data = {
						stage: 2,
						session: context.data.fileResponse.stage1.session,
						include: context.data.includes,
						overrideConditions: context.data.overrideConditions,
					};

					if ( context.data.referrer ) {
						ajaxConfig.data.data.referrer = context.data.referrer;
					}

					ajaxConfig.data.data = JSON.stringify( ajaxConfig.data.data );
				}

				setAjax( ajaxConfig );
			}
		},
		onSuccess = () => {
			if ( context.data.fileResponse?.stage1 ) {
				const previousFileResponse = context.data.fileResponse,
					fileResponse = { ...previousFileResponse, stage2: ajaxState.response };

				context.dispatch( { type: 'SET_FILE_RESPONSE', payload: fileResponse } );
				const pluginsSlugs = context.data.fileResponse.stage1.manifest.plugins;
				const installedPlugins = elementorAppConfig[ 'import-export' ].installedPlugins;
				console.log( 'imported', pluginsSlugs );
				console.log( 'installed', 	installedPlugins );

				pluginsSlugs.forEach( ( plugin ) => {
					if ( ! installedPlugins.includes( plugin ) ) {
						installPlugin( plugin );
					} else {
						console.log( 'Already installed', plugin );
					}
				} );
			} else {
				context.dispatch( { type: 'SET_FILE_RESPONSE', payload: { stage1: ajaxState.response } } );
			}
		},
		onDialogDismiss = () => {
			context.dispatch( { type: 'SET_FILE', payload: null } );
			navigate( '/import' );
		};

	useEffect( () => {
		if ( 'success' === ajaxState.status ) {
			if ( context.data.fileResponse.hasOwnProperty( 'stage2' ) ) {
				navigate( '/import/complete' );
			} else {
				navigate( '/import/content' );
			}
		}
	}, [ context.data.fileResponse ] );

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
		<Layout type="import">
			<FileProcess
				status={ ajaxState.status }
				onLoad={ onLoad }
				onSuccess={ onSuccess }
				onDialogApprove={ () => {} }
				onDialogDismiss={ onDialogDismiss }
			/>
		</Layout>
	);
}
