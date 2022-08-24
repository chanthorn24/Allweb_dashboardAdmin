import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL: string = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  /*Authenthication*/
  //login
  public login(data: any) {
    return this.http.post<any>(this.URL + "/api/login", data);
  }
  //forget password
  public forgotPassword(data: any) {
    return this.http.post<any>(this.URL + "/mailer", data);
  }
  //reset password
  public resetPassword(data: any) {
    return this.http.put<any>(this.URL + "/reset/password", data);
  }



  /** Employee **/
  //create user
  public createUser(data: any) {
    return this.http.post<any>(this.URL + "/user/create", data);
  }
  public getUser() {
    return this.http.get<any>(this.URL + "/user");
  }
  public getOneUser(id: any) {
    return this.http.get<any>(this.URL + "/user/" + id);
  }
  //get all department
  public getDepartment() {
    return this.http.get<any>(this.URL + '/department');
  }
  //add department
  public addDepartment(data: any) {
    return this.http.post<any>(this.URL + '/department/create', data);
  }
  //edit department
  public editDepartment(data: any) {
    return this.http.put<any>(this.URL + `/department/update/${data.id}`, data);
  }
  //get department by id
  public getOneDepartment(data: any) {
    return this.http.get<any>(this.URL + `/department/${data}`);
  }
  //delete department
  public deleteDepartment(data: any) {
    return this.http.delete<any>(this.URL + `/department/delete/${data}`);
  }
  //get all position
  public getPosition() {
    return this.http.get<any>(this.URL + '/employee/position')
  }
  //get pos by id
  public getPositionById(id: any) {
    return this.http.get<any>(this.URL + `/employee/position/${id}`);
  }
  //add new position
  public addPosition(data: any) {
    return this.http.post<any>(this.URL + '/employee/position/create', data);
  }

  //update position
  public updatePosition(data: any) {
    return this.http.put<any>(this.URL + `/employee/position/update/${data.id}`, data);
  }
  //delete position
  public deletePosition(data: any) {
    return this.http.delete<any>(this.URL + `/employee/position/delete/${data}`);
  }

  //change password
  public changePassword(data: any) {
    return this.http.put<any>(this.URL + `/user/password`, data);
  }


  /** leave **/
  //create leave
  public createLeave(data: any) {
    return this.http.post<any>(this.URL + '/employee/leave/create', data);
  }
  //get employee leave
  public getAllLeave() {
    return this.http.get<any>(this.URL + '/employee/leave');
  }


}
