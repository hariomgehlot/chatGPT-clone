import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);

  sendMessage(message: string) {
    const payload = { message };
    return this.http.post('http://localhost:5000/api/chat', payload, {
      responseType: 'text',
      observe: 'events',
      reportProgress: true,
    });
  }
}

export type message = {
  message: string;
  isLeft: boolean;
};
