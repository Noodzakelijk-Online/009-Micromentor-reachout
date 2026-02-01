import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Mail,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Pricing constants (Cost per Hour basis)
const PRICING = {
  CPU: 0.0002, // per % load per hour
  RAM: 0.00002, // per MB per hour
  BANDWIDTH: 0.0002, // per MB per hour (simulated rate)
  ELECTRICITY: 0.24 // per kWh
};

// ROI Constants
const TIME_PER_MESSAGE_MIN = 2; // Minutes to manually send one message
const FOLLOW_UPS_PER_NEW = 3; // 3 follow-ups for every 1 new message
const RESPONSE_RATE = 0.015; // 1.5% response rate

export default function ResourceDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [messagesSent, setMessagesSent] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // ROI Metrics
  const [timeSavedMin, setTimeSavedMin] = useState(0);
  const [wastedTimeAvoidedMin, setWastedTimeAvoidedMin] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  
  // Resource metrics
  const [cpuLoad, setCpuLoad] = useState(0);
  const [ramUsage, setRamUsage] = useState(24); // Base 24MB
  const [bandwidthRate, setBandwidthRate] = useState(0); // MB/hr
  const [electricityRate, setElectricityRate] = useState(0); // kWh/hr
  
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
        const newBandwidthRate = (Math.random() * 5 * speed); // MB/hr rate
        const newElectricityRate = (newCpu * 0.001 * speed); // kWh/hr rate
        
        // Update state
        setCpuLoad(newCpu);
        setRamUsage(newRam);
        setBandwidthRate(newBandwidthRate);
        setElectricityRate(newElectricityRate);
        
        // Calculate cost increment (per second for the total counter)
        const hourlyCost = 
          (newCpu * PRICING.CPU) + 
          (newRam * PRICING.RAM) + 
          (newBandwidthRate * PRICING.BANDWIDTH) + 
          (newElectricityRate * PRICING.ELECTRICITY);
          
        const secondCost = hourlyCost / 3600;
        
        setTotalCost(prev => prev + secondCost);
        
        // Simulate message sending
        if (Math.random() < 0.1 * speed) {
          setMessagesSent(prev => {
            const newCount = prev + 1;
            
            // Update ROI metrics
            // Total time saved = messages * time per message
            const totalSaved = newCount * TIME_PER_MESSAGE_MIN;
            setTimeSavedMin(totalSaved);
            
            // Wasted time avoided = Total time saved * (1 - response rate)
            // This represents time that would have been spent on unresponsive leads
            const wastedAvoided = totalSaved * (1 - RESPONSE_RATE);
            setWastedTimeAvoidedMin(wastedAvoided);

            // Money saved = (Total time saved in hours) * Hourly Rate
            const money = (totalSaved / 60) * hourlyRate;
            setMoneySaved(money);
            
            return newCount;
          });
        }
        
        // Update chart data
        const now = new Date();
        const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        
        const newDataPoint = {
          time: timeStr,
          cpu: newCpu,
          cost: hourlyCost * 1000 // Scale for visibility
        };
        
        chartRef.current = [...chartRef.current.slice(-20), newDataPoint];
        setChartData(chartRef.current);
        
      }, 1000 / speed); // Speed affects update frequency for visual effect
    } else {
      // Idle state
      setCpuLoad(2);
      setBandwidthRate(0);
      setElectricityRate(0.001);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, speed, ramUsage]);

  const handleReset = () => {
    setIsRunning(false);
    setMessagesSent(0);
    setTotalCost(0);
    setCpuLoad(0);
    setRamUsage(24);
    setBandwidthRate(0);
    setElectricityRate(0);
    setTimeSavedMin(0);
    setWastedTimeAvoidedMin(0);
    setMoneySaved(0);
    setChartData([]);
    chartRef.current = [];
  };

  // Helper to format minutes into hours/minutes
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes.toFixed(1)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = (minutes % 60).toFixed(0);
    return `${hours}h ${mins}m`;
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
              Simulate an outreach campaign to see real-time costs & ROI
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

            <div className="space-y-2">
              <Label htmlFor="hourly-rate" className="text-xs font-mono text-muted-foreground">YOUR HOURLY RATE ($)</Label>
              <Input 
                id="hourly-rate"
                type="number" 
                value={hourlyRate} 
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="font-mono"
              />
            </div>
            
            <div className="bg-background border p-4 rounded-lg">
              <div className="text-xs text-muted-foreground font-mono mb-1">MESSAGES SENT</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                {messagesSent}
              </div>
            </div>

            {/* ROI Section */}
            <div className="space-y-3 pt-2 border-t border-dashed">
              <div className="text-xs font-mono text-muted-foreground mb-2">HUMAN COST SAVINGS</div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>Total Time Saved</span>
                </div>
                <span className="font-mono font-bold">{formatTime(timeSavedMin)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground" title="Time that would have been spent on unresponsive leads (98.5%)">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>Wasted Effort Avoided</span>
                </div>
                <span className="font-mono text-muted-foreground">{formatTime(wastedTimeAvoidedMin)}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-dashed mt-2">
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                  <span className="text-lg">$</span>
                  <span>Est. Money Saved</span>
                </div>
                <span className="font-mono font-bold text-green-600 dark:text-green-400 text-lg">
                  ${moneySaved.toFixed(2)}
                </span>
              </div>
              
              <div className="text-[10px] text-muted-foreground mt-2 italic">
                *Based on your rate & 2min/msg manual effort
              </div>
            </div>
          </div>

          {/* Visualization & Metrics */}
          <div className="lg:col-span-2 p-6 flex flex-col h-full">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-mono text-sm font-bold">RESOURCE USAGE HISTORY</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary"></div> CPU Load</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Cost</span>
                </div>
              </div>
              <div className="h-[200px] w-full bg-background border rounded-lg p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cpu" 
                      stroke="var(--color-primary)" 
                      fillOpacity={1} 
                      fill="url(#colorCpu)" 
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Consolidated Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground font-mono uppercase">CPU Load</div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold font-mono">{cpuLoad.toFixed(0)}%</span>
                  <span className="text-xs text-muted-foreground mb-1">
                    ${(cpuLoad * PRICING.CPU).toFixed(5)}/hr
                  </span>
                </div>
                <Progress value={cpuLoad} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground font-mono uppercase">RAM Usage</div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold font-mono">{ramUsage.toFixed(0)}MB</span>
                  <span className="text-xs text-muted-foreground mb-1">
                    ${(ramUsage * PRICING.RAM).toFixed(5)}/hr
                  </span>
                </div>
                <Progress value={(ramUsage / 128) * 100} className="h-1" />
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground font-mono uppercase">Bandwidth</div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold font-mono">{bandwidthRate.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground mb-1">MB/hr</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(bandwidthRate * PRICING.BANDWIDTH).toFixed(5)}/hr
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] text-muted-foreground font-mono uppercase">Electricity</div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold font-mono">{electricityRate.toFixed(3)}</span>
                  <span className="text-xs text-muted-foreground mb-1">kWh</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  ${(electricityRate * PRICING.ELECTRICITY).toFixed(5)}/hr
                </div>
              </div>
            </div>

            {/* Real-time ROI Comparison & Ratio - Consolidated */}
            <div className="mt-auto grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-primary uppercase mb-1 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Total Cost
                </div>
                <div className="text-2xl font-bold text-primary truncate" title={`$${totalCost.toFixed(8)}`}>
                  ${totalCost.toFixed(6)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Resources Consumed
                </div>
              </div>
              
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4 flex flex-col justify-center">
                <div className="text-[10px] font-mono text-green-600 dark:text-green-400 uppercase mb-1 flex items-center gap-1">
                  <Activity className="h-3 w-3" /> Value Generated
                </div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ${moneySaved.toFixed(2)}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  Time Savings
                </div>
              </div>

              {/* ROI Ratio Badge */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-4 flex flex-col justify-center text-center shadow-lg">
                <div className="text-[10px] font-medium opacity-90 mb-1 uppercase">Return on Spend</div>
                <div className="text-3xl font-bold tracking-tight">
                  {totalCost > 0 ? (moneySaved / totalCost).toFixed(0) : "0"}x
                </div>
                <div className="text-[10px] opacity-75 mt-1">
                  ROI Multiplier
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
