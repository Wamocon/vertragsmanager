export type MemberRole = 'company_admin' | 'manager' | 'reader';
export type ContractStatus = 'active' | 'expiring_soon' | 'expired' | 'cancelled';
export type PaymentInterval = 'monthly' | 'quarterly' | 'yearly' | 'one_time';
export type NotificationType = 'reminder' | 'invitation' | 'system' | 'comment' | 'edit';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  short_name: string | null;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: string;
  organization_id: string;
  user_id: string;
  role: MemberRole;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  company_name: string | null;
  avatar_url: string | null;
  language: 'de' | 'en';
  is_superadmin: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  organization_id: string;
  name: string;
  color: string;
  is_system: boolean;
  created_at: string;
}

export interface Contract {
  id: string;
  organization_id: string;
  category_id: string | null;
  created_by: string;
  name: string;
  provider: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  cancellation_period_days: number | null;
  cancellation_deadline: string | null;
  auto_renew: boolean;
  amount: number;
  currency: string;
  payment_interval: PaymentInterval;
  licenses_purchased: number | null;
  licenses_used: number | null;
  status: ContractStatus;
  document_url: string | null;
  customer_number: string | null;
  notes: string | null;
  tax_rate: number;
  is_gross: boolean;
  renewal_count: number;
  max_renewals: number | null;
  created_at: string;
  updated_at: string;
  // Joined
  category?: Category;
}

export interface Reminder {
  id: string;
  contract_id: string;
  days_before: number;
  remind_at: string;
  sent: boolean;
  enabled: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  organization_id: string | null;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  read: boolean;
  created_at: string;
}

export interface Invitation {
  id: string;
  organization_id: string;
  email: string;
  role: MemberRole;
  invited_by: string;
  token: string;
  accepted: boolean;
  expires_at: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  organization_id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  created_at: string;
}

export interface ContractComment {
  id: string;
  contract_id: string;
  organization_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  // Joined
  profile?: Profile;
}

export interface ContractEditLog {
  id: string;
  contract_id: string;
  organization_id: string;
  user_id: string;
  changes: Record<string, unknown>;
  security_confirmed: boolean;
  created_at: string;
}

// Supabase Database type for client generation
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: Organization;
        Insert: Partial<Organization> & Pick<Organization, 'name' | 'slug'>;
        Update: Partial<Organization>;
      };
      organization_members: {
        Row: OrganizationMember;
        Insert: Partial<OrganizationMember> & Pick<OrganizationMember, 'organization_id' | 'user_id'>;
        Update: Partial<OrganizationMember>;
      };
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & Pick<Profile, 'id'>;
        Update: Partial<Profile>;
      };
      categories: {
        Row: Category;
        Insert: Partial<Category> & Pick<Category, 'organization_id' | 'name'>;
        Update: Partial<Category>;
      };
      contracts: {
        Row: Contract;
        Insert: Partial<Contract> & Pick<Contract, 'organization_id' | 'created_by' | 'name' | 'provider' | 'start_date'>;
        Update: Partial<Contract>;
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & Pick<Reminder, 'contract_id' | 'days_before' | 'remind_at'>;
        Update: Partial<Reminder>;
      };
      notifications: {
        Row: Notification;
        Insert: Partial<Notification> & Pick<Notification, 'user_id' | 'title' | 'message'>;
        Update: Partial<Notification>;
      };
      invitations: {
        Row: Invitation;
        Insert: Partial<Invitation> & Pick<Invitation, 'organization_id' | 'email' | 'invited_by'>;
        Update: Partial<Invitation>;
      };
      audit_log: {
        Row: AuditLogEntry;
        Insert: Partial<AuditLogEntry> & Pick<AuditLogEntry, 'organization_id' | 'user_id' | 'action' | 'entity_type'>;
        Update: Partial<AuditLogEntry>;
      };
      contract_comments: {
        Row: ContractComment;
        Insert: Partial<ContractComment> & Pick<ContractComment, 'contract_id' | 'organization_id' | 'user_id' | 'content'>;
        Update: Partial<ContractComment>;
      };
      contract_edit_log: {
        Row: ContractEditLog;
        Insert: Partial<ContractEditLog> & Pick<ContractEditLog, 'contract_id' | 'organization_id' | 'user_id' | 'changes'>;
        Update: Partial<ContractEditLog>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      setup_user_org: {
        Args: { p_user_id: string; p_org_name?: string };
        Returns: string;
      };
    };
    Enums: {
      member_role: MemberRole;
      contract_status: ContractStatus;
      payment_interval: PaymentInterval;
      notification_type: NotificationType;
    };
    CompositeTypes: Record<string, never>;
  };
}
