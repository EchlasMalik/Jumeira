import { type SchemaTypeDefinition } from 'sanity'

import { productType } from './productType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import {blockContentType} from './blockContentType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, categoryType, orderType, salesType],
}
