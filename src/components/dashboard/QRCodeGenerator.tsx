"use client"

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Copy, Check } from 'lucide-react';

interface QRCodeGeneratorProps {
  username: string;
}

export function QRCodeGenerator({ username }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const profileUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/${username}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.download = `${username}-qrcode.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">QR Code</h3>
        <p className="text-sm text-muted-foreground">
          Share your profile with a QR code
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your QR Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code Display */}
          <div className="flex justify-center p-8 bg-white rounded-lg">
            <QRCodeSVG
              id="qr-code"
              value={profileUrl}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* Profile URL */}
          <div className="space-y-2">
            <Label>Your Profile URL</Label>
            <div className="flex gap-2">
              <Input
                value={profileUrl}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                title="Copy link"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleDownloadQR}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-2" />
              Download QR Code
            </Button>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              <strong>💡 Tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Print your QR code on business cards</li>
              <li>Add it to your social media profiles</li>
              <li>Include it in email signatures</li>
              <li>Display it at events or presentations</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
