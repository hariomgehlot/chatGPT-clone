import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatService, message } from '../chat.service';
import { CommonModule } from '@angular/common';
import { HttpDownloadProgressEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  formGroup = new FormGroup({
    message: new FormControl(''),
  });
  chatService = inject(ChatService);
  chatList: message[] = [];
  sendMessage() {
    const message = this.formGroup.controls.message.value;
    if (!message) return;
    const responseMessage: message = {
      isLeft: false,
      message: '...',
    };
    this.chatList.push({
      message: message,
      isLeft: true,
    });
    this.chatList.push(responseMessage);
    this.chatService.sendMessage(message).subscribe({
      next: (success) => {
        if (success.type === HttpEventType.DownloadProgress) {
          responseMessage.message =
            (success as HttpDownloadProgressEvent).partialText + '…';
        } else if (success.type === HttpEventType.Response) {
          responseMessage.message = success.body ? success.body : '';
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.formGroup.controls.message.setValue('');
      },
    });
  }
}
