<?php

namespace Elementor\Modules\Onboarding;

use Elementor\Core\Base\Document;
use Elementor\Core\Base\App as BaseApp;
use Elementor\Core\Experiments\Manager;
use Elementor\Plugin;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Module extends BaseApp {

	/**
	 * @return string
	 */
	public function get_name() {
		return 'onboarding';
	}

	private function render_onboarding() {
		?>
		<div id="e-onboarding-root">
		</div>
		<?php
	}

	/**
	 * Enqueue admin scripts
	 */
	private function enqueue_scripts() {
		wp_enqueue_script( 'elementor-onboarding', $this->get_js_assets_url( 'onboarding' ), [
			'elementor-common',
			'react',
			'react-dom',
		], ELEMENTOR_VERSION, true );

		$min_suffix = Utils::is_script_debug() ? '' : '.min';

		wp_enqueue_script( 'tipsy', ELEMENTOR_ASSETS_URL . 'lib/tipsy/tipsy' . $min_suffix . '.js', [
			'jquery',
		], '1.0.0', true );

		$this->print_config();
	}

	public static function get_experimental_data() {
		return [];
	}

	/**
	 * Module constructor.
	 */
	public function __construct() {
		parent::__construct();

		add_action( 'visit_boarding', function () {
			$this->render_onboarding();
			$this->enqueue_scripts();
		} );
	}
}


