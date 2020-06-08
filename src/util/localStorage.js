import store from 'store'
const KEY = "user_id"
export default {
    setlocal(user){
        // localStorage.setItem(KEY,JSON.stringify(user));
        store.set(KEY,user)
    },
    getlocal(){
        // return JSON.parse(localStorage.getItem(KEY))?JSON.parse(localStorage.getItem(KEY)):{};
        return store.get(KEY) || {};
    },
    removelocal(){
        store.remove(KEY)
    }
} 