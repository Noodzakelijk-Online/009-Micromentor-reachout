/**
 * Pay-as-you-go Pricing Model
 * 
 * This module implements the pay-as-you-go pricing model for the Mentor Messenger Magic application.
 * It integrates with the resource monitoring system to calculate costs based on actual resource usage.
 * The pricing formula is: resources used * 2 = actual price
 */

import resourceMonitor from './resourceMonitor';

// Class to handle the pay-as-you-go pricing model
class PricingModel {
  constructor() {
    this.usageHistory = [];
    this.currentSessionId = null;
  }

  // Start a new billing session
  startBillingSession() {
    this.currentSessionId = `session-${Date.now()}`;
    resourceMonitor.resetUsage();
    resourceMonitor.startMonitoring();
    
    return {
      sessionId: this.currentSessionId,
      startTime: new Date().toISOString(),
      status: 'active'
    };
  }

  // End the current billing session and calculate final cost
  endBillingSession() {
    if (!this.currentSessionId) {
      return { error: 'No active billing session' };
    }
    
    const usageReport = resourceMonitor.generateUsageReport();
    const finalCost = resourceMonitor.stopMonitoring();
    
    const sessionRecord = {
      sessionId: this.currentSessionId,
      startTime: usageReport.sessionStart,
      endTime: new Date().toISOString(),
      duration: usageReport.sessionDurationHours,
      resourceUsage: usageReport.resourceUsage,
      rawCost: finalCost.rawResourceCost,
      finalCost: finalCost.finalCost,
      breakdown: finalCost.breakdown
    };
    
    this.usageHistory.push(sessionRecord);
    this.currentSessionId = null;
    
    return sessionRecord;
  }

  // Get the current cost estimate for the active session
  getCurrentCostEstimate() {
    if (!this.currentSessionId) {
      return { error: 'No active billing session' };
    }
    
    const currentUsage = resourceMonitor.getCurrentUsage();
    const costEstimate = resourceMonitor.calculateCost();
    
    return {
      sessionId: this.currentSessionId,
      currentUsage: currentUsage,
      estimatedCost: costEstimate.finalCost,
      breakdown: costEstimate.breakdown,
      formula: costEstimate.pricingFormula
    };
  }

  // Get billing history for all sessions
  getBillingHistory() {
    return {
      sessions: this.usageHistory,
      totalSessions: this.usageHistory.length,
      totalCost: this.usageHistory.reduce((sum, session) => sum + session.finalCost, 0)
    };
  }

  // Generate an invoice for a specific session or all sessions
  generateInvoice(sessionId = null) {
    let sessions;
    
    if (sessionId) {
      sessions = this.usageHistory.filter(session => session.sessionId === sessionId);
      if (sessions.length === 0) {
        return { error: 'Session not found' };
      }
    } else {
      sessions = this.usageHistory;
    }
    
    const totalCost = sessions.reduce((sum, session) => sum + session.finalCost, 0);
    
    return {
      invoiceId: `invoice-${Date.now()}`,
      generatedAt: new Date().toISOString(),
      sessions: sessions,
      totalSessions: sessions.length,
      subtotal: totalCost,
      tax: 0, // Tax can be added if needed
      total: totalCost,
      currency: 'USD',
      paymentTerms: 'Due upon receipt',
      pricingFormula: 'Resource Cost × 2 = Final Price'
    };
  }

  // Send an email with the usage report and invoice
  async sendUsageReportEmail(email, sessionId = null) {
    // In a real implementation, this would connect to an email service
    // For this demo, we'll simulate sending an email
    
    const invoice = this.generateInvoice(sessionId);
    
    // Simulate email sending
    console.log(`Sending usage report email to ${email}`);
    console.log('Invoice data:', JSON.stringify(invoice, null, 2));
    
    return {
      success: true,
      sentTo: email,
      sentAt: new Date().toISOString(),
      invoiceId: invoice.invoiceId
    };
  }
}

// Create a singleton instance
const pricingModel = new PricingModel();

export default pricingModel;
