import { NgModule } from '@angular/core';
// third party service
import { ToastService } from './services/toast.service';
// third party module
import { ToastrModule } from 'ngx-toastr';
// component
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
// service
import { ConfirmationBoxService } from './services/confirmation-box.service';

@NgModule({
    declarations: [
        ConfirmationBoxComponent
    ],
    imports: [
        ToastrModule.forRoot({
            timeOut: 2000,
        }) 
    ],
    entryComponents: [ConfirmationBoxComponent],
    exports: [ConfirmationBoxComponent],
    providers: [ConfirmationBoxService, ToastService],
})
export class SharedModule { }