import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Filter, 
  Settings, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Inbox,
  MailCheck
} from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";

// Mock data
const mockEmails = [
  {
    id: 1,
    subject: "Corporate Event Inquiry",
    from: "john@company.com",
    intent: "Corporate Events",
    configuredEmail: "corporate@aivarevolution.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 10:30 AM",
    aiDraft: "Thank you for your interest in our corporate event services. We'd be happy to discuss your requirements and provide a customized solution...",
  },
  {
    id: 2,
    subject: "Technical Support Request",
    from: "sarah@techcorp.com",
    intent: "Technical Support",
    configuredEmail: "support@aivarevolution.com",
    status: "Approved",
    receivedAt: "2024-01-15 09:15 AM",
    aiDraft: "We've received your technical support request and our team is currently investigating the issue...",
  },
  {
    id: 3,
    subject: "General Information",
    from: "mike@startup.io",
    intent: "General Inquiry",
    configuredEmail: "info@aivarevolution.com",
    status: "Sent",
    receivedAt: "2024-01-14 04:45 PM",
    aiDraft: "Thank you for reaching out to AIVA. We're excited to help you with your AI assistant needs...",
  },
  {
    id: 4,
    subject: "Billing Inquiry",
    from: "finance@company.com",
    intent: "Billing",
    configuredEmail: "billing@aivarevolution.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 11:45 AM",
    aiDraft: "Thank you for reaching out regarding your billing inquiry. Our finance team will review your request...",
  },
  {
    id: 5,
    subject: "Product Demo Request",
    from: "sales@newcorp.com",
    intent: "General Inquiry",
    configuredEmail: "info@aivarevolution.com",
    status: "Unread",
    receivedAt: "2024-01-15 02:20 PM",
    aiDraft: "We appreciate your interest in our AI solutions. Let's schedule a demo to showcase our capabilities...",
  },
];

const mockIntentConfigs = [
  { intent: "Corporate Events", email: "corporate@aivarevolution.com" },
  { intent: "Technical Support", email: "support@aivarevolution.com" },
  { intent: "General Inquiry", email: "info@aivarevolution.com" },
  { intent: "Billing", email: "billing@aivarevolution.com" },
];

const mockAutoReplies = [
  {
    id: 1,
    name: "Business Hours Auto-Reply",
    condition: "Outside business hours",
    template: "Thank you for reaching out! We've received your message and will get back to you within 24 hours.",
    active: true,
  },
  {
    id: 2,
    name: "Corporate Events Auto-Reply",
    condition: "Intent: Corporate Events",
    template: "Thank you for your interest in our corporate event services. A specialist will contact you shortly.",
    active: true,
  },
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Pending Review": "secondary",
    "Approved": "default",
    "Sent": "default",
    "Edited": "outline",
    "Unread": "default",
  } as const;
  
  const colors = {
    "Pending Review": "text-yellow-600",
    "Approved": "bg-green-600 text-white",
    "Sent": "text-blue-600",
    "Edited": "text-orange-600",
    "Unread": "bg-orange-500 text-white",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
      {status}
    </Badge>
  );
};

