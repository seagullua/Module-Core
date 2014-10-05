
var ME = include('Core/AsyncTasks');

/**
 * Registers async task in this session. Return task_id a unique id to track the task
 * @param req
 * @returns {string}
 */
function registerAsyncTask(callback) {
    ME.db.createAsyncTask(function(err, task){
        //console.log("Task added: ", task);
        callback(task?task._id:null);
    });
}



/**
 * Returns task by id
 * @param req
 * @param task_id
 */
function getTaskResult(task_id, callback) {
    ME.db.findAsyncTaskById(task_id, function(err, task) {
        var t = task;
        if(!t) {
            t = {
                _id: "0",
                finished: true,
                success: false,
                error: "asyncTask.task_was_lost"}
        }
        callback(t);
    });
}

/**
 * Marks the task as finished successfully
 * @param req
 * @param task_id
 */
function notifyAsyncTaskFinished(task_id) {
    console.log("Success task", task_id);
    ME.db.makeAsyncTaskFinished(task_id, function(err){
        if(err) {
            console.error("Async task error", err);
        }
    });
}

/**
 * Marks the task as failed
 * @param req
 * @param task_id
 * @param error
 */
function notifyAsyncTaskFailed(task_id, error) {
    console.log("Fail task: "+task_id);
    ME.db.makeAsyncTaskFailed(task_id, error, function(err){
        if(err) {
            console.error("Async task error", err);
        }
    });
}

exports.registerAsyncTask = registerAsyncTask;
exports.notifyAsyncTaskFinished = notifyAsyncTaskFinished;
exports.notifyAsyncTaskFailed = notifyAsyncTaskFailed;
exports.getTaskResult = getTaskResult;
