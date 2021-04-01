import {auth,listarAdminEstab} from './app.js';
import {cargarGeneric} from './generic/generics.js';
// validar token
auth()
// listar administradores de Establecimientos
listarAdminEstab();

cargarGeneric();