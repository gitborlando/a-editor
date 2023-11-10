import Konva from 'konva'
import { IXY } from '~/helper/utils'
import { EditorService } from '~/service/editor/editor'
import { INode } from '~/service/schema/type'
import { StageService } from '../stage'
import { StageStatus } from './status'

const createTypes = ['frame', 'rect', 'ellipse', 'polygon', 'line', 'text', 'img'] as const
type ICreateType = typeof createTypes[number]

export class StageStatusCreate {
  types = createTypes
  currentType: ICreateType = 'frame'
  private _node?: INode
  private _item?: Konva.Shape
  constructor(
    private status: StageStatus,
    private stage: StageService,
    private editor: EditorService
  ) {}
  private get node(): INode {
    return this._node!
  }
  private get item(): Konva.Shape {
    return this._item!
  }
  start() {
    this.editor.Drag.onStart(({ absoluteStart }) => {
      if (this.currentType === 'frame') this.createRect(absoluteStart)
      if (this.currentType === 'rect') this.createRect(absoluteStart)
      if (this.currentType === 'ellipse') this.createEllipse(absoluteStart)
      if (this.currentType === 'line') this.createRect(absoluteStart)
      if (this.currentType === 'text') this.createRect(absoluteStart)
      if (this.currentType === 'img') this.createRect(absoluteStart)
      this.add()
    })
      .onMove(({ absoluteMarquee: { x, y, width, height } }) => {
        if (this.currentType === 'ellipse') {
          this.node.x = x + width / 2
          this.node.y = y + height / 2
          this.node.width = width
          this.node.height = height
        } else {
          this.node.x = x
          this.node.y = y
          this.node.width = width
          this.node.height = height
        }
      })
      .onEnd(({ drag }) => {
        this.stage.setStatus()
        drag.destroy()
      })
  }
  end() {}
  setType(type: ICreateType) {
    this.currentType = type
    this.status.setStatus('create')
  }
  private createRect(absoluteStart: IXY) {
    this._node = this.editor.Schema.Default.rect({
      x: absoluteStart.x,
      y: absoluteStart.y,
      width: 0,
      height: 0,
    })
    this._item = this.stage.draw.rect()
  }
  private createEllipse(absoluteStart: IXY) {
    this._node = this.editor.Schema.Default.ellipse({
      x: absoluteStart.x,
      y: absoluteStart.y,
      width: 0,
      height: 0,
    })
    this._item = this.stage.draw.ellipse()
  }
  private add() {
    this.editor.Schema.addNode(this.node)
    this.editor.autoSchemaToItem(this.node, this.item)
    this.stage.mainLayer.add(this.item)
    //this.stage.transformer.nodes([this.item])
  }
}
