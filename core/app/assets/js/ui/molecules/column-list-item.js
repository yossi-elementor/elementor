import List from 'elementor-app/ui/molecules/list';
import './column-list-item.scss';

const ColumnListItem = ( { children, padding, itemKey, className, widths } ) => {

	return (
		<List.Item className={`e-app-column-list-item ${className ? className : ''}`} padding={ padding } key={itemKey}>
			{ children.map( ( child, index ) => {
				return <div key={index} style={{width: widths[index] || "auto"}}>{ child }</div>
			} ) }
		</List.Item>
	)
};

export default ColumnListItem
