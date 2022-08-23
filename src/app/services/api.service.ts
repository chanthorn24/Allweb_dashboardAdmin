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
    return this.http.get<any>(this.URL + "/user/"+ id);
  }
}
