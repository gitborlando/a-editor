import { createCache } from '~/shared/cache'
import { autobind } from '~/shared/decorator'
import { SchemaNode } from './node'
import { SchemaPage } from './page'
import { Schema } from './schema'
import { INode, INodeParent, IPage } from './type'

type ITraverseData = {
  id: string
  node: INode
  index: number
  depth: number
  childIds: string[] | undefined
  ancestors: string[]
  abort: AbortController
  upLevelRef: ITraverseData | undefined
}
type ITraverseCallback = (arg: ITraverseData) => any

type INodeRuntime = {
  ancestorIds: string[]
}

@autobind
export class SchemaUtilService {
  nodeRuntime = createCache<INodeRuntime>()
  findParent(id: string) {
    const { parentId } = SchemaNode.find(id)
    if (this.isPage(parentId)) return SchemaPage.find(parentId)
    const node = SchemaNode.find(parentId)
    if ('childIds' in node) return node
  }
  insertBefore(parent: INodeParent | IPage, node: INode, anotherId: string) {
    const index = parent.childIds.findIndex((i) => i === anotherId)
    SchemaNode.connectAt(parent, node, index - 1)
  }
  insertAfter(parent: INodeParent | IPage, node: INode, anotherId: string) {
    const index = parent.childIds.findIndex((i) => i === anotherId)
    SchemaNode.connectAt(parent, node, index + 1)
  }
  getChildIds(id: string) {
    if (this.isPage(id)) return SchemaPage.find(id)?.childIds || []
    const node = SchemaNode.find(id)
    return 'childIds' in node ? node.childIds : []
  }
  getChildren(id: string) {
    return this.getChildIds(id).map((id) => SchemaNode.find(id))
  }
  isPage(id: string) {
    return id.startsWith('page')
  }
  isFrame(id: string) {
    return SchemaNode.find(id).type === 'frame'
  }
  isContainerNode(target: string | INode) {
    const node = typeof target === 'string' ? SchemaNode.find(target) : target
    return 'childIds' in node
  }
  parentIsPage(id: string) {
    return SchemaNode.find(id).parentId.startsWith('page')
  }
  traverse(callback: ITraverseCallback, bubbleCallback?: ITraverseCallback) {
    this.traverseIds(SchemaPage.currentPage.value.childIds, callback, bubbleCallback)
  }
  traverseFromSomeId(id: string, callback: ITraverseCallback, bubbleCallback?: ITraverseCallback) {
    let canTraverse = false
    this.traverse(
      (props) => {
        if (props.id === id) canTraverse = true
        if (!canTraverse) return
        return callback(props)
      },
      (props) => {
        if (props.id === id) props.abort.abort()
        bubbleCallback?.(props)
      }
    )
  }
  traverseIds(ids: string[], callback: ITraverseCallback, bubbleCallback?: ITraverseCallback) {
    const abort = new AbortController()
    const traverse = (ids: string[], depth: number, upLevelRef?: ITraverseData) => {
      ids.forEach((id, index) => {
        if (abort.signal.aborted) return
        const node = SchemaNode.find(id)
        const childIds = 'childIds' in node ? node.childIds : undefined
        const ancestors = upLevelRef ? [...upLevelRef.ancestors, upLevelRef.id] : []
        const props = { id, node, index, childIds, depth, abort, upLevelRef, ancestors }
        const isContinue = callback(props)
        if (isContinue !== false && childIds) traverse(childIds, depth + 1, props)
        bubbleCallback?.(props)
      })
    }
    traverse(ids, 0)
  }
  logSchema() {
    const newSchema = structuredClone(Schema.getSchema())
    console.log(newSchema)
  }
  private initNodeRuntime() {
    this.traverse(({ id, depth, ancestors }) => {
      this.nodeRuntime.get(id).ancestorIds = ancestors
    })
  }
}

export const SchemaUtil = new SchemaUtilService()
