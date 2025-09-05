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
  Send
} from "lucide-react";

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
  } as const;
  
  const colors = {
    "Pending Review": "text-yellow-600",
    "Approved": "text-green-600",
    "Sent": "text-blue-600",
    "Edited": "text-orange-600",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
      {status}
    </Badge>
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email AI Responses</h1>
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

      <Tabs defaultValue="emails" className="space-y-4">
        <TabsList>
          <TabsTrigger value="emails">Email Management</TabsTrigger>
          <TabsTrigger value="configuration">Intent Configuration</TabsTrigger>
          <TabsTrigger value="auto-replies">Auto-Replies</TabsTrigger>
        </TabsList>

        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
              <CardDescription>
                Review and manage AI-generated email responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedIntent} onValueChange={setSelectedIntent}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by intent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Intents</SelectItem>
                    {mockIntentConfigs.map(config => (
                      <SelectItem key={config.intent} value={config.intent}>
                        {config.intent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                  {filteredEmails.map((email) => (
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