import { createApp } from 'vue';
import App from './App.vue';
import router from './router'

import './style.css'
import "@aws-amplify/ui-vue/styles.css";

import AmplifyVue from '@aws-amplify/ui-vue';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

const app = createApp(App);
app.use(AmplifyVue);
app.use(router);
app.mount('#app');
