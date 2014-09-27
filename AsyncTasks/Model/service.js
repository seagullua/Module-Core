/**
 * Created by nastia on 18.05.14.
 */
var AsyncTask = model('Core/AsyncTasks/Model');


/**
 * Registers task. Returns task info if task created
 * @param callback
 */
function addTask(callback) {
    AsyncTask().create({}, callback);
}

/**
 * Finds task by id
 * @param task_id
 * @param callback
 */
function findAsyncTaskById(task_id, callback) {
    AsyncTask().findOne({_id: task_id}, callback);
}

/**
 * Marks async task as finished successfully
 * @param task_id
 * @param callback
 */
function makeAsyncTaskFinished(task_id, callback) {
    AsyncTask().update({_id: task_id}, {finished: true, success: true}, callback);
}

/**
 * Marks async task as failed
 * @param task_id
 * @param error
 * @param callback
 */
function makeAsyncTaskFailed(task_id, error, callback) {
    AsyncTask().update({_id: task_id}, {finished: true, error: error}, callback);
}


exports.createAsyncTask = addTask;
exports.findAsyncTaskById = findAsyncTaskById;
exports.makeAsyncTaskFinished = makeAsyncTaskFinished;
exports.makeAsyncTaskFailed = makeAsyncTaskFailed;