const EmailViewDialog = ({ email }: { email: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Details</DialogTitle>
          <DialogDescription>
            View the complete email information
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="font-medium">Subject:</Label>
              <p className="text-muted-foreground">{email.subject}</p>
            </div>
            <div>
              <Label className="font-medium">From:</Label>
              <p className="text-muted-foreground">{email.from}</p>
            </div>
            <div>
              <Label className="font-medium">Intent:</Label>
              <Badge variant="outline">{email.intent}</Badge>
            </div>
            <div>
              <Label className="font-medium">Status:</Label>
              {getStatusBadge(email.status)}
            </div>
            <div>
              <Label className="font-medium">Received:</Label>
              <p className="text-muted-foreground">{email.receivedAt}</p>
            </div>
            <div>
              <Label className="font-medium">Configured Email:</Label>
              <p className="text-muted-foreground">{email.configuredEmail}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Email Content</Label>
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm">
                Hello, I would like to inquire about your services. Please provide more information about your offerings and pricing. Looking forward to hearing from you soon.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmailReplyDialog = ({ email, onStatusUpdate }: { email: any; onStatusUpdate?: (emailId: number, status: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const { toast } = useToast();

  const handleGenerateAI = () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      const aiResponse = `Dear ${email.from.split('@')[0]},

Thank you for reaching out to us regarding "${email.subject}". We appreciate your interest in our services.

${email.intent === "Corporate Events" 
  ? "Our corporate events team specializes in creating memorable experiences tailored to your business needs. We offer comprehensive event planning services including venue selection, catering, entertainment, and technical support."
  : email.intent === "Technical Support"
  ? "Our technical support team has received your request and is currently reviewing the details. We'll investigate the issue and provide a resolution within 24 hours."
  : "We're excited to help you with your inquiry. Our team will review your request and provide detailed information about our services and how we can assist you."
}

Please let us know if you have any specific requirements or questions, and we'll be happy to provide a customized solution.

Best regards,
AIVA Support Team`;
      
      setReplyContent(aiResponse);
      setIsGeneratingAI(false);
      toast({
        title: "AI Response Generated",
        description: "AI has generated a response. You can edit it before sending.",
      });
    }, 2000);
  };

  const handleSendReply = () => {
    if (replyContent.trim()) {
      onStatusUpdate?.(email.id, "Sent");
      toast({
        title: "Reply Sent",
        description: "Your response has been sent successfully.",
      });
      setIsOpen(false);
      setReplyContent("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Send className="h-4 w-4 mr-2" />
          Reply
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reply to Email</DialogTitle>
          <DialogDescription>
            Compose your response or generate one using AI
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Original Email Info */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              <div>
                <Label className="font-medium">From:</Label>
                <p className="text-muted-foreground">{email.from}</p>
              </div>
              <div>
                <Label className="font-medium">Subject:</Label>
                <p className="text-muted-foreground">{email.subject}</p>
              </div>
            </div>
            <div className="text-sm">
              <Label className="font-medium">Original Message:</Label>
              <p className="text-muted-foreground mt-1">
                Hello, I would like to inquire about your services. Please provide more information about your offerings and pricing.
              </p>
            </div>
          </div>

          {/* Reply Composition */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Your Response</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
              >
                {isGeneratingAI ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="font-medium">From:</Label>
                  <p className="text-muted-foreground">{email.configuredEmail}</p>
                </div>
                <div>
                  <Label className="font-medium">To:</Label>
                  <p className="text-muted-foreground">{email.from}</p>
                </div>
              </div>
              
              <Textarea
                placeholder="Type your response here or use 'Generate with AI' to create a draft..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={12}
                className="resize-none"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              className="flex-1" 
              onClick={handleSendReply}
              disabled={!replyContent.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EmailDraftDialog = ({ email, onStatusUpdate }: { email: any; onStatusUpdate: (emailId: number, status: string) => void }) => {
  const [draft, setDraft] = useState(email.aiDraft);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { toast } = useToast();

  const handleApprove = () => {
    setIsApproved(true);
    onStatusUpdate(email.id, "Sent");
    toast({
      title: "Email Sent Successfully",
      description: "The response has been sent to the customer.",
    });
    setTimeout(() => setIsOpen(false), 1500);
  };

  const handleReject = () => {
    onStatusUpdate(email.id, "Rejected");
    toast({
      title: "Email Rejected",
      description: "The draft has been rejected.",
      variant: "destructive",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Email Draft Review</DialogTitle>
          <DialogDescription>
            Review and edit the AI-generated response before sending
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="font-medium">From:</Label>
              <p className="text-muted-foreground">{email.configuredEmail}</p>
            </div>
            <div>
              <Label className="font-medium">To:</Label>
              <p className="text-muted-foreground">{email.from}</p>
            </div>
            <div>
              <Label className="font-medium">Subject:</Label>
              <p className="text-muted-foreground">Re: {email.subject}</p>
            </div>
            <div>
              <Label className="font-medium">Intent:</Label>
              <Badge variant="outline">{email.intent}</Badge>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>AI Generated Response</Label>
              {!isApproved && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel Edit" : "Edit"}
                </Button>
              )}
            </div>
            {isEditing ? (
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={8}
                className="resize-none"
              />
            ) : (
              <div className="p-3 bg-muted rounded-md min-h-32">
                <p className="text-sm whitespace-pre-wrap">{draft}</p>
              </div>
            )}
          </div>

          {!isApproved ? (
            <div className="flex gap-2 pt-4">
              <Button className="flex-1" onClick={handleApprove}>
                <Check className="h-4 w-4 mr-2" />
                Approve & Send
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleReject}>
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 pt-4 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Email Sent Successfully!</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function EmailAIResponses() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedIntent, setSelectedIntent] = useState("all");
  const [emails, setEmails] = useState(mockEmails);
  const [intentConfigs, setIntentConfigs] = useState(mockIntentConfigs);
  const [autoReplies, setAutoReplies] = useState(mockAutoReplies);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isAddMappingOpen, setIsAddMappingOpen] = useState(false);
  const [isAddAutoReplyOpen, setIsAddAutoReplyOpen] = useState(false);
  const [newIntent, setNewIntent] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAutoReplyName, setNewAutoReplyName] = useState("");
  const [newAutoReplyCondition, setNewAutoReplyCondition] = useState("");
  const [newAutoReplyTemplate, setNewAutoReplyTemplate] = useState("");
  const { toast } = useToast();

  const handleStatusUpdate = (emailId: number, status: string) => {
    setEmails(prev => prev.map(email => 
      email.id === emailId ? { ...email, status } : email
    ));
  };

  const handleAddMapping = () => {
    if (newIntent && newEmail) {
      setIntentConfigs(prev => [...prev, { intent: newIntent, email: newEmail }]);
      setNewIntent("");
      setNewEmail("");
      setIsAddMappingOpen(false);
      toast({
        title: "Mapping Added",
        description: "Intent to email mapping has been created successfully.",
      });
    }
  };

  const handleDeleteMapping = (index: number) => {
    setIntentConfigs(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Mapping Deleted",
      description: "Intent to email mapping has been removed.",
    });
  };

  const handleAddAutoReply = () => {
    if (newAutoReplyName && newAutoReplyCondition && newAutoReplyTemplate) {
      const newAutoReply = {
        id: autoReplies.length + 1,
        name: newAutoReplyName,
        condition: newAutoReplyCondition,
        template: newAutoReplyTemplate,
        active: true,
      };
      setAutoReplies(prev => [...prev, newAutoReply]);
      setNewAutoReplyName("");
      setNewAutoReplyCondition("");
      setNewAutoReplyTemplate("");
      setIsAddAutoReplyOpen(false);
      toast({
        title: "Auto-Reply Created",
        description: "New auto-reply has been added successfully.",
      });
    }
  };

  const handleToggleAutoReply = (id: number) => {
    setAutoReplies(prev => prev.map(reply =>
      reply.id === id ? { ...reply, active: !reply.active } : reply
    ));
  };

  const handleDeleteAutoReply = (id: number) => {
    setAutoReplies(prev => prev.filter(reply => reply.id !== id));
    toast({
      title: "Auto-Reply Deleted",
      description: "Auto-reply has been removed.",
    });
  };

  const filteredEmails = emails.filter(email => {
    const statusMatch = selectedStatus === "all" || email.status.toLowerCase().includes(selectedStatus);
    const intentMatch = selectedIntent === "all" || email.intent === selectedIntent;
    return statusMatch && intentMatch;
  });

  // Calculate stats
  const totalEmails = emails.length;
  const awaitingReview = emails.filter(email => email.status === "Pending Review").length;
  const unreadEmails = emails.filter(email => email.status === "Unread").length;

  const inboxEmails = emails.filter(email => 
    email.status === "Unread" || email.status === "Approved"
  );
  const reviewEmails = emails.filter(email => email.status === "Pending Review");
  const sentEmails = emails.filter(email => email.status === "Sent");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email</h1>
          <p className="text-muted-foreground">
            Manage AI-generated email responses and configure automated workflows
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
                <DialogDescription>
                  Customize your email view with filters
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Status Filter</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Intent Filter</Label>
                  <Select value={selectedIntent} onValueChange={setSelectedIntent}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Intents</SelectItem>
                      {intentConfigs.map(config => (
                        <SelectItem key={config.intent} value={config.intent}>
                          {config.intent}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsFiltersOpen(false)}>Apply Filters</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => toast({ title: "Settings", description: "Settings panel would open here" })}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Email Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Emails"
          value={totalEmails.toString()}
          change="0%"
          trend="up"
          icon={Mail}
          description="All received emails"
        />
        <MetricCard
          title="Awaiting Review"
          value={awaitingReview.toString()}
          change="0%"
          trend="up"
          icon={Clock}
          description="Pending human approval"
        />
        <MetricCard
          title="Unread"
          value={unreadEmails.toString()}
          change="0%"
          trend="up"
          icon={Inbox}
          description="Opened but not actioned"
        />
      </div>

      <Tabs defaultValue="emails" className="space-y-4">
        <TabsList>
          <TabsTrigger value="emails">Email Management</TabsTrigger>
          <TabsTrigger value="configuration">Intent Configuration</TabsTrigger>
          <TabsTrigger value="auto-replies">Auto-Replies</TabsTrigger>
        </TabsList>

        <TabsContent value="emails" className="space-y-4">
          <Tabs defaultValue="inbox" className="space-y-4">
            <TabsList>
              <TabsTrigger value="inbox">
                <Inbox className="h-4 w-4 mr-2" />
                Inbox ({inboxEmails.length})
              </TabsTrigger>
              <TabsTrigger value="awaiting-review">
                <Clock className="h-4 w-4 mr-2" />
                Awaiting Review ({reviewEmails.length})
              </TabsTrigger>
              <TabsTrigger value="sent">
                <MailCheck className="h-4 w-4 mr-2" />
                Sent ({sentEmails.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Inbox</CardTitle>
                  <CardDescription>
                    All received emails that need attention or can be replied to manually
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Intent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inboxEmails.map((email) => (
                        <TableRow key={email.id}>
                          <TableCell className="font-medium">{email.subject}</TableCell>
                          <TableCell>{email.from}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{email.intent}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(email.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {email.receivedAt}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <EmailViewDialog email={email} />
                              <EmailReplyDialog email={email} onStatusUpdate={handleStatusUpdate} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="awaiting-review" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Awaiting Review</CardTitle>
                  <CardDescription>
                    AI-generated responses waiting for human approval before sending
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Intent</TableHead>
                        <TableHead>Configured Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Received</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reviewEmails.map((email) => (
                        <TableRow key={email.id}>
                          <TableCell className="font-medium">{email.subject}</TableCell>
                          <TableCell>{email.from}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{email.intent}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {email.configuredEmail}
                          </TableCell>
                          <TableCell>{getStatusBadge(email.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {email.receivedAt}
                          </TableCell>
                          <TableCell>
                            <EmailDraftDialog email={email} onStatusUpdate={handleStatusUpdate} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sent Emails</CardTitle>
                  <CardDescription>
                    All emails that have been successfully sent to customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subject</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Intent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Sent At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sentEmails.map((email) => (
                        <TableRow key={email.id}>
                          <TableCell className="font-medium">{email.subject}</TableCell>
                          <TableCell>{email.from}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {email.configuredEmail}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{email.intent}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(email.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {email.receivedAt}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Intent Email Configuration</CardTitle>
                  <CardDescription>
                    Map customer intents to specific email addresses for responses
                  </CardDescription>
                </div>
                <Dialog open={isAddMappingOpen} onOpenChange={setIsAddMappingOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Mapping
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Intent Mapping</DialogTitle>
                      <DialogDescription>
                        Create a new intent to email mapping
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="intent">Intent Name</Label>
                        <Input
                          id="intent"
                          value={newIntent}
                          onChange={(e) => setNewIntent(e.target.value)}
                          placeholder="e.g., Customer Support"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="e.g., support@aivarevolution.com"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsAddMappingOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddMapping}>
                          Add Mapping
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {intentConfigs.map((config, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <Label className="font-medium">{config.intent}</Label>
                    </div>
                    <div className="flex-1">
                      <Input value={config.email} readOnly />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit Mapping", description: "Edit functionality would open here" })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeleteMapping(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auto-replies" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Auto-Reply Configuration</CardTitle>
                  <CardDescription>
                    Set up automatic responses based on conditions
                  </CardDescription>
                </div>
                <Dialog open={isAddAutoReplyOpen} onOpenChange={setIsAddAutoReplyOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Auto-Reply
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Auto-Reply</DialogTitle>
                      <DialogDescription>
                        Set up a new automatic response rule
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Auto-Reply Name</Label>
                        <Input
                          id="name"
                          value={newAutoReplyName}
                          onChange={(e) => setNewAutoReplyName(e.target.value)}
                          placeholder="e.g., Out of Office Reply"
                        />
                      </div>
                      <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Input
                          id="condition"
                          value={newAutoReplyCondition}
                          onChange={(e) => setNewAutoReplyCondition(e.target.value)}
                          placeholder="e.g., Outside business hours"
                        />
                      </div>
                      <div>
                        <Label htmlFor="template">Template Message</Label>
                        <Textarea
                          id="template"
                          value={newAutoReplyTemplate}
                          onChange={(e) => setNewAutoReplyTemplate(e.target.value)}
                          placeholder="Enter the auto-reply message template..."
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" onClick={() => setIsAddAutoReplyOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddAutoReply}>
                          Create Auto-Reply
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autoReplies.map((autoReply) => (
                  <Card key={autoReply.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{autoReply.name}</h3>
                            <Badge variant={autoReply.active ? "default" : "secondary"}>
                              {autoReply.active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Condition:</strong> {autoReply.condition}
                          </p>
                          <div className="p-3 bg-muted rounded text-sm">
                            {autoReply.template}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm" onClick={() => toast({ title: "Edit Auto-Reply", description: "Edit functionality would open here" })}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              if (autoReply.active) {
                                handleDeleteAutoReply(autoReply.id);
                              } else {
                                handleToggleAutoReply(autoReply.id);
                              }
                            }}
                          >
                            {autoReply.active ? (
                              <X className="h-4 w-4" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}