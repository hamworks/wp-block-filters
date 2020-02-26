import { BlockConfiguration, BlockAttribute } from '@wordpress/blocks';

type MutableRequired< T > = { -readonly [ P in keyof T ]-?: T[ P ] };
type BlockSettings = MutableRequired< BlockConfiguration >;
type BlockAttributes = Record< string, BlockAttribute< any > >;

type BlockFilter = (
	blockName: string,
	newAttributes: BlockAttributes
) => ( setting: BlockSettings ) => BlockConfiguration;

const createAttributesFilter: BlockFilter = ( blockName, newAttributes ) => (
	settings: BlockSettings
): BlockConfiguration => {
	const { save, name, deprecated, attributes } = settings;
	if ( name !== blockName ) {
		return settings;
	}
	const newSettings: BlockSettings = { ...settings };
	newSettings.attributes = { ...attributes, ...newAttributes };
	newSettings.deprecated = [
		...deprecated,
		{
			attributes,
			save,
		},
	];
	return newSettings;
};

export default createAttributesFilter;
