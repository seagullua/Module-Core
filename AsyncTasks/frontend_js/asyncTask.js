$(function () {
    $('.async-task-progressbar').each(function(){

        var progress_bar_overall = $(this);
        var progress_bar = progress_bar_overall.find('.progress-bar');
        var error_block = progress_bar_overall.find('.async-task-error');
        var progress_bar_container = progress_bar_overall.find('.async-task-progress-container');

        //Get params from progressbar
        var upload_progress_seconds = parseInt(progress_bar.attr('data-async-task-duration'));
        var task_id = progress_bar.attr('data-async-task-id');
        var redirect_url = progress_bar.attr('data-async-task-redirect');
        var timeout = parseInt(progress_bar.attr('data-async-task-timeout'));

        //How often send requests to server
        var requests_interval_seconds = 3;

        console.log("Upload progress: "+upload_progress_seconds);
        console.log("Timeout: "+timeout);

        /**
         * Show error after conversion
         * @param error
         */
        function showError(error) {
            error_block.html(error);
            error_block.show();
            progress_bar_container.hide();
        }

        /**
         * After time out show message with timeout
         */
        function onTimeout(){
            error_block.show();
        }

        /**
         * On success finish redirect to given page
         */
        function finishAndRedirect() {
            progress_bar.stop();
            progress_bar.animate({width: '100%'}, 200, function(){
                window.location.replace(redirect_url);
            });
        }

        /**
         * Analyse response from server
         * @param res JSON in asyncTask module format
         */
        function parseResponse(res) {
            var register_next = true;
            if(res) {
                if(res.finished) {
                    register_next = false;
                    if(!res.success) {
                        showError(res.error);
                    } else {
                        finishAndRedirect();
                    }
                }
            }

            if(register_next) {
                setTimeout(checkIfBookReady, requests_interval_seconds * 1000);
            }
        }

        /**
         * Send request to the server to check if request is finished
         */
        function checkIfBookReady() {
            $.ajax({
                url: "/task-state/"+task_id+"/"
            }).success(
                function(data){
                    parseResponse(data);
                }).error(function(){
                    setTimeout(checkIfBookReady, requests_interval_seconds * 1000);
                });
        }

        //Animate progress bar
        var initial_run = 900;
        progress_bar.animate({width: '10%'}, initial_run, function(){
            progress_bar.animate({width: '100%'}, upload_progress_seconds * 1000 - initial_run);
        });

        //Update task status
        setTimeout(checkIfBookReady, requests_interval_seconds * 1000);
        //Wait for timeout
        setTimeout(onTimeout, timeout * 1000);
    });
});