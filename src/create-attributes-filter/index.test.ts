import createAttributesFilter, { BlockSettings } from './index';

test( 'filter is function', () => {
	const filter = createAttributesFilter( 'core/media-text', {
		isStackedOnMobile: {
			type: 'boolean',
			default: true,
		},
	} );
	expect( typeof filter ).toBe( 'function' );
} );

test( 'if match block name, override attributes', () => {
	// @ts-ignore
	const blockSettings: BlockSettings = {
		name: 'core/more',
		category: 'layout',
		attributes: {
			customText: {
				type: 'string',
			},
			noTeaser: {
				type: 'boolean',
				default: false,
			},
		},
		save: null,
		deprecated: [],
	};

	const newSettings = createAttributesFilter( 'core/more', {
		noTeaser: {
			type: 'boolean',
			default: true,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: true,
		},
	} )( blockSettings );

	expect( newSettings.deprecated ).toStrictEqual( [
		{
			attributes: blockSettings.attributes,
			save: blockSettings.save,
		},
	] );

	expect( newSettings.attributes ).toStrictEqual( {
		customText: {
			type: 'string',
		},
		noTeaser: {
			type: 'boolean',
			default: true,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: true,
		},
	} );
} );

test( 'if not match block name, not override attributes', () => {
	// @ts-ignore
	const blockSettings: BlockSettings = {
		name: 'core/more',
		category: 'layout',
		attributes: {
			customText: {
				type: 'string',
			},
			noTeaser: {
				type: 'boolean',
				default: false,
			},
		},
		save: null,
		deprecated: [],
	};

	const newSettings = createAttributesFilter( 'core/paragraph', {
		noTeaser: {
			type: 'boolean',
			default: true,
		},
		isStackedOnMobile: {
			type: 'boolean',
			default: true,
		},
	} )( blockSettings );

	expect( newSettings ).toStrictEqual( blockSettings );
} );
