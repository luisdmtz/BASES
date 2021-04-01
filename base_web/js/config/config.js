let url = false;
let refUrlPag = false;
let conekta = false;
let configFireBase = false;

const modoServidor = 'local';
// const modoServidor = 'dev';
// const modoServidor = 'prod';

if (modoServidor === 'local') {
    url = `http://localhost/lubogo/lubogoback/public/`;
    refUrlPag = `http://localhost/lubogo/web/`;
    conekta = 'key_DY6cGoLsFLGawX9sowxgj2g';
    configFireBase = {
        apiKey: "AIzaSyCnPIhjBDhxehDXdgsSrMbgSfrBHXecrfU",
        authDomain: "lubogo-staging.firebaseapp.com",
        databaseURL: "https://lubogo-staging.firebaseio.com",
        projectId: "lubogo-staging",
        storageBucket: "lubogo-staging.appspot.com",
        messagingSenderId: "456249652748",
        appId: "1:456249652748:web:600d2361fc9bf4ecdde029",
        measurementId: "G-VFHBLVNBT1"
    }
} else if (modoServidor === 'dev') {
    url = `https://lubo.com.mx/go/dev/lubogoback/public/`;
    refUrlPag = `https://lubo.com.mx/go/dev/web/`;
    conekta = 'key_DY6cGoLsFLGawX9sowxgj2g';
    configFireBase = {
        apiKey: "AIzaSyCnPIhjBDhxehDXdgsSrMbgSfrBHXecrfU",
        authDomain: "lubogo-staging.firebaseapp.com",
        databaseURL: "https://lubogo-staging.firebaseio.com",
        projectId: "lubogo-staging",
        storageBucket: "lubogo-staging.appspot.com",
        messagingSenderId: "456249652748",
        appId: "1:456249652748:web:600d2361fc9bf4ecdde029",
        measurementId: "G-VFHBLVNBT1"
    }
} else if (modoServidor === 'prod') {
    url = `https://lubo.com.mx/go/lubogoback/public/`;
    refUrlPag = `https://lubo.com.mx/go/web/`;
    conekta = 'key_UjWDsad3eqPfAgWDuGRjpxg';
    configFireBase = {
        apiKey: "AIzaSyAD9rT4efip-_Ap9PWAJZlfmzgWVKeryZw",
        authDomain: "lubo-go.firebaseapp.com",
        databaseURL: "https://lubo-go.firebaseio.com",
        projectId: "lubo-go",
        storageBucket: "lubo-go.appspot.com",
        messagingSenderId: "548500702557",
        appId: "1:548500702557:web:fae8488b2b5463662d14b4",
        measurementId: "G-JMC0C08BWR"
      }
}

export {
    url,
    refUrlPag,
    conekta,
    configFireBase
}