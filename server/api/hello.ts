
import type { ProductSearchResponse } from '../../types/Product'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // รับ query parameters
  const q = query.q || ''
  const limit = query.limit || 20
  const skip = query.skip || 0
  
  // เรียก API
  const data = await $fetch<ProductSearchResponse>(
    `https://dummyjson.com/products/search`,
    {
      params: {
        q,
        limit,
        skip
      }
    }
  )
  
  return {
    products: data.products,
    total: data.total
  }
})
