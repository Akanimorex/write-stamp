import type React from "react"
import {
  PenTool,
  ShieldCheck,
  Clock,
  Search,
  ChevronRight,
  Users,
  FileSignature,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Hash,
  Database,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import logo from "@/assets/writestamp.png"
import Image from "next/image"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50/30">
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Primary glow */}
        <div className="absolute left-1/2 top-[-20rem] -z-10 h-[50rem] w-[90rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-brand-400/30 via-brand-300/25 to-brand-600/35 blur-3xl animate-pulse" />
        {/* Secondary accent glow */}
        <div className="absolute right-[-10rem] top-[20rem] -z-10 h-[30rem] w-[40rem] rounded-full bg-gradient-to-bl from-brand-200/40 to-brand-500/20 blur-2xl" />
        {/* Animated grid */}
        <div className="absolute inset-0 [background:linear-gradient(to_right,rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.08)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(90%_70%_at_50%_30%,black,transparent)] animate-pulse" />
        {/* Floating orbs */}
        <div
          className="absolute left-[10%] top-[60%] h-32 w-32 rounded-full bg-gradient-to-r from-brand-300/20 to-brand-500/20 blur-xl animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        />
        <div
          className="absolute right-[15%] top-[40%] h-24 w-24 rounded-full bg-gradient-to-r from-brand-400/15 to-brand-600/15 blur-lg animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "3s" }}
        />
      </div>

      <Header />
      <Hero />

      <section id="features" className="relative container mx-auto px-6 py-20 md:py-32">
        <Features />
      </section>

      <section className="relative">
        <InteractiveShowcase />
      </section>

      <section id="how" className="container mx-auto px-6 py-20 md:py-32">
        <HowItWorks />
      </section>

      {/* <section className="container mx-auto px-6 py-12">
        <StatsStrip />
      </section> */}

      <section id="faq" className="container mx-auto px-6 py-20 md:py-32">
        <FAQ />
      </section>

      <CalloutCta />
      <Footer />
    </main>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="#" className="group flex items-center gap-3">
          <div className="relative">
            <Image src={logo} alt="Logo" width={70} height={70} />
          </div>
          <div>
            
            <div className="text-xs font-bold tracking-tight bg-gradient-to-r from-[#121F35] to-[#676f7e] bg-clip-text text-transparent">Blockchain Registry</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#features"
            className="text-slate-600 transition-all duration-200 hover:text-brand-700 hover:scale-105"
          >
            Features
          </a>
          <a href="#how" className="text-slate-600 transition-all duration-200 hover:text-brand-700 hover:scale-105">
            How it works
          </a>
          <a href="#faq" className="text-slate-600 transition-all duration-200 hover:text-brand-700 hover:scale-105">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex bg-white/80 backdrop-blur border-brand-200 hover:bg-brand-50 hover:border-brand-300 transition-all duration-200"
          >
            <Link target="_blank" href="https://github.com/Akanimorex/write-stamp">
            Documentation
            </Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-[#121F35] to-[#121F35] hover:from-brand-700 hover:to-brand-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Link href="/dapp">
              Launch App
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative container mx-auto px-6 py-20 md:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 rounded-full border border-brand-200/50 bg-white/80 px-4 py-2 text-sm text-brand-700 backdrop-blur-sm shadow-sm animate-fade-in">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-brand-600">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-medium">Blockchain-powered authorship proof</span>
            <Sparkles className="h-4 w-4 text-brand-500" />
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block">Your words,</span>
            <span className="block bg-gradient-to-r from-[#121F35] to-[#676f7e] bg-clip-text text-transparent">
              forever proven
            </span>
          </h1>

          <p className="mt-8 text-xl leading-relaxed text-slate-600 md:text-2xl">
            The first <span className="font-semibold text-brand-700">privacy-first</span> blockchain registry for
            writers. Prove authorship without revealing content. Timestamp creation. Own your intellectual property.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button
              asChild
              size="lg"
              className="group  bg-gradient-to-r from-[#121F35] to-[#121F35] hover:from-brand-700 hover:to-brand-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <Link href="/dapp">
                Start protecting your work
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group bg-white/80 backdrop-blur border-brand-200 hover:bg-brand-50 hover:border-brand-300 text-brand-700 hover:text-brand-800 transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
            >
              <a href="#how" className="flex items-center">
                See how it works
                <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <FeatureChip icon={<Lock className="h-4 w-4" />} label="Privacy-first" />
            <FeatureChip icon={<Clock className="h-4 w-4" />} label="Immutable timestamps" />
            <FeatureChip icon={<Globe className="h-4 w-4" />} label="Globally verifiable" />
            <FeatureChip icon={<Zap className="h-4 w-4" />} label="Instant proof" />
          </div>

        </div>

        <div className="relative">
          {/* Multiple layered glows */}
          <div className="absolute -inset-8 -z-10 rounded-3xl bg-gradient-to-tr from-[#121F35]/30 to-[#121F35]/30 blur-3xl animate-pulse" />
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-[#121F35]/20 to-[#121F35]/20 blur-xl" />

          {/* Main card with enhanced styling */}
          <Card className="relative overflow-hidden border-0 bg-black shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[#121F35]/50 via-white/50 to-[#121F35]/50" />
            <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_20%,rgba(2,132,199,0.08),transparent)]" />

            {/* Floating elements inside the card */}
            <div className="relative p-8">
              <div className="space-y-6">
                {/* Hash visualization */}
                <div className="flex items-center gap-4 rounded-xl bg-slate-50/80 p-4 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    <Hash className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-700">Content Hash</div>
                    <div className="font-mono text-xs text-brand-600">0x4f2a8b9c...</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                {/* Blockchain visualization */}
                <div className="flex items-center gap-4 rounded-xl bg-slate-50/80 p-4 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    <Database className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-700">Blockchain Record</div>
                    <div className="text-xs text-slate-500">Block #18,234,567</div>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>

                {/* Privacy visualization */}
                <div className="flex items-center gap-4 rounded-xl bg-slate-50/80 p-4 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-700">Content Privacy</div>
                    <div className="text-xs text-slate-500">Your words stay private</div>
                  </div>
                  <Lock className="h-5 w-5 text-brand-600" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-brand-200/50 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-brand-50 hover:scale-105">
      <div className="text-brand-600">{icon}</div>
      <span>{label}</span>
    </div>
  )
}



