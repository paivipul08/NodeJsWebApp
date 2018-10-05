const config = {
    app : {
        port : 3000,
        secret : 'secretdev'
    },
    db : {
        host : 'localhost',
        port : 27017,
        name : 'sts',
    }
}
//console.log('Global config'+ JSON.stringify(config));
module.exports = config;
