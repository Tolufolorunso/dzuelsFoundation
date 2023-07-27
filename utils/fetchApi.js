const baseUrl = '/api'

const fetchApi = async (endpoint, method = 'GET', data = null) => {
  try {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        // Add any custom headers you may need for your API
      },
    }

    if (data) {
      config.body = JSON.stringify(data)
    }

    const response = await fetch(`${baseUrl}${endpoint}`, config)
    const result = await response.json()
    // console.log(result)

    if (result.status) {
      return result
    } else {
      throw new Error(result.errorMessage)
    }
  } catch (error) {
    // Handle any other errors that might occur during the fetch process
    throw new Error(error.message)
  }
}

export default fetchApi
