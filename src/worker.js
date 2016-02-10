
(function(global) {
    var async = true,

        // Opera can only use a reader once.
        // Possibly resolved however does not hurt to leave this here
        // I couldn't find a better way to detect this
        newReader = !!navigator.userAgent.toLowerCase().match(/opera/);

    // Older versions of Firefox do not have FileReader in webworkers
    // Opera thinks it has FileReader, however it doesn't
    if (!global.FileReader || newReader) {
        async = false;
    }

    // Just in case this is prefixed
    if (!Blob.prototype.slice) {
        Blob.prototype.slice = Blob.prototype.webkitSlice || Blob.prototype.mozSlice;
    }

    // Hook-up worker input
    global.onmessage = function(e) {
        var hasher = new Md5FileHasher(function (data) {
            // This prevents an illegal invocation error
            global.postMessage(data);
        }, newReader, async);
        hasher.hash(e.data);
    };

})(this);
