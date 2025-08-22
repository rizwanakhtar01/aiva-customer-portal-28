import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Demo-only Forgot Password flow simulating Cognito use cases
const ForgotPassword = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<"request" | "verify" | "success">("request");
  const [email, setEmail] = useState("");
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resends, setResends] = useState(0);

  useEffect(() => {
    document.title = "Forgot Password | Customer Portal";
  }, []);

  const timeRemaining = useMemo(() => {
    if (!expiresAt) return 0;
    const ms = Math.max(0, expiresAt - Date.now());
    return Math.ceil(ms / 1000);
  }, [expiresAt]);

  const sendCode = () => {
    // Simulate Cognito sending a code and setting expiration (2 minutes)
    const demo = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(demo);
    setExpiresAt(Date.now() + 2 * 60 * 1000);
    setResends((c) => c + 1);
    toast({ title: "Verification code sent", description: `A 6-digit code was sent to ${email}. (Demo code: ${demo})` });
    setStep("verify");
  };

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Enter your email", description: "We'll send a reset code to this address." });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      sendCode();
    }, 800);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sentCode || !expiresAt) return;

    if (timeRemaining <= 0) {
      toast({ title: "Code expired", description: "Please resend a new code and try again." });
      return;
    }
    if (code !== sentCode) {
      toast({ title: "Invalid code", description: "Double-check the 6-digit code and try again." });
      return;
    }
    if (password.length < 8) {
      toast({ title: "Weak password", description: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords do not match", description: "Please confirm your new password." });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Password reset", description: "Your password has been updated." });
      setStep("success");
    }, 1000);
  };

  const handleResend = () => {
    sendCode();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">AI</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Reset your password</h1>
          <p className="text-muted-foreground">Demo-only flow simulating AWS Cognito</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {step === "request" && "Forgot password"}
              {step === "verify" && "Enter verification code"}
              {step === "success" && "Password reset successfully"}
            </CardTitle>
            <CardDescription className="text-center">
              {step === "request" && "We'll send a 6-digit code to your email."}
              {step === "verify" && (timeRemaining > 0 ? `Code expires in ${timeRemaining}s` : "Code expired. Resend a new one.")}
              {step === "success" && "You can now sign in with your new password."}
            </CardDescription>
          </CardHeader>

          {step === "request" && (
            <form onSubmit={handleRequest}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset code"}
                </Button>
                <div className="text-center text-sm text-muted-foreground">
                  Remembered it? <a href="/login" className="text-primary hover:underline">Back to sign in</a>
                </div>
              </CardFooter>
            </form>
          )}

          {step === "verify" && (
            <form onSubmit={handleVerify}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification code</Label>
                  <Input id="code" inputMode="numeric" pattern="[0-9]*" placeholder="Enter 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} className="h-12" required />
                  <div className="text-xs text-muted-foreground">Demo code was sent virtually. If you need a new one, resend below.</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input id="password" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm New Password</Label>
                  <Input id="confirm" type="password" placeholder="Re-enter your new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className="h-12" required />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Reset password"}
                </Button>
                <div className="flex items-center justify-between text-sm w-full">
                  <button type="button" onClick={handleResend} className="text-primary hover:underline">Resend code</button>
                  <span className="text-muted-foreground">Resends: {resends}</span>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Wrong email? <a href="/forgot-password" className="text-primary hover:underline">Start over</a>
                </div>
              </CardFooter>
            </form>
          )}

          {step === "success" && (
            <CardFooter className="flex flex-col space-y-4">
              <Button onClick={() => (window.location.href = "/login")} className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 transition-all duration-300">
                Return to sign in
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
