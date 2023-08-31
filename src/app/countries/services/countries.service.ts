import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, map } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url).pipe(catchError(() => of([])));
  }
}

// LOS OBSERVABLES TIENE UN MÉTODO LLAMADO PIPE PUEDE SER USADO PARA LAS DIFERENTES OPERADORES DE RXJS
// EL MAP DENTRO DEL PIPE SIRVE PARA QUE TODOS LOS ELEMENTOS DE UN ARRAY SUFRAN UN CAMBIO DESEADO
// EL TAP SIRVE PARA LOGRAR EFECTOS SECUNDARIOS
// CATCH ERROR (SÍ HAY UN ERROR YO LO RECIBO ACÁ) LO QUE QUIERO REGRESAR UN NUEVO OBSERVABLE,
// USAMOS EL OPERACDOR OF PARA AGARRARE EL ERROR DEONTRO DE CATCH ERROR Y REGRESAR LO QUE QUEREMOS
// EN ESTE CASO UN ARRAY VACIO
// USAR EL CATCH ERROR ES MUY BUENO EN CASO DE QUE NO QUERRAMOS MOSTRAR UN ERROR EN LA CONSOLA Y MOSTRAR
// ALGUN VALOR PREDETERMINADO  Y QUREMOS CONTROLAR ALGUNA ACCION
// CON LOS DATOS QUE OBTENEMOS DEL ERROR
