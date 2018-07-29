import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import './locale/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import { VirtualScroller } from 'vue-virtual-scroller';
import locale from 'iview/dist/locale/ru-RU';
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

Vue.use(VueI18n);
Vue.use(iView, { locale });
Vue.component('virtual-scroller', VirtualScroller);

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        this.$store.commit('updateMenulist');
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});
