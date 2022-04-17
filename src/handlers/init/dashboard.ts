import { BridgeContext, createBridgeContext } from "next-bridge"

export const createTempAccUrlBridge: BridgeContext<{ timestamp: number; club: string; fp: string }> =
  createBridgeContext("createTempUrl", "dashboard/report")
