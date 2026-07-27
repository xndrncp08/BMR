export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          price: number;
          stock_quantity: number;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category: string;
          price: number;
          stock_quantity?: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
        Relationships: [];
      };
      prescription_requests: {
        Row: {
          id: string;
          customer_name: string;
          email: string;
          phone: string;
          medicine_name: string;
          prescription_number: string | null;
          status:
            | "pending"
            | "in_progress"
            | "ready"
            | "completed"
            | "cancelled";
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          email: string;
          phone: string;
          medicine_name: string;
          prescription_number?: string | null;
          status?:
            | "pending"
            | "in_progress"
            | "ready"
            | "completed"
            | "cancelled";
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["prescription_requests"]["Insert"]
        >;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
