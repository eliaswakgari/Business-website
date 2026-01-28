'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import Image from 'next/image';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    description?: string;
    bucket?: string;
}

export function ImageUpload({
    value,
    onChange,
    label = "Image",
    description = "Click to upload or drag and drop",
    bucket = "media"
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                throw new Error('Please upload an image file');
            }

            // Create a unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onChange(publicUrl);
        } catch (error: any) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleRemove = () => {
        onChange('');
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {value ? (
                <div className="relative w-full aspect-video md:aspect-square md:w-[200px] border rounded-lg overflow-hidden group">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={handleRemove}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all text-center"
                >
                    {uploading ? (
                        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Upload className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium">{description}</p>
                                <p className="text-xs text-muted-foreground">PNG, JPG or WebP (max. 5MB)</p>
                            </div>
                        </div>
                    )}
                    <Input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </div>
            )}
            <input type="hidden" value={value} />
        </div>
    );
}
