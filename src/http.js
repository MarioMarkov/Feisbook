class CustomHttp{

    async get(url){
        const response = await fetch(url);
        return await response.json();
    }

    async post(url,data){
        const response = await fetch(url,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })

        return await response.json();
    }
    async put(url,data){
        const response = await fetch(url,{
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await response.json();
    }
    async delete(url){
        const response = await fetch(url,{
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    }
}

export const http = new CustomHttp();