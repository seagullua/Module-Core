var service = require('./service');
var schema = require('./asyncTaskSchema');

exports.modelName = 'AsyncTasks';
exports.schema = schema;

exports.createAsyncTask = service.createAsyncTask;
exports.findAsyncTaskById = service.findAsyncTaskById;
exports.makeAsyncTaskFinished = service.makeAsyncTaskFinished;
exports.makeAsyncTaskFailed = service.makeAsyncTaskFailed;