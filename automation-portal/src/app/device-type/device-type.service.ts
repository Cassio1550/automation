import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';
import { DeviceType } from './device-type';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

    path = "devicetype"
    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    list() {
        return this.http.get<DeviceType[]>(this.path)
            .pipe(
                tap(
                    (next) => { },
                    (error) => this.notification.showError("Erro ao carregar tipos de dispositivo", undefined, error),
                    () => { },
                )
            );
    }

    get(id: number) {
        return this.http.get<DeviceType>(this.path + '/' + id)
        .pipe(
            tap(
                (next) => { },
                (error) => this.notification.showError("Erro ao carregar tipo de dispositivo", undefined, error),
                () => { },
            )
        );
    }

    create(entity: DeviceType) {
        return this.http.post<DeviceType>(this.path, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Tipo de dispositivo cadastrado com sucesso"),
                (error) => this.notification.showError("Erro ao cadastrar tipo de dispositivo", undefined, error),
                () => { },
            )
        );
    }

    delete(id: number) {
        return this.http.delete(this.path + '/' + id)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Tipo de dispositivo apagado com sucesso"),
                (error) => this.notification.showError("Erro ao apagar tipo de dispositivo", undefined, error),
                () => { },
            )
        );
    }

    update(entity: DeviceType) {
        return this.http.put<DeviceType>(this.path + '/' + entity.id, entity)
        .pipe(
            tap(
                (next) => this.notification.showSuccess("Tipo de dispositivo atualizado com sucesso"),
                (error) => this.notification.showError("Erro ao atualizar tipo de dispositivo", undefined, error),
                () => { },
            )
        );
    }
}
