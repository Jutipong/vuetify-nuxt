export default defineEventHandler(async (event) => {
  const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001'
  
  const query = getQuery(event)
  const { path, ...params } = query

  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'Path is required'
    })
  }

  try {
    const response = await $fetch(path as string, {
      method: 'GET',
      baseURL: BASE_URL,
      query: params
    })

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})
