import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CommonsModel } from './data';
import { MessageService } from '../../message.service';
import { CommonsUtil } from '../shared/commons.util';
import { CommonsArray } from '../shared/commons.array';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CommonsService {

  protected url = environment.appConfig.url + '/api/v1/ipmonitor/commons';
  protected socket;
  public moduleName;
  public data = CommonsArray.create(); 
  
  protected remoteEvents = new Subject<any>();
  protected remoteMethods:any = {};
  constructor(
    protected http: HttpClient,
    protected messageService: MessageService) {
      this.socket = io( environment.appConfig.url , {
        reconnection: false
      });

      this.socket.on( 'event', event => {
        this.remoteEvents.next( event );
      } );

     }

  sendCommand( cmd ) {
      this.socket.emit('cmd', cmd);
  }

  createRemoteEvents() {
    this.createRemoteEventsForAdd();
    this.createRemoteEventsForEdit();
    this.createRemoteEventsForDelete();
    CommonsUtil.getRemoteEvents(this, this.moduleName, this.remoteMethods, this);  

  }

  createRemoteEventsForAdd(remoteMethodAdd:any = null) {
    this.remoteMethods['add']  = !remoteMethodAdd?this.remoteMethodAdd:remoteMethodAdd;    
       
  }

  createRemoteEventsForEdit(remoteMethodEdit:any = null) {
    this.remoteMethods['edit'] = !remoteMethodEdit?this.remoteMethodEdit:remoteMethodEdit;   
  }

  createRemoteEventsForDelete(remoteMethodEdit:any = null) {
    this.remoteMethods['delete'] = !remoteMethodEdit?this.remoteMethodDelete:remoteMethodEdit;   
  }

  remoteMethodAdd(data:any, self) {
    self.data.addElement(data);
  }

  remoteMethodEdit(data:any, self) {
    self.data.editElement(data);
  }

  remoteMethodDelete(data:any, self) {
    self.data.removeElementByElement(data);
  }

  getRemoteEvents(): Observable<any> {
    return this.remoteEvents.asObservable();
  }


  getAllDataAsObserver (populated:Boolean = null): Observable<CommonsModel[]> {
    let params = new HttpParams();
    params = populated?params.append("populate", populated.toString()):params;
    return this.http.get<CommonsModel[]>(this.url,{params})
      .pipe(
        tap(CommonsModel => this.log('fetched Data')),
        catchError(this.handleError('getData', []))
      );
  }

  getAllCustomDataAsObserver(url, fields, populated:Boolean = null): Observable<CommonsModel[]> {
    let params = this.buildParams(fields, populated);
    return this.http.get<CommonsModel[]>(url, {params})
    .pipe(
      tap(CommonsModel => this.log('fetched Data')),
      catchError(this.handleError('getData', []))
    ); 
  }

  getIdCustomDataAsObserver(url, fields, id, populated:Boolean = null): Observable<CommonsModel[]> {
    let params = this.buildParams(fields, populated);
    url = `${url}/${id}`;
    return this.http.get<CommonsModel[]>(url, {params})
    .pipe(
      tap(CommonsModel => this.log('fetched Data')),
      catchError(this.handleError('getData', []))
    ); 
  }

  buildParams(fields:any[] = null, populated:Boolean = null): HttpParams {
    let params = new HttpParams();
    let resultFields ={} ;
    for(let property of fields) {
      resultFields[property] = 1;      
    }
    params = params.append("fields", JSON.stringify(resultFields));
    params = populated?params.append("populate", populated.toString()):params;
    return params;
  }

  async getAllDataAsPromise (): Promise<CommonsModel[]> {
    return this.http.get(this.url).toPromise().then(
	    data => {return <CommonsModel[]>data}
    );  
  }

  getDataByIdAsObserver(id: number, populated:Boolean = null): Observable<CommonsModel> {
    let params = new HttpParams();
    params = populated?params.append("populate", populated.toString()):params;
    const url = `${this.url}/${id}`;
    return this.http.get<CommonsModel>(url,{params}).pipe(
      tap(_ => this.log(`fetched data id=${id}`)),
      catchError(this.handleError<CommonsModel>(`getData id=${id}`))
    );
  }

  async getDataByIdAsPromise (id: number): Promise<CommonsModel[]> {
    const url = `${this.url}/${id}`;
    return this.http.get(url).toPromise().then(
	    data => {return <CommonsModel[]>data}
    );  
  }

  getDataByQueryAsObserver(parameters: any[]): Observable<CommonsModel[]> {
      let params = new HttpParams();
      for(let property in parameters) {
        params = params.append(property, parameters[property].toString())
      }	  
      return this.http.get<CommonsModel[]>(this.url+"search", {params})
      .pipe(
        tap(CommonsModel => this.log('fetched Data')),
        catchError(this.handleError('getData', []))
      );   
  } 

  getIpAsObserver(): Observable<CommonsModel[]> {
    
    return this.http.get<CommonsModel[]>(this.url+"serverip")
    .pipe(
      tap(CommonsModel => this.log('fetched Data')),
      catchError(this.handleError('getData', []))
    );   
  } 

  addDataAsObserver (data: CommonsModel): Observable<CommonsModel> {
   
    return this.http.post<CommonsModel>(this.url, data, httpOptions).pipe(
      tap((data: CommonsModel) => this.log(`added data w/ id=${data._id}`)),
      catchError(this.handleError<CommonsModel>('addData'))
    );
  }

  editDataAsObserver (data: CommonsModel, id: number): Observable<CommonsModel> {
    const url = `${this.url}/${id}`;
    return this.http.put<CommonsModel>(url, data, httpOptions).pipe(
      tap((data: CommonsModel) => this.log(`edited data w/ id=${data._id}`)),
      catchError(this.handleError<CommonsModel>('editData'))
    );
  }

  deleteDataAsObserver (id: number): Observable<CommonsModel> {
    const url = `${this.url}/${id}`;
    return this.http.delete<CommonsModel>(url, httpOptions).pipe(
      tap((data: CommonsModel) => this.log(`edited data w/ id=${data._id}`)),
      catchError(this.handleError<CommonsModel>('editData'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for Subnet consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  
  /** Log a SubnetsService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SubnetsService: ${message}`);
  }
}

