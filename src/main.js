import Vue from 'vue';
import "babel-polyfill";
import 'src/main.less';
import {Button} from 'iview';
Vue.component("Button",Button);
import 'iview/dist/styles/iview.css';
import router from './router.js';
Vue.prototype.$IVIEW = {};
const app = new Vue({
    router,
    components:{

    },
    created:function () {


    }

}).$mount('#app')