import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Mail, 
  Settings, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Integrations = () => {
  const [whatsappConfig, setWhatsappConfig] = useState({
    enabled: false,
    phoneNumber: "",
    accessToken: "",
    webhookUrl: ""
  });

  const [emailConfig, setEmailConfig] = useState({
    enabled: true,
    smtpServer: "smtp.gmail.com",
    smtpPort: "587",
    username: "",
    password: ""
  });

  const { toast } = useToast();

  const handleSaveWhatsApp = () => {
    toast({
      title: "WhatsApp integration updated",
      description: "Your WhatsApp configuration has been saved successfully.",
    });
  };

  const handleSaveEmail = () => {
    toast({
      title: "Email integration updated", 
      description: "Your email configuration has been saved successfully.",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
        <p className="text-muted-foreground mt-1">Connect and manage your communication channels</p>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Business API</p>
                </div>
              </div>
              <Badge variant={whatsappConfig.enabled ? "default" : "secondary"}>
                {whatsappConfig.enabled ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">SMTP</p>
                </div>
              </div>
              <Badge variant={emailConfig.enabled ? "default" : "secondary"}>
                {emailConfig.enabled ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Plus className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Add More</p>
                  <p className="text-sm text-muted-foreground">Coming Soon</p>
                </div>
              </div>
              <Badge variant="outline">Available</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* WhatsApp Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              WhatsApp Business
            </CardTitle>
            <CardDescription>
              Connect your WhatsApp Business account to handle customer inquiries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whatsapp-enabled" className="text-base font-medium">
                  Enable WhatsApp Integration
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow customers to contact you via WhatsApp
                </p>
              </div>
              <Switch
                id="whatsapp-enabled"
                checked={whatsappConfig.enabled}
                onCheckedChange={(checked) => 
                  setWhatsappConfig(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div>
                <Label htmlFor="phone-number">Business Phone Number</Label>
                <Input
                  id="phone-number"
                  placeholder="+1 (555) 123-4567"
                  value={whatsappConfig.phoneNumber}
                  onChange={(e) => setWhatsappConfig(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  disabled={!whatsappConfig.enabled}
                />
              </div>

              <div>
                <Label htmlFor="access-token">WhatsApp Access Token</Label>
                <Input
                  id="access-token"
                  type="password"
                  placeholder="Enter your access token"
                  value={whatsappConfig.accessToken}
                  onChange={(e) => setWhatsappConfig(prev => ({ ...prev, accessToken: e.target.value }))}
                  disabled={!whatsappConfig.enabled}
                />
              </div>

              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value={whatsappConfig.webhookUrl || "https://api.yourcompany.com/whatsapp/webhook"}
                    onChange={(e) => setWhatsappConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                    disabled={!whatsappConfig.enabled}
                  />
                  <Button variant="outline" size="icon" disabled={!whatsappConfig.enabled}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>You'll need a WhatsApp Business API account to use this integration.</span>
            </div>

            <Button onClick={handleSaveWhatsApp} className="w-full" disabled={!whatsappConfig.enabled}>
              <Settings className="mr-2 h-4 w-4" />
              Save WhatsApp Configuration
            </Button>
          </CardContent>
        </Card>

        {/* Email Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Email Integration
            </CardTitle>
            <CardDescription>
              Configure SMTP settings to send and receive emails
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-enabled" className="text-base font-medium">
                  Enable Email Integration
                </Label>
                <p className="text-sm text-muted-foreground">
                  Handle customer inquiries via email
                </p>
              </div>
              <Switch
                id="email-enabled"
                checked={emailConfig.enabled}
                onCheckedChange={(checked) => 
                  setEmailConfig(prev => ({ ...prev, enabled: checked }))
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp-server">SMTP Server</Label>
                  <Input
                    id="smtp-server"
                    value={emailConfig.smtpServer}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpServer: e.target.value }))}
                    disabled={!emailConfig.enabled}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp-port">Port</Label>
                  <Input
                    id="smtp-port"
                    value={emailConfig.smtpPort}
                    onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpPort: e.target.value }))}
                    disabled={!emailConfig.enabled}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email-username">Username</Label>
                <Input
                  id="email-username"
                  type="email"
                  placeholder="your-email@company.com"
                  value={emailConfig.username}
                  onChange={(e) => setEmailConfig(prev => ({ ...prev, username: e.target.value }))}
                  disabled={!emailConfig.enabled}
                />
              </div>

              <div>
                <Label htmlFor="email-password">Password</Label>
                <Input
                  id="email-password"
                  type="password"
                  placeholder="Enter your email password"
                  value={emailConfig.password}
                  onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                  disabled={!emailConfig.enabled}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
              <CheckCircle className="h-4 w-4" />
              <span>Email integration is currently active and working properly.</span>
            </div>

            <Button onClick={handleSaveEmail} className="w-full" disabled={!emailConfig.enabled}>
              <Settings className="mr-2 h-4 w-4" />
              Save Email Configuration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Integrations;