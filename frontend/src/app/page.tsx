import type React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PenTool,
  ShieldCheck,
  Clock,
  LinkIcon,
  Search,
  ChevronRight,
  BookOpenText,
  Users,
  Stamp,
  FileSignature,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"




export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* Global decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* soft radial glow in sea blue */}
        <div className="absolute left-1/2 top-[-18rem] -z-10 h-[38rem] w-[78rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-400/25 via-brand-300/20 to-brand-600/25 blur-3xl" />
        {/* grid pattern with mask */}
        <div className="absolute inset-0 [background:linear-gradient(to_right,rgba(2,132,199,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.12)_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(80%_60%_at_50%_20%,black,transparent)]" />
      </div>

      <Header />
      <Hero />

      <section id="features" className="container mx-auto px-6 py-16 md:py-24">
        <Features />
      </section>

      <section id="how" className="container mx-auto px-6 py-16 md:py-24">
        <HowItWorks />
      </section>

      <section className="container mx-auto px-6 py-8">
        <StatsStrip />
      </section>

      <section id="faq" className="container mx-auto px-6 py-16 md:py-24">
        <FAQ />
      </section>

      <CalloutCta />
      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 opacity-30 blur-sm transition group-hover:opacity-50" />
            <div className="relative flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <PenTool className="h-4 w-4" />
            </div>
          </div>
          <span className="font-semibold tracking-tight">WriteStamp</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-muted-foreground transition hover:text-foreground">
            Features
          </a>
          <a href="#how" className="text-muted-foreground transition hover:text-foreground">
            How it works
          </a>
          <a href="#faq" className="text-muted-foreground transition hover:text-foreground">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:inline-flex bg-white/70 backdrop-blur">
            Docs
          </Button>
          {/* Default button uses primary tokens which we set to sea blue */}
         <Button asChild>
            <Link href="/dapp">
              Launch App
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="container mx-auto grid items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-2">
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
          Blockchain-based notary for writers
        </div>
        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Permanent, tamper-proof proof that{" "}
          <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
            you wrote it
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Register a keccak256 hash of your writing on-chain, timestamp it, and optionally link to where the content
          lives. Share nothing but the hash—your words remain private unless you choose to reveal them.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#features">
            <Button>
              Get started
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </a>
          <a href="#how">
            <Button variant="outline" className="bg-white/60 backdrop-blur">
              Learn more
            </Button>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <FeatureChip icon={<ShieldCheck className="h-4 w-4 text-brand-600" />} label="Immutable timestamps" />
          <FeatureChip icon={<BookOpenText className="h-4 w-4 text-brand-600" />} label="Privacy-first by design" />
          <FeatureChip icon={<FileSignature className="h-4 w-4 text-brand-600" />} label="Author-owned proofs" />
        </div>

        <LogosStrip />
      </div>

      <div className="relative">
        <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-brand-400/20 to-brand-700/20 blur-2xl" />
        <Card className="relative overflow-hidden border bg-white/70 shadow-xl backdrop-blur">
          <div className="absolute inset-0 bg-[radial-gradient(1000px_300px_at_50%_10%,rgba(2,132,199,0.12),transparent)]" />
          <Image
            src="/placeholder.svg?height=640&width=960"
            alt="Abstract illustration of a blockchain-backed writing registry"
            width={960}
            height={640}
            className="h-full w-full object-cover"
            priority
          />
        </Card>
      </div>
    </section>
  )
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 backdrop-blur">
      {icon}
      <span>{label}</span>
    </div>
  )
}

function LogosStrip() {
  return (
    <div className="mt-10">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">Trusted by builders and creators</p>
      <div className="mt-4 grid grid-cols-3 items-center gap-6 opacity-70 sm:grid-cols-5">
        {["press", "studio", "scribe", "ledger", "ipfs"].map((name) => (
          <div key={name} className="flex items-center justify-center">
            <Image
              src={`/placeholder.svg?height=28&width=100&query=${encodeURIComponent(`${name} logo grayscale`)}`}
              alt={`${name} logo`}
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-brand-600" />,
      title: "Prove authorship",
      desc: "Register the keccak256 hash of your content on-chain to prove ownership without revealing the text.",
    },
    {
      icon: <Clock className="h-5 w-5 text-brand-600" />,
      title: "Immutable timestamps",
      desc: "Every registration is anchored with a block timestamp for verifiable creation time.",
    },
    {
      icon: <LinkIcon className="h-5 w-5 text-brand-600" />,
      title: "Optional metadata",
      desc: "Attach a title and a URI (IPFS, website) where readers can find the work if you choose.",
    },
    {
      icon: <Search className="h-5 w-5 text-brand-600" />,
      title: "Public verification",
      desc: "Anyone can check a work’s registration status by its content hash.",
    },
    {
      icon: <Users className="h-5 w-5 text-brand-600" />,
      title: "Author registry",
      desc: "Browse all submissions by a specific wallet address.",
    },
    {
      icon: <Stamp className="h-5 w-5 text-brand-600" />,
      title: "Portable proofs",
      desc: "Your registration is a public good—verifiable across explorers and tools.",
    },
  ]

  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What you can do</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need for cryptographic authorship proof—private by default, open to verify.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <GlassCard key={f.title} title={f.title} desc={f.desc} icon={f.icon} />
        ))}
      </div>
    </div>
  )
}

function GlassCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon: React.ReactNode
}) {
  return (
    <Card className="group relative overflow-hidden border bg-white/70 shadow-sm transition hover:shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-1 bg-gradient-to-br from-brand-400/20 via-transparent to-brand-700/20" />
      </div>
      <CardHeader className="relative flex-row items-start gap-3 space-y-0">
        <div className="rounded-md border bg-white/80 p-2 backdrop-blur">{icon}</div>
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Hash your text",
      desc: "Compute keccak256(content) client-side. Only the hash is sent on-chain, keeping your words private.",
    },
    {
      step: 2,
      title: "Register on-chain",
      desc: "Submit the hash with optional metadata. The transaction records a permanent timestamp.",
    },
    {
      step: 3,
      title: "Verify anytime",
      desc: "Recompute the hash later and compare it to the on-chain record to verify authorship and time.",
    },
  ]
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">How it works</h2>
        <p className="mt-2 text-muted-foreground">Simple, privacy-preserving, and verifiable.</p>
      </div>

      <div className="relative mx-auto mt-10 grid gap-6 md:grid-cols-3">
        {/* connecting line for desktop */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-0.5 w-full -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-400/30 via-brand-500/30 to-brand-700/30 md:block" />
        {steps.map((s) => (
          <Card
            key={s.step}
            className="relative overflow-hidden border bg-white/70 transition hover:shadow-lg backdrop-blur"
          >
            <CardHeader>
              <Badge className="w-fit bg-brand-600 hover:bg-brand-600 text-white">Step {s.step}</Badge>
              <CardTitle className="mt-2 text-lg">{s.title}</CardTitle>
              <CardDescription>{s.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-2 h-1 w-20 rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function StatsStrip() {
  const stats = [
    { label: "Registered works", value: "12,384" },
    { label: "Authors", value: "5,172" },
    { label: "Avg. cost per proof", value: "~$0.02" },
  ]
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white/70 p-6 backdrop-blur">
      <div className="pointer-events-none absolute -inset-1 bg-[radial-gradient(600px_120px_at_30%_0%,rgba(14,165,233,0.18),transparent),radial-gradient(600px_120px_at_70%_0%,rgba(2,132,199,0.18),transparent)]" />
      <div className="relative grid gap-6 text-center sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-2xl font-semibold tracking-tight">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FAQ() {
  const items = [
    {
      q: "Do I have to reveal my writing to register?",
      a: "No. You register only the keccak256 hash of the text. The original content stays private unless you choose to publish it.",
    },
    {
      q: "Why keccak256?",
      a: "keccak256 is the hashing function used broadly in Ethereum ecosystems, providing a deterministic fingerprint of your content.",
    },
    {
      q: "How do people verify authorship later?",
      a: "They recompute the hash from the original text and compare it to the on-chain record. If it matches, authorship and timestamp are verified.",
    },
    {
      q: "What if I edit my work?",
      a: "Any change results in a different hash. You can register new versions, each with its own timestamp and optional metadata.",
    },
    {
      q: "Which networks are supported?",
      a: "Any EVM-compatible chain can be supported. Mainnet, L2s, or testnets depending on your needs and budget.",
    },
  ]
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Frequently asked questions</h2>
      <Accordion type="single" collapsible className="mt-6">
        {items.map((it, idx) => (
          <AccordionItem key={it.q} value={`item-${idx + 1}`}>
            <AccordionTrigger className="text-left">{it.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CalloutCta() {
  return (
    <section className="relative mx-auto my-16 max-w-5xl px-6">
      <div className="relative overflow-hidden rounded-3xl border bg-white/70 p-8 shadow-xl backdrop-blur md:p-10">
        <div className="pointer-events-none absolute -inset-1 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(14,165,233,0.16),rgba(2,132,199,0.16),transparent_70%)] blur-3xl" />
        <div className="relative grid items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold tracking-tight">Start protecting your words today</h3>
            <p className="mt-2 text-muted-foreground">
              Timestamp your authorship on-chain—private by default, verifiable forever.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Button className="w-full bg-gradient-to-r from-brand-700 to-brand-500 text-white hover:opacity-90 md:w-auto">
              Launch App
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 py-10 text-sm md:flex-row">
        <div className="flex items-center gap-2 text-muted-foreground">
          <PenTool className="h-4 w-4" />
          <span>WriteStamp</span>
          <span className="text-muted-foreground/60">·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" className="transition hover:text-foreground">
            Terms
          </a>
          <a href="#" className="transition hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="transition hover:text-foreground">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}
