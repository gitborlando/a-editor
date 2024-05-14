import { useCallback, useEffect, useMemo, useRef } from 'react'
import { OBB } from '~/editor/math/obb'
import { OperateNode } from '~/editor/operate/node'
import { Schema } from '~/editor/schema/schema'
import { INode, INodeParent } from '~/editor/schema/type'
import { IStageElement, StageDraw } from '~/editor/stage/draw/draw'
import { getNodeCenterXY } from '~/shared/utils/normal'
import { FrameComp } from './elements/frame'
import { TextComp } from './elements/text'
import { VectorComp } from './elements/vector'

export function useRenderChildren(children: INode[]) {
  return children.map((node) => {
    if (node.type === 'vector') return <VectorComp key={node.id} vector={node} />
    if (node.type === 'text') return <TextComp key={node.id} text={node} />
    if (node.type === 'frame') return <FrameComp key={node.id} frame={node} />
  })
}

export function useMemoChildren(node: INodeParent) {
  const curChildren = node.childIds.map(Schema.find<INode>)
  const lastChildren = useRef(curChildren).current
  if (curChildren.length !== lastChildren.length) {
    return curChildren
  }
  for (let i = 0; i < curChildren.length; i++) {
    if (curChildren[i] !== lastChildren[i]) return curChildren
  }
  return lastChildren
}

export function useResetOBB(node: INode) {
  const { width, height, rotation } = node
  const [centerX, centerY] = getNodeCenterXY(node).toArray()
  useMemo(() => {
    const obb = new OBB(centerX, centerY, width, height, rotation)
    OperateNode.setNodeRuntime(node.id, { obb })
  }, [centerX, centerY, width, height, rotation])
}

export function useCollectRef<T extends IStageElement>(node: INode) {
  const ref = useRef<T>(null)
  useEffect(() => {
    OperateNode.setNodeRuntime(node.id, { element: ref.current! })
  }, [ref.current])
  return ref
}

export function useDraw(node: INode) {
  return useCallback((element: IStageElement) => StageDraw.drawNode(element, node), [node])
}
