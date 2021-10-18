import Checkbox from 'elementor-app/ui/atoms/checkbox';
import ColumnListItem from 'elementor-app/ui/molecules/column-list-item';
import InlineLink from 'elementor-app/ui/molecules/inline-link';
import Icon from 'elementor-app/ui/atoms/icon'

import './plugin-list-item.scss';

const PluginListItem = ( { plugin, selected, onPluginSelected, status, disabled } ) => {

	return (
		<ColumnListItem padding="20" itemKey={ plugin.slug } widths={["70%", "20%", "10%"]} className="e-app-plugins-list-item">
			<div
				className="e-app-plugins-list-item__title-container"
				onClick={ () => { if (onPluginSelected) onPluginSelected( plugin.slug ) } }
				key={ plugin.slug }>

				<Checkbox className={`eps-checkbox e-app-plugins-list-item__checkbox${disabled ? '-disabled' : ''}`}
						  checked={ selected }
						  disabled={ disabled }
						  onChange={ () => { if (onPluginSelected) onPluginSelected()} }/>

				<span className="e-app-plugins-list-item__title">{ plugin.title }</span>
			</div>

			<span>{ status ? status : '' }</span>

			<InlineLink className="e-app-plugins-list-item__version" underline={'none'} url={ plugin.uri }>
				{ plugin.version }<Icon className={'eicon-editor-external-link'} />
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
