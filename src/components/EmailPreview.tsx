import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Eye } from "lucide-react";

export const EmailPreview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const WelcomeEmailTemplate = () => (
    <Card className="max-w-md mx-auto bg-card">
      <CardHeader className="text-center border-b bg-primary/5">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-primary">Welcome to CustomerPortal</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Your Account is Ready</h2>
          <p className="text-muted-foreground text-sm">
            Hi John Doe, your customer portal account has been created successfully.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <div className="text-sm">
            <span className="font-medium">Login URL:</span>
            <div className="bg-background rounded border px-3 py-2 mt-1 font-mono text-xs">
              https://portal.yourcompany.com/login
            </div>
          </div>
          <div className="text-sm">
            <span className="font-medium">Email:</span>
            <div className="bg-background rounded border px-3 py-2 mt-1 font-mono text-xs">
              john.doe@company.com
            </div>
          </div>
          <div className="text-sm">
            <span className="font-medium">Temporary Password:</span>
            <div className="bg-background rounded border px-3 py-2 mt-1 font-mono text-xs">
              TempPass123!
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button className="w-full">
            Access Portal
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>You'll be prompted to set a new password on first login.</p>
          <p>This temporary password expires in 24 hours.</p>
        </div>
      </CardContent>
    </Card>
  );

  const ForgotPasswordEmailTemplate = () => (
    <Card className="max-w-md mx-auto bg-card">
      <CardHeader className="text-center border-b bg-primary/5">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-primary">Password Reset Request</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Reset Your Password</h2>
          <p className="text-muted-foreground text-sm">
            Hi John Doe, you requested to reset your password. Use the verification code below.
          </p>
        </div>
        
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="text-sm font-medium mb-2">Verification Code</div>
          <div className="text-2xl font-bold tracking-widest font-mono bg-background rounded border py-3 px-4">
            847293
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            This code expires in 10 minutes
          </div>
        </div>

        <div className="text-center">
          <Button className="w-full">
            Reset Password
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>If you didn't request this, please ignore this email.</p>
          <p>Your password won't change until you create a new one.</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Eye className="w-4 h-4" />
          Email Preview
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Customer Email Templates
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6">
          <Tabs defaultValue="welcome" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="welcome" className="gap-2">
                <Badge variant="secondary" className="text-xs">New User</Badge>
                Welcome Email
              </TabsTrigger>
              <TabsTrigger value="forgot" className="gap-2">
                <Badge variant="secondary" className="text-xs">Reset</Badge>
                Forgot Password
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="welcome" className="mt-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Email sent when a new user account is created with temporary credentials.
                </div>
                <WelcomeEmailTemplate />
              </div>
            </TabsContent>
            
            <TabsContent value="forgot" className="mt-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Email sent when user requests password reset with verification code.
                </div>
                <ForgotPasswordEmailTemplate />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};