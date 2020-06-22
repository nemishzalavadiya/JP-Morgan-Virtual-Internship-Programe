import { ServerRespond } from './DataStreamer';

export interface Row {
      price_abc: number,
      price_def: number,
      ratio: number,
      timestamp: Date,
      upper_bound: number,
      lower_bound: number,
      trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const cABC = (serverRespond[0].top_ask.price+serverRespond[0].top_bid.price)/2;
    const DEF = ( serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio = cABC/DEF;
    const upperbound = 1 + 0.15;
    const lowerbound = 1 - 0.15;
      return {
        price_abc: cABC,
        price_def: DEF,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ? 
        serverRespond[0].timestamp: serverRespond[1].timestamp,
        upper_bound: upperbound,
        lower_bound: lowerbound,
        trigger_alert: (ratio>upperbound|| ratio<lowerbound) ? ratio : undefined,
      };
    }
}
