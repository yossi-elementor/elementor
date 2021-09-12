<?php

namespace Elementor\Core\App\Modules\ImportExport\Directories;

use Elementor\Core\Base\Document;
use Elementor\Plugin;
use Elementor\TemplateLibrary\Source_Local;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! function_exists( 'get_plugins' ) ) {
	require_once ABSPATH . 'wp-admin/includes/plugin.php';
}

class Plugins extends Base {

	protected function get_name() {
		return 'plugins';
	}

	protected function export() {
		$included_plugins = $this->iterator->get_settings( 'includedPlugins' );
		$the_plugs = Plugin::$instance->wp->get_active_plugins();
		return array_map( function( $plugin ) {
			return dirname( plugin_basename( $plugin ) );
		}, array_keys( $the_plugs->all() ) );
	}

	protected function import( array $import_settings ) {
		return null;
	}

}
