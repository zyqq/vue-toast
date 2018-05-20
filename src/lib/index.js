import ToastComponent from './vue-toast.vue'

let Toast = {}
Toast.install = function (Vue, options) {
    
    var opt = {
        duration: 3000,
    }

    for(var key in options){
        opt[key] = options[key];
    }

    Vue.prototype.$toast = function (message, option) {

        if(typeof option == 'object'){
            for(var key in option){
                opt[key] = options[key];
            }
        }

        const ToastController  =  Vue.extend(ToastComponent)
        
        var instance = new ToastController().$mount(document.createElement("div"));

        instance.message = message;
        instance.visible = true;
        
        document.body.appendChild(instance.$el);

        setTimeout(()=>{
            instance.visible = false;
            document.body.removeChild(instance.$el);
        }, opt.duration)

    };
    ['show','success','info','error'].forEach(function(type){
        Vue.prototype.$toast[type] = function(message,option){
            return Vue.prototype.$toast(message,option);
        }
    });
}

if(window.Vue){
    Vue.use(Toast);
}

export default Toast;