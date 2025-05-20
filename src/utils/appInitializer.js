/**
 * Application Initializer
 * 
 * This module handles the initialization of the application,
 * including resource monitoring startup and application configuration.
 */

import resourceMonitor from './resourceMonitor';
import pricingModel from './pricingModel';

// Initialize the application with resource monitoring
const initializeApp = () => {
  console.log('Initializing Mentor Messenger Magic application...');
  
  // Start resource monitoring
  resourceMonitor.startMonitoring();
  
  // Start billing session
  const session = pricingModel.startBillingSession();
  console.log('Billing session started:', session);
  
  // Set up event listeners for application lifecycle
  window.addEventListener('beforeunload', () => {
    // End billing session and generate final report when user leaves
    const finalReport = pricingModel.endBillingSession();
    console.log('Final usage report:', finalReport);
    
    // In a production app, we would send this data to the server
    // before the page unloads
    
    // Stop resource monitoring
    resourceMonitor.stopMonitoring();
  });
  
  // Return the session information
  return session;
};

export default initializeApp;
