import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { id } from 'date-fns/locale';

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
  public getUserName() {
    return this.http.get<any>(this.URL + "/user/name");
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
  //get leave by pending
  public getLeavePending() {
    return this.http.get<any>(this.URL + '/employee/leave/user/request/pending');
  }
  public getLeaveApproved() {
    return this.http.get<any>(this.URL + '/employee/leave/user/request/approved');
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
  public createBankAccount(data: any) {
    return this.http.post<any>(this.URL + '/employee/bank/account/create', data);
  }
  //Education
  public getSchoolDegree() {
    return this.http.get<any>(this.URL + '/employee/degree');
  }
  public createSchool(data: any) {
    return this.http.post<any>(this.URL + '/employee/education/create', data);
  }



  //*** Bank type **/
  //get all bank type
  public getAllBankType() {
    return this.http.get<any>(this.URL + '/employee/bank');
  }
  //get by id
  public getBankTypeById(id: any) {
    return this.http.get<any>(this.URL + '/employee/bank/' + id);
  }
  //create bank type
  public createBankType(data: any) {
    return this.http.post(this.URL + '/employee/bank/create', data);
  }
  //update bank type
  public updateBankType(data: any) {
    return this.http.put<any>(this.URL + '/employee/bank/update/' + data.id, data);
  }
  //delete bank type
  public deleteBankType(id: any) {
    return this.http.delete<any>(this.URL + '/employee/bank/delete/' + id);
  }

  //*** Degree **/
  //get all degree
  public getAllDegree() {
    return this.http.get<any>(this.URL + '/employee/degree');
  }
  //get by id
  public getDegreeById(id: any) {
    return this.http.get<any>(this.URL + '/employee/degree/' + id);
  }
  //create degree
  public createDegree(data: any) {
    return this.http.post<any>(this.URL + '/employee/degree/create', data);
  }
  //update degree
  public updateDegree(data: any) {
    return this.http.put<any>(this.URL + '/employee/degree/update/' + data.id, data);
  }
  //delete degree
  public deleteDegree(id: any) {
    return this.http.delete<any>(this.URL + '/employee/degree/delete/' + id);
  }

  //*** Roles **/
  //get all role
  public getAllRole() {
    return this.http.get<any>(this.URL + '/role');
  }
  //get by id
  public getRoleById(id: any) {
    return this.http.get<any>(this.URL + '/role/' + id);
  }
  //create degree
  public createRole(data: any) {
    return this.http.post<any>(this.URL + '/role/create', data);
  }
  //update degree
  public updateRole(data: any) {
    return this.http.put<any>(this.URL + '/role/update/' + data.id, data);
  }
  //delete degree
  public deleteRole(id: any) {
    return this.http.delete<any>(this.URL + '/role/delete/' + id);
  }


  //*** Family **/
  //get all family
  public getAllFamily() {
    return this.http.get<any>(this.URL + '/employee/family/relationship');
  }
  //get by id
  public getFamilyById(id: any) {
    return this.http.get<any>(this.URL + '/employee/family/relationship/' + id);
  }
  //create degree
  public createFamilyRelationship(data: any) {
    return this.http.post<any>(this.URL + '/employee/family/relationship/create', data);
  }
  public createFamily(data: any) {
    return this.http.post<any>(this.URL + '/employee/family/create', data);
  }
  //update degree
  public updateFamily(data: any) {
    return this.http.put<any>(this.URL + '/employee/family/update/' + data.id, data);
  }
  public updateFamilyRelationship(data: any) {
    return this.http.put<any>(this.URL + '/employee/family/relationship/update/' + data.id, data);
  }
  //delete degree
  public deleteFamily(id: any) {
    return this.http.delete<any>(this.URL + '/employee/family/relationship/delete/' + id);
  }
  public getFamilyRelationship() {
    return this.http.get<any>(this.URL + '/employee/family/relationship');
  }

  //*** User Take ATTENDANCE**/
  //take attendance
  public takeAttendance(data: any) {
    return this.http.post<any>(this.URL + '/employee/attendance/create', data);
  }
  //get all attendance monthly
  public getMonthlyAttendanceUser(id: any) {
    return this.http.get<any>(this.URL + '/employee/attendance/user/' + id);
  }
  //get all attendance monthly
  public getAllMonthlyAttendance(month: String, year: number) {
    return this.http.get<any>(this.URL + '/employee/attendance/monthly/user?month=' + month + "&year=" + year);
  }
  //get type attendance
  public getTypeAttendance(user_id: any) {
    return this.http.get<any>(this.URL + '/employee/attendance/get-type/' + user_id);
  }
  //get all attendance type
  public getAllAttendanceTypes() {
    return this.http.get<any>(this.URL + '/employee/attendance/type');
  }
  //get attendance type by id
  public getAttendanceTypeById(id: any) {
    return this.http.get<any>(this.URL + '/employee/attendance/type/' + id);
  }
  //create attendance type
  public addAttendanceType(data: any) {
    return this.http.post<any>(this.URL + '/employee/attendance/type/create', data);
  }
  //update attendance type
  public updateAttendanceType(data: any) {
    return this.http.put<any>(this.URL + '/employee/attendance/type/update/' + data.id, data);
  }
  //delete attendance type
  public deleteAttendanceType(id: any) {
    return this.http.delete<any>(this.URL + '/employee/attendance/type/delete/' + id);
  }
  public getAllAttendanceEmpDaily() {
    return this.http.get<any>(this.URL + '/employee/attendance/daily/users');
  }
}
