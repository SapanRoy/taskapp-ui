import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
    constructor(private toastrService: ToastrService) {
    }

    success(message: string, title?: string) {
        this.toastrService.success(message, title);
    }
    error(message: string, title?: string) {
        this.toastrService.error(message, title);
    }
    warning(message: string, title?: string) {
        this.toastrService.warning(message, title);
    }
}
