import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthRequest, LoginResponse, UserResponse} from "../model/IAuth";
import {Observable} from "rxjs";
import {CommonResponse} from "../../shared/model/CommonResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  register(auth: AuthRequest): Observable<CommonResponse<UserResponse>> {
    return this.http.post<CommonResponse<UserResponse>>('/api/auth/signup', auth);
  }

  login(auth: AuthRequest): Observable<CommonResponse<LoginResponse>> {
    return this.http.post<CommonResponse<LoginResponse>>('/api/auth/signin', auth);
  }

  getUserById(id: string): Observable<CommonResponse<UserResponse>> {
    return this.http.get<CommonResponse<UserResponse>>(`/api/users/${id}`);
  }

  getUserFromToken(): Observable<CommonResponse<UserResponse>> {
    return this.http.get<CommonResponse<UserResponse>>('/api/users/me');
  }

  storeUser(data: LoginResponse): void {
    if (data) sessionStorage.setItem('user', JSON.stringify(data));
    return;
  }

  getUserFromStorage(): LoginResponse | null {
    const user: string = sessionStorage.getItem('user') as string;
    if (user) return JSON.parse(user);
    return null;
  }

  clearStorage(): void {
    let user = this.getUserFromStorage();
    if (!user) return;
    sessionStorage.clear();
  }
}
