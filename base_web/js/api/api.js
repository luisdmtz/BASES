export default class Api{
    
    constructor (url,metodo,parametros = null,token = null){
        this.url = url;
        this.metodo = metodo;
        this.parametros = parametros;
        this.token = token;
    }

   async call(){
       let init = null
        if (this.metodo == "GET") {
            init = {
                method: this.metodo,
                headers: {
                        'Content-Type': 'application/json',
                        'auth-token' : this.token
                    }
            }
        }else{
            init = {
                method: this.metodo,
                body: JSON.stringify(this.parametros), 
                headers: {
                        'Content-Type': 'application/json',
                        'auth-token' : this.token
                    }
            }
        }
        const r = await fetch(this.url,init)
        .then(res => {
            res.status;
            if ( res.status != 200) {
                return false
            } else {
                return res.json()
            }
        });
        return r;
    }

    async callhtml(){
      const r = await fetch(this.url,{
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        })
        .then(res => {
            res.status;
            if ( res.status != 200) {
                return false
            } else {
                return res.text()
            }
        });
        return r
    }



}