import { MatDialog } from '@angular/material';
import { HostListener } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../components/utils/confirmation-modal/confirmation-modal.component';
import { RouterStateSnapshot } from '@angular/router';
import { UnsavedChange } from './unsaved-change.domain';

export abstract class VolatileComponent {
    private dialog: MatDialog;
    private dialogTitle: string;
    private dialogMessage: string;

    constructor(dialog: MatDialog, title: string, message: string) {
        this.dialog = dialog;
        this.dialogTitle = title;
        this.dialogMessage = message;
    }

    protected abstract hasUnsavedchanges(nextState: RouterStateSnapshot): UnsavedChange;

    @HostListener('window:beforeunload', ['$event'])
    public unloadNotification($event: any) {
        if (this.hasUnsavedchanges) {
            $event.returnValue = this.dialogMessage;
            return this.dialogMessage
        }
    }

    public canDeactivate(nextState: RouterStateSnapshot): Observable<boolean> {
        let res: UnsavedChange = this.hasUnsavedchanges(nextState)
        if (res.hasUnsavedchanges) {
            return this.dialog.open(ConfirmationModalComponent, {
                width: '300px',
                data: {
                    title: res.customTitle || this.dialogTitle,
                    message: res.customMessage || this.dialogMessage
                }
            }).afterClosed().pipe(tap(confirmed => {
                if (res.onAnswer) {
                    res.onAnswer(confirmed)
                }
            }))
        } else {
            return of(true)
        }
    }
}