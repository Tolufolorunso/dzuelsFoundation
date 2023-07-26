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

    if (!response.ok) {
      // Handle error responses from the API
      const errResponse = await response.json()
      if (response.status === 404) {
        throw new Error(errResponse.error)
      }
      console.log(await response.json())
      throw new Error('Network response was not ok')
    }

    return await response.json()
  } catch (error) {
    // Handle any other errors that might occur during the fetch process
    throw new Error(error.message)
  }
}

export default fetchApi
