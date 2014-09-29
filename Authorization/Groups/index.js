/**
 * Created by Andriy on 27.09.14.
 */
var _ = require('underscore');
var Config = include('Core/Config');

var UserSchema = include('Core/User').db.User.schema;


var groups = Config.authorization.groups;
var groups_list = Object.keys(groups);

//Modify user table add group
UserSchema.add({
    group: {type: String, default: Config.authorization.defaultGroup, enum: groups_list}
});

function simplifyUserPermissions(group_id) {
    var g = groups[group_id];
    var permissions = _.clone(g.permissions);

    if('inherit' in g) {
        for(var key in g.inherit) {
            permissions = _.union(permissions, simplifyUserPermissions(g.inherit[key]));
        }
    }
    return permissions;
}

//Build groups permissions at startup
for(var gid in groups) {
    var g = groups[gid];
    g.permissions = simplifyUserPermissions(gid);
}

function isSubset(arr1, arr2)
{
    return arr1.length == _.intersection(arr1, arr2).length;
}


exports.configureModules = function(app) {
    app.request.hasPermissions = function(permissions_arr) {
        //If only single parameter given put it into array
        if(!Array.isArray(permissions_arr))
        {
            permissions_arr = [permissions_arr];
        }

        var permissions = [];
        if(this.user) {
            permissions = groups[this.user.group].permissions;
        }
        return isSubset(permissions_arr, permissions);
    }

    app.request.grantPermissions = function(permissions_arr) {
        if(this.hasPermissions(permissions_arr))
        {
            return true;
        }
        else
        {
            if(this.isAuthenticated())
            {
                this.showError(404);
            }
            else
            {
                this.signInAndRedirectBack();
            }
            return false;
        }
    }
}
