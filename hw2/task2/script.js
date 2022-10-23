// Task2: Data storage
// Your task is to write some class which will handle storage for your application.
// Let imagine you have some object in your program(application) which contains all for your app. 
// Every part of code can access it. In order to do it in save way you have to introcude 
// Class which will be responsible for manaring that object. 
// Requrments
// 1. Class should be in separate file
// 2. Instance of class have to be only one (singelton)
// 3. Byd devault your state have to be empty
// 3. Instance should contain next methods: 
// getState - methods will return all state
// getStateByPath(path: string) - methods which will return part of the state
// updateState(updateObject) - function which will update state and return new version of state
// clearState - fucntion which will clear state complately
// clearStateByPath(path: string) - will clear state by spacific path. (path: string) - means that param for methods have to be string, for exampe clearStateByPath('users.contact') - it should clear contcts field in object. 
let SilngletonApplication = (function() {
    class SingletonClass {
        state = {}

        getState() {
            return this.state
        }
        updateState(newState) {
            this.state = newState
            return this.state
        }
        clearState() {
            this.state = {}
            return this.state
        }
        getStateByPath(path) {
            let obj = this.state
            for (let i = 0, value = path.split('.'), length = value.length; i < length; i++ ){
                obj = obj[value[i]];
            }
            return obj
        }
        clearStateByPath(path) {
            let obj = this.state
            for (let i = 0, value = path.split('.'), length = value.length; i < length; i++ ){
               if (i === length - 1) {
                obj = delete obj[value[i]];
               } else {
                obj = obj[value[i]]
               }
            }
            
        }
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




const instance1 = SilngletonApplication.getInstance()

console.log(instance1.updateState({
    user: {
        name: 'Oleh',
        surname: {
            first: 'www',
            second:'eee'
        }
    },
    role: 'admin'
  }))
console.log(instance1.getState())
instance1.clearStateByPath("user.surname.first")
console.log(instance1.getState())


