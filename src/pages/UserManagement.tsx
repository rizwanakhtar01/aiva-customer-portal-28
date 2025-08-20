import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Users, 
  UserPlus, 
  MoreHorizontal, 
  Edit3, 
  Trash2, 
  Mail,
  Shield,
  Eye,
  Settings,
  Plus,
  BarChart3,
  Puzzle,
  CreditCard,
  BookOpen,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "viewer"
  });
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    permissions: {
      dashboard: { read: false, write: false },
      integrations: { read: false, write: false },
      plans: { read: false, write: false },
      knowledgeBase: { read: false, write: false },
      customization: { read: false, write: false },
      userManagement: { read: false, write: false }
    }
  });

  const { toast } = useToast();

  const [users] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe", 
      email: "john.doe@company.com",
      role: "admin",
      status: "active",
      lastActive: "2 hours ago",
      avatar: ""
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@company.com", 
      role: "editor",
      status: "active",
      lastActive: "1 day ago",
      avatar: ""
    },
    {
      id: 3,
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@company.com",
      role: "viewer", 
      status: "invited",
      lastActive: "Never",
      avatar: ""
    }
  ]);

  const [customRoles, setCustomRoles] = useState([
    {
      id: 1,
      name: "Support Agent",
      description: "Limited access for customer support",
      permissions: {
        dashboard: { read: true, write: false },
        integrations: { read: false, write: false },
        plans: { read: true, write: false },
        knowledgeBase: { read: true, write: true },
        customization: { read: false, write: false },
        userManagement: { read: false, write: false }
      },
      userCount: 2
    },
    {
      id: 2,
      name: "Marketing Manager",
      description: "Access to customization and analytics",
      permissions: {
        dashboard: { read: true, write: false },
        integrations: { read: true, write: true },
        plans: { read: true, write: false },
        knowledgeBase: { read: true, write: true },
        customization: { read: true, write: true },
        userManagement: { read: false, write: false }
      },
      userCount: 1
    }
  ]);

  const modules = [
    { key: 'dashboard', name: 'Dashboard', icon: BarChart3, description: 'View analytics and metrics' },
    { key: 'integrations', name: 'Integrations', icon: Puzzle, description: 'Manage WhatsApp and email integrations' },
    { key: 'plans', name: 'Plans', icon: CreditCard, description: 'View and manage subscription plans' },
    { key: 'knowledgeBase', name: 'Knowledge Base', icon: BookOpen, description: 'Manage knowledge base content' },
    { key: 'customization', name: 'Customization', icon: Palette, description: 'Customize portal appearance' },
    { key: 'userManagement', name: 'User Management', icon: Users, description: 'Manage users and permissions' }
  ];

  const handleAddUser = () => {
    if (!newUser.email || !newUser.firstName || !newUser.lastName) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "User invited successfully",
      description: `Invitation sent to ${newUser.email}`,
    });

    setNewUser({ email: "", firstName: "", lastName: "", role: "viewer" });
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    toast({
      title: "User removed",
      description: `${userName} has been removed from the portal.`,
    });
  };

  const handleResendInvite = (email: string) => {
    toast({
      title: "Invitation resent",
      description: `New invitation sent to ${email}`,
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4" />;
      case 'editor':
        return <Edit3 className="h-4 w-4" />;
      case 'viewer':
        return <Eye className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'editor':
        return 'secondary';
      case 'viewer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'invited':
        return 'secondary';
      case 'inactive':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const handleAddRole = () => {
    if (!newRole.name) {
      toast({
        title: "Missing information",
        description: "Please provide a role name.",
        variant: "destructive"
      });
      return;
    }

    const roleToAdd = {
      id: customRoles.length + 1,
      ...newRole,
      userCount: 0
    };

    setCustomRoles(prev => [...prev, roleToAdd]);
    
    toast({
      title: "Role created successfully",
      description: `${newRole.name} role has been created.`,
    });

    setNewRole({
      name: "",
      description: "",
      permissions: {
        dashboard: { read: false, write: false },
        integrations: { read: false, write: false },
        plans: { read: false, write: false },
        knowledgeBase: { read: false, write: false },
        customization: { read: false, write: false },
        userManagement: { read: false, write: false }
      }
    });
    setIsAddRoleOpen(false);
  };

  const handleDeleteRole = (roleId: number, roleName: string) => {
    setCustomRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role deleted",
      description: `${roleName} role has been deleted.`,
    });
  };

  const updateRolePermission = (roleId: number, module: string, permission: string, value: boolean) => {
    setCustomRoles(prev => prev.map(role => 
      role.id === roleId 
        ? {
            ...role,
            permissions: {
              ...role.permissions,
              [module]: {
                ...role.permissions[module as keyof typeof role.permissions],
                [permission]: value
              }
            }
          }
        : role
    ));
  };

  const updateNewRolePermission = (module: string, permission: string, value: boolean) => {
    setNewRole(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof typeof prev.permissions],
          [permission]: value
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage team access and custom roles</p>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'invited').length}</p>
                <p className="text-sm text-muted-foreground">Pending Invites</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{customRoles.length}</p>
                <p className="text-sm text-muted-foreground">Custom Roles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Team Members and Role Management */}
      <Tabs defaultValue="team" className="space-y-6">
        <TabsList>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Role Management</TabsTrigger>
        </TabsList>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </div>
                <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite New User</DialogTitle>
                      <DialogDescription>
                        Send an invitation to a team member to access the portal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={newUser.firstName}
                            onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={newUser.lastName}
                            onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john.doe@company.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({ ...prev, role: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                            <SelectItem value="editor">Editor - Can modify settings</SelectItem>
                            <SelectItem value="admin">Admin - Full access</SelectItem>
                            {customRoles.map(role => (
                              <SelectItem key={role.id} value={role.name.toLowerCase()}>
                                {role.name} - {role.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddUser}>
                          Send Invitation
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.firstName} {user.lastName}</p>
                          <Badge variant={getStatusBadgeVariant(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        <div className="flex items-center gap-1">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </Badge>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          {user.status === 'invited' && (
                            <DropdownMenuItem onClick={() => handleResendInvite(user.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend Invite
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Roles</CardTitle>
                  <CardDescription>Create and manage custom roles with specific permissions</CardDescription>
                </div>
                <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Role
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create Custom Role</DialogTitle>
                      <DialogDescription>
                        Define a new role with specific permissions for portal modules.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="roleName">Role Name</Label>
                          <Input
                            id="roleName"
                            value={newRole.name}
                            onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Support Agent"
                          />
                        </div>
                        <div>
                          <Label htmlFor="roleDescription">Description</Label>
                          <Input
                            id="roleDescription"
                            value={newRole.description}
                            onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Limited access for customer support"
                          />
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-4">Module Permissions</h4>
                        <div className="space-y-4">
                          {modules.map((module) => {
                            const IconComponent = module.icon;
                            return (
                              <div key={module.key} className="border rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <IconComponent className="h-5 w-5 text-primary" />
                                  <div>
                                    <h5 className="font-medium">{module.name}</h5>
                                    <p className="text-sm text-muted-foreground">{module.description}</p>
                                  </div>
                                </div>
                                <div className="flex gap-6">
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id={`${module.key}-read`}
                                      checked={newRole.permissions[module.key as keyof typeof newRole.permissions]?.read || false}
                                      onCheckedChange={(checked) => updateNewRolePermission(module.key, 'read', checked)}
                                    />
                                    <Label htmlFor={`${module.key}-read`} className="text-sm">Read Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      id={`${module.key}-write`}
                                      checked={newRole.permissions[module.key as keyof typeof newRole.permissions]?.write || false}
                                      onCheckedChange={(checked) => updateNewRolePermission(module.key, 'write', checked)}
                                    />
                                    <Label htmlFor={`${module.key}-write`} className="text-sm">Write Access</Label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddRole}>
                          Create Role
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customRoles.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <CardDescription>{role.description}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{role.userCount} users</Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit Role
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleDeleteRole(role.id, role.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Role
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {modules.map((module) => {
                          const IconComponent = module.icon;
                          const modulePermissions = role.permissions[module.key as keyof typeof role.permissions];
                          return (
                            <div key={module.key} className="border rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <IconComponent className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">{module.name}</span>
                              </div>
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`${role.id}-${module.key}-read`}
                                    checked={modulePermissions?.read || false}
                                    onCheckedChange={(checked) => updateRolePermission(role.id, module.key, 'read', checked)}
                                  />
                                  <Label htmlFor={`${role.id}-${module.key}-read`} className="text-xs">Read</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`${role.id}-${module.key}-write`}
                                    checked={modulePermissions?.write || false}
                                    onCheckedChange={(checked) => updateRolePermission(role.id, module.key, 'write', checked)}
                                  />
                                  <Label htmlFor={`${role.id}-${module.key}-write`} className="text-xs">Write</Label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
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
};

export default UserManagement;