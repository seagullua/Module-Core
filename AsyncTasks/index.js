var Urls = include('Core/Urls');
var task_page = require('./asyncTasks/asyncTaskPage');
var async_tasks_api = require('./asyncTasks/asyncTasks');


exports.configureRouters = function(app) {
    app.get(Urls.urlAsyncTaskState(':taskid'), task_page);
}

exports.registerAsyncTask = async_tasks_api.registerAsyncTask;
exports.notifyAsyncTaskFinished = async_tasks_api.notifyAsyncTaskFinished;
exports.notifyAsyncTaskFailed = async_tasks_api.notifyAsyncTaskFailed;
exports.getTaskResult = async_tasks_api.getTaskResult;