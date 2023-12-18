import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChooserComponent } from './chooser/chooser.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SongtestComponent } from './songtest/songtest.component';
import { FormsModule } from '@angular/forms';
import { TimerService } from './timer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet , ChooserComponent, DragDropModule, SongtestComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  showChooser: boolean = false;
  title = 'The Zazo Game';
  constructor(private timerService: TimerService){}
  startGame() {
    this.showChooser = true;
    this.timerService.startTimer();
  }
}
