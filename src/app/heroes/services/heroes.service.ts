import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<{[key: string]: Hero}>(`${this.baseUrl}/heroes.json`)
      .pipe(
        map(heroes => Object.keys(heroes).map(key => {
          const { id, ...heroWithoutId } = heroes[key];
          return {
            id: key,
            ...heroWithoutId
          };
        }))
      );
  }


  getHeroById( id: string ): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }.json`)
      .pipe(
        map(heroData => {
          const { id: heroId, ...heroWithoutId } = heroData;
          return { id, ...heroWithoutId };
        }),
        catchError( error => of(undefined) )
      );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<{[key: string]: Hero}>(`${ this.baseUrl }/heroes.json?q=${ query }&_limit=6`)
      .pipe(
        map(heroes => Object.keys(heroes).map(key => {
          const { id, ...heroWithoutId } = heroes[key];
          return {
            id: key,
            ...heroWithoutId
          };
        }))
      );
  }

  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${ this.baseUrl }/heroes.json`, hero);
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if ( !hero.id ) throw Error('The hero must have an id');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }.json`, hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {
    return this.http.delete<Hero>(`${ this.baseUrl }/heroes/${ id }.json`)
      .pipe(
        map( resp => true),
        catchError( error => of(false) ),
      );
  }

}
