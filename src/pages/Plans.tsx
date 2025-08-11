import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Shield,
  Zap,
  Infinity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Plans = () => {
  const [currentPlan] = useState("pro");
  const { toast } = useToast();

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Plan upgrade initiated",
      description: `Upgrading to ${planId} plan. You'll be redirected to payment.`,
    });
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 1,000 conversations/month",
        "Basic AI responses",
        "Email support",
        "Standard integrations",
        "Basic analytics",
        "1 user account"
      ],
      limits: {
        conversations: 1000,
        users: 1,
        integrations: 2
      },
      popular: false
    },
    {
      id: "pro",
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing businesses with higher volume",
      features: [
        "Up to 10,000 conversations/month",
        "Advanced AI with learning",
        "Priority support",
        "All integrations included",
        "Advanced analytics & reporting",
        "Up to 5 user accounts",
        "Custom branding",
        "API access"
      ],
      limits: {
        conversations: 10000,
        users: 5,
        integrations: "unlimited"
      },
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$299",
      period: "per month",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited conversations",
        "Custom AI training",
        "24/7 dedicated support",
        "Custom integrations",
        "White-label solution",
        "Unlimited users",
        "Advanced security features",
        "SLA guarantee",
        "Custom deployment options"
      ],
      limits: {
        conversations: "unlimited",
        users: "unlimited",
        integrations: "unlimited"
      },
      popular: false
    }
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);
  const usageData = {
    conversations: 3247,
    users: 3,
    integrations: 2
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Plans & Usage</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription and view usage metrics</p>
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
              <CardDescription>
                {currentPlanData?.description}
              </CardDescription>
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
                  {usageData.conversations.toLocaleString()} / {
                    typeof currentPlanData?.limits.conversations === 'number' 
                      ? currentPlanData.limits.conversations.toLocaleString()
                      : currentPlanData?.limits.conversations
                  }
                </span>
              </div>
              <Progress 
                value={
                  typeof currentPlanData?.limits.conversations === 'number'
                    ? (usageData.conversations / currentPlanData.limits.conversations) * 100
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
                  {usageData.users} / {
                    typeof currentPlanData?.limits.users === 'number'
                      ? currentPlanData.limits.users
                      : currentPlanData?.limits.users
                  }
                </span>
              </div>
              <Progress 
                value={
                  typeof currentPlanData?.limits.users === 'number'
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
                  {usageData.integrations} / {currentPlanData?.limits.integrations}
                </span>
              </div>
              <Progress 
                value={
                  typeof currentPlanData?.limits.integrations === 'number'
                    ? (usageData.integrations / currentPlanData.limits.integrations) * 100
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
              <p className="text-sm text-muted-foreground">December 15, 2024</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{currentPlanData?.price}/{currentPlanData?.period}</p>
              <p className="text-sm text-muted-foreground">Auto-renewal enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${
                plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : ''
              } ${plan.id === currentPlan ? 'bg-muted/30' : ''}`}
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
                  {plan.id === 'enterprise' && <Shield className="h-5 w-5" />}
                  {plan.id === 'pro' && <Zap className="h-5 w-5" />}
                  {plan.id === 'starter' && <Users className="h-5 w-5" />}
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
                  {plan.id === currentPlan ? "Current Plan" : `Upgrade to ${plan.name}`}
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
              { date: "Nov 15, 2024", amount: "$99.00", status: "Paid", plan: "Professional" },
              { date: "Oct 15, 2024", amount: "$99.00", status: "Paid", plan: "Professional" },
              { date: "Sep 15, 2024", amount: "$29.00", status: "Paid", plan: "Starter" },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{transaction.plan} Plan</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
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