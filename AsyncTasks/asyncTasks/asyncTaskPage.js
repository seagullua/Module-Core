/**
 * Created by Andriy Chaika on 10.06.14.
 */
var asyncTasks = include('Core/AsyncTasks');


/**
 * Returns the task result
 * @param req
 * @param res
 */
function checkTaskState(req, res) {
    var task_id = req.params.taskid;

    asyncTasks.getTaskResult(task_id, function(task) {
        if(task.error) {
            task.error = res.__(task.error);
        }
        res.json(task);
    });
}



module.exports = checkTaskState;