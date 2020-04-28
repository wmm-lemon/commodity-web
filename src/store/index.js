import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        nickname: localStorage.getItem('nickname') ? localStorage.getItem('nickname') : ''
    },
    mutations: {
        changeLogin(state,user){
            state.Authorization = user.Authorization;
            console.log("store/index.js---到这里了!");
            localStorage.setItem('Authorization',user.Authorization);
            localStorage.setItem('username',user.username);
            localStorage.setItem('nickname',user.nickname);
        }
    }
})