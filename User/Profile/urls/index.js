exports.urlMyProfile = function(suffix) {
    suffix = suffix ? suffix : '/';
    return '/profile' + suffix;
}