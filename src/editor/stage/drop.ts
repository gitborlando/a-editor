import autobind from 'class-autobind-decorator'
import { Uploader } from '~/global/upload'
import { preventDefault } from '~/shared/utils/event'
import { Img } from '../editor/img'
import { xy_, xy_client } from '../math/xy'
import { OperateNode } from '../operate/node'
import { OperatePage } from '../operate/page'
import { SvgParser } from '../parse/svg'
import { SchemaDefault } from '../schema/default'
import { Schema } from '../schema/schema'
import { INodeParent } from '../schema/type'
import { Pixi } from './pixi'
import { StageViewport } from './viewport'

@autobind
export class StageDropService {
  private sceneXY = xy_(0, 0)
  private files: File[] = []
  private containerNode!: INodeParent
  initHook() {
    Pixi.inited.hook(() => {
      Pixi.addListener('dragover', preventDefault())
      Pixi.addListener('drop', preventDefault(this.onDrop))
    })
  }
  private async onDrop(e: DragEvent) {
    this.sceneXY = StageViewport.toSceneXY(xy_client(e))
    this.getContainerNode()
    await this.onDropData(e)
    await this.onDropFile(e)
    Schema.finalOperation('drop 导入文件')
  }
  private async onDropData(e: DragEvent) {
    const transferData = e.dataTransfer?.getData('text/plain')
    if (!transferData) return
    const { event, data } = JSON.parse(transferData)
    switch (event) {
      case 'dropSvg':
        this.dropSvg(data.svgStr, data.name)
        break
      case 'dropImage':
        this.dropImage(data.url)
        break
    }
  }
  private async onDropFile(e: DragEvent) {
    this.files = Array.from(e.dataTransfer?.files || [])
    for (const file of this.files) {
      switch (file.type) {
        case 'image/svg+xml':
          const svg = await Uploader.readAsText(file)
          this.dropSvg(svg, file.name)
          break
      }
    }
  }
  private dropSvg(svgString: string, name: string) {
    const svgFrame = new SvgParser(svgString, this.sceneXY).parse()
    svgFrame.name = name
    OperateNode.insertAt(this.containerNode, svgFrame)
  }
  private async dropImage(url: string) {
    const image = await Img.getImageAsync(url)
    const option = { ...this.sceneXY, width: image.width, height: image.height }
    const rect = SchemaDefault.rect(option)
    rect.fills = [SchemaDefault.fillImage(url)]
    OperateNode.addNodes([rect])
    OperateNode.insertAt(this.containerNode, rect)
  }
  private getContainerNode() {
    this.containerNode =
      [...OperateNode.hoverIds.value]
        .reverse()
        .map(Schema.find<INodeParent>)
        .find((node) => {
          return node?.type === 'frame'
        }) || OperatePage.curPage.value
  }
}

export const StageDrop = new StageDropService()
