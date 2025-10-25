
export default defineEventHandler(async (event) => {
  const body = await readBody<ProductProductServerRequest>(event)
  
  const res = await $fetch<ProductProductServerSearchResponse>(
    `https://dummyjson.com/products/search`,
    {
      params: { ...body }
    }
  )
  
  return res;
})
