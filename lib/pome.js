/**
 * Pome
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
const fs = require('fs');
const path = require('path');
const application = require('./application');
const Package = require('../package');

const component = {},
	filter = {},
	rpcFilter = {};
let selfApp = null;
/**
 * Expose `createApplication()`.
 */
class Pome
{

    /**
     * Framework version.
     */
	static get version()
    {
		return Package.version;
	}

    /**
     * Event definitions that would be emitted by app.event
     * @returns {*}
     */
	static get events()
    {
		return require('./util/events');
	}
    
    /**
     * auto loaded components
     * @returns {{}}
     */
	static get components()
    {
		return component;
	}

    /**
     * auto loaded filters
     * @returns {{}}
     */
	static get filters()
    {
		return filter;
	}

    /**
     * auto loaded rpc filters
     */
	static get rpcFilters()
    {
		return rpcFilter;
	}


    /**
     * connectors
     */
	static get connectors()
    {
		return {
			sioconnector:Pome.load('./connectors/sioconnector'),
			hybridconnector:Pome.load('./connectors/hybridconnector'),
			udpconnector:Pome.load('./connectors/udpconnector'),
			mqttconnector:Pome.load('./connectors/mqttconnector')
		};
	}

    /**
     * pushSchedulers
     */
	static get pushSchedulers()
    {
		return {
			direct:Pome.load('./pushSchedulers/direct'),
			buffer:Pome.load('./pushSchedulers/buffer')
		};
	}

    /**
     * Create an pome application.
     *
     * @return {Application}
     * @memberOf Pome
     * @api public
     */
	static createApp(opts)
    {
		selfApp = application;
		selfApp.init(opts);
		return selfApp;
	}

    /**
     * Get application
     */
	static get app()
    {
		return selfApp;
	}
    
	static load(path, name)
    {
		if (name)
        {
			return require(`${path}${name}`);
		}
		return require(path);
	}
}

/**
 * Auto-load bundled components with getters.
 */
fs.readdirSync(`${__dirname}/components`).forEach(filename =>
{
	if (!/\.js$/.test(filename))
    {
		return;
	}
	const name = path.basename(filename, '.js');
	const _load = Pome.load('./components/', name);
	component[name] = _load;
    Pome[name] = module.exports[name] = _load;
});

fs.readdirSync(`${__dirname}/filters/handler`).forEach(filename =>
{
	if (!/\.js$/.test(filename))
    {
		return;
	}
	const name = path.basename(filename, '.js');
	const _load = Pome.load('./filters/handler/', name);
  
	filter[name] = _load;
    Pome[name] = module.exports[name] = _load;
});

fs.readdirSync(`${__dirname}/filters/rpc`).forEach(filename =>
{
	if (!/\.js$/.test(filename))
    {
		return;
	}
	const name = path.basename(filename, '.js');
	rpcFilter[name] = Pome.load('./filters/rpc/', name);
});

module.exports = Pome;