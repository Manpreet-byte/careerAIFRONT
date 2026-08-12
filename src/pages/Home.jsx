import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BrainCircuit, FileSearch, Globe2, LayoutGrid, ShieldCheck, Sparkles, Target, TrendingUp, Users, Workflow, ChevronRight } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import CircularProgress from '../components/ui/CircularProgress'
import PageSection from '../components/layout/PageSection'
import { aiDashboardMetrics, featureCards, landingStats, testimonials } from '../data/mockData'

const iconMap = { FileSearch, Target, BrainCircuit, TrendingUp, LayoutGrid, Workflow, Sparkles, BarChart3, ShieldCheck, Globe2, Users }

function AnimatedCounter({ value }) {
  return <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>{value}</motion.span>
}

// Fade in up animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section - Dark Mesh */}
      <section className="relative min-h-[90vh] mesh-bg dark-surface flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-wrap relative z-10 grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                <Sparkles size={14} className="text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Next-Gen Career Intelligence</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              Your career deserves an <span className="text-gradient-light">AI copilot.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Analyze your resume, match yourself with jobs, discover missing skills, prepare for interviews, and build a personalized career roadmap — all powered by advanced AI.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition duration-300 hover:bg-indigo-500 hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]">
                Analyze My Resume <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10 hover:border-white/30">
                Explore Features
              </motion.button>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-white/10 pt-8">
              {landingStats.map((item) => (
                <div key={item.label} className="p-2">
                  <p className="text-3xl font-bold text-white"><AnimatedCounter value={item.value} /></p>
                  <p className="mt-1 text-sm font-medium text-slate-400">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Glassmorphism Dashboard Preview */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="relative mx-auto w-full max-w-xl lg:max-w-none perspective-1000">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="glass-dark rounded-[2rem] p-6 lg:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.5)]" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                </div>
                <div className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-3 py-1 border border-indigo-500/30">
                  <div className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs font-medium text-indigo-300">Live AI Analysis</span>
                </div>
              </div>
              
              <div className="mt-6 grid gap-6 lg:grid-cols-[180px_1fr]">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col items-center justify-center backdrop-blur-md">
                  <p className="text-sm font-medium text-slate-300 mb-4">Match Score</p>
                  <div className="relative flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                      <motion.circle initial={{ strokeDashoffset: 351 }} animate={{ strokeDashoffset: 351 - (351 * 87) / 100 }} transition={{ duration: 1.5, delay: 1 }} cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="351" className="text-indigo-400" strokeLinecap="round" />
                    </svg>
                    <div className="absolute text-center">
                      <motion.p initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} className="text-4xl font-bold text-white">87</motion.p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-sm text-slate-300 mb-3"><span>Role Compatibility</span><span className="text-white font-semibold">High</span></div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '89%' }} transition={{ duration: 1, delay: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" /></div>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between text-sm text-slate-300 mb-3"><span>Missing Skills</span></div>
                    <div className="flex flex-wrap gap-2">
                      {['Docker', 'AWS', 'Redis'].map((skill, i) => (
                        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + i * 0.1 }} key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-300 border border-red-500/20">
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-4 backdrop-blur-md">
                    <div className="flex gap-3">
                      <Sparkles size={18} className="text-indigo-400 shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed text-slate-200">Adding <strong className="text-white">Docker</strong> and <strong className="text-white">AWS</strong> projects could significantly improve your profile for this role.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Custom Shape Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#F8FAFC"></path>
          </svg>
        </div>
      </section>

      {/* Rest of the page goes back to Light Theme */}
      <div className="bg-transparent relative z-10">
        <PageSection eyebrow="Trust" title="AI that feels precise, not generic." description="Built with premium product signals, measurable guidance, and a professional workflow that helps users act quickly.">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {landingStats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp}>
                <Card className="p-6 card-hover group cursor-default">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <TrendingUp size={20} className="text-slate-500 group-hover:text-indigo-600" />
                  </div>
                  <p className="mt-2 text-4xl font-bold text-ink">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-slate">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </PageSection>

        <PageSection id="features" eyebrow="Features" title="Everything you need to move forward." description="Each module is designed for a real career workflow with clean interactions, clear outcomes, and dynamic real-time data.">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => {
              const Icon = iconMap[feature.icon] || Sparkles
              return (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="p-8 h-full border-border/50 bg-white hover:border-indigo/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-ink group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-slate">{feature.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </PageSection>

        <PageSection id="how-it-works" eyebrow="How it works" title="A seamless 4-step workflow." description="From upload to actionable insights in seconds. No guesswork, just results.">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mt-16 relative">
            {/* Connecting Line for desktop */}
            <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200" />
            
            <div className="grid gap-8 lg:grid-cols-4 relative z-10">
              {['Upload Resume', 'Add Target Role', 'AI Analysis', 'Get Your Strategy'].map((step, index) => (
                <motion.div key={step} variants={fadeInUp} className="relative group">
                  <div className="bg-white border-2 border-slate-200 group-hover:border-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-300 group-hover:text-indigo-600 group-hover:shadow-[0_0_30px_rgba(79,70,229,0.2)] transition-all duration-300 mb-6 lg:mx-auto group-hover:-translate-y-2 bg-surface">
                    {index + 1}
                  </div>
                  <div className="lg:text-center">
                    <h3 className="text-lg font-bold text-ink mb-2">{step}</h3>
                    <p className="text-sm leading-relaxed text-slate">
                      {index === 0 ? 'Upload your PDF or paste your current experience directly into the platform.' : 
                       index === 1 ? 'Tell CareerAI what role you want and specific details about the job.' : 
                       index === 2 ? 'Our Gemini-powered engine measures fit, identifies gaps, and scores your profile.' : 
                       'Get a targeted plan with action items and interview prep tailored to you.'}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </PageSection>

        <section id="pricing" className="page-padding section-padding pt-0">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="container-wrap">
            <Card className="overflow-hidden relative border-0 shadow-2xl rounded-[3rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900" />
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative p-10 sm:p-16 lg:p-20 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
                  Ready to accelerate your career?
                </h2>
                <p className="text-lg leading-relaxed text-indigo-100 mb-10">
                  Join thousands of professionals using CareerAI to optimize their resumes, ace interviews, and land their dream jobs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-indigo-900 shadow-lg transition duration-300 hover:bg-slate-50">
                    Get Started Free <ChevronRight size={20} />
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white/20">
                    View Live Demo
                  </motion.button>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
