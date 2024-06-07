import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { SideComponent } from '../side/side.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatComponent, SideComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chat-gpt';
}
