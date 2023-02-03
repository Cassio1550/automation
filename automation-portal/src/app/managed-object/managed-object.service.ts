import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { ManagedObject } from './managedObject';

@Injectable({
    providedIn: 'root'
})
export class ManagedObjectService {
    path = "managedobject"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<ManagedObject[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar Managed Objects", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<ManagedObject>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar Managed Object", undefined, error),
                () => { },
            )
        );
    }

    create(entity: ManagedObject) {
        return this.http.post<ManagedObject>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Managed object cadastrado com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar Managed Object", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Managed Object apagado com sucesso"),
                (error) => this.notification.showError("Erro ao apagar Managed Object", undefined, error),
                () => { },
            )
        );
    }

    update(entity: ManagedObject) {
        return this.http.put<ManagedObject>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Managed Object atualizado com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar Managed Object", undefined, error),
                () => { },
            )
        );
    }
}
