const SUPABASE_URL = "https://ephhlgpgodpveywwmidl.supabase.co";
const SUPABASE_KEY = "sb_publishable_iAe7y1E8jaBPf_sDbs1eig_gmrK5x2D";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
async function isOwner(){
  const {data:{session}} = await sb.auth.getSession();
  if(!session) return false;
  const {data} = await sb.rpc('is_owner');
  return data === true;
}
