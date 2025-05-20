import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Users, UserPlus, Pencil, Trash2, Loader2 } from "lucide-react";
import api from '@/utils/api';
import resourceOptimizer from '@/utils/resourceOptimizer';
import ResourceUsageWidget from '@/components/ResourceUsageWidget';

const ManageMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usageData, setUsageData] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentMentor, setCurrentMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: ''
  });

  // Use the virtual scrolling optimization for large lists
  const virtualScroll = resourceOptimizer.virtualScroll(mentors, 10);
  const [visibleMentors, setVisibleMentors] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  // Simulate loading mentors from API
  useEffect(() => {
    const loadMentors = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from the API
        const mockMentors = [
          { id: 1, name: 'John Doe', email: 'john@example.com', organization: 'Tech Corp', role: 'Senior Developer' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', organization: 'Design Studio', role: 'UX Designer' },
          { id: 3, name: 'Robert Johnson', email: 'robert@example.com', organization: 'Finance Inc', role: 'Project Manager' },
          { id: 4, name: 'Emily Davis', email: 'emily@example.com', organization: 'Education Group', role: 'Department Head' },
          { id: 5, name: 'Michael Wilson', email: 'michael@example.com', organization: 'Health Services', role: 'Director' }
        ];
        
        setMentors(mockMentors);
        updateVisibleMentors(0, mockMentors);
      } catch (error) {
        console.error('Error loading mentors:', error);
        toast.error('Failed to load mentors');
      } finally {
        setLoading(false);
      }
      
      // Update resource usage
      updateResourceUsage();
    };
    
    loadMentors();
    
    // Set up interval to update usage data
    const updateInterval = setInterval(() => {
      updateResourceUsage();
    }, 10000);
    
    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  // Update visible mentors based on virtual scrolling
  const updateVisibleMentors = (index, mentorList = mentors) => {
    setStartIndex(index);
    setVisibleMentors(virtualScroll.getVisibleItems(index));
  };

  // Simulate resource usage update
  const updateResourceUsage = async () => {
    try {
      const status = await api.session.getStatus();
      setUsageData(status);
    } catch (error) {
      console.error('Error updating resource usage:', error);
    }
  };

  // Handle form input changes with debouncing to reduce resource usage
  const handleInputChange = resourceOptimizer.debounce((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, 300);

  // Open add mentor dialog
  const handleAddMentor = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      role: ''
    });
    setShowAddDialog(true);
  };

  // Open edit mentor dialog
  const handleEditMentor = (mentor) => {
    setCurrentMentor(mentor);
    setFormData({
      name: mentor.name,
      email: mentor.email,
      organization: mentor.organization,
      role: mentor.role
    });
    setShowEditDialog(true);
  };

  // Save new mentor
  const handleSaveMentor = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMentor = {
        id: mentors.length + 1,
        ...formData
      };
      
      const updatedMentors = [...mentors, newMentor];
      setMentors(updatedMentors);
      updateVisibleMentors(startIndex, updatedMentors);
      
      setShowAddDialog(false);
      toast.success('Mentor added successfully');
      
      // Update resource usage after adding
      updateResourceUsage();
    } catch (error) {
      console.error('Error adding mentor:', error);
      toast.error('Failed to add mentor');
    } finally {
      setLoading(false);
    }
  };

  // Update existing mentor
  const handleUpdateMentor = async () => {
    if (!formData.name || !formData.email) {
      toast.error('Name and email are required');
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedMentors = mentors.map(mentor => 
        mentor.id === currentMentor.id ? { ...mentor, ...formData } : mentor
      );
      
      setMentors(updatedMentors);
      updateVisibleMentors(startIndex, updatedMentors);
      
      setShowEditDialog(false);
      toast.success('Mentor updated successfully');
      
      // Update resource usage after updating
      updateResourceUsage();
    } catch (error) {
      console.error('Error updating mentor:', error);
      toast.error('Failed to update mentor');
    } finally {
      setLoading(false);
    }
  };

  // Delete mentor
  const handleDeleteMentor = async (mentorId) => {
    if (!confirm('Are you sure you want to delete this mentor?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedMentors = mentors.filter(mentor => mentor.id !== mentorId);
      setMentors(updatedMentors);
      updateVisibleMentors(startIndex, updatedMentors);
      
      toast.success('Mentor deleted successfully');
      
      // Update resource usage after deleting
      updateResourceUsage();
    } catch (error) {
      console.error('Error deleting mentor:', error);
      toast.error('Failed to delete mentor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Manage Mentors</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Mentor Directory
                </CardTitle>
                <CardDescription>
                  Manage your mentor network
                </CardDescription>
              </div>
              <Button onClick={handleAddMentor}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Mentor
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center text-gray-500">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  Loading mentors...
                </div>
              ) : mentors.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No mentors found. Add your first mentor to get started.
                </div>
              ) : (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {visibleMentors.map(mentor => (
                        <TableRow key={mentor.id}>
                          <TableCell className="font-medium">{mentor.name}</TableCell>
                          <TableCell>{mentor.email}</TableCell>
                          <TableCell>{mentor.organization}</TableCell>
                          <TableCell>{mentor.role}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditMentor(mentor)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteMentor(mentor.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {mentors.length > 10 && (
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => updateVisibleMentors(Math.max(0, startIndex - 10))}
                        disabled={startIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => updateVisibleMentors(Math.min(mentors.length - 10, startIndex + 10))}
                        disabled={startIndex + 10 >= mentors.length}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <ResourceUsageWidget usageData={usageData} />
          
          <Card>
            <CardHeader>
              <CardTitle>Mentor Statistics</CardTitle>
              <CardDescription>
                Overview of your mentor network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold">{mentors.length}</div>
                    <div className="text-sm text-gray-500">Total Mentors</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <div className="text-3xl font-bold">
                      {mentors.reduce((acc, mentor) => {
                        const org = mentor.organization;
                        return acc.includes(org) ? acc : [...acc, org];
                      }, []).length}
                    </div>
                    <div className="text-sm text-gray-500">Organizations</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="text-sm font-medium mb-2">Resource Impact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Storage Usage:</span>
                      <span className="font-medium">
                        {(JSON.stringify(mentors).length / 1024).toFixed(2)} KB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bandwidth per Load:</span>
                      <span className="font-medium">
                        {(JSON.stringify(mentors).length / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Mentor Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Mentor</DialogTitle>
            <DialogDescription>
              Enter the details of the new mentor to add to your network.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter mentor name" 
                defaultValue={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                placeholder="Enter mentor email" 
                defaultValue={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input 
                id="organization" 
                placeholder="Enter organization name" 
                defaultValue={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input 
                id="role" 
                placeholder="Enter mentor role" 
                defaultValue={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveMentor} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : 'Add Mentor'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Mentor Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Mentor</DialogTitle>
            <DialogDescription>
              Update the details of this mentor.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                placeholder="Enter mentor name" 
                defaultValue={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email"
                placeholder="Enter mentor email" 
                defaultValue={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-organization">Organization</Label>
              <Input 
                id="edit-organization" 
                placeholder="Enter organization name" 
                defaultValue={formData.organization}
                onChange={(e) => handleInputChange('organization', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Input 
                id="edit-role" 
                placeholder="Enter mentor role" 
                defaultValue={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleUpdateMentor} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : 'Update Mentor'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageMentors;
