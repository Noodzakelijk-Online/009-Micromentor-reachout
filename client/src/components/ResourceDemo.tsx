import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Cpu, 
  Database, 
  Wifi, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw,
  CheckCircle2,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Pricing constants
const PRICING = {
  CPU: 0.0002, // per second
  RAM: 0.00002, // per MB-hr
  STORAGE: 0.0002, // per MB-mo
  BANDWIDTH: 0.0002, // per MB
  ELECTRICITY: 0.24 // per kWh
};

export default function ResourceDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [messagesSent, setMessagesSent] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Resource metrics
  const [cpuLoad, setCpuLoad] = useState(0);
  const [ramUsage, setRamUsage] = useState(24); // Base 24MB
  const [bandwidth, setBandwidth] = useState(0);
  const [electricity, setElectricity] = useState(0);
  
  // Chart data
  const [chartData, setChartData] = useState<any[]>([]);
  const chartRef = useRef<any[]>([]);

  // Simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        // Simulate resource fluctuations based on activity
        const newCpu = Math.min(100, Math.max(5, Math.random() * 30 + (speed * 10)));
        const newRam = Math.min(128, Math.max(24, ramUsage + (Math.random() * 2 - 0.5)));
        const newBandwidth = bandwidth + (Math.random() * 0.5 * speed);
        const newElectricity = electricity + (newCpu * 0.0001 * speed);
        
        // Update state
        setCpuLoad(newCpu);
        setRamUsage(newRam);
        setBandwidth(newBandwidth);
        setElectricity(newElectricity);
        
        // Calculate cost increment
        const cpuCost = (newCpu / 100) * PRICING.CPU * (speed / 10);
        const ramCost = (newRam / 1024) * PRICING.RAM * (speed / 10);
        const bandwidthCost = (Math.random() * 0.5 * speed) * PRICING.BANDWIDTH;
        const electricityCost = (newCpu * 0.0001 * speed) * PRICING.ELECTRICITY;
        
        const stepCost = (cpuCost + ramCost + bandwidthCost + electricityCost) * 2; // x2 pricing model
        setTotalCost(prev => prev + stepCost);
        
        // Simulate message sending
        if (Math.random() < 0.1 * speed) {
          setMessagesSent(prev => prev + 1);
        }
        
        // Update chart data
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        
        const newDataPoint = {
          time: timeStr,
          cpu: newCpu,
          cost: totalCost * 1000 // Scale for visibility
        };
        
        chartRef.current = [...chartRef.current.slice(-20), newDataPoint];
        setChartData(chartRef.current);
        
      }, 1000 / speed);
    } else {
      // Idle state
      setCpuLoad(2);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, speed, ramUsage, bandwidth, electricity, totalCost]);

  const handleReset = () => {
    setIsRunning(false);
    setMessagesSent(0);
    setTotalCost(0);
    setCpuLoad(0);
    setRamUsage(24);
    setBandwidth(0);
    setElectricity(0);
    setChartData([]);
    chartRef.current = [];
  };

  return (
    <Card className="w-full max-w-5xl mx-auto border-2 shadow-xl overflow-hidden bg-card">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 font-mono text-xl">
              <Activity className="h-5 w-5 text-primary" />
              Live Resource Monitor
            </CardTitle>
            <CardDescription>
              Simulate an outreach campaign to see real-time costs
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isRunning ? "default" : "outline"} className="font-mono">
              {isRunning ? "SYSTEM ACTIVE" : "SYSTEM IDLE"}
            </Badge>
            <div className="flex items-center gap-1 bg-background border rounded-md p-1">
              <Button 
                size="icon" 
                variant={isRunning ? "secondary" : "ghost"} 
                className="h-8 w-8" 
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8" 
                onClick={handleReset}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x">
          {/* Controls & Stats */}
          <div className="p-6 space-y-8 bg-muted/10">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Simulation Speed</label>
                <span className="text-xs font-mono text-muted-foreground">{speed}x</span>
              </div>
              <Slider 
                value={[speed]} 
                min={1} 
                max={10} 
                step={1} 
                onValueChange={(vals) => setSpeed(vals[0])}
                className="py-2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background border p-4 rounded-lg">
                <div className="text-xs text-muted-foreground font-mono mb-1">MESSAGES SENT</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {messagesSent}
                </div>
              </div>
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <div className="text-xs text-primary font-mono mb-1">TOTAL COST</div>
                <div className="text-2xl font-bold text-primary">
                  ${totalCost.toFixed(6)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs font-mono text-muted-foreground">CAMPAIGN STATUS</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className={`h-4 w-4 ${messagesSent > 0 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Queue Processing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className={`h-4 w-4 ${totalCost > 0 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Resource Tracking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className={`h-4 w-4 ${totalCost > 0.001 ? "text-green-500" : "text-muted-foreground"}`} />
                  <span>Cost Optimization</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Real-time Metrics */}
          <div className="p-6 space-y-6 lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* CPU Metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    <span>CPU Load</span>
                  </div>
                  <span className="font-mono">{cpuLoad.toFixed(1)}%</span>
                </div>
                <Progress value={cpuLoad} className="h-2" />
                <div className="text-xs text-muted-foreground font-mono text-right">
                  ${(cpuLoad * PRICING.CPU / 100).toFixed(6)}/sec
                </div>
              </div>
              
              {/* RAM Metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span>RAM Usage</span>
                  </div>
                  <span className="font-mono">{ramUsage.toFixed(1)} MB</span>
                </div>
                <Progress value={(ramUsage / 128) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground font-mono text-right">
                  ${(ramUsage * PRICING.RAM).toFixed(6)}/hr
                </div>
              </div>
              
              {/* Bandwidth Metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span>Bandwidth</span>
                  </div>
                  <span className="font-mono">{bandwidth.toFixed(2)} MB</span>
                </div>
                <Progress value={(bandwidth % 10) * 10} className="h-2" />
                <div className="text-xs text-muted-foreground font-mono text-right">
                  ${(bandwidth * PRICING.BANDWIDTH).toFixed(6)} total
                </div>
              </div>
              
              {/* Electricity Metric */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>Electricity</span>
                  </div>
                  <span className="font-mono">{electricity.toFixed(4)} kWh</span>
                </div>
                <Progress value={(electricity % 1) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground font-mono text-right">
                  ${(electricity * PRICING.ELECTRICITY).toFixed(6)} total
                </div>
              </div>
            </div>
            
            {/* Live Chart */}
            <div className="h-[200px] w-full mt-8 border rounded-lg p-4 bg-background/50">
              <div className="text-xs font-mono text-muted-foreground mb-2">RESOURCE USAGE HISTORY</div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--border)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="cpu" 
                    stroke="var(--primary)" 
                    fillOpacity={1} 
                    fill="url(#colorCpu)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
