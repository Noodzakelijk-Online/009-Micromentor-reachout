import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, CpuIcon, Database, HardDrive, Zap, Wifi } from "lucide-react";
import api from '@/utils/api';
import resourceMonitor from '@/utils/resourceMonitor';

const Dashboard = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [billingHistory, setBillingHistory] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  // Start monitoring session when dashboard loads
  useEffect(() => {
    const startSession = async () => {
      const session = await api.session.start();
      setSessionActive(true);
      setSessionData(session);
    };

    if (!sessionActive) {
      startSession();
    }

    // Set up interval to update usage data
    const updateInterval = setInterval(async () => {
      if (sessionActive) {
        const status = await api.session.getStatus();
        setUsageData(status);
        
        // Update chart data
        if (status && status.currentUsage) {
          const newDataPoint = {
            time: new Date().toLocaleTimeString(),
            cpu: status.currentUsage.cpuCoreSeconds / 3600,
            ram: status.currentUsage.ramGbSeconds / 3600,
            storage: status.currentUsage.storageGbHours,
            bandwidth: status.currentUsage.bandwidthGb,
            electricity: status.currentUsage.estimatedKwh
          };
          
          setChartData(prevData => {
            const newData = [...prevData, newDataPoint];
            // Keep only the last 10 data points for better visualization
            if (newData.length > 10) {
              return newData.slice(newData.length - 10);
            }
            return newData;
          });
        }
      }
    }, 5000);

    // Load billing history
    const loadBillingHistory = async () => {
      const history = await api.billing.getHistory();
      setBillingHistory(history.sessions || []);
    };
    loadBillingHistory();

    // Clean up on unmount
    return () => {
      clearInterval(updateInterval);
      if (sessionActive) {
        api.session.end().then(data => {
          console.log('Session ended:', data);
        });
      }
    };
  }, [sessionActive]);

  const handleEndSession = async () => {
    const result = await api.session.end();
    setSessionActive(false);
    setSessionData(null);
    
    // Update billing history
    const history = await api.billing.getHistory();
    setBillingHistory(history.sessions || []);
    
    // Show final session data
    setUsageData({
      ...result,
      isFinal: true
    });
  };

  const handleSendReport = async () => {
    // In a real app, you would get the email from user input or user profile
    const userEmail = "user@example.com";
    await api.billing.sendUsageReport(userEmail);
    alert(`Usage report sent to ${userEmail}`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(value);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Resource Dashboard</h1>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Resource Usage</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Session Status
                </CardTitle>
                <CardDescription>
                  Current resource monitoring session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium ${sessionActive ? 'text-green-500' : 'text-gray-500'}`}>
                      {sessionActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  {sessionData && (
                    <div className="flex justify-between">
                      <span>Session ID:</span>
                      <span className="font-medium">{sessionData.sessionId}</span>
                    </div>
                  )}
                  {usageData && (
                    <div className="flex justify-between">
                      <span>Current Cost:</span>
                      <span className="font-medium">{formatCurrency(usageData.estimatedCost || 0)}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {sessionActive ? (
                  <Button onClick={handleEndSession} variant="destructive" className="w-full">
                    End Session
                  </Button>
                ) : (
                  <Button onClick={() => api.session.start().then(() => setSessionActive(true))} className="w-full">
                    Start New Session
                  </Button>
                )}
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Resource Summary
                </CardTitle>
                <CardDescription>
                  Current resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usageData ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center"><CpuIcon className="mr-1 h-4 w-4" /> CPU Usage</span>
                        <span>{(usageData.currentUsage?.cpuCoreSeconds / 3600).toFixed(4)} core-hours</span>
                      </div>
                      <Progress value={Math.min((usageData.currentUsage?.cpuCoreSeconds / 36), 100)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center"><Database className="mr-1 h-4 w-4" /> RAM Usage</span>
                        <span>{(usageData.currentUsage?.ramGbSeconds / 3600).toFixed(4)} GB-hours</span>
                      </div>
                      <Progress value={Math.min((usageData.currentUsage?.ramGbSeconds / 36), 100)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center"><HardDrive className="mr-1 h-4 w-4" /> Storage</span>
                        <span>{usageData.currentUsage?.storageGbHours.toFixed(4)} GB-hours</span>
                      </div>
                      <Progress value={Math.min((usageData.currentUsage?.storageGbHours * 100), 100)} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center"><Wifi className="mr-1 h-4 w-4" /> Bandwidth</span>
                        <span>{usageData.currentUsage?.bandwidthGb.toFixed(4)} GB</span>
                      </div>
                      <Progress value={Math.min((usageData.currentUsage?.bandwidthGb * 100), 100)} />
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    No active session data
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleSendReport} variant="outline" className="w-full">
                  Send Usage Report
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage Over Time</CardTitle>
              <CardDescription>
                Monitoring current session resource consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cpu" name="CPU (core-hrs)" fill="#8884d8" />
                      <Bar dataKey="ram" name="RAM (GB-hrs)" fill="#82ca9d" />
                      <Bar dataKey="bandwidth" name="Bandwidth (GB)" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    No data available yet. Resource usage will appear here as it's collected.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Resource Usage Tab */}
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Resource Consumption</CardTitle>
              <CardDescription>
                Breakdown of all monitored resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              {usageData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Compute Resources</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">CPU Core-Hours:</span>
                          <span className="font-medium">{(usageData.currentUsage?.cpuCoreSeconds / 3600).toFixed(6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">RAM GB-Hours:</span>
                          <span className="font-medium">{(usageData.currentUsage?.ramGbSeconds / 3600).toFixed(6)}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium">Storage Resources</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Storage GB-Hours:</span>
                          <span className="font-medium">{usageData.currentUsage?.storageGbHours.toFixed(6)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Network Resources</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bandwidth GB:</span>
                          <span className="font-medium">{usageData.currentUsage?.bandwidthGb.toFixed(6)}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-medium">Energy Consumption</h3>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Estimated kWh:</span>
                          <span className="font-medium">{usageData.currentUsage?.estimatedKwh.toFixed(6)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
                    
                    {usageData.breakdown && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">CPU Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.breakdown.cpu || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">RAM Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.breakdown.ram || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Storage Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.breakdown.storage || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Bandwidth Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.breakdown.bandwidth || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Electricity Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.breakdown.electricity || 0)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">Raw Resource Cost:</span>
                          <span className="font-medium">{formatCurrency(usageData.estimatedCost / 2 || 0)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Final Cost (× 2):</span>
                          <span className="font-bold">{formatCurrency(usageData.estimatedCost || 0)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  No resource usage data available. Start a session to begin monitoring.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Billing History Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                Record of past sessions and their costs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {billingHistory.length > 0 ? (
                <div className="space-y-4">
                  {billingHistory.map((session, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Session {index + 1}</CardTitle>
                          <span className="text-sm font-medium">{formatCurrency(session.finalCost)}</span>
                        </div>
                        <CardDescription className="text-xs">
                          {new Date(session.startTime).toLocaleString()} - {new Date(session.endTime).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-3">
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Duration:</span>
                            <span>{session.duration.toFixed(2)} hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">CPU Usage:</span>
                            <span>{session.resourceUsage.cpuCoreHours.toFixed(4)} core-hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">RAM Usage:</span>
                            <span>{session.resourceUsage.ramGbHours.toFixed(4)} GB-hours</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Bandwidth:</span>
                            <span>{session.resourceUsage.bandwidthGb.toFixed(4)} GB</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  No billing history available yet. Completed sessions will appear here.
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSendReport} className="w-full">
                Generate Invoice
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
