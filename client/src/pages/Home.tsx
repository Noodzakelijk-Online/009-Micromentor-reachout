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
  Wifi
} from "lucide-react";
import { motion } from "framer-motion";
import ResourceDemo from "@/components/ResourceDemo";

export default function Home() {
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <img src="/images/maro-logo.svg" alt="MARO Logo" className="h-8 w-8" />
            <span>MARO</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">Features</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-primary transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('specs')} className="hover:text-primary transition-colors">Specs</button>
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={handleDownload} className="rounded-none font-mono text-xs font-bold uppercase tracking-wider">
              <Download className="mr-2 h-4 w-4" />
              Download v1.0
            </Button>
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
        <section className="py-20 border-b bg-muted/10">
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
                  <CardTitle className="font-mono text-lg">Resource Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Real-time tracking of CPU, RAM, storage, and bandwidth. Pay only for the exact resources your outreach consumes.
                  </p>
                  <img src="/images/feature-resources.png" alt="Resources" className="w-full h-32 object-contain opacity-80" />
                </CardContent>
              </Card>
              
              <Card className="rounded-none border-2 hover:border-primary transition-colors duration-300">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-mono text-lg">Deep Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Track response rates, message effectiveness, and ROI. Data-driven insights to optimize your mentorship strategy.
                  </p>
                  <img src="/images/feature-analytics.png" alt="Analytics" className="w-full h-32 object-contain opacity-80" />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 border-y relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-5">
            <img src="/images/pricing-bg.png" alt="Background" className="w-full h-full object-cover" />
          </div>
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Transparent, Usage-Based Pricing</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  No monthly subscriptions. No hidden fees. Our revolutionary pricing model charges you based strictly on the computing resources you consume.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-lg">Resource Formula</h3>
                      <p className="text-muted-foreground">Actual Price = Resources Used × 2</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-lg">Billing Notifications</h3>
                      <p className="text-muted-foreground">Receive detailed email reports. No complex dashboards to manage.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-10 w-10 shrink-0 bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold font-mono text-lg">Pay-As-You-Go</h3>
                      <p className="text-muted-foreground">Scale up or down instantly. Costs align perfectly with your usage.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Card className="rounded-none border-2 shadow-2xl bg-background/80 backdrop-blur">
                <CardHeader className="border-b bg-muted/50">
                  <CardTitle className="font-mono text-xl">Resource Pricing Table</CardTitle>
                  <CardDescription>Current rates per unit</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    <div className="flex justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">CPU Time</span>
                      </div>
                      <span className="font-mono font-bold">$0.0002 / sec</span>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">RAM Usage</span>
                      </div>
                      <span className="font-mono font-bold">$0.00002 / MB-hr</span>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">Storage</span>
                      </div>
                      <span className="font-mono font-bold">$0.0002 / MB-mo</span>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm">Bandwidth</span>
                      </div>
                      <span className="font-mono font-bold">$0.0002 / MB</span>
                    </div>
                    <div className="flex justify-between p-4 hover:bg-muted/30 transition-colors bg-primary/5">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="font-mono text-sm font-bold text-primary">Electricity</span>
                      </div>
                      <span className="font-mono font-bold text-primary">$0.24 / kWh</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Specs Section */}
        <section id="specs" className="py-20 bg-muted/30">
          <div className="container">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">Technical Specifications</h2>
              <p className="text-muted-foreground max-w-[700px]">
                Designed for compatibility and performance across modern Windows environments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border bg-background p-6 space-y-4">
                <h3 className="font-bold font-mono text-lg border-b pb-2">OS Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Windows 11 (Native)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Windows 10</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> macOS (Beta)</li>
                </ul>
              </div>
              
              <div className="border bg-background p-6 space-y-4">
                <h3 className="font-bold font-mono text-lg border-b pb-2">Browsers</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Google Chrome</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Microsoft Edge</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Mozilla Firefox</li>
                </ul>
              </div>
              
              <div className="border bg-background p-6 space-y-4">
                <h3 className="font-bold font-mono text-lg border-b pb-2">Security</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> AES-256-GCM Encryption</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Local Storage Only</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> No External Tracking</li>
                </ul>
              </div>
              
              <div className="border bg-background p-6 space-y-4">
                <h3 className="font-bold font-mono text-lg border-b pb-2">Performance</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> &lt; 50MB RAM Usage</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Background Processing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-primary" /> Battery Optimized</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t">
          <div className="container text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Ready to Optimize Your Outreach?</h2>
            <p className="text-xl text-muted-foreground max-w-[600px] mx-auto mb-10">
              Join thousands of mentors who have automated their workflow with MARO.
            </p>
            <Button size="lg" onClick={handleDownload} className="rounded-none h-16 px-10 text-lg font-mono font-bold uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Download Now
              <Download className="ml-2 h-6 w-6" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground font-mono">
              v1.0.0 • Windows 11 Compatible • Secure Installer
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tighter">
              <img src="/images/maro-logo.svg" alt="MARO Logo" className="h-6 w-6" />
              <span>MARO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Micromentor Automated Reach Out. Automating mentorship connections with precision and efficiency.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Features</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
              <li><a href="#" className="hover:text-primary">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Documentation</a></li>
              <li><a href="#" className="hover:text-primary">API Reference</a></li>
              <li><a href="#" className="hover:text-primary">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2026 MARO. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
