"use client";
import React from "react";

type ContractResult = [string[], string[], number[]];



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
  Search,
  Users,
  SettingsIcon,
  FileSignature,
  Stamp,
  Copy,
  Check,
  Shield,
  Hash,
  Clock,
} from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useState } from "react";
import { keccak256, toUtf8Bytes } from "ethers";
import { abi } from "@/abi/abi";
import {
  CampModal,
} from "@campnetwork/origin/react";
import { useWriteContract, useReadContract } from "wagmi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@campnetwork/origin/react";
import Image from "next/image";
import logo from "@/assets/writestamp.png";
import Link from "next/link";

export default function DappPage() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [uri, setUri] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [checkHash, setCheckHash] = useState("");

  const { address, isConnected } = useAccount();
  const { isAuthenticated } = useAuth();
  const contractAddress = "0x843E3ffaf094294a520690cBe4dD5aC123851b92";

  const { writeContractAsync, isPending } = useWriteContract();

  const {
    data: submissions,
  } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getDetailedSubmissionsByAuthor",
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  }) as {
    data: ContractResult | undefined;
  };

  console.log("Submissions:", submissions);

  const submissionList = submissions
    ? submissions[0].map((hash: string, idx: number) => ({
        hash,
        author: submissions[1][idx],
        timestamp: new Date(
          Number(submissions[2][idx]) * 1000
        ).toLocaleString(),
      }))
    : [];

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
      if (!isAuthenticated) {
        alert("Please authenticate first");
        return;
      }
      const hashValue = keccak256(toUtf8Bytes(content));
      setHash(hashValue);
      console.log("Generated hash:", hashValue);

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: abi,
        functionName: "registerWork",
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

  const copyHash = () => {
    console.log("copy");
    navigator.clipboard.writeText(hash);
    toast.success("Hash copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { refetch: refetchHashStatus } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "checkIfRegistered",
    args: checkHash ? [checkHash] : undefined,
    query: {
      enabled: false,
    },
  });

  const handleCheckHash = async () => {
    if (!checkHash.trim()) {
      toast.error("Enter a hash to check");
      return;
    }
    try {
      const { data } = await refetchHashStatus();
      if (data) {
        const hashStatus = data as [boolean];
        if (hashStatus[0]) {
          console.log(data, "checkdata");
          toast.success("✅ This hash is already registered");
        } else {
          toast.info("❌ This hash is NOT registered");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Error checking hash");
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30">
      <ToastContainer />
      {/* Enhanced decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18rem] -z-10 h-[38rem] w-[78rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-400/30 via-brand-300/25 to-brand-600/35 blur-3xl" />
        <div className="absolute right-0 top-1/4 -z-10 h-[24rem] w-[24rem] rounded-full bg-gradient-to-bl from-brand-200/40 to-brand-400/20 blur-2xl" />
        <div className="absolute inset-0 [background:linear-gradient(to_right,rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.08)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <div className="container mx-auto grid min-h-screen grid-cols-1 gap-8 px-6 py-6 lg:grid-cols-[280px_1fr]">
        {/* Enhanced Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-6 space-y-6">
            <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 p-4 shadow-lg backdrop-blur-xl">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative">
                  <Image src={logo} alt="Logo" width={70} height={70} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight bg-gradient-to-r from-[#121F35] to-[#676f7e] bg-clip-text text-transparent">
                    Blockchain Registry
                  </div>
                </div>
              </Link>
              <div>
                
              </div>
            </div>

            <nav className="space-y-2">
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

            <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4 text-brand-600" />
                <div className="text-sm font-semibold text-gray-900">
                  Network
                </div>
              </div>
              <div className="mb-4 text-xs text-gray-600">
                Choose your preferred chain
              </div>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="justify-start bg-white/70 border-brand-200/50 hover:bg-brand-50 hover:border-brand-300 transition-all duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-orange-400 mr-2"></div>
                  Mainnet (coming soon)
                </Button>
                <Button
                  variant="outline"
                  className="justify-start bg-gradient-to-r from-brand-50 to-brand-100 border-brand-300 text-brand-700 hover:from-brand-100 hover:to-brand-200 transition-all duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                  L2 (recommended)
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Enhanced Main Content */}
        <section className="pb-10">
          <div className="sticky top-0 z-30 mb-8 -mx-6 border-b border-white/40 bg-white/80 px-6 py-5 backdrop-blur-xl shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-brand-700 bg-clip-text text-transparent">
                  Writing Registry
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Secure your intellectual property on the blockchain
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ConnectButton />
                <CampModal />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-8 lg:col-span-2">
              <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-brand-200/50 bg-gradient-to-br from-brand-50 to-brand-100 p-3 shadow-sm">
                      <FileSignature className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Register new work
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        Hash, title, and optional URI. Keep content
                        private, register only the hash.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="content"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Your content
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Paste your text. In production, we'll hash it locally."
                      className="min-h-[160px] resize-vertical border-brand-200/50 bg-white/80 focus:border-brand-400 focus:ring-brand-200 transition-all duration-200"
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                      <Label
                        htmlFor="title"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="e.g., Ode to Permanence"
                        className="border-brand-200/50 bg-white/80 focus:border-brand-400 focus:ring-brand-200 transition-all duration-200"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="uri"
                        className="text-sm font-semibold text-gray-700"
                      >
                        URI
                      </Label>
                      <Input
                        id="uri"
                        placeholder="ipfs://... , optional "
                        className="border-brand-200/50 bg-white/80 focus:border-brand-400 focus:ring-brand-200 transition-all duration-200"
                        onChange={(e) => setUri(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      onClick={registerArticle}
                      disabled={isPending}
                      className={
                        isPending
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[#121F35] hover:bg-[#121F35]/80 transition-all duration-200 text-white"
                      }
                    >
                      {isPending ? "Registering..." : "Register"}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-brand-200 hover:bg-brand-50 transition-all duration-200 bg-transparent"
                      onClick={() => {
                        setContent("");
                        setTitle("");
                        setUri("");
                        setHash("");
                      }}
                    >
                      Clear
                    </Button>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Input
                        placeholder="Generated hash will appear here"
                        className="border-brand-200/50 bg-brand-50/50 text-xs font-mono"
                        value={hash}
                        readOnly
                      />
                      {copied ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 border-brand-200 hover:bg-brand-50 bg-transparent"
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 border-brand-200 hover:bg-brand-50 bg-transparent"
                          onClick={copyHash}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-xl border border-brand-200/50 bg-gradient-to-br from-brand-50 to-brand-100 p-3 shadow-sm">
                      <Stamp className="h-5 w-5 text-brand-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Verify by content hash
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        Check registration status using a 0x-prefixed keccak256
                        hash.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-[1fr_auto]">
                  <Input
                    placeholder="0x..."
                    value={checkHash}
                    onChange={(e) => setCheckHash(e.target.value)}
                    className="border-brand-200/50 bg-white/80 focus:border-brand-400 focus:ring-brand-200 font-mono transition-all duration-200"
                  />
                  <Button
                    onClick={handleCheckHash}
                    className="bg-[#121F35] hover:bg-[#121F35]/80 transition-all duration-200 text-white"
                  >
                    Check
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-brand-200/50 bg-gradient-to-br from-brand-50 to-brand-100 p-3 shadow-sm">
                      <Users className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        Author submissions
                      </CardTitle>
                      <CardDescription className="text-gray-600 mt-1">
                        Browse works by wallet address
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <div className="min-w-[560px]">
                    <div className="grid grid-cols-5 gap-4 border-b border-brand-100 pb-3 text-sm font-semibold text-gray-700">
                      <div className="flex items-center gap-2">
                        <Hash className="h-3 w-3" />
                        Hash
                      </div>
                      <div>Title</div>
                      <div>URI</div>
                      <div>Author</div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Timestamp
                      </div>
                    </div>
                    {submissionList.length > 0 ? (
                      submissionList.map((submission, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-5 gap-4 py-4 text-sm border-b border-gray-100 last:border-0 hover:bg-brand-50/30 transition-colors duration-200"
                        >
                          <div className="truncate font-mono text-brand-700 bg-brand-50 px-2 py-1 rounded text-xs">
                            {submission.hash}
                          </div>
                          <div className="truncate font-medium">
                            {title || "Untitled"}
                          </div>
                          <div className="truncate text-brand-600">
                            {uri || "N/A"}
                          </div>
                          <div className="truncate font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {submission.author}
                          </div>
                          <div className="truncate text-gray-600">
                            {submission.timestamp}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-sm text-gray-600">
                        No submissions found.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                {isAuthenticated ? (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        Welcome, Writer!
                      </CardTitle>
                      {/* <CardDescription className="text-gray-600">
                        Connect to sign and register
                      </CardDescription> */}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                      >
                        {isConnected ? "Connected" : "Connect Wallet"}
                      </Button>
                    </CardContent>
                  </>
                ) : (
                  <>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-bold text-gray-900">
                        Wallet
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Connect to sign and register
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                      >
                        {isConnected ? "Connected" : "Connect Wallet"}
                      </Button>
                      <div className="rounded-xl border border-brand-200/50 bg-gradient-to-br from-brand-50/50 to-white/80 p-4 text-sm text-gray-600">
                        Wallet details will appear here after connecting.
                      </div>
                    </CardContent>
                  </>
                )}
              </Card>

              <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    Network
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Switch RPC/network
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Button
                    variant="outline"
                    className="justify-start bg-white/70 border-brand-200/50 hover:bg-brand-50 transition-all duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                    Basecamp Testnet
                  </Button>
                </CardContent>
              </Card>

              {/* <Card className="border-white/60 bg-white/90 shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-gray-900">Recent activity</CardTitle>
                  <CardDescription className="text-gray-600">Latest transactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-brand-50 border border-green-200/50">
                    <span className="text-gray-700 font-medium">Registered "Ode to Permanence"</span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">2m</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-brand-50 border border-blue-200/50">
                    <span className="text-gray-700 font-medium">Verified content hash</span>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">12m</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-brand-50 border border-gray-200/50">
                    <span className="text-gray-700 font-medium">Switched network</span>
                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">1h</span>
                  </div>
                </CardContent>
              </Card> */}
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
        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200",
        active
          ? "border-brand-300 bg-gradient-to-r from-brand-100 to-brand-200 text-brand-800 shadow-md"
          : "border-white/60 bg-white/80 hover:bg-brand-50 hover:border-brand-200 shadow-sm hover:shadow-md",
      ].join(" ")}
    >
      <span className={active ? "text-brand-600" : "text-gray-600"}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}
