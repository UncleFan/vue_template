/*
 * @Description: 
 * @Date: 2021-07-30 11:27:50
 * @page: 
 */
import axios from 'axios'
// axios.defaults.baseURL = ""
function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params, {
            //   headers: {
            //     'Content-Type': 'application/json'
            //   }
        })  //QS.stringify()
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

function del(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}

export default {
    get,
    post,
    del
}
