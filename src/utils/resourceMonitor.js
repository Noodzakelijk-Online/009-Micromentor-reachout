/**
 * Resource Monitoring System
 * 
 * This module provides functionality to track and calculate resource usage
 * for the Mentor Messenger Magic application. It monitors CPU, RAM, storage,
 * bandwidth, and estimated electricity usage.
 */

// Constants for resource pricing calculations
const RESOURCE_PRICING = {
  CPU_PER_CORE_HOUR: 0.02, // $ per core hour
  RAM_PER_GB_HOUR: 0.01,   // $ per GB hour
  STORAGE_PER_GB_HOUR: 0.0005, // $ per GB hour
  BANDWIDTH_PER_GB: 0.08,  // $ per GB transferred
  ELECTRICITY_PER_KWH: 0.12, // $ per kWh
  // Conversion factors
  WATTS_PER_CPU_CORE: 15,  // Estimated watts per CPU core at full utilization
  WATTS_PER_GB_RAM: 0.5,   // Estimated watts per GB of RAM
  WATTS_PER_GB_STORAGE_READ: 0.01, // Estimated watts per GB of storage read
  WATTS_PER_GB_STORAGE_WRITE: 0.02, // Estimated watts per GB of storage write
  WATTS_PER_GB_BANDWIDTH: 0.1, // Estimated watts per GB of bandwidth
};

// Class to track resource usage
class ResourceMonitor {
  constructor() {
    this.resetUsage();
    this.startTime = Date.now();
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }

  // Reset all usage metrics
  resetUsage() {
    this.usage = {
      cpuCoreSeconds: 0,
      ramGbSeconds: 0,
      storageGbHours: 0,
      bandwidthGb: 0,
      estimatedKwh: 0,
      startTimestamp: Date.now(),
      endTimestamp: null,
      sessionDurationHours: 0,
    };
  }

  // Start monitoring resources
  startMonitoring() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.startTime = Date.now();
    this.usage.startTimestamp = this.startTime;
    
    // Set up monitoring interval (every 5 seconds)
    this.monitoringInterval = setInterval(() => {
      this.sampleResourceUsage();
    }, 5000);
    
    console.log('Resource monitoring started');
  }

  // Stop monitoring resources
  stopMonitoring() {
    if (!this.isMonitoring) return;
    
    clearInterval(this.monitoringInterval);
    this.isMonitoring = false;
    this.usage.endTimestamp = Date.now();
    this.usage.sessionDurationHours = (this.usage.endTimestamp - this.usage.startTimestamp) / 3600000;
    
    console.log('Resource monitoring stopped');
    return this.calculateCost();
  }

  // Sample current resource usage
  async sampleResourceUsage() {
    try {
      // In a real implementation, these would use actual system metrics
      // For this demo, we'll simulate resource usage
      
      // Simulate CPU usage (between 5-30% of available cores)
      const cpuCores = navigator.hardwareConcurrency || 4;
      const cpuUsage = (Math.random() * 0.25 + 0.05) * cpuCores;
      this.usage.cpuCoreSeconds += cpuUsage * 5; // 5 seconds between samples
      
      // Simulate RAM usage (between 100-500MB)
      const ramUsageGb = (Math.random() * 0.4 + 0.1);
      this.usage.ramGbSeconds += ramUsageGb * 5; // 5 seconds between samples
      
      // Simulate storage usage (small increments for read/write operations)
      const storageUsageGb = Math.random() * 0.01; // 0-10MB per sample
      this.usage.storageGbHours += storageUsageGb / 720; // Convert to GB-hours (5s is 1/720 of an hour)
      
      // Simulate bandwidth usage (small increments for API calls, etc.)
      const bandwidthUsageGb = Math.random() * 0.005; // 0-5MB per sample
      this.usage.bandwidthGb += bandwidthUsageGb;
      
      // Calculate estimated electricity usage in kWh
      const wattsUsed = 
        (cpuUsage * RESOURCE_PRICING.WATTS_PER_CPU_CORE) +
        (ramUsageGb * RESOURCE_PRICING.WATTS_PER_GB_RAM) +
        (storageUsageGb * RESOURCE_PRICING.WATTS_PER_GB_STORAGE_READ) +
        (bandwidthUsageGb * RESOURCE_PRICING.WATTS_PER_GB_BANDWIDTH);
      
      // Convert watts to kWh (5 seconds = 1/720 of an hour)
      this.usage.estimatedKwh += (wattsUsed / 1000) / 720;
      
    } catch (error) {
      console.error('Error sampling resource usage:', error);
    }
  }

  // Calculate the cost of resources used
  calculateCost() {
    const rawCost = {
      cpu: this.usage.cpuCoreSeconds / 3600 * RESOURCE_PRICING.CPU_PER_CORE_HOUR,
      ram: this.usage.ramGbSeconds / 3600 * RESOURCE_PRICING.RAM_PER_GB_HOUR,
      storage: this.usage.storageGbHours * RESOURCE_PRICING.STORAGE_PER_GB_HOUR,
      bandwidth: this.usage.bandwidthGb * RESOURCE_PRICING.BANDWIDTH_PER_GB,
      electricity: this.usage.estimatedKwh * RESOURCE_PRICING.ELECTRICITY_PER_KWH
    };
    
    const totalRawCost = Object.values(rawCost).reduce((sum, cost) => sum + cost, 0);
    
    // Apply the pricing formula: resources used * 2 = actual price
    const finalCost = totalRawCost * 2;
    
    return {
      rawResourceCost: totalRawCost,
      finalCost: finalCost,
      breakdown: rawCost,
      usage: { ...this.usage },
      pricingFormula: "Resource Cost × 2 = Final Price"
    };
  }

  // Get current usage statistics
  getCurrentUsage() {
    return {
      ...this.usage,
      currentCost: this.calculateCost()
    };
  }

  // Generate a detailed usage report
  generateUsageReport() {
    const cost = this.calculateCost();
    
    return {
      sessionStart: new Date(this.usage.startTimestamp).toISOString(),
      sessionEnd: this.usage.endTimestamp ? new Date(this.usage.endTimestamp).toISOString() : 'Ongoing',
      sessionDurationHours: this.usage.sessionDurationHours || 
        ((Date.now() - this.usage.startTimestamp) / 3600000),
      resourceUsage: {
        cpuCoreHours: this.usage.cpuCoreSeconds / 3600,
        ramGbHours: this.usage.ramGbSeconds / 3600,
        storageGbHours: this.usage.storageGbHours,
        bandwidthGb: this.usage.bandwidthGb,
        estimatedKwh: this.usage.estimatedKwh
      },
      costs: cost,
      timestamp: new Date().toISOString()
    };
  }
}

// Create a singleton instance
const resourceMonitor = new ResourceMonitor();

export default resourceMonitor;
