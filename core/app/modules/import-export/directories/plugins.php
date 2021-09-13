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
		return $included_plugins;
	}

	protected function import( array $import_settings ) {
		return null;
	}

}
