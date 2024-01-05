import back from './back';

class crud {
    async GET(resource){

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
    }
    
    async POST(resource, body){
        
        const data = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response

    }
    async PUT(resource, body){

        const data = {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type':'application/json',
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response
        
    }
    async DELETE(resource){
        
        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const url = `${back.api.baseURL}${resource}`
        let response = (await (await fetch(url, data)).json())
        return response


    }
}

export default new crud();