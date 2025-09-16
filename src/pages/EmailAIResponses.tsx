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
    subject: "Table booking for Friday evening",
    from: "sarah.j@email.com",
    intent: "Restaurant Booking",
    configuredEmail: "bookings@restaurant.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 10:30 AM",
    originalBody: "Hello, I'd like to book a table for 4 people this Friday at 8 PM. Could you confirm availability?",
    aiDraft: "Hello Sarah,\nThank you for reaching out. We'd be delighted to host you this Friday at 8 PM for 4 guests. Could you please confirm if you prefer indoor or outdoor seating? Once confirmed, we'll reserve the table for you.",
  },
  {
    id: 2,
    subject: "Room availability for September 23–25",
    from: "michael.lee@email.com",
    intent: "Room Booking",
    configuredEmail: "reservations@hotel.com",
    status: "Approved",
    receivedAt: "2024-01-15 09:15 AM",
    originalBody: "Hi, I'm looking for a double room for two adults from September 23 to 25. Can you let me know if rooms are available and the rates?",
    aiDraft: "Hi Michael,\nWe have double rooms available from September 23 to 25. The nightly rate is $180 including breakfast. Would you like us to hold the room under your name until you confirm the booking?",
  },
  {
    id: 3,
    subject: "Wedding hall for 250 guests",
    from: "emily.carter@email.com",
    intent: "Event Planning",
    configuredEmail: "events@venue.com",
    status: "Sent",
    receivedAt: "2024-01-14 04:45 PM",
    originalBody: "Hello, I'd like information about booking your wedding hall for around 250 guests next spring. Could you send me capacity details and packages?",
    aiDraft: "Hello Emily,\nThank you for considering us for your wedding. Our wedding hall can comfortably accommodate up to 300 guests. We offer packages that include catering, decoration, and event coordination. Would you like me to send our full wedding brochure for your review?",
  },
  {
    id: 4,
    subject: "Corporate event in November",
    from: "david.w@email.com",
    intent: "Corporate Events",
    configuredEmail: "corporate@venue.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 11:45 AM",
    originalBody: "Hi, we are planning a corporate training event for about 80 attendees in November. Could you share options for venue space and catering?",
    aiDraft: "Hi David,\nWe'd be happy to host your corporate event. Our main conference hall can accommodate up to 100 attendees and we offer catering packages tailored to corporate functions. Could you please share your preferred dates in November so we can confirm availability?",
  },
  {
    id: 5,
    subject: "Birthday celebration booking",
    from: "laura.b@email.com",
    intent: "Private Events",
    configuredEmail: "events@venue.com",
    status: "Unread",
    receivedAt: "2024-01-15 02:20 PM",
    originalBody: "Hello, I'd like to book a private area for a birthday celebration on October 10 for around 30 guests. Do you have availability?",
    aiDraft: "Hello Laura,\nYes, we can host your birthday celebration on October 10 for 30 guests. We also offer custom birthday packages including cake, décor, and entertainment. Would you like me to share the available packages with pricing?",
  },
  {
    id: 6,
    subject: "Gluten-free menu options",
    from: "james.p@email.com",
    intent: "General Inquiry",
    configuredEmail: "info@restaurant.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 01:15 PM",
    originalBody: "Hi, do you have gluten-free menu options available for dinner service?",
    aiDraft: "Hi James,\nYes, we do offer a variety of gluten-free dishes for dinner, including starters, mains, and desserts. Please let us know if you'd like me to send you the full gluten-free menu in advance.",
  },
  {
    id: 7,
    subject: "Cancel booking for Sept 18–19",
    from: "rachel.a@email.com",
    intent: "Cancellation",
    configuredEmail: "reservations@hotel.com",
    status: "Approved",
    receivedAt: "2024-01-15 08:30 AM",
    originalBody: "Hi, I need to cancel my room booking for September 18–19. Could you let me know the cancellation policy?",
    aiDraft: "Hi Rachel,\nWe're sorry to hear you need to cancel. As per our policy, cancellations made at least 48 hours before check-in are eligible for a full refund. Since your booking is for September 18–19, you are within the refundable period. Would you like us to process the cancellation now?",
  },
  {
    id: 8,
    subject: "Group booking for 20 tourists",
    from: "tom.r@email.com",
    intent: "Group Booking",
    configuredEmail: "groups@hotel.com",
    status: "Sent",
    receivedAt: "2024-01-14 03:45 PM",
    originalBody: "Hello, I am arranging travel for a group of 20 tourists visiting on September 30. Do you have group packages available?",
    aiDraft: "Hello Tom,\nYes, we offer special group packages including accommodation and dining discounts for groups of 15+ guests. We'd be glad to arrange for your group on September 30. Would you like me to send our group booking package details?",
  },
  {
    id: 9,
    subject: "Private dining for 8 guests",
    from: "sophia.w@email.com",
    intent: "Private Events",
    configuredEmail: "dining@restaurant.com",
    status: "Pending Review",
    receivedAt: "2024-01-15 12:20 PM",
    originalBody: "Hi, I'm looking for a private dining experience for 8 people next weekend. Could you share options and pricing?",
    aiDraft: "Hi Sophia,\nWe have private dining rooms available for 6–10 guests. The package includes a 4-course set menu, personalized service, and a dedicated space. The cost starts at $95 per person. Would you like us to reserve a room for next weekend?",
  },
  {
    id: 10,
    subject: "Christmas Eve opening hours",
    from: "oliver.g@email.com",
    intent: "General Inquiry",
    configuredEmail: "info@restaurant.com",
    status: "Unread",
    receivedAt: "2024-01-15 04:10 PM",
    originalBody: "Hello, are you open on Christmas Eve and Christmas Day for dinner service?",
    aiDraft: "Hello Oliver,\nYes, we are open on both Christmas Eve and Christmas Day with a special festive dinner menu. Reservations are recommended as these days book out quickly. Would you like me to hold a table for you?",
  },
];

const mockIntentConfigs = [
  { intent: "Restaurant Booking", email: "bookings@restaurant.com" },
  { intent: "Room Booking", email: "reservations@hotel.com" },
  { intent: "Event Planning", email: "events@venue.com" },
  { intent: "Corporate Events", email: "corporate@venue.com" },
  { intent: "Private Events", email: "events@venue.com" },
  { intent: "General Inquiry", email: "info@restaurant.com" },
  { intent: "Cancellation", email: "reservations@hotel.com" },
  { intent: "Group Booking", email: "groups@hotel.com" },
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
                {email.originalBody || "No content available."}
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
                {email.originalBody || "No content available."}
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