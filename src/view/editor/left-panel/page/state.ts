import { makeObservable, observable } from 'mobx'
import { autobind } from '~/editor/helper/decorator'

@autobind
export class PageCompShareState {
  @observable collapsed = false
  constructor() {
    makeObservable(this)
  }
  setCollapsed(collapsed: boolean) {
    this.collapsed = collapsed
    return this
  }
}

export const pageCompShareState = new PageCompShareState()
