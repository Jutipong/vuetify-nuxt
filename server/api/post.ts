export default defineEventHandler(async (event): Promise<any> => {
  const BASE_URL = process.env.apiBaseUrl
  
  const body = await readBody(event)
  const { path, ...data } = body

  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'Path is required'
    })
  }

  try {
    // Forward headers from client
    const headers = getHeaders(event)
    
    const response: any = await $fetch(path, {
      method: 'POST',
      baseURL: BASE_URL,
      headers: {
        'Authorization': headers.authorization || '',
        'Content-Type': 'application/json'
      },
      body: data
    })

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal Server Error'
    })
  }
})
