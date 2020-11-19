import {requests} from "./requests";

function upload(formData) {
    return requests({
        method: 'post',
        url: '/upload',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

function result() {
    return requests({
        method: 'get',
        url: '/result',
    })
}

export {upload, result}