import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Mail, ArrowRight, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type AuthStep = 'email' | 'sending' | 'sent' | 'verifying' | 'success';

interface AuthProps {
  onLoginSuccess: () => void;
}

export function Auth({ onLoginSuccess }: AuthProps) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<AuthStep>('email');
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  // Simulate magic link flow
  const handleSendMagicLink = useCallback(async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setStep('sending');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate random failure (10% chance)
    if (Math.random() < 0.1) {
      setError('Something went wrong. Please try again.');
      setStep('email');
      return;
    }

    setStep('sent');
    setResendTimer(60);
  }, [email]);

  // Simulate clicking the magic link
  const handleSimulateLinkClick = useCallback(async () => {
    setStep('verifying');

    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setStep('success');

    // Redirect after success animation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onLoginSuccess();
  }, [onLoginSuccess]);

  // Handle resend
  const handleResend = useCallback(async () => {
    if (resendTimer > 0) return;
    
    setStep('sending');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep('sent');
    setResendTimer(60);
  }, [resendTimer]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-h2 text-foreground font-bold">FocusFlow</h1>
          <p className="text-muted-foreground text-body mt-1">Build better habits, one day at a time</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl animate-scale-in">
          {/* Step: Email Input */}
          {step === 'email' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-h3 text-foreground mb-2">Welcome back</h2>
                <p className="text-muted-foreground text-body">
                  Enter your email to receive a magic link
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMagicLink()}
                      placeholder="you@example.com"
                      className={cn(
                        "pl-10 h-12 bg-background-tertiary border-card-border text-foreground placeholder:text-muted-foreground",
                        error && "border-danger focus-visible:ring-danger"
                      )}
                    />
                  </div>
                  {error && (
                    <p className="flex items-center gap-1.5 text-small text-danger animate-fade-in-up">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {error}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSendMagicLink}
                  disabled={!email.trim()}
                  className={cn(
                    "w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200",
                    email.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary-hover shadow-glow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                >
                  Send Magic Link
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-small text-muted-foreground">
                No password required. We'll email you a secure link.
              </p>
            </div>
          )}

          {/* Step: Sending */}
          {step === 'sending' && (
            <div className="py-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-h3 text-foreground mb-2">Sending magic link...</h3>
              <p className="text-muted-foreground text-body">
                Hold tight, we're preparing your secure link
              </p>
            </div>
          )}

          {/* Step: Email Sent */}
          {step === 'sent' && (
            <div className="py-4 space-y-6 animate-fade-in-up">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-h3 text-foreground mb-2">Check your email</h3>
                <p className="text-muted-foreground text-body">
                  We sent a magic link to
                </p>
                <p className="text-foreground font-medium mt-1">{email}</p>
              </div>

              <div className="bg-background-tertiary rounded-xl p-4 space-y-3">
                <p className="text-small text-muted-foreground text-center">
                  Click the link in your email to sign in. The link expires in 10 minutes.
                </p>
                
                {/* Simulate Link Click (for demo) */}
                <button
                  onClick={handleSimulateLinkClick}
                  className="w-full py-2.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors text-sm font-medium"
                >
                  ✨ Simulate clicking the magic link
                </button>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-small text-muted-foreground">Didn't receive it?</span>
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={cn(
                    "flex items-center gap-1.5 text-small font-medium transition-colors",
                    resendTimer > 0
                      ? "text-muted-foreground cursor-not-allowed"
                      : "text-primary hover:text-primary-hover"
                  )}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend'}
                </button>
              </div>

              <button
                onClick={() => {
                  setStep('email');
                  setEmail('');
                }}
                className="w-full text-center text-small text-muted-foreground hover:text-foreground transition-colors"
              >
                Use a different email
              </button>
            </div>
          )}

          {/* Step: Verifying */}
          {step === 'verifying' && (
            <div className="py-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-h3 text-foreground mb-2">Verifying...</h3>
              <p className="text-muted-foreground text-body">
                Securely signing you in
              </p>
            </div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="py-8 text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-primary animate-scale-in" />
              </div>
              <h3 className="text-h3 text-foreground mb-2">You're in! 🎉</h3>
              <p className="text-muted-foreground text-body">
                Redirecting to your dashboard...
              </p>
              
              {/* Progress bar */}
              <div className="mt-6 h-1 bg-background-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full animate-[progress_1.5s_ease-out_forwards]"
                  style={{ 
                    animation: 'progress 1.5s ease-out forwards',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-small text-muted-foreground mt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
