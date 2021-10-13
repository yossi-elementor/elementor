import Checkbox from 'elementor-app/ui/atoms/checkbox';
import ColumnListItem from 'elementor-app/ui/molecules/column-list-item';
import InlineLink from 'elementor-app/ui/molecules/inline-link';
import Icon from 'elementor-app/ui/atoms/icon'

import './plugin-list-item.scss';

const PluginListItem = ( { plugin, selected, onPluginSelected, status, disabled } ) => {

	return (
		<ColumnListItem padding="20" itemKey={ plugin.Slug } widths={["70%", "20%", "10%"]} className="e-app-plugins-list-item">
			<div
				className="e-app-plugins-list-item__title-container"
				onClick={ () => { if (onPluginSelected) onPluginSelected( plugin.Slug ) } }
				key={ plugin.Slug }>

				<Checkbox className={`eps-checkbox e-app-plugins-list-item__checkbox${disabled ? '-disabled' : ''}`}
						  checked={ selected }
						  disabled={ disabled }
						  onChange={ () => { if (onPluginSelected) onPluginSelected()} }/>

				<span className="e-app-plugins-list-item__title">{ plugin.Title }</span>
			</div>

			<span>{ status ? status : '' }</span>

			<InlineLink className="e-app-plugins-list-item__version" underline={'none'} url={ plugin.PluginURI }>
				{ plugin.Version }<Icon className={'eicon-editor-external-link'} />
			</InlineLink>
		</ColumnListItem>
	);
};



PluginListItem.propTypes = {
	plugin: PropTypes.object,
	onPluginSelected: PropTypes.func,
	selected: PropTypes.bool,
};

export default PluginListItem;
