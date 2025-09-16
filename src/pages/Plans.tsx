import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Check,
  Users,
  MessageSquare,
  BarChart3,
  Mail,
  Bot,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PlanLimits {
  conversations: number | "unlimited";
  users: number | "unlimited";
  integrations: number | "unlimited";
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  limits: PlanLimits;
  popular: boolean;
}

const Plans = () => {
  const [currentPlan] = useState("webchat");
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Plan upgrade initiated",
      description: `Upgrading to ${planId} plan. You'll be redirected to payment.`,
    });
  };

  const plans: Plan[] = [
    {
      id: "webchat",
      name: "Web Chat & Visibility",
      price: "£995",
      period: "per month",
      description: "Complete web chat solution with visibility features",
      features: [
        "Unlimited web chat conversations",
        "AI-powered responses",
        "Analytics & reporting",
        "Search engine visibility tools",
        "Custom branding",
        "24/7 chat availability",
        "Integration support",
        "Priority customer support",
      ],
      limits: {
        conversations: "unlimited",
        users: "unlimited",
        integrations: "unlimited",
      },
      popular: true,
    },
    {
      id: "email",
      name: "Email Management",
      price: "£1,195",
      period: "per month",
      description: "Advanced email automation and management system",
      features: [
        "Automated email responses",
        "Email inbox management",
        "AI-powered email drafting",
        "Email analytics & tracking",
        "Custom email templates",
        "Integration with existing systems",
        "Advanced workflow automation",
        "Priority support",
      ],
      limits: {
        conversations: "unlimited",
        users: "unlimited",
        integrations: "unlimited",
      },
      popular: false,
    },
    {
      id: "messenger",
      name: "Messenger Integration",
      price: "£495",
      period: "per month",
      description: "Social media messenger automation and management",
      features: [
        "Facebook Messenger integration",
        "WhatsApp Business integration",
        "Automated messaging responses",
        "Multi-platform management",
        "Message analytics",
        "Custom automated workflows",
        "Social media monitoring",
        "Customer support",
      ],
      limits: {
        conversations: "unlimited",
        users: "unlimited",
        integrations: "unlimited",
      },
      popular: false,
    },
  ];

  const currentPlanData = plans.find((plan) => plan.id === currentPlan);
  const usageData = {
    conversations: 3247,
    users: 3,
    integrations: 2,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Plans & Usage</h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription and view usage metrics
        </p>
      </div>

      {/* Current Plan Overview */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                Current Plan: {currentPlanData?.name}
              </CardTitle>
              <CardDescription>{currentPlanData?.description}</CardDescription>
            </div>
            <Badge variant="default" className="text-sm">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Conversations Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Conversations</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usageData.conversations.toLocaleString()} /{" "}
                  {typeof currentPlanData?.limits.conversations === "number"
                    ? currentPlanData.limits.conversations.toLocaleString()
                    : currentPlanData?.limits.conversations || "N/A"}
                </span>
              </div>
              <Progress
                value={
                  typeof currentPlanData?.limits.conversations === "number"
                    ? (usageData.conversations /
                        currentPlanData.limits.conversations) *
                      100
                    : 32
                }
                className="h-2"
              />
            </div>

            {/* Users Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Users</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usageData.users} /{" "}
                  {typeof currentPlanData?.limits.users === "number"
                    ? currentPlanData.limits.users
                    : currentPlanData?.limits.users || "N/A"}
                </span>
              </div>
              <Progress
                value={
                  typeof currentPlanData?.limits.users === "number"
                    ? (usageData.users / currentPlanData.limits.users) * 100
                    : 60
                }
                className="h-2"
              />
            </div>

            {/* Integrations Usage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Integrations</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usageData.integrations} /{" "}
                  {currentPlanData?.limits.integrations || "N/A"}
                </span>
              </div>
              <Progress
                value={
                  typeof currentPlanData?.limits.integrations === "number"
                    ? (usageData.integrations /
                        currentPlanData.limits.integrations) *
                      100
                    : 100
                }
                className="h-2"
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Next billing date</p>
              <p className="text-sm text-muted-foreground">October 15, 2025</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {currentPlanData?.price}/{currentPlanData?.period}
              </p>
              <p className="text-sm text-muted-foreground">
                Auto-renewal enabled
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* One-off Activation Cost */}
      <Card className="border-warning/20 bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning">
            <Crown className="h-5 w-5" />
            Required Activation Setup
          </CardTitle>
          <CardDescription>
            One-time setup cost required before any monthly plan activation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-warning">£995</div>
              <p className="text-sm text-muted-foreground">One-time payment</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Includes:</p>
              <ul className="text-xs text-muted-foreground mt-1">
                <li>• Complete system setup</li>
                <li>• AI configuration & training</li>
                <li>• Staff training session</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Monthly Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${
                plan.popular ? "border-primary/50 ring-1 ring-primary/20" : ""
              } ${plan.id === currentPlan ? "bg-muted/30" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  {plan.id === "webchat" && (
                    <MessageSquare className="h-5 w-5" />
                  )}
                  {plan.id === "email" && <Mail className="h-5 w-5" />}
                  {plan.id === "messenger" && <Bot className="h-5 w-5" />}
                  {plan.name}
                </CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    {plan.price}
                    <span className="text-base font-normal text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleUpgrade(plan.id)}
                  variant={plan.id === currentPlan ? "outline" : "default"}
                  className="w-full"
                  disabled={plan.id === currentPlan}
                >
                  {plan.id === currentPlan
                    ? "Current Plan"
                    : `Upgrade to ${plan.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Billing History</CardTitle>
          <CardDescription>Your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "September 15, 2025",
                amount: "£995.00",
                status: "Paid",
                plan: "Web Chat & Visibility",
              },
              {
                date: "August 15, 2025",
                amount: "£995.00",
                status: "Paid",
                plan: "Web Chat & Visibility",
              },
              {
                date: "July 15, 2025",
                amount: "£995.00",
                status: "Paid",
                plan: "Activation Setup",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="font-medium">{transaction.plan} Plan</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <Badge variant="outline" className="text-xs">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Plans;
