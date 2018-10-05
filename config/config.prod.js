const config = {
    app : {
        port : 8080,
        secret : 'secretprod'
    },
    db : {
        host : 'localhost',
        port : 27017,
        name : 'sts'
    }
}
//console.log('Global config'+ JSON.stringify(config));
module.exports = config;
