import autobind from 'class-autobind-decorator'
import { OperateNode } from 'src/editor/operate/node'
import { OperatePage } from 'src/editor/operate/page'
import { SchemaDefault } from 'src/editor/schema/default'
import { Schema } from 'src/editor/schema/schema'
import { INode, INodeParent } from 'src/editor/schema/type'
import { StageScene } from 'src/editor/stage/render/scene'
import { Drag, type IDragData } from 'src/global/event/drag'
import { createSignal } from 'src/shared/signal/signal'
import { createDisposer } from 'src/shared/utils/disposer'
import { IXY } from 'src/shared/utils/normal'
import { SchemaUtil } from 'src/shared/utils/schema'
import { StageViewport } from '../viewport'
import { StageInteract } from './interact'
import { StageSelect } from './select'

const createTypes = ['frame', 'rect', 'ellipse', 'line', 'polygon', 'star', 'text'] as const
export type IStageCreateType = (typeof createTypes)[number]

@autobind
class StageCreateService {
  createTypes = createTypes
  currentType = createSignal<IStageCreateType>('frame')
  private createNodeId = ''
  private disposer = createDisposer()

  startInteract() {
    this.disposer.push(StageScene.sceneRoot.on('mousedown', this.create, { capture: true }))
  }

  endInteract() {
    this.disposer.dispose()
  }

  private create() {
    Drag.onDown(this.onCreateStart).onMove(this.onCreateMove).onDestroy(this.onCreateEnd)
  }

  private onCreateStart({ start }: IDragData) {
    const node = this.createNode(start)
    OperateNode.addNodes([node])
    OperateNode.insertAt(this.findParent(), node)
    StageSelect.onCreateSelect(this.createNodeId)
  }

  private onCreateMove({ marquee }: IDragData) {
    const node = Schema.find(this.createNodeId)
    const { x, y, width, height } = StageViewport.toSceneMarquee(marquee)
    Schema.itemReset(node, ['x'], x)
    Schema.itemReset(node, ['y'], y)
    Schema.itemReset(node, ['width'], width)
    Schema.itemReset(node, ['height'], height)
    Schema.commitOperation('创建 node 中...')
    Schema.nextSchema()
  }

  private onCreateEnd() {
    const node = Schema.find<INode>(this.createNodeId)
    if (node.width === 0) {
      Schema.itemReset(node, ['width'], 100)
      Schema.itemReset(node, ['height'], 100)
    }
    Schema.finalOperation('创建节点 ' + node.name)
    StageInteract.currentType.dispatch('select')
  }

  private createNode(start: IXY) {
    const { x, y } = StageViewport.toSceneXY(start)
    const node = SchemaDefault[this.currentType.value]({ x, y, width: 0, height: 0 })
    this.createNodeId = node.id
    return node
  }

  private findParent() {
    const frameId = [...OperateNode.hoverIds.value]
      .reverse()
      .find((id) => SchemaUtil.isById(id, 'frame'))
    if (frameId) return Schema.find<INodeParent>(frameId)
    return OperatePage.currentPage
  }
}

export const StageCreate = new StageCreateService()
