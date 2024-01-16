import { autobind } from '~/shared/decorator'
import { createSignal } from '~/shared/signal'
import { IFill } from '../schema/type'

@autobind
export class OperateFillService {
  fills = createSignal<IFill[]>([])
}

export const OperateFill = new OperateFillService()
