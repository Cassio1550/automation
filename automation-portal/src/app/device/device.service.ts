import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { Device } from './device';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {
    path = "device"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<Device[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar dispositivos", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<Device>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar dispositivo", undefined, error),
                () => { },
            )
        );
    }

    create(entity: Device) {
        return this.http.post<Device>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Dispositivo cadastrado com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar dispositivo", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Dispositivo apagado com sucesso"),
                (error) => this.notification.showError("Erro ao apagar dispositivo", undefined, error),
                () => { },
            )
        );
    }

    update(entity: Device) {
        return this.http.put<Device>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Dispositivo atualizado com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar dispositivo", undefined, error),
                () => { },
            )
        );
    }
}
