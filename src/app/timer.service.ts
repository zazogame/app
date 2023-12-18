import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private timerSubscription: Subscription | undefined;
  constructor() { }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.timer$.next(this.timer$.value + 1);
    });
  }

  stopTimer(): void {
    this.timerSubscription?.unsubscribe();
  }

  getTimer(): BehaviorSubject<number> {
    return this.timer$;
  }
}