function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Cryptographic Proof",
      desc: "Register keccak256 hashes on-chain for mathematically verifiable authorship without revealing content.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Immutable Timestamps",
      desc: "Every registration is anchored with blockchain timestamps, creating permanent proof of creation time.",
      color: "from-blue-500 to-brand-600",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Privacy by Design",
      desc: "Your content remains completely private. Only you decide if and when to reveal the original text.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Global Verification",
      desc: "Anyone can verify authorship by comparing content hashes against the public blockchain record.",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Author Portfolio",
      desc: "Build a verifiable portfolio of all your registered works, searchable by wallet address.",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Universal Access",
      desc: "Your proofs work across any blockchain explorer, wallet, or verification tool in the ecosystem.",
      color: "from-indigo-500 to-blue-600",
    },
  ]

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Everything you need to
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#121F35] to-[#676f7e] bg-clip-text text-transparent">
            protect your work
          </span>
        </h2>
        <p className="mt-6 text-xl text-slate-600">
          Professional-grade authorship protection with privacy-first design and global verification.
        </p>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f, index) => (
          <EnhancedFeatureCard key={f.title} {...f} index={index} />
        ))}
      </div>
    </div>
  )
}

function EnhancedFeatureCard({
  title,
  desc,
  icon,
  color,
  index,
}: {
  title: string
  desc: string
  icon: React.ReactNode
  color: string
  index: number
}) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105">
      {/* Animated background gradient */}
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${color} blur-3xl`}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur" />

      <CardHeader className="relative space-y-4 p-8">
        <div
          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          {icon}
        </div>
        <div>
          <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
          <CardDescription className="mt-3 text-base leading-relaxed text-slate-600">{desc}</CardDescription>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 flex items-center gap-2">
          <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${color}`} />
          <div className="text-xs font-medium text-slate-400">0{index + 1}</div>
        </div>
      </CardHeader>
    </Card>
  )
}

