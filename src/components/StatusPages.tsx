import React from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

export function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-emerald-500" />
      <h1 className="text-3xl font-bold">Payment Successful!</h1>
      <p className="text-zinc-600 max-w-md">
        Welcome to ProfitLens Pro. Your advanced features are now unlocked.
      </p>
      <a href="/" className="flex items-center gap-2 text-emerald-600 font-semibold hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </a>
    </div>
  );
}

export function CancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
      <XCircle className="w-16 h-16 text-rose-500" />
      <h1 className="text-3xl font-bold">Payment Cancelled</h1>
      <p className="text-zinc-600 max-w-md">
        Your payment was not processed. You can try again whenever you're ready.
      </p>
      <a href="/" className="flex items-center gap-2 text-zinc-600 font-semibold hover:underline">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </a>
    </div>
  );
}
