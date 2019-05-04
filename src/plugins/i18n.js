import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    'en': {
        catalog: {
            category: {
                index: 'Category Index',
                edit: 'Category Edit',
            },
        },
    },
    'es': {

    }
};

const i18n = new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
