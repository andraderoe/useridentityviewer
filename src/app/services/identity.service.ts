import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Export the type
export interface UserIdentity {
  id: number;
  fullName: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
private apiUrl = 'https://localhost:7009/api/identities';

  constructor(private http: HttpClient) {}

  // ✅ getUser method
  getUser(id: number): Observable<UserIdentity> {
    return this.http.get<UserIdentity>(`${this.apiUrl}/${id}`);
  }

updateUser(id: number, data: { fullName: string; email: string }): Observable<UserIdentity> {
  return this.http.patch<UserIdentity>(`${this.apiUrl}/${id}`, {
    FullName: data.fullName,
    Email: data.email
  });
}
}
