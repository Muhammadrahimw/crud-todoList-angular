import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private apiUrl = "https://dummyjson.com";
	private isLoggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

	isLogged$ = this.isLoggedIn.asObservable();

	constructor(private http: HttpClient, private router: Router) {}

	login(username: string, password: string): Observable<any> {
		return this.http
			.post<{accessToken: string}>(`${this.apiUrl}/auth/login`, {
				username,
				password,
			})
			.pipe(
				tap((res) => {
					localStorage.setItem(`token`, res.accessToken);
					this.isLoggedIn.next(true);
					this.router.navigate([`/food-list`]);
				}),
				catchError((error) => {
					console.error("Login error:", error);
					return throwError(() => error);
				})
			);
	}

	logOut() {
		localStorage.removeItem(`token`);
		this.isLoggedIn.next(false);
		this.router.navigate([`/`]);
	}

	isAuthenticated(): boolean {
		return !!localStorage.getItem(`token`);
	}

	getToken(): string | null {
		return localStorage.getItem(`token`);
	}
}
