import { auth } from '@/firebase'

var status = {
  status_code : '',
  status_desc : ''
}

async function auth_dummie(user) {
    try {
        await auth.signInWithEmailAndPassword(user.email, user.password)
        status = { status_code : '0', status_desc : 'Autenticacion Exitosa' }
      }
      catch (error) {        
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            status = { status_code : '10', status_desc : 'Usuario no válido. Revisa tu correo y contraseña.' }
            break
          default:
            status = { status_code : '20', status_desc : 'Ocurrió un error validando la información.' }
            break
        }
    }
}

export {
  auth_dummie,
  status
}