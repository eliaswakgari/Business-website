'use client';

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Twitter } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    avatar_url: string;
    linkedin_url: string;
    twitter_url: string;
}

interface TeamCardProps {
    member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
    const initials = member.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="flex flex-col items-center p-6 bg-card rounded-xl border hover:shadow-lg transition-all text-center">
            <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/10">
                <AvatarImage src={member.avatar_url} alt={member.name} className="object-cover" />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <h3 className="text-lg font-bold">{member.name}</h3>
            <p className="text-primary text-sm font-medium mb-2">{member.role}</p>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {member.bio}
            </p>

            <div className="flex gap-4 mt-auto">
                {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </a>
                )}
                {member.twitter_url && (
                    <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-5 w-5" />
                    </a>
                )}
            </div>
        </div>
    );
}
