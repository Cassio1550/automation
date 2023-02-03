
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { Rule } from './rule';

@Injectable({
    providedIn: 'root'
})
export class RuleService {

    path = "rule"

    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<Rule[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar regras", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<Rule>(this.path + '/' + id)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar regra", undefined, error),
                    () => { },
                )
            );
    }

    create(entity: Rule) {
        return this.http.post<Rule>(this.path, entity)
            .pipe(
                tap(
                    (next) => this.notification.showSuccess("Regra cadastrada com sucesso"),
                    (error) => this.notification.showError("Erro ao cadastrar regra", undefined, error),
                    () => { },
                )
            );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
            .pipe(
                tap(
                    (next) => this.notification.showSuccess("Regra apagada com sucesso"),
                    (error) => this.notification.showError("Erro ao apagar regra", undefined, error),
                    () => { },
                )
            );
    }

    update(entity: Rule) {
        return this.http.put<Rule>(this.path + '/' + entity.id, entity)
            .pipe(
                tap(
                    (next) => this.notification.showSuccess("Regra atualizada com sucesso"),
                    (error) => this.notification.showError("Erro ao atualizar regra", undefined, error),
                    () => { },
                )
            );
    }

    download(id: number) {
        return this.http.download(this.path + '/use-case/' + id)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao fazer download do caso de uso", undefined, error),
                    () => { },
                )
            );
    }

}
