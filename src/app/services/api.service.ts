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
  public getOneUserByEmail(data: any) {
    return this.http.get<any>(this.URL + "/user/by-email/" + data);
  }
  //update user
  public updateUser(data: any) {
    return this.http.put<any>(this.URL + `/user/update/${data.id}`, data);
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

  /**
   * Leave
   */
  //get all leave
  public getLeaveReason() {
    return this.http.get<any>(this.URL + '/employee/leave/reason');
  }
  //get one leave reason
  public getOneLeaveReason(id: any) {
    return this.http.get<any>(this.URL + `/employee/leave/reason/${id}`);
  }
  //create leave reason
  public addLeaveReason(data: any) {
    return this.http.post<any>(this.URL + '/employee/leave/reason/create', data);
  }
  //update leave reason
  public updateLeaveReason(data: any) {
    return this.http.put<any>(this.URL + `/employee/leave/reason/update/${data.id}`, data)
  }
  //delete leave reason
  public deleteLeaveReason(data: any) {
    return this.http.delete<any>(this.URL + `/employee/leave/reason/delete/${data}`);
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
  //getOne leave
  public getOneLeaveUser(id: any) {
    return this.http.get<any>(this.URL + '/employee/leave/' + id);
  }
  //getOne leave by user
  public getLeaveByUser(id: any) {
    return this.http.get<any>(this.URL + '/employee/leave/user/' + id);
  }
  //update leave
  public updateLeave(data: any, id: any) {
    return this.http.put<any>(this.URL + "/employee/leave/update/" + id, data);
  }
  //delete leave
  public deleteLeave(id: any) {
    return this.http.delete<any>(this.URL + '/employee/leave/delete/' + id);
  }

  //bank
  public getAllBank() {
    return this.http.get<any>(this.URL + '/employee/bank');
  }
  public updateBankAccount(data: any) {
    return this.http.put<any>(this.URL + `/employee/bank/account/update/${data.id}`, data);
  }
  public updateBank(data: any) {
    return this.http.put<any>(this.URL + `/employee/bank/update/${data.id}`, data);

  }


<<<<<<< HEAD
=======


  //*** User Take ATTENDANCE**/
  //take attendance
  public takeAttendance(data: any) {
    return this.http.post<any>(this.URL + '/employee/attendance/create', data);
  }
  //get type attendance
  public getTypeAttendance() {
    return this.http.get<any>(this.URL + '/employee/attendance/get-type');
  }
>>>>>>> 864bb8236e1145d1c18da4505f9fb5899ac3ce2f
}
