import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CpuIcon, Database, HardDrive, Wifi, Zap } from "lucide-react";
import resourceMonitor from '@/utils/resourceMonitor';
import resourceOptimizer from '@/utils/resourceOptimizer';

// Optimize the component using memoization
const ResourceUsageWidget = React.memo(({ usageData }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Use throttled update to reduce rendering frequency
  const updateVisibility = resourceOptimizer.throttle(() => {
    // Check if component is in viewport (simplified version)
    setIsVisible(true);
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
    };
  }, [updateVisibility]);

  // Don't render if not visible to save resources
  if (!isVisible) return null;

  // Don't render if no usage data
  if (!usageData || !usageData.currentUsage) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Resource Usage
          </CardTitle>
          <CardDescription>
            No active monitoring session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center text-gray-500">
            Start a session to view resource usage
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatNumber = (value) => {
    return value.toFixed(6);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Resource Usage
        </CardTitle>
        <CardDescription>
          Real-time resource consumption metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><CpuIcon className="mr-1 h-4 w-4" /> CPU Usage</span>
              <span>{formatNumber(usageData.currentUsage.cpuCoreSeconds / 3600)} core-hours</span>
            </div>
            <Progress value={Math.min((usageData.currentUsage.cpuCoreSeconds / 36), 100)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><Database className="mr-1 h-4 w-4" /> RAM Usage</span>
              <span>{formatNumber(usageData.currentUsage.ramGbSeconds / 3600)} GB-hours</span>
            </div>
            <Progress value={Math.min((usageData.currentUsage.ramGbSeconds / 36), 100)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><HardDrive className="mr-1 h-4 w-4" /> Storage</span>
              <span>{formatNumber(usageData.currentUsage.storageGbHours)} GB-hours</span>
            </div>
            <Progress value={Math.min((usageData.currentUsage.storageGbHours * 100), 100)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><Wifi className="mr-1 h-4 w-4" /> Bandwidth</span>
              <span>{formatNumber(usageData.currentUsage.bandwidthGb)} GB</span>
            </div>
            <Progress value={Math.min((usageData.currentUsage.bandwidthGb * 100), 100)} />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center"><Zap className="mr-1 h-4 w-4" /> Electricity</span>
              <span>{formatNumber(usageData.currentUsage.estimatedKwh)} kWh</span>
            </div>
            <Progress value={Math.min((usageData.currentUsage.estimatedKwh * 1000), 100)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export default ResourceUsageWidget;
