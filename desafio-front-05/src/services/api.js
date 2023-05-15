import axios from 'axios'

export default axios.create({
    baseURL: 'https://back-integral-m05-t09-git-main-sezarschramm.vercel.app',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});