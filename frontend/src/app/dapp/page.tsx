"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PenTool,
  Search,
  Users,
  SettingsIcon,
  FileSignature,
  Stamp,
  ChevronRight,
  Copy,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { keccak256, toUtf8Bytes } from "ethers";
import { abi } from "@/abi/abi";
import {
  CampModal,
  useModal as useCampModal,
  useConnect,
} from "@campnetwork/origin/react";
import { useWriteContract,useReadContract } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DappPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState("");
  const [hash, setHash] = useState("");

  const { openModal: openCampModal } = useCampModal();
  const [provider, setProvider] = React.useState<any>(null);
  const [sectionIndex, setSectionIndex] = React.useState(0);
  const { disconnect } = useConnect();
  const { address, isConnected } = useAccount();
  const contractAddress = "0x843E3ffaf094294a520690cBe4dD5aC123851b92";

  const { writeContractAsync, isPending, error } = useWriteContract();

  const { data: submissions, isLoading, error: readError } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: 'getSubmissionsByAuthor',
    args: address ? [address] : undefined, // Only run if wallet is connected
    query: {
      enabled: Boolean(address),
    },
  });

  const registerArticle = async () => {
    try {
      if (!content.trim()) {
        alert("Please enter some content to hash");
        return;
      }
      if (!isConnected) {
        alert("Please connect your wallet first");
        return;
      }

      const hashValue = keccak256(toUtf8Bytes(content));
      setHash(hashValue);
      console.log("Generated hash:", hashValue);

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: abi,
        functionName: "registerWork", // change if your contract uses a different name
        args: [hashValue],
      });

      console.log("Transaction sent:", txHash);
      alert(`Transaction submitted: ${txHash}`);
      toast.success(`Transaction submitted: ${txHash}`);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err}`);
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <main className="relative min-h-screen bg-white">
      <ToastContainer />
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18rem] -z-10 h-[38rem] w-[78rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-400/25 via-brand-300/20 to-brand-600/25 blur-3xl" />
        <div className="absolute inset-0 [background:linear-gradient(to_right,rgba(2,132,199,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.10)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="container mx-auto grid min-h-screen grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <PenTool className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">
                  WriteStamp
                </div>
                <div className="text-xs text-muted-foreground">
                  Writing Registry
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <SideLink
                icon={<FileSignature className="h-4 w-4" />}
                label="Register"
                active
              />
              <SideLink icon={<Search className="h-4 w-4" />} label="Verify" />
              <SideLink
                icon={<Users className="h-4 w-4" />}
                label="Author submissions"
              />
              <SideLink
                icon={<SettingsIcon className="h-4 w-4" />}
                label="Settings"
              />
            </nav>

            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur">
              <div className="text-sm font-medium">Network</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Choose your preferred chain
              </div>
              <div className="mt-3 grid gap-2">
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  Mainnet (coming soon)
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                >
                  L2 (recommended)
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <section className="pb-10">
          {/* Topbar */}
          <div className="sticky top-0 z-30 mb-6 -mx-6 border-b bg-white/70 px-6 py-4 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  Writing Registry
                </h1>
                <p className="text-sm text-muted-foreground">
                  Sea-blue themed UI · No wallet or contract yet
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">Docs</Button>
                <ConnectButton />
                <CampModal />
              </div>
            </div>
          </div>

          {/* Content grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Register card (UI only) */}
              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-md border bg-white/80 p-2">
                      <FileSignature className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <CardTitle>Register new work</CardTitle>
                      <CardDescription>
                        Hash, title, and optional URI. Keep content
                        private—register only the hash.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content">Your content</Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your text. In production, we’ll hash it locally."
                      className="min-h-[140px] resize-vertical"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Ode to Permanence"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uri">URI</Label>
                      <Input
                        id="uri"
                        placeholder="ipfs://... or https://..."
                        onChange={(e) => setUri(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={registerArticle}>Register</Button>
                    <Button variant="outline">Clear</Button>
                    {/* <div>in</div> */}
                    <Input placeholder="hash" value={hash} readOnly />
                    <Copy />
                  </div>
                </CardContent>
              </Card>

              {/* Verify card (UI only) */}
              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="rounded-md border bg-white/80 p-2">
                      <Stamp className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <CardTitle>Verify by content hash</CardTitle>
                      <CardDescription>
                        Check registration status using a 0x-prefixed keccak256
                        hash.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <Input placeholder="0x..." />
                  <Button disabled>Check (disabled)</Button>
                </CardContent>
              </Card>

              {/* Author submissions (placeholder table) */}
              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <CardTitle>Author submissions</CardTitle>
                  <CardDescription>
                    Browse works by wallet address (UI only)
                  </CardDescription>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="min-w-[560px]">
                    <div className="grid grid-cols-5 gap-2 border-b pb-2 text-xs font-medium text-muted-foreground">
                      <div>Hash</div>
                      <div>Title</div>
                      <div>URI</div>
                      <div>Author</div>
                      <div>Timestamp</div>
                    </div>
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="grid grid-cols-5 gap-2 py-3 text-xs"
                      >
                        <div className="truncate font-mono">
                          0xabcdef...{i}c
                        </div>
                        <div className="truncate">Sample Title {i}</div>
                        <div className="truncate">ipfs://bafy...{i}</div>
                        <div className="truncate">0x1234...56{i}</div>
                        <div className="truncate">2025-08-01 12:34</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right rail */}
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <CardTitle>Wallet</CardTitle>
                  <CardDescription>
                    Connect to sign and register (coming soon)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button disabled className="w-full">
                    Connect Wallet (disabled)
                  </Button>
                  <div className="rounded-md border bg-white/60 p-3 text-xs text-muted-foreground">
                    Wallet details will appear here after connecting.
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <CardTitle>Network</CardTitle>
                  <CardDescription>
                    Switch RPC/network (UI only)
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                  >
                    Ethereum
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                  >
                    Layer 2
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                  >
                    Testnet
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur">
                <CardHeader>
                  <CardTitle>Recent activity</CardTitle>
                  <CardDescription>Placeholder events list</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Registered “Ode to Permanence”
                    </span>
                    <span className="text-xs text-muted-foreground">2m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Verified content hash
                    </span>
                    <span className="text-xs text-muted-foreground">12m</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Switched network
                    </span>
                    <span className="text-xs text-muted-foreground">1h</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SideLink({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={[
        "flex w-full items-center gap-2 rounded-md border px-3 py-2 text-sm transition",
        active
          ? "border-brand-200 bg-brand-50 text-brand-800"
          : "bg-white/70 hover:bg-brand-50/60",
      ].join(" ")}
    >
      <span className="opacity-80">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
