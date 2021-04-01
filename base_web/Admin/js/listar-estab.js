import {auth,listarEstablecimientos} from './app.js';
import {cargarGeneric} from './generic/generics.js';

// validar token
auth();

cargarGeneric();
// listar Establecientos
listarEstablecimientos();