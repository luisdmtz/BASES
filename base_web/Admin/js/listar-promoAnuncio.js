import {auth,listarPromoAnuncios} from './app.js';
import {cargarGeneric} from './generic/generics.js';

// validar token
auth();

cargarGeneric();
// listar listarPromoAnuncios
listarPromoAnuncios();