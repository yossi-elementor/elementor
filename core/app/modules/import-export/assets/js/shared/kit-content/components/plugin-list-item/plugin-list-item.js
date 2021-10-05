import Checkbox from 'elementor-app/ui/atoms/checkbox';
import ColumnListItem from 'elementor-app/ui/molecules/column-list-item';

import './plugin-list-item.scss';

const PluginListItem = ( { plugin, selected, onPluginSelected } ) => {

	const openURI = (uri) => {
		if (uri) {
			window.open(uri, '_blank').focus();
		}
	}

	return (
		<ColumnListItem padding="20" itemKey={ plugin.Slug } widths={["80%", "20%"]} className="e-app-plugins-content">
			<div
				onClick={ () => onPluginSelected( plugin.Slug ) }
				key={ plugin.Slug }>

				<Checkbox className="eps-checkbox e-app-plugins-content__checkbox"
						  checked={ selected }
						  onChange={ () => onPluginSelected }/>

				<span className="e-app-plugins-content__title">{ plugin.Title }</span>
			</div>

			<span className="e-app-plugins-content__version" onClick={ () => openURI( plugin.PluginURI ) }>{ plugin.Version }</span>
		</ColumnListItem>
	);
};



PluginListItem.propTypes = {
	plugin: PropTypes.Object,
	onPluginSelected: PropTypes.func,
	selected: PropTypes.bool,
};

export default PluginListItem;
