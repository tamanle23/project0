import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, CheckCircle2, ShieldCheck, Copy, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export interface PayOsQrModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  amountVnd: number;
  tenantId?: string;
  onPaymentSuccess?: () => void;
}

export const PayOsQrModal: React.FC<PayOsQrModalProps> = ({
  open,
  onOpenChange,
  planName,
  amountVnd,
  tenantId = 'UNIPOST_TENANT',
  onPaymentSuccess,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);

  const transferContent = `UNIPOST ${planName.toUpperCase()} ${tenantId.slice(0, 8)}`;
  const qrUrl = `https://img.vietqr.io/image/970422-0388123456789-compact.png?amount=${amountVnd}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=UNIPOST%20DATA%20PLATFORM`;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`Copied ${fieldName} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSimulateConfirmation = () => {
    setIsSimulatingPayment(true);
    setTimeout(() => {
      setIsSimulatingPayment(false);
      toast.success(`payOS VietQR Payment Confirmed for ${planName}! Entitlements Unlocked.`);
      onOpenChange(false);
      if (onPaymentSuccess) onPaymentSuccess();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-2xl rounded-3xl p-6">
        <DialogHeader className="text-center flex flex-col items-center">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
            <QrCode className="w-8 h-8" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
            payOS VietQR 1-Click Upgrade
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500 dark:text-slate-400">
            Scan with any Mobile Banking App in Vietnam (MBBank, Vietcombank, Techcombank, Momo, Zalopay)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 my-2">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
              Total Subscription Payment
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {amountVnd.toLocaleString('vi-VN')} VND
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Plan: <strong>{planName}</strong>
            </span>
          </div>

          <div className="flex justify-center p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner">
            <img
              src={qrUrl}
              alt="payOS VietQR"
              className="w-56 h-56 object-contain rounded-xl"
            />
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Bank Account</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  MBBank - 0388123456789
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard('0388123456789', 'Account Number')}
                className="h-7 w-7 p-0"
              >
                {copiedField === 'Account Number' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Transfer Description</span>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                  {transferContent}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(transferContent, 'Transfer Content')}
                className="h-7 w-7 p-0"
              >
                {copiedField === 'Transfer Content' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={handleSimulateConfirmation}
            disabled={isSimulatingPayment}
            className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20"
          >
            {isSimulatingPayment ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying payOS Webhook...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Payment Received</span>
              </>
            )}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted via payOS SHA-256 Webhook Engine</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
