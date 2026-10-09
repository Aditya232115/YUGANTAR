export type Role = 'brand' | 'creator';
export type ContentType = 'image' | 'video' | 'audio' | 'animation';
export type Stage = 'Invited' | 'Declined' | 'In Progress' | 'Revision' | 'Approved' | 'Delivered';
export interface Workflow {
    model: string;
    seed: string;
    sampler: string;
    cfg: string;
    loras: string;
    controlNets: string;
    promptStructure: string;
    license: 'commercial-safe' | 'non-commercial';
    modelSource: string;
}
export interface PlagiarismCheck {
    status: 'Original' | 'Needs review' | 'Blocked (duplicate)';
    checks: string[];
    advisory?: string;
    sha256?: string;
    dhash?: string;
}
export interface PortfolioItem {
    id: string;
    creatorId: string;
    title: string;
    description: string;
    contentType: ContentType;
    mediaUrl: string;
    toolsUsed: string[];
    workflow: Workflow;
    plagiarism: PlagiarismCheck;
}
export interface User {
    id: string;
    role: Role;
    realName: string;
    email: string;
    phone: string;
    passwordHash: string;
    alias: string;
    avatarColor: string;
    companyName: string;
    industry: string;
    headline: string;
    bio: string;
    specialization: string[];
    skills: string[];
    tools: string[];
    contentTypes: ContentType[];
    rate: number;
    turnaroundDays: number;
}
export interface Badges {
    tools: boolean;
    workflow: boolean;
    pastWork: boolean;
}
export interface PublicCreator {
    id: string;
    alias: string;
    avatarColor: string;
    headline: string;
    bio: string;
    specialization: string[];
    skills: string[];
    tools: string[];
    contentTypes: ContentType[];
    rate: number;
    turnaroundDays: number;
    portfolio: PortfolioItem[];
    badges: Badges;
}
export interface Brief {
    id: string;
    brandId: string;
    title: string;
    description: string;
    contentType: ContentType;
    style: string;
    aspectRatio: string;
    requiredTools: string[];
    requiredSkills: string[];
    budget: number;
    deadline: string;
    commercialUse: boolean;
    platforms: string;
    duration: string;
    territory: string;
    exclusivity: boolean;
    shortlist: string[];
    status: 'Open' | 'Shortlisted' | 'In Progress' | 'Revision' | 'Delivered';
}
export interface Contract {
    id: string;
    engagementId: string;
    price: number;
    platformFee: number;
    creatorPayout: number;
    createdAt: string;
}
export interface Delivery {
    id: string;
    title: string;
    mediaUrl: string;
    createdAt: string;
}
export interface Engagement {
    id: string;
    brandId: string;
    creatorId: string;
    briefId: string;
    message: string;
    status: Stage;
    contract?: Contract;
    deliveries: Delivery[];
    createdAt: string;
}
export interface Message {
    id: string;
    engagementId: string;
    senderId: string;
    text: string;
    createdAt: string;
}
export interface Payment {
    id: string;
    engagementId: string;
    status: 'paid';
    method: 'Simulated';
    amount: number;
    paidAt: string;
}
export interface Invoice {
    id: string;
    engagementId: string;
    brandId: string;
    number: string;
    issuedAt: string;
    paidAt: string;
    status: 'Paid';
    companyName: string;
    creatorAlias: string;
    briefTitle: string;
    subtotal: number;
    platformFee: number;
    taxRate: number;
    tax: number;
    total: number;
}
export interface PayoutStatement {
    id: string;
    engagementId: string;
    creatorId: string;
    number: string;
    date: string;
    briefTitle: string;
    companyName: string;
    gross: number;
    platformFee: number;
    net: number;
    status: 'Payout simulated';
}
export interface Database {
    users: User[];
    portfolio: PortfolioItem[];
    briefs: Brief[];
    engagements: Engagement[];
    messages: Message[];
    payments: Payment[];
    invoices: Invoice[];
    payoutStatements: PayoutStatement[];
    counters: Record<string, number>;
    blockedAttempts: {
        userId: string;
        createdAt: string;
        kind: string;
    }[];
}
export interface SessionUser {
    id: string;
    role: Role;
    alias: string;
}
export interface Match {
    creator: PublicCreator;
    score: number;
    reasons: string[];
    conflicts: string[];
}
