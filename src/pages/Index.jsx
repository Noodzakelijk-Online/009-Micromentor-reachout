import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Zap, BarChart, Users, MessageSquare, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  Introducing Mentor Messenger Magic
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Automate Your Mentor Outreach
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Save hours of manual work and reduce costs with our intelligent mentor messaging platform.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/dashboard">
                  <Button size="lg" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Get Started
                  </Button>
                </Link>
                <Link to="/create-message">
                  <Button size="lg" variant="outline" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    Create Your First Message
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] lg:h-[500px] lg:w-[500px] xl:h-[550px] xl:w-[550px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden h-full w-full flex items-center justify-center">
                  <div className="p-8 text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-2xl font-bold mb-2">Mentor Messenger Magic</h3>
                    <p className="text-gray-500">Intelligent outreach that saves time and resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Time & Cost Savings Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Save Time & Reduce Costs</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how Mentor Messenger Magic transforms your outreach efficiency
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Hours Saved Weekly</CardTitle>
                <CardDescription>Reduce manual outreach time by up to 95%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">20+ hrs</div>
                <p className="text-sm text-gray-500 mt-2">Average time saved per week for teams</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Cost Reduction</CardTitle>
                <CardDescription>Lower your outreach costs significantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">70%</div>
                <p className="text-sm text-gray-500 mt-2">Average cost reduction compared to manual processes</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Increased Efficiency</CardTitle>
                <CardDescription>Reach more mentors in less time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">5x</div>
                <p className="text-sm text-gray-500 mt-2">More mentors reached with the same resources</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pay-as-you-go Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Resource-Based Pricing</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Only pay for what you use with our transparent pay-as-you-go model
              </p>
            </div>
          </div>
          
          <div className="mx-auto max-w-3xl mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pay-As-You-Go Pricing</CardTitle>
                <CardDescription>
                  Our simple formula: Resources Used × 2 = Your Price
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <BarChart className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Comprehensive Resource Tracking</p>
                      <p className="text-sm text-gray-500">CPU, RAM, Storage, Bandwidth, and Electricity</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">No Hidden Fees</p>
                      <p className="text-sm text-gray-500">Transparent billing with detailed resource usage reports</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Scale With Your Needs</p>
                      <p className="text-sm text-gray-500">Perfect for teams of any size with varying outreach volumes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard" className="w-full">
                  <Button className="w-full">Start Using Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need for efficient mentor outreach
              </p>
            </div>
          </div>
          
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Automated Messaging</CardTitle>
                <CardDescription>Create personalized messages at scale</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Send customized messages to hundreds of mentors with just a few clicks, saving hours of manual work.</p>
              </CardContent>
              <CardFooter>
                <Link to="/create-message">
                  <Button variant="outline">Try It Now</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mentor Management</CardTitle>
                <CardDescription>Organize your mentor network efficiently</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Easily add, categorize, and manage your mentors in one centralized dashboard.</p>
              </CardContent>
              <CardFooter>
                <Link to="/mentors">
                  <Button variant="outline">Manage Mentors</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Optimization</CardTitle>
                <CardDescription>Designed for maximum efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Our platform is built to minimize resource usage while maximizing performance and speed.</p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard">
                  <Button variant="outline">View Dashboard</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Track your resource consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Monitor your usage patterns and receive detailed reports on resource consumption and associated costs.</p>
              </CardContent>
              <CardFooter>
                <Link to="/dashboard">
                  <Button variant="outline">Check Analytics</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Mentor Outreach?</h2>
              <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start saving time and resources today with Mentor Messenger Magic
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/dashboard">
                <Button size="lg" variant="secondary" className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Mentor Messenger Magic. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
