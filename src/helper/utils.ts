import { IAutorunOptions, IReactionOptions, IReactionPublic, autorun, reaction } from 'mobx'
import { useEffect } from 'react'

export type INoopFunc = typeof noopFunc
export function noopFunc() {}

export const debounce = <F extends (...args: any[]) => any>(func: F, delay: number) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<F>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export const throttleAnimationFrame = <F extends (...args: any[]) => any>(callback: F) => {
  let requestId: number | null = null
  let previousTime = 0
  return (...args: Parameters<F>) => {
    const currentTime = performance.now()
    if (currentTime - previousTime <= 16) return
    if (requestId) cancelAnimationFrame(requestId)
    requestId = requestAnimationFrame(() => {
      callback(...args)
      previousTime = currentTime
    })
  }
}

export function useAutoRun(view: (r: IReactionPublic) => any, opts?: IAutorunOptions) {
  useEffect(() => {
    const disposer = autorun(view, opts)
    return () => disposer()
  }, [])
}

export function watchChange(expression: (r: IReactionPublic) => any) {
  return {
    then: (
      effect: (arg: any, prev: any, r: IReactionPublic) => void,
      opts?: IReactionOptions<any, true> | undefined
    ) => {
      reaction(expression, effect, { ...opts, fireImmediately: true })
    },
  }
}

export function timeRecord() {
  let start = performance.now()
  return (text?: any) => {
    console.log(text, performance.now() - start)
  }
}