function InteractiveShowcase() {
  return (
    <section className="relative py-20 md:py-32">
      {/* Background with enhanced styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900" />
      <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_50%,rgba(2,132,199,0.15),transparent)]" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">See it in action</h2>
          <p className="mt-6 text-xl text-slate-300">
            Watch how your content gets transformed into an immutable proof of authorship
          </p>
        </div>

        {/* Interactive demo visualization */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <DemoStep
            step={1}
            title="Your Content"
            desc="Write your masterpiece"
            icon={<PenTool className="h-8 w-8" />}
            content="The quick brown fox jumps over the lazy dog..."
          />
          <DemoStep
            step={2}
            title="Hash Generation"
            desc="Cryptographic fingerprint"
            icon={<Hash className="h-8 w-8" />}
            content="0x4f2a8b9c7d1e3f4a..."
          />
          <DemoStep
            step={3}
            title="Blockchain Record"
            desc="Permanent proof created"
            icon={<Database className="h-8 w-8" />}
            content="Block #18,234,567"
          />
        </div>
      </div>
    </section>
  )
}

function DemoStep({
  step,
  title,
  desc,
  icon,
  content,
}: {
  step: number
  title: string
  desc: string
  icon: React.ReactNode
  content: string
}) {
  return (
    <Card className="relative overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur">
      <CardHeader className="p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#121F35] to-[#676f7e] text-white">
            {icon}
          </div>
          <div>
            <Badge className="mb-2 bg-brand-600 text-white">Step {step}</Badge>
            <CardTitle className="text-white">{title}</CardTitle>
            <CardDescription className="text-slate-400">{desc}</CardDescription>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-slate-900/50 p-4 font-mono text-sm text-slate-300">{content}</div>
      </CardHeader>
    </Card>
  )
}

function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Hash your content",
      desc: "Generate a keccak256 hash of your text client-side. Your original content never leaves your device.",
      icon: <Hash className="h-8 w-8" />,
    },
    {
      step: 2,
      title: "Register on-chain",
      desc: "Submit the hash with optional metadata to the blockchain. Transaction creates permanent timestamp.",
      icon: <Database className="h-8 w-8" />,
    },
    {
      step: 3,
      title: "Verify anytime",
      desc: "Anyone can verify authorship by recomputing the hash and comparing to the blockchain record.",
      icon: <CheckCircle className="h-8 w-8" />,
    },
  ]

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            How it works
          </span>
        </h2>
        <p className="mt-6 text-xl text-slate-600">Three simple steps to permanent, verifiable authorship proof</p>
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-1/2 hidden h-1 w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600 md:block" />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <Card
              key={s.step}
              className="relative overflow-hidden border-0 bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to" />
              <CardHeader className="relative p-8 text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#121F35] to-[#676f7e] text-white shadow-lg">
                  {s.icon}
                </div>
                <Badge className="mb-4 bg-brand-600 text-black">Step {s.step}</Badge>
                <CardTitle className="text-xl font-bold text-slate-900">{s.title}</CardTitle>
                <CardDescription className="mt-3 text-base leading-relaxed text-slate-600">{s.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatsStrip() {
  const stats = [
    { label: "Registered Works", value: "47,382", icon: <FileSignature className="h-6 w-6" /> },
    { label: "Active Authors", value: "12,847", icon: <Users className="h-6 w-6" /> },
    { label: "Avg. Gas Cost", value: "~$0.03", icon: <Zap className="h-6 w-6" /> },
    { label: "Networks Supported", value: "8+", icon: <Globe className="h-6 w-6" /> },
  ]

  return (
    <div className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-r from-[#121F35] to-[#676f7e] p-8 shadow-2xl md:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_300px_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      <div className="relative grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
              {s.icon}
            </div>
            <div className="text-3xl font-black text-white md:text-4xl">{s.value}</div>
            <div className="mt-2 text-sm font-medium text-white">{s.label}</div>
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
      a: "Absolutely not. You only register the keccak256 hash of your content. The original text stays completely private unless you choose to publish it elsewhere.",
    },
    {
      q: "Why use keccak256 instead of other hash functions?",
      a: "keccak256 is the standard hashing function in Ethereum and most blockchain ecosystems, ensuring maximum compatibility and verification across tools.",
    },
    {
      q: "How do people verify my authorship later?",
      a: "They recompute the keccak256 hash from your original text and compare it to the on-chain record. If it matches, authorship and timestamp are cryptographically verified.",
    },
    {
      q: "What happens if I edit my work?",
      a: "Any change, even a single character, results in a completely different hash. You can register new versions separately, each with its own timestamp and metadata.",
    },
    {
      q: "Which blockchain networks are supported?",
      a: "Only Basecamp Testnet at the moment.",
    },
    {
      q: "Can I add metadata to my registration?",
      a: "Yes! You can optionally include a title and URI (like an IPFS link or website) where people can find your published work if you choose to share it.",
    },
  ]

  return (
    <div className="mx-auto max-w-4xl">
      <div className="text-center">
        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Frequently asked questions
          </span>
        </h2>
        <p className="mt-6 text-xl text-slate-600">Everything you need to know about blockchain authorship proof</p>
      </div>

      <Accordion type="single" collapsible className="mt-12">
        {items.map((it, idx) => (
          <AccordionItem key={it.q} value={`item-${idx + 1}`} className="border-slate-200">
            <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-brand-700">
              {it.q}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-slate-600">{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function CalloutCta() {
  return (
    <section className="relative mx-auto my-20 max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 p-12 shadow-2xl md:p-16">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_30%_20%,rgba(2,132,199,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_70%_80%,rgba(14,165,233,0.15),transparent)]" />

        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-4xl font-black text-white md:text-5xl">Ready to protect your intellectual property?</h3>
            <p className="mt-6 text-xl leading-relaxed text-slate-300">
              Join thousands of writers who trust blockchain technology to secure their authorship. Start with your
              first registration today.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
              >
                <Link href="/dapp">
                  Launch WriteStamp
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white backdrop-blur text-lg px-8 py-6"
              >
                <Link target="_blank" href="https://github.com/Akanimorex/write-stamp">
                View Documentation
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-brand-400/20 to-brand-600/20 blur-xl" />
            <Card className="relative border-slate-700 bg-slate-800/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">Instant registration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">Global verification</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">Privacy guaranteed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300">Permanent ownership</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <PenTool className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-900">WriteStamp</span>
                <div className="text-sm text-slate-600">Blockchain Registry</div>
              </div>
            </div>
            <p className="mt-4 text-slate-600 max-w-md">
              The first privacy-first blockchain registry for writers. Prove authorship, protect intellectual property,
              and timestamp your creative work forever.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Product</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="#features" className="hover:text-brand-700 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-brand-700 transition-colors">
                  How it works
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-brand-700 transition-colors">
                  Pricing
                </a>
              </li> */}
              <li>
                <a href="#" className="hover:text-brand-700 transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://github.com/Akanimorex/write-stamp" target="_blank" className="hover:text-brand-700 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-700 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-700 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-brand-700 transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <div className="text-sm text-slate-600">© {new Date().getFullYear()} WriteStamp. All rights reserved.</div>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-brand-700 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-700 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-brand-700 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
