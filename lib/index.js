#!/usr/bin/env node
const axios = require('axios').default;

/**
 * NodeJS implementation of a SEP-6 client
 * see https://www.coinqvest.com/en/sep6-docs
 *
 * @constructor, instantiates the client object
 *
 * @param transferServer (string) The SEP-6 transfer server
 */
function Client(transferServer) {

    // @string The current version of this SDK, used in the HTTP user agent (leave it as is)
    this.clientVersion = '0.0.1'; // good way to pull this from package.json instead?

    // @string Used in the HTTP user agent (leave it as is)
    this.clientName = 'sep6-client';

    this.transferServer = transferServer ? transferServer : 'sep6.coinqvest.com';

    /**
     * Use this method to communicate with GET endpoints
     *
     * @param endpoint (string), e.g. /deposit
     * @param params (object), a list of GET parameters to be included in the request
     * @param callback (function), processes the response
     */
    this.get = async function(endpoint, params, callback) {
        return await sendRequest('get', endpoint, params, callback);
    };

    /**
     * Use this method to communicate with POST endpoints
     *
     * @param endpoint (string)
     * @param params (object), a list of POST parameters to be included in the request
     * @param callback (function), processes the response
     */
    this.post = function(endpoint, params, callback) {
        sendRequest('post', endpoint, params, callback);
    };

    /**
     * Use this method to communicate with PUT endpoints
     *
     * @param endpoint (string)
     * @param params (object), a list of PUT parameters to be included in the request
     * @param callback (function), processes the response
     */
    this.put = function(endpoint, params, callback) {
        sendRequest('put', endpoint, params, callback);
    };

    /**
     * Use this method to communicate with DELETE endpoints
     *
     * @param endpoint (string)
     * @param params (object), a list of DELETE parameters to be included in the request
     * @param callback (function), processes the response
     */
    this.delete = function(endpoint, params, callback) {
        sendRequest('delete', endpoint, params, callback);
    };

    // private validator function
    const validateArgs  = function(method, endpoint, params) {

        if (!validateEndpoint(endpoint)) {
            this.log("Invalid endpoint given to " + method + " method.");
            return false;
        }

        if (!validateParams(params)) {
            this.log("Invalid params given to " + method + " method.");
            return false;
        }

        return true;

    }.bind(this);

    // private validator function
    const validateEndpoint = function(endpoint) {
        return typeof endpoint === 'string' && endpoint.substring(0,1) === '/';
    };

    // private validator function
    const validateParams = function(params) {

        if (typeof params === 'object') {
            return true;
        }

        return !params;

    };

    // private function to build request configuration
    const buildConfig = function(extras) {

        // build request config
        return Object.assign({
            baseURL: 'https://' + this.transferServer + '/',
            responseType: 'json',
            responseEncoding: 'utf8',
            headers: {
                'User-Agent': this.clientName + ' ' + this.clientVersion,
                'Accept': 'application/json'
            }
        }, extras);

    }.bind(this);

    // private function to send the request
    const sendRequest = async function(method, endpoint, params) {

        if (!validateArgs(method, endpoint, params)) {
            return;
        }

        try {
            return await axios(buildConfig({
                method: method,
                url: endpoint,
                params: method === 'get' ? params : null,
                data: method === 'get' ? null : params
            }));
        } catch (e) {
            this.log(JSON.stringify(e));
            return e.response;
        }

    }.bind(this);

    /**
     * Normalized logging for SEP-6 SDK related events and errors.
     * @param message
     */
    this.log = function(message) {
        console.log(new Date().toISOString() + ' [SEP-6]: ' + message)
    };

}

module.exports = Client;

