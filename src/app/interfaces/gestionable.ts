import { Observable } from 'rxjs';

export interface Gestionable<T> {

    modificarElemento(elemento: T): Observable<T>
}
