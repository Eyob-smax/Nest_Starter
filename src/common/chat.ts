import { Observable } from 'rxjs';

export const weather = new Observable((observer) => {
  observer.next('hi');
  observer.next('how are u');
  observer.next("I'm fine");
});
