import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { Site } from './site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
    path = "site"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<Site[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar localidades", undefined, error),
                    () => { },
                )
            );
    }

    listByCustomer(customerId: number) {
        return this.http.get<Site[]>(this.path + "/customer/" + customerId)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar localidades", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<Site>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar localidade", undefined, error),
                () => { },
            )
        );
    }

    create(entity: Site) {
        return this.http.post<Site>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Localidade cadastrada com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar localidade", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Localidade apagada com sucesso"),
                (error) => this.notification.showError("Erro ao apagar localidade", undefined, error),
                () => { },
            )
        );
    }

    update(entity: Site) {
        return this.http.put<Site>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Localidade atualizada com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar localidade", undefined, error),
                () => { },
            )
        );
    }
}
