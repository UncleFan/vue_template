/**
 * localStorage封装
 */
export default {
    get: (key) => {
        try{
            const store = localStorage.getItem(key);
            if(!store || store === undefined || store === null){
                return null
            }
            return JSON.parse(store)
        } catch (err) {
            console.log(err)
            return null
        }
        
    },

    set: (key,value) => {
        if(!value || value === undefined){
            localStorage.setItem(key, null)
        }else{
            localStorage.setItem(key, JSON.stringify(value))
        }
    },

    remove: (key) => {
        localStorage.removeItem(key)
    }
}