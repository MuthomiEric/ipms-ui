import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { InsurancePolicy, InsurancePolicyDto } from '../models/insurance-policy.model';

@Injectable({
  providedIn: 'root'
})
export class InsurancePolicyService {
  private apiUrl = `${environment.apiUrl}/insurancepolicies`;

  constructor(private http: HttpClient) {}

  // Utility method to get the token from localStorage and attach to the request
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getPolicies(pageNumber: number, pageSize: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`, { headers });
  }

  getPolicy(id: string): Observable<InsurancePolicy> {
    const headers = this.getAuthHeaders();
    return this.http.get<InsurancePolicy>(`${this.apiUrl}/${id}`, { headers });
  }

  createPolicy(policy: InsurancePolicyDto): Observable<InsurancePolicy> {
    const headers = this.getAuthHeaders();
    return this.http.post<InsurancePolicy>(this.apiUrl, policy, { headers });
  }

  updatePolicy(id: string, policy: InsurancePolicyDto): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/${id}`, policy, { headers });
  }

  deletePolicy(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
