window.Instagram = {
    /* Config settings */

    config: {},
    base_url: 'https://api.instagram.com/v1',
    init: function (opt) {
        opt = opt || {};
        this.config.client_id = opt.client_id;
    },

    popular: function (callback) {
        var endpoint = this.base_url+'/tags/search?client_id='+this.config.client_id;
        this.getJSON(endpoint, callback);
    },
    
    byTagname: function (callback) {
        var endpoint = 'https://api.instagram.com/v1/tags/cats/media/recent?access_token=3195833302.3dbd579.3809d162f5934ad49864ce114b7cb9f6';   
        this.getJSON(endpoint, callback);
    },
    getJSON: function (url, callback) {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'jsonp',
            success: function (response) {
                if (typeof callback === 'function')
                    callback(response);  
                console.log(response);
            }
        });
    }
};


Instagram.init({
    client_id: '3195833302.3dbd579.3809d162f5934ad49864ce114b7cb9f6'
});

