export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'CLIENT' | 'CARRIER' | 'ADMIN'
          status: 'ACTIVE' | 'SUSPENDED' | 'DELETED'
          profile_type: 'INDIVIDUAL' | 'COMPANY'
          first_name: string
          last_name: string
          company_name: string | null
          phone: string
          avatar_url: string | null
          bio: string | null
          rating_avg: number
          rating_count: number
          verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role?: 'CLIENT' | 'CARRIER' | 'ADMIN'
          status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED'
          profile_type?: 'INDIVIDUAL' | 'COMPANY'
          first_name: string
          last_name: string
          company_name?: string | null
          phone: string
          avatar_url?: string | null
          bio?: string | null
          rating_avg?: number
          rating_count?: number
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'CLIENT' | 'CARRIER' | 'ADMIN'
          status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED'
          profile_type?: 'INDIVIDUAL' | 'COMPANY'
          first_name?: string
          last_name?: string
          company_name?: string | null
          phone?: string
          avatar_url?: string | null
          bio?: string | null
          rating_avg?: number
          rating_count?: number
          verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: number
          name_pl: string
          name_en: string
          slug: string
          icon: string
          parent_id: number | null
          active: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: number
          name_pl: string
          name_en: string
          slug: string
          icon: string
          parent_id?: number | null
          active?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: number
          name_pl?: string
          name_en?: string
          slug?: string
          icon?: string
          parent_id?: number | null
          active?: boolean
          order_index?: number
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          owner_id: string
          category_id: number
          status: 'DRAFT' | 'OPEN' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'EXPIRED'
          title: string
          description: string
          from_address: Json
          from_location: unknown
          to_address: Json
          to_location: unknown
          distance_km: number
          pickup_date_from: string | null
          pickup_date_to: string | null
          delivery_date_from: string | null
          delivery_date_to: string | null
          flexible_dates: boolean
          weight_kg: number | null
          dimensions: Json | null
          quantity: number
          vehicle_type: string | null
          images: Json
          slug: string
          views_count: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          owner_id: string
          category_id: number
          status?: 'DRAFT' | 'OPEN' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'EXPIRED'
          title: string
          description: string
          from_address: Json
          from_location: unknown
          to_address: Json
          to_location: unknown
          distance_km: number
          pickup_date_from?: string | null
          pickup_date_to?: string | null
          delivery_date_from?: string | null
          delivery_date_to?: string | null
          flexible_dates?: boolean
          weight_kg?: number | null
          dimensions?: Json | null
          quantity?: number
          vehicle_type?: string | null
          images?: Json
          slug: string
          views_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          owner_id?: string
          category_id?: number
          status?: 'DRAFT' | 'OPEN' | 'ASSIGNED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED' | 'EXPIRED'
          title?: string
          description?: string
          from_address?: Json
          from_location?: unknown
          to_address?: Json
          to_location?: unknown
          distance_km?: number
          pickup_date_from?: string | null
          pickup_date_to?: string | null
          delivery_date_from?: string | null
          delivery_date_to?: string | null
          flexible_dates?: boolean
          weight_kg?: number | null
          dimensions?: Json | null
          quantity?: number
          vehicle_type?: string | null
          images?: Json
          slug?: string
          views_count?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
      }
      offers: {
        Row: {
          id: string
          listing_id: string
          carrier_id: string
          price: number
          currency: string
          message: string
          estimated_pickup_date: string
          estimated_delivery_date: string
          status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'EXPIRED'
          created_at: string
          updated_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          carrier_id: string
          price: number
          currency?: string
          message: string
          estimated_pickup_date: string
          estimated_delivery_date: string
          status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'EXPIRED'
          created_at?: string
          updated_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          carrier_id?: string
          price?: number
          currency?: string
          message?: string
          estimated_pickup_date?: string
          estimated_delivery_date?: string
          status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN' | 'EXPIRED'
          created_at?: string
          updated_at?: string
          expires_at?: string
        }
      }
      contracts: {
        Row: {
          id: string
          listing_id: string
          offer_id: string
          client_id: string
          carrier_id: string
          amount: number
          currency: string
          status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED'
          payment_status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
          signed_at: string | null
          started_at: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          offer_id: string
          client_id: string
          carrier_id: string
          amount: number
          currency?: string
          status?: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED'
          payment_status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
          signed_at?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          offer_id?: string
          client_id?: string
          carrier_id?: string
          amount?: number
          currency?: string
          status?: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED'
          payment_status?: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
          signed_at?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: 'NEW_OFFER' | 'OFFER_ACCEPTED' | 'MESSAGE' | 'CONTRACT_STATUS' | 'REVIEW_REQUEST' | 'PAYMENT' | 'OTHER'
          title: string
          body: string
          data: Json
          link: string
          read_at: string | null
          created_at: string
        }
      }
    }
  }
}
