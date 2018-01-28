var DefaultBuilder = require("truffle-default-builder");

module.exports = {
    build: new DefaultBuilder({
        "index.html": "index.html",
        "app.js": [
            "bower_components/angular/angular.js",
            "bower_components/angular-route/angular-route.js"
        ],
        "app.css": [
            "stylesheets/app.css"
        ],
        "images/": "images/",
        "views/": "views/"
    }),

    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // match any network
        },
        live: {
            host: "localhost",
            port: 8545,
            network_id: "*" // match any network
        }
    }
};
