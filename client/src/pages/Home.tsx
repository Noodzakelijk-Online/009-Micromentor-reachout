import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Cpu, 
  Clock, 
  BarChart3, 
  Shield, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Activity,
  Database,
  Wifi,
  Menu,
  Moon,
  Sun
} from "lucide-react";
import { motion } from "framer-motion";
import ResourceDemo from "@/components/ResourceDemo";
import { useTheme } from "@/contexts/ThemeContext";
import ScrollProgress from "@/components/ScrollProgress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownload = () => {
    // In a real scenario, this would trigger the download
    window.location.href = "/maro-extension.zip";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary/20">
      {/* Navigation */}
      <ScrollProgress />
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <img src="/images/maro-logo.svg" alt="MARO Logo" className="h-8 w-8 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span className="group-hover:text-primary transition-colors duration-300">MARO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button onClick={() => scrollToSection('specs')} className="hover:text-primary transition-colors relative group">
              Specs
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2 hover:bg-primary/10">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={handleDownload} className="hidden md:flex rounded-none font-mono text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5">
              <Download className="mr-2 h-4 w-4" />
              Download v1.0
            </Button>
            
            {/* Mobile Menu Trigger */}
            <div className="md:hidden flex items-center">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden border-b">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="container grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                <Terminal className="mr-1 h-3 w-3" />
                <span>v1.0 Stable Release</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                Automate Outreach. <br />
                <span className="text-primary">Minimize Overhead.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
                Micromentor Automated Reach Out (MARO). The ultra-efficient browser extension for MicroMentor.org. Automate your messaging workflow while tracking every CPU cycle and byte of data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={handleDownload} className="rounded-none h-14 px-8 text-base font-mono font-bold uppercase tracking-wider">
                  Download Installer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => scrollToSection('features')} className="rounded-none h-14 px-8 text-base font-mono font-bold uppercase tracking-wider">
                  View Documentation
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t">
                <div>
                  <div className="text-3xl font-bold font-mono">20x</div>
                  <div className="text-sm text-muted-foreground mt-1">Faster Outreach</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-mono">50%</div>
                  <div className="text-sm text-muted-foreground mt-1">Resource Savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold font-mono">100%</div>
                  <div className="text-sm text-muted-foreground mt-1">Automated</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-20 rounded-full"></div>
              <img 
                src="/images/hero-dashboard.png" 
                alt="Dashboard Interface" 
                className="relative border-2 border-border shadow-2xl bg-background w-full h-auto"
              />
              {/* Floating Elements */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-background border p-4 shadow-lg max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold">CPU USAGE</span>
                </div>
                <div className="h-1 w-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary w-[12%]"></div>
                </div>
                <div className="mt-1 text-right font-mono text-xs text-muted-foreground">12% Load</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="pt-20 pb-10 border-b-0 bg-muted/10">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                <Activity className="mr-1 h-3 w-3" />
                <span>Interactive Demo</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">See the Savings in Real-Time</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Experience our transparent pricing model. Start the simulation to see how we track every resource and calculate costs down to the micro-cent.
              </p>
            </div>
            <ResourceDemo />
          </div>
        </section>

        {/* Pricing Section - Moved immediately below Demo */}
        <section id="pricing" className="pb-20 pt-4 bg-muted/10 border-b">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 mb-4">
                LIVE DEMO ABOVE
              </div>
              <p className="text-muted-foreground max-w-[700px]">
                Check the interactive simulation above to see the real-time cost vs. savings breakdown. Our users typically see a <span className="font-bold text-foreground">200x Return on Spend</span> for every campaign.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold tracking-tight">Transparent Resource Rates</h3>
                <p className="text-muted-foreground">
                  No monthly subscriptions. No hidden fees. Our revolutionary pricing model charges you based strictly on the computing resources you consume.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold">Resource Formula</h4>
                      <p className="text-sm text-muted-foreground">Actual Price = Resources Used × 2</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold">Billing Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive detailed email reports. No complex dashboards to manage.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-mono font-bold">Pay-As-You-Go</h4>
                      <p className="text-sm text-muted-foreground">Scale up or down instantly. Costs align perfectly with your usage.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="border-2 shadow-lg">
                <CardHeader className="bg-muted/30 border-b">
                  <CardTitle className="font-mono text-lg">Resource Pricing Table</CardTitle>
                  <CardDescription>Current rates per unit</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex justify-between p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-2 text-sm">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span>CPU Time</span>
                      </div>
                      <div className="font-mono font-bold">$0.0002 / sec</div>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-2 text-sm">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>RAM Usage</span>
                      </div>
                      <div className="font-mono font-bold">$0.00002 / MB-hr</div>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-2 text-sm">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span>Storage</span>
                      </div>
                      <div className="font-mono font-bold">$0.0002 / MB-mo</div>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/20 transition-colors">
                      <div className="flex items-center gap-2 text-sm">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span>Bandwidth</span>
                      </div>
                      <div className="font-mono font-bold">$0.0002 / MB</div>
                    </div>
                    <div className="flex justify-between p-4 bg-primary/5">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <Zap className="h-4 w-4" />
                        <span>Electricity</span>
                      </div>
                      <div className="font-mono font-bold text-primary">$0.24 / kWh</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Engineered for Efficiency</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Built with a focus on performance, security, and automation. Every feature is designed to save you time and resources.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="rounded-none border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-mono text-lg">Automated Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Queue-based system handles outreach automatically. Set it and forget it while the extension works in the background.
                  </p>
                  <img src="/images/feature-automation.png" alt="Automation" className="w-full h-32 object-contain opacity-80" />
                </CardContent>
              </Card>
              
              <Card className="rounded-none border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-4">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-mono text-lg">Resource Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Uses 50% less RAM than standard browser tabs. Optimized for low-end hardware and battery life.
                  </p>
                  <img src="/images/feature-resources.png" alt="Resources" className="w-full h-32 object-contain opacity-80" />
                </CardContent>
              </Card>
              
              <Card className="rounded-none border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-mono text-lg">Detailed Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Track every message sent, response rates, and resource consumption in real-time dashboards.
                  </p>
                  <img src="/images/feature-analytics.png" alt="Analytics" className="w-full h-32 object-contain opacity-80" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Specs */}
        <section id="specs" className="py-20 border-t">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Technical Specifications</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">Browser Compatibility</h3>
                      <p className="text-muted-foreground">Chrome 88+, Edge 90+, Brave, Opera</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">Security</h3>
                      <p className="text-muted-foreground">Local storage encryption (AES-256), No external data transmission</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <h3 className="font-bold">Performance</h3>
                      <p className="text-muted-foreground">&lt; 50MB RAM usage, Background worker optimization</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted p-8 font-mono text-sm rounded-lg overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-8 bg-muted-foreground/10 flex items-center px-4 gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mt-4 space-y-2 text-muted-foreground">
                  <p><span className="text-primary">$</span> npm install maro-cli</p>
                  <p className="text-foreground">Installing dependencies...</p>
                  <p><span className="text-green-500">✔</span> Core engine optimized</p>
                  <p><span className="text-green-500">✔</span> Analytics module loaded</p>
                  <p><span className="text-green-500">✔</span> Security protocols active</p>
                  <p className="text-foreground">MARO is ready. Start your campaign.</p>
                  <p><span className="text-primary">$</span> _</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30 border-t">
          <div className="container max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about MARO.</p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. MARO operates entirely locally on your machine. Your credentials and message data are encrypted using AES-256 and never leave your browser.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the pricing model work?</AccordionTrigger>
                <AccordionContent>
                  Instead of a flat monthly fee, we charge based on the actual computing resources (CPU, RAM, Bandwidth) used during your outreach campaigns. This typically amounts to pennies per campaign.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize the outreach messages?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can create unlimited message templates with dynamic variables (e.g., {"{FirstName}"}, {"{Company}"}) to ensure every message feels personal and authentic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Does it work on LinkedIn?</AccordionTrigger>
                <AccordionContent>
                  Currently, MARO is optimized for MicroMentor.org. A LinkedIn module is in development and will be available in the next major release.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
              Ready to Optimize Your Outreach?
            </h2>
            <p className="text-xl opacity-90 max-w-[600px] mx-auto mb-8">
              Join thousands of users to make reaching out to mentors a breeze and a non-time consuming effort.
            </p>
            <Button size="lg" variant="secondary" onClick={handleDownload} className="rounded-none h-14 px-8 text-base font-mono font-bold uppercase tracking-wider">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-muted/20">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <img src="/images/maro-logo.svg" alt="MARO Logo" className="h-6 w-6" />
            <span>MARO</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Micromentor Automated Reach Out. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
