import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { Customer } from './customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    path = "customer"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<Customer[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar clientes", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<Customer>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar cliente", undefined, error),
                () => { },
            )
        );
    }

    create(entity: Customer) {
        return this.http.post<Customer>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Cliente cadastrado com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar cliente", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Cliente apagado com sucesso"),
                (error) => this.notification.showError("Erro ao apagar cliente", undefined, error),
                () => { },
            )
        );
    }

    update(entity: Customer) {
        return this.http.put<Customer>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Cliente atualizado com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar cliente", undefined, error),
                () => { },
            )
        );
    }
}
