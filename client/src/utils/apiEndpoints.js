const BASE_URL = 'http://localhost:3000/';

async function getApi(endpoint) {
    try {
        const response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': localStorage.getItem('token'),
            },
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function postApi(endpoint, body) {
    try {
        const response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function putApi(endpoint, body) {
    try {
        const response = await fetch(`${BASE_URL}api/${endpoint}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function deleteApi(endpoint, id) {
    try {
        const response = await fetch(`${BASE_URL}api/${endpoint}/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': localStorage.getItem('token')
            },
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}
export { getApi, putApi, postApi, deleteApi };