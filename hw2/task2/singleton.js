let SilngletonApplication = (function() {
    class SingletonClass {
        name =  "Oleg"
    }

    let instance;
    
    return {
        getInstance: function() {
            if(!instance) {
                instance = new SingletonClass();
                delete instance.constructor;
            }
            return instance
        }
    };
})();


