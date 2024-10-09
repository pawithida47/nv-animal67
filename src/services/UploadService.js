<<<<<<< HEAD
import Api from '@/services/Api'
export default {
    upload(formData) {
        return Api().post('upload', formData)
    },
    delete(picture) {
        return Api().post('/upload/delete', picture)
    }
}
=======
import Api from '@/services/Api' 
export default { 
upload (formData) { 
return Api().post('upload', formData) 
}, 
delete (picture) { 
return Api().post('/upload/delete', picture) 
}}
>>>>>>> 08ab55fd7f86d8084deddbad6a7c7433e3dbd464
