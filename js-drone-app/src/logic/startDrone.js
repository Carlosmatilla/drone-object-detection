const API_URL = process.env.REACT_APP_API_URL


export function startDrone() {
    return (async () => {
       
        const response = await fetch(`${API_URL}/`, {
            method: 'POST'
        })
        
        const { status } = response
        if (status === 200) {
            
            const { message } = await response.json()
            console.log(message)
            return message
        }

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new Error(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}