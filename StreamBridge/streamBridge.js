var socketIO = require('socket.io');
var socketIOClient = require('socket.io-client');
var TAG_CALL = 'ubr-socket.io-rpc-call';
var TAG_RESPONSE = 'ubr-socket.io-rpc-response';
var ss = require('socket.io-stream');

function Server(server){
    var _io = null;
    var _functions = {};

    /**
     * Added function should have two arguments first for incoming params and second
     * for callback
     * @param name
     * @param function_code
     */
    this.addFunction = function(name, function_code) {
        _functions[name] = function_code;
    };

    function sendResponse(socket, call_id, err, results, output_stream) {
        var stream = ss.createStream();
        ss(socket).emit(TAG_RESPONSE, stream, {
            id: call_id,
            err: err,
            result: results
        });
        if(output_stream) {
            output_stream.pipe(stream);
        } else {
            stream.end();
        }

    }

    /**
     * Functions should be added before start
     */
    this.start = function() {
        _io = socketIO(server);

        _io.on('connection', function (socket) {
            ss(socket).on(TAG_CALL, function (stream, data) {
                var id = data.id;
                var function_name = data.name;
                var params = data.params;

                var callback = function(err, result, output_stream) {
                    sendResponse(socket, id, err, result, output_stream);
                };

                if(function_name in _functions) {
                    _functions[function_name](params, stream, callback);
                } else {
                    callback(new Error("Function not found: "+function_name));
                }
            });
        });
    };
}

var counter = 1;
function Client(url) {
    var _has_connection = false;
    var _socket = null;

    var _callbacks = {};
    var _handler_added = false;

    this.connect = function(callback) {
        _socket = socketIOClient(url);
        var callback_send = false;
        function handleDisconnection() {
            for(var key in _callbacks) {
                var callback = _callbacks[key];
                callback(new Error("Connection lost"));
            }
            _callbacks = {};
        }
        _socket.on('reconnecting', function(){
            _has_connection = false;
            handleDisconnection();
            console.log("Reconnect");
        });
        _socket.on('reconnect', function(){
            console.log("Has connection");
            _has_connection = true;
        });
        _socket.on('connect', function(){
            _has_connection = true;

            console.log("add handler");
            if(!_handler_added) {
                _handler_added = true;
                ss(_socket).on(TAG_RESPONSE, function(stream, data){
                    var id = data.id;
                    var err = data.err;
                    var result = data.result;
                    console.log("Callback result", id);
                    if(id in _callbacks) {
                        _callbacks[id](err, result, stream);
                        delete _callbacks[id];
                    } else {
                        console.error("Lost callback "+id);
                    }
                });
            }


            if(!callback_send) {
                callback_send = true;
                callback(null);
            }
        });
        _socket.on('disconnect', function(){
            _has_connection = false;
            handleDisconnection();
            if(!callback_send) {
                callback_send = true;
                callback(new Error("Can't connect"));
            }
        });
    };

    this.hasConnection = function() {
        return _has_connection;
    };

    this.callFunction = function(name, params, stream_to_pipe, callback) {
        var id = counter;
        counter++;

        var stream = ss.createStream();

        if(_has_connection) {
            _callbacks[id] = callback;
            ss(_socket).emit(TAG_CALL, stream, {
                id: id,
                name: name,
                params: params
            });
            if(stream_to_pipe) {
                stream_to_pipe.pipe(stream);
            } else {
                stream.end();
            }

        } else {
            callback(new Error("No connection to server"));
        }

    };
}

exports.Client = Client;
exports.Server = Server;