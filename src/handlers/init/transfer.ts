import {BridgeContext, createBridgeContext} from "next-bridge";

export const updateTransferStatusBridge: BridgeContext<{transactionId: string, status: string, fp: string}> = createBridgeContext("updateTransfer", "transfer")
export const loadTransferStatusBridge: BridgeContext<{panelID: string, fp: string}> = createBridgeContext("loadStatus", "transfer")
