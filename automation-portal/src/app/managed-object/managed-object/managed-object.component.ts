import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/_services/authorization.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ManagedObjectService } from '../managed-object.service';
import { ManagedObject } from '../managedObject';

@Component({
  selector: 'app-managed-object',
  templateUrl: './managed-object.component.html',
  styleUrls: ['./managed-object.component.scss']
})
export class ManagedObjectComponent implements OnInit {

    managedObjects: ManagedObject[] = [];
    searchTerm: string = '';

    constructor(
        private service: ManagedObjectService,
        private confirmService: ConfirmService,
        public authorizationService: AuthorizationService,
    ) { }

    ngOnInit(): void {
        this.load();
    }

    load(): void {
        this.service.list()
            .subscribe((managedObjects: ManagedObject[]) => {
                this.managedObjects = managedObjects;
            });
    }

    delete(managedObjectId: number): void {
        this.confirmService.confirm("Confirmação", "Você tem certeza que deseja apagar este Managed Object").subscribe(result => {
            if (result) {
                this.service.delete(managedObjectId).subscribe(() => {
                    this.load();
                });
            }
        });
    }

}
