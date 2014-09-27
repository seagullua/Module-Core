var Urls = include('Core/Urls');
var task_page = require('./asyncTasks/asyncTaskPage');
var async_tasks_api = require('./asyncTasks/asyncTasks');
var middleware = require('./asyncTasks/asyncTaskMiddleware');


exports.configureModules = function(app) {
    app.locals.createAsyncTaskProgressbar = function(
        task_id,
        redirect_after,
        expected_duration_seconds,
        timeout_seconds,
        timeoutError)
    {
        return middleware(this.res, this, task_id, redirect_after, expected_duration_seconds, timeout_seconds, timeoutError);
    }
}

exports.configureRouters = function(app) {
    app.get(Urls.urlAsyncTaskState(':taskid'), task_page);
}

exports.registerAsyncTask = async_tasks_api.registerAsyncTask;
exports.notifyAsyncTaskFinished = async_tasks_api.notifyAsyncTaskFinished;
exports.notifyAsyncTaskFailed = async_tasks_api.notifyAsyncTaskFailed;
exports.getTaskResult = async_tasks_api.getTaskResult;