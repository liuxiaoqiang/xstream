import {InternalProducer} from '../InternalProducer';
import {InternalListener} from '../InternalListener';

export class PeriodicProducer implements InternalProducer<number> {
  private intervalID: any = -1;
  private i: number = 0;

  constructor(public period: number) {
  }

  _start(stream: InternalListener<number>): void {
    const self = this;
    function intervalHandler() { stream._n(self.i++); }
    this.intervalID = setInterval(intervalHandler, this.period);
  }

  _stop(): void {
    if (this.intervalID !== -1) clearInterval(this.intervalID);
    this.intervalID = -1;
    this.i = 0;
  }
}
