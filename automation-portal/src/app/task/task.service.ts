import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { GatewayService } from '../_services/gateway.service';
import { ToastService } from '../_services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    path = "task"

    constructor(
        private http: GatewayService,
        private notification: ToastService,
    ) { }

    run(entity: any) {
        return this.http.post<any>(this.path + '/run', entity)
            .pipe(
                tap(
                    (next) => this.notification.showSuccess("Tarefa inserida na fila com sucesso"),
                    (error) => this.notification.showError("Erro inserir tarefa na fila", undefined, error),
                    () => { },
                )
            );
    }
}
