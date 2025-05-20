import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MessageSquare, Send, Users, Loader2 } from "lucide-react";
import api from '@/utils/api';
import resourceOptimizer from '@/utils/resourceOptimizer';
import ResourceUsageWidget from '@/components/ResourceUsageWidget';

const CreateMessage = () => {
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState({
    subject: '',
    content: '',
    template: 'standard',
    sendToAll: false,
    selectedMentors: []
  });
  const [usageData, setUsageData] = useState(null);

  // Simulated mentor data - in a real app, this would come from an API
  const mentors = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com' }
  ];

  // Use debounced function to reduce resource usage during typing
  const handleInputChange = resourceOptimizer.debounce((field, value) => {
    setMessageData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Simulate resource usage update
    updateResourceUsage();
  }, 300);

  // Simulate resource usage update
  const updateResourceUsage = async () => {
    try {
      const status = await api.session.getStatus();
      setUsageData(status);
    } catch (error) {
      console.error('Error updating resource usage:', error);
    }
  };

  const handleMentorSelection = (mentorId) => {
    setMessageData(prev => {
      const isSelected = prev.selectedMentors.includes(mentorId);
      
      if (isSelected) {
        return {
          ...prev,
          selectedMentors: prev.selectedMentors.filter(id => id !== mentorId)
        };
      } else {
        return {
          ...prev,
          selectedMentors: [...prev.selectedMentors, mentorId]
        };
      }
    });
    
    // Update resource usage after selection changes
    updateResourceUsage();
  };

  const handleSendToAllChange = (checked) => {
    setMessageData(prev => ({
      ...prev,
      sendToAll: checked,
      selectedMentors: checked ? mentors.map(mentor => mentor.id) : []
    }));
    
    // Update resource usage after selection changes
    updateResourceUsage();
  };

  const handleSendMessage = async () => {
    if (!messageData.subject || !messageData.content) {
      toast.error('Please fill in both subject and content fields');
      return;
    }
    
    if (messageData.selectedMentors.length === 0) {
      toast.error('Please select at least one mentor');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate message creation and sending
      // In a real app, this would use the actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Message sent to ${messageData.selectedMentors.length} mentors`);
      
      // Reset form
      setMessageData({
        subject: '',
        content: '',
        template: 'standard',
        sendToAll: false,
        selectedMentors: []
      });
      
      // Update resource usage after sending
      updateResourceUsage();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Create Message</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Message Composer
              </CardTitle>
              <CardDescription>
                Create a message to send to your mentors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Enter message subject" 
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  value={messageData.subject}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select 
                  value={messageData.template}
                  onValueChange={(value) => handleInputChange('template', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard Outreach</SelectItem>
                    <SelectItem value="followup">Follow-up Message</SelectItem>
                    <SelectItem value="event">Event Invitation</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Message Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter your message content here" 
                  rows={8}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  value={messageData.content}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Select Recipients
              </CardTitle>
              <CardDescription>
                Choose which mentors will receive your message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 pb-4 border-b">
                <Checkbox 
                  id="sendToAll" 
                  checked={messageData.sendToAll}
                  onCheckedChange={handleSendToAllChange}
                />
                <Label htmlFor="sendToAll" className="font-medium">Send to all mentors</Label>
              </div>
              
              <div className="space-y-2">
                {mentors.map(mentor => (
                  <div key={mentor.id} className="flex items-center space-x-2 py-2 border-b last:border-0">
                    <Checkbox 
                      id={`mentor-${mentor.id}`} 
                      checked={messageData.selectedMentors.includes(mentor.id)}
                      onCheckedChange={() => handleMentorSelection(mentor.id)}
                      disabled={messageData.sendToAll}
                    />
                    <div className="grid gap-0.5">
                      <Label htmlFor={`mentor-${mentor.id}`} className="font-medium">{mentor.name}</Label>
                      <span className="text-sm text-gray-500">{mentor.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleSendMessage}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ResourceUsageWidget usageData={usageData} />
          
          <Card>
            <CardHeader>
              <CardTitle>Message Preview</CardTitle>
              <CardDescription>
                Preview how your message will appear to recipients
              </CardDescription>
            </CardHeader>
            <CardContent>
              {messageData.subject || messageData.content ? (
                <div className="border rounded-md p-4 space-y-2">
                  <div className="font-medium">{messageData.subject || 'No subject'}</div>
                  <div className="text-sm whitespace-pre-wrap">{messageData.content || 'No content'}</div>
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  Your message preview will appear here
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage Impact</CardTitle>
              <CardDescription>
                Estimated resource usage for this operation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Recipients:</span>
                  <span className="font-medium">{messageData.selectedMentors.length} mentors</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Message Size:</span>
                  <span className="font-medium">
                    {(messageData.subject.length + messageData.content.length) || 0} characters
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Estimated Bandwidth:</span>
                  <span className="font-medium">
                    {((messageData.subject.length + messageData.content.length) * messageData.selectedMentors.length / 1024 / 1024).toFixed(6)} MB
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateMessage;
