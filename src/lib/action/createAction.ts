import {NextApiRequest, NextApiResponse} from "next";
import {request} from "../utilities/request";

interface Parameters {
  [key: string]: any
}

type ContextAction = (data: Parameters, req: NextApiRequest, res: NextApiResponse) => Promise<void>

export interface APIInitialiser {
  namespace: string,
  contextAction: ContextAction
}

export interface ActionContext<T> {
  init(actionBlock: ActionBlock<T>, conditionBlock?: ConditionBlock<T>): APIInitialiser,
  call(parameters: T): Promise<ActionResult>
}

export interface ActionResult {
  status: boolean,
  report: string,
  data?: any
}

interface APIParams {
  req: NextApiRequest,
  res: NextApiResponse,
  fingerPrint: string
}

export type ConditionBlock<T> = ((req: NextApiRequest, res: NextApiResponse, data?: T) => Promise<ActionResult>) | ActionResult | boolean

export type ActionBlock<T> = (APIParams: APIParams, parameters: T, paramsFromCondition) => (ActionResult | Promise<ActionResult>)

export const parseConditionBlock = async (conditionBlock: ConditionBlock<any>, req: NextApiRequest, res: NextApiResponse): Promise<ActionResult> => {
  let condition: ActionResult

  if (typeof conditionBlock === "function") {
    condition = await conditionBlock(req, res)
  } else {
    if (typeof conditionBlock === "boolean") {
      condition = {status: conditionBlock, report: ""}
    } else {
      condition = conditionBlock
    }
  }

  return condition
}

const initActionContext = (namespace: string, actionBlock: ActionBlock<Parameters>, conditionBlock: ConditionBlock<Parameters>): APIInitialiser => {

  const contextAction: ContextAction = async (data, req, res) => {

    let condition: ActionResult

    if (typeof conditionBlock === "function") {
      condition = await conditionBlock(req, res)
    } else {
      if (typeof conditionBlock === "boolean") {
        condition = {status: conditionBlock, report: ""}
      } else {
        condition = conditionBlock
      }
    }

    if (!condition.status) {
      res.json(condition)
      return
    }

    const result = await actionBlock({req, res, fingerPrint: req.body.fp}, data, condition.data)
    res.json(result)

  }

  return {
    namespace,
    contextAction
  }
}

export const createActionContext = (namespace: string, apiPath: string): ActionContext<any> => {

  const call = async (parameters) => {
    return await request(apiPath, namespace, parameters)
  }

  const init = (actionBlock, conditionBlock = true): APIInitialiser  => {
    return initActionContext(namespace, actionBlock, conditionBlock)
  }

  return {init, call}
}
