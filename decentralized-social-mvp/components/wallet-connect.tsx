"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, LogOut, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, error } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            {`${address.slice(0, 6)}...${address.slice(-4)}`}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => disconnect()} className="gap-2">
            <LogOut className="h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Check if no wallet is available
  if (connectors.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Button disabled className="gap-2">
          <Wallet className="h-4 w-4" />
          No Wallet Found
        </Button>
        <Alert className="max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Please install MetaMask or another Web3 wallet to continue.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-2"
            disabled={isPending}
          >
            <Wallet className="h-4 w-4" />
            {isPending ? "Connecting..." : "Connect Wallet"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {connectors.map((connector) => (
            <DropdownMenuItem key={connector.uid} onClick={() => connect({ connector })} disabled={isPending}>
              {connector.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {error && (
        <Alert className="max-w-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">{error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
