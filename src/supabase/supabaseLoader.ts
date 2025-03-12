interface SupabaseLoaderProps {
  src: string;
  quality?: number;
}

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

export default function supabaseLoader({ src, quality }: SupabaseLoaderProps) {
  return `https://${projectId}.supabase.co/storage/v1/object/public/${src}?quality=${quality || 75}`;
}
