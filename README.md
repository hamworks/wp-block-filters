# @hamworks/wp-block-filters

## Installation

Install the module

```bash
npm install @hamworks/wp-block-filters --save
```

## API

### createAttributesFilter

React hooks for post meta.

#### Parameters

- _blockName_ `string`: block name.
- _newAttributes_ : `object` attributes to override.

#### Returns

- `Function`: Filter function for 

#### Examples

##### jsx

```jsx
import { addFilter } from '@wordpress/hooks';
import { createAttributesFilter } from '@hamworks/wp-block-filters';

addFilter(
	'blocks.registerBlockType',
	'my-plugin/media-text',
	createAttributesFilter('core/media-text', {
        isStackedOnMobile: {
			type: "boolean",
			default: true
		},
    })
);
```
