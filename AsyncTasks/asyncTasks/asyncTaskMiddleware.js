var ME = include('Core/AsyncTasks');
/**
 * Creates progress bar for async task
 * @param req
 * @param res
 * @param task_id
 * @param redirect_after
 * @param expected_duration_seconds
 * @returns {String}
 */
function asyncTaskTemplate(res, res_locals, task_id, redirect_after, expected_duration_seconds, timeout_seconds, timeoutError) {
    //console.log(res.locals.js);
    res_locals.js(ME.js('asyncTask.js'));

    return res.renderTemplate(ME.view('asyncTaskProgress.ejs'),
        {
            taskId: task_id,
            redirectAfter: redirect_after,
            expectedDuration: expected_duration_seconds,
            timeout: timeout_seconds,
            timeoutError: timeoutError
        });
}
module.exports = asyncTaskTemplate;

