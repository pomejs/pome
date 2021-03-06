/**
 * Filter for rpc log.
 * Record used time for remote process call.
 */
const rpcLogger = require('pome-logger').getLogger('rpc-log', __filename);
const utils = require('../../util/utils');

class RpcLog
{
	constructor()
    {
		this.name = 'rpcLog';
	}

    /**
     * Before filter for rpc
     */
	before(serverId, msg, opts, next)
    {
		opts = opts || {};
		opts.__start_time__ = Date.now();
		next();
	}

    /**
     * After filter for rpc
     */
	after(serverId, msg, opts, next)
    {
		if (Boolean(opts) && Boolean(opts.__start_time__))
        {
			const start = opts.__start_time__;
			const end = Date.now();
			const timeUsed = end - start;
			const log = {
				route    : msg.service,
				args     : msg.args,
				time     : utils.format(new Date(start)),
				timeUsed : timeUsed
			};
			rpcLogger.info(JSON.stringify(log));
		}
		next();
	}
}

module.exports = new RpcLog();