import App from './app';
import ImportExport from '../../modules/import-export/assets/js/module';
import KitLibrary from '../../modules/kit-library/assets/js/module';
import { Module as SiteEditor } from '@elementor/site-editor';
import Onboarding from "../../modules/onborading/assets/js/module";

import AppProvider from './app-context';

new ImportExport();
new KitLibrary();
new SiteEditor();
new Onboarding();

const AppWrapper = React.Fragment;

ReactDOM.render(
	<AppWrapper>
		<AppProvider>
			<App />
		</AppProvider>
	</AppWrapper>,
  document.getElementById( 'e-app' )
);
