import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { CustomField } from './custom-field';

@Injectable({
    providedIn: 'root'
})
export class CustomFieldService {

    path = "customfield"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<CustomField[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar campos customizados", undefined, error),
                    () => { },
                )
            );
    }

    listByEntity(entity: string) {
        return this.http.get<CustomField[]>(this.path + "/entity/" + entity)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar campos customizados", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<CustomField>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar campo customizado", undefined, error),
                () => { },
            )
        );
    }

    create(entity: CustomField) {
        return this.http.post<CustomField>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Campo customizado cadastrado com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar campo customizado", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Campo customizado apagado com sucesso"),
                (error) => this.notification.showError("Erro ao apagar campo customizado", undefined, error),
                () => { },
            )
        );
    }

    update(entity: CustomField) {
        return this.http.put<CustomField>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Campo customizado atualizado com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar campo customizado", undefined, error),
                () => { },
            )
        );
    }
}
