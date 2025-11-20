import { createClient, SupabaseClient } from "@supabase/supabase-js";

export class SupabaseAuthAdapter {
  private client: SupabaseClient;

  constructor() {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials are missing");
    }

    this.client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.client.auth.admin.createUser({ email, password, email_confirm: true });
    if (error) throw error;
    return { userId: data.user?.id ?? "" };
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return {
      accessToken: data.session?.access_token ?? "",
      refreshToken: data.session?.refresh_token ?? "",
    };
  }

  async verifyToken(token: string) {
    const { data, error } = await this.client.auth.getUser(token);
    if (error) throw error;
    return data.user;
  }
}

