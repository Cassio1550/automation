import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
    path = "team"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<Team[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar equipes", undefined, error),
                    () => { },
                )
            );
    }

    listByCustomer(customerId: number) {
        return this.http.get<Team[]>(this.path + "/customer/" + customerId)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar equipes", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<Team>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar equipe", undefined, error),
                () => { },
            )
        );
    }

    create(entity: Team) {
        return this.http.post<Team>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Equipe cadastrada com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar equipe", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Equipe apagada com sucesso"),
                (error) => this.notification.showError("Erro ao apagar equipe", undefined, error),
                () => { },
            )
        );
    }

    update(entity: Team) {
        return this.http.put<Team>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Equipe atualizada com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar equipe", undefined, error),
                () => { },
            )
        );
    }
}
