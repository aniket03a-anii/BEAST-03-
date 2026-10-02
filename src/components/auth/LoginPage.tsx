import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Lock, 
  Mail, 
  User as UserIcon, 
  CheckCircle2, 
  AlertCircle,
  Layers,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { User } from '../../types/index.ts';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
  onClose?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onClose
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('IoT / Embedded Developer');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Quick Demo Personas
  const demoPersonas = [
    {
      id: 'user-demo',
      name: 'Anii Demo',
      role: 'Project Lead · Smart Agriculture Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      badge: 'PROJECT BUILDER'
    },
    {
      id: 'user-arjun',
      name: 'Arjun Sharma',
      role: 'IoT / Embedded Developer · Top 94% Match',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      badge: 'TOP CONTRIBUTOR'
    },
    {
      id: 'user-elena',
      name: 'Elena Rostova',
      role: 'Edge Computer Vision & Robotics',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120',
      badge: 'CV SPECIALIST'
    }
  ];

  // SSO Handler
  const handleSSO = async (provider: 'google' | 'github' | 'microsoft') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider: provider === 'microsoft' ? 'google' : provider })
      });
      const data = await res.json();
      if (data.user) {
        onLoginSuccess(data.user);
      } else {
        setErrorMessage('Authentication failed. Please retry.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to connect to auth service.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Persona Select
  const handleSelectPersona = async (userId: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (data.user) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      setErrorMessage('Failed to sign in as demo persona.');
    } finally {
      setIsLoading(false);
    }
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignUp
        ? { name, email, role, password }
        : { email: email || 'anii.demo@beast03.network', password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.user) {
        onLoginSuccess(data.user);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Check your credentials.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Sign in error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F7F7] overflow-y-auto flex flex-col justify-between">
      {/* Top Atmospheric Sky Header Banner */}
      <div className="relative py-12 px-4 sky-hero-backdrop border-b border-[#E5E5E5] text-center">
        <div className="absolute inset-0 sky-cloud-overlay opacity-90 pointer-events-none" />

        <div className="relative z-10 max-w-md mx-auto">
          {/* Brand */}
          <div className="inline-flex items-center gap-2 mb-3 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-sky-100 shadow-2xs">
            <Cpu className="w-4 h-4 text-emerald-600" />
            <span className="font-extrabold text-sm tracking-tight text-[#252525]">BEAST-03!™</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              SECURE ACCESS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c2833] tracking-tight">
            Evidence-Driven Access Portal
          </h2>
          <p className="text-xs text-[#374957] font-medium mt-1">
            Sign in with authorized Single Sign-On or enter a verified demo workspace.
          </p>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-md w-full mx-auto px-4 -mt-6 z-20 mb-12">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E5E5E5] shadow-xl p-6 sm:p-8 space-y-6">
          {/* Quick Demo Personas (Highlighted for Instant Presentation Review!) */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#444444] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>1-Click Instant Demo Personas</span>
              </span>
              <span className="text-[10px] font-mono text-[#888888]">No password required</span>
            </div>

            <div className="space-y-2">
              {demoPersonas.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPersona(p.id)}
                  disabled={isLoading}
                  className="w-full p-2.5 rounded-xl border border-[#E5E5E5] hover:border-emerald-400 hover:bg-emerald-50/20 transition-all flex items-center justify-between gap-3 text-left group cursor-pointer disabled:opacity-50"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#E0E0E0]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                          {p.name}
                        </strong>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-700">
                          {p.badge}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#777777] block truncate max-w-[200px]">
                        {p.role}
                      </span>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#888888] group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-[#EAEAEA]" />
            <span className="absolute bg-white px-3 text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
              Or Authorized Single Sign-On
            </span>
          </div>

          {/* Single Sign-On Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSSO('google')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#E0E0E0] hover:bg-[#F9F9F9] text-xs font-bold text-[#333333] transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSSO('github')}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#E0E0E0] hover:bg-[#F9F9F9] text-xs font-bold text-[#333333] transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 fill-current text-[#252525]" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Form Tabs: Sign In / Create Account */}
          <div className="flex border-b border-[#F0F0F0]">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                !isSignUp
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#888888] hover:text-[#252525]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                isSignUp
                  ? 'border-[#252525] text-[#252525]'
                  : 'border-transparent text-[#888888] hover:text-[#252525]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Arjun Sharma"
                    className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@domain.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold uppercase text-[#444444]">
                  Password
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] text-[#666666] hover:text-[#252525] underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
                  Primary Demonstrated Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525] cursor-pointer"
                >
                  <option value="IoT / Embedded Developer">IoT / Embedded Developer</option>
                  <option value="Firmware & Hardware Architect">Firmware & Hardware Architect</option>
                  <option value="Edge Computer Vision Specialist">Edge Computer Vision Specialist</option>
                  <option value="Full-Stack Systems Engineer">Full-Stack Systems Engineer</option>
                  <option value="Project Builder & Lead">Project Builder & Lead</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#252525] hover:bg-[#111111] text-white font-bold text-xs tracking-wide shadow-xs transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <span>{isLoading ? 'Authenticating...' : isSignUp ? 'Create Authorized Account' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </form>

          {/* Escape hatch back to demo */}
          {onClose && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-[#777777] hover:text-[#252525] underline cursor-pointer"
              >
                ← Return to Demo Workspace (Browsing as Guest)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E5E5E5] space-y-4">
            <h4 className="text-sm font-bold text-[#252525]">
              Reset Password
            </h4>
            <p className="text-xs text-[#666666]">
              Enter your work email address to receive password reset instructions.
            </p>

            {forgotSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password reset link dispatched to your email!</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForgotSuccess(true);
                  setTimeout(() => {
                    setForgotSuccess(false);
                    setShowForgotModal(false);
                  }, 2000);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="engineer@domain.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3 py-1.5 text-xs text-[#666666] hover:bg-[#F3F3F3] rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#252525] rounded-lg"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-[#888888] border-t border-[#EAEAEA] bg-white">
        BEAST-03!™ Authentication · Authorized by Google Workspace, GitHub & Enterprise SAML
      </footer>
    </div>
  );
};
