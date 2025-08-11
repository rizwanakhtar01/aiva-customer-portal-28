import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, Palette, Type, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Customization = () => {
  const [widgetConfig, setWidgetConfig] = useState({
    primaryColor: "#8B5CF6",
    secondaryColor: "#F3F4F6",
    fontFamily: "Inter",
    welcomeMessage: "Hi! How can I help you today?",
    chatIcon: "message-circle",
    logoUrl: ""
  });

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: "Your widget customizations have been applied successfully.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setWidgetConfig(prev => ({ ...prev, logoUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Widget Customization</h1>
        <p className="text-muted-foreground mt-1">Customize your AI chat widget to match your brand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customization Panel */}
        <div className="space-y-6">
          {/* Logo Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Logo Upload
              </CardTitle>
              <CardDescription>Upload your company logo for the chat widget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {widgetConfig.logoUrl ? (
                    <img 
                      src={widgetConfig.logoUrl} 
                      alt="Logo preview" 
                      className="max-h-16 mx-auto mb-2 rounded"
                    />
                  ) : (
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  )}
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Colors
              </CardTitle>
              <CardDescription>Choose colors that match your brand</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={widgetConfig.primaryColor}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10 p-1 rounded-lg"
                    />
                    <Input
                      value={widgetConfig.primaryColor}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
                      placeholder="#8B5CF6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={widgetConfig.secondaryColor}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-16 h-10 p-1 rounded-lg"
                    />
                    <Input
                      value={widgetConfig.secondaryColor}
                      onChange={(e) => setWidgetConfig(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      placeholder="#F3F4F6"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Typography
              </CardTitle>
              <CardDescription>Select the font style for your widget</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select 
                  value={widgetConfig.fontFamily} 
                  onValueChange={(value) => setWidgetConfig(prev => ({ ...prev, fontFamily: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Lato">Lato</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Messages
              </CardTitle>
              <CardDescription>Customize the welcome message</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="welcome-message">Welcome Message</Label>
                <Textarea
                  id="welcome-message"
                  value={widgetConfig.welcomeMessage}
                  onChange={(e) => setWidgetConfig(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                  placeholder="Enter your welcome message..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="w-full" size="lg">
            Save Changes
          </Button>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>See how your widget will look on your website</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock Website Background */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg p-6 min-h-[500px] relative">
                <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Your Website</h3>
                  <p className="text-slate-600">This is how the widget appears to visitors</p>
                </div>

                {/* Chat Widget Preview */}
                <div className="absolute bottom-4 right-4">
                  {/* Chat Button */}
                  <div className="relative">
                    <button 
                      className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: widgetConfig.primaryColor }}
                    >
                      <MessageCircle className="h-6 w-6 text-white" />
                    </button>

                    {/* Chat Window (shown expanded) */}
                    <div 
                      className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border overflow-hidden"
                      style={{ fontFamily: widgetConfig.fontFamily }}
                    >
                      {/* Header */}
                      <div 
                        className="p-4 text-white"
                        style={{ backgroundColor: widgetConfig.primaryColor }}
                      >
                        <div className="flex items-center gap-3">
                          {widgetConfig.logoUrl && (
                            <img 
                              src={widgetConfig.logoUrl} 
                              alt="Logo" 
                              className="w-8 h-8 rounded-full bg-white/20 p-1"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold">AI Assistant</h4>
                            <p className="text-xs opacity-90">Online</p>
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="p-4 space-y-3 flex-1">
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            AI
                          </div>
                          <div 
                            className="p-3 rounded-lg text-sm max-w-xs"
                            style={{ backgroundColor: widgetConfig.secondaryColor }}
                          >
                            {widgetConfig.welcomeMessage}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <div 
                            className="p-3 rounded-lg text-sm text-white max-w-xs"
                            style={{ backgroundColor: widgetConfig.primaryColor }}
                          >
                            Hello! I need help with my account.
                          </div>
                        </div>
                      </div>

                      {/* Input */}
                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Type your message..."
                            className="flex-1 p-2 border rounded-lg text-sm"
                            style={{ fontFamily: widgetConfig.fontFamily }}
                          />
                          <button 
                            className="px-4 py-2 rounded-lg text-white text-sm font-medium"
                            style={{ backgroundColor: widgetConfig.primaryColor }}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customization;