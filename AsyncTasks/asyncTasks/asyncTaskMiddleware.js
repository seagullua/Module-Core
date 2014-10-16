var ME = include('Core/AsyncTasks');
/**
 * Creates progress bar for async task
 * @param task_id
 * @param redirect_after
 * @param expected_duration_seconds
 * @returns {String}
 */
function widgetAsyncTaskTemplate(task_id, redirect_after, expected_duration_seconds, timeout_seconds, timeoutError) {
    return {
        view: ME.view('asyncTaskProgress.ejs'),
        options: {
            taskId: task_id,
            redirectAfter: redirect_after,
            expectedDuration: expected_duration_seconds,
            timeout: timeout_seconds,
            timeoutError: timeoutError,
            asyncJS: ME.js('asyncTask.js')
        }
    };
}
module.exports = widgetAsyncTaskTemplate;

