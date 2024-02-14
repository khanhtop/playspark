import { supabase } from "./supabase";

export function sendEvent(context, data, eventName) {
  if (!data.demo && context?.profile?.companyName && window.gtag) {
    console.log(data.name?.split(" ")?.join(""), eventName, {
      event_category: context?.profile?.companyName?.split(" ")?.join(""),
      event_label: `${eventName} triggered for ${data.name}`,
      value: true,
    });
    try {
      window.gtag(data.name?.split(" ")?.join(""), eventName, {
        event_category: context?.profile?.companyName?.split(" ")?.join(""),
        event_label: `${eventName} triggered for ${data.name}`,
        value: true,
      });
    } catch (error) {
      //
      console.log(error);
    }
  }
}

export async function sendSupabaseEvent(
  uid,
  clientId,
  tournamentId,
  eventName
) {
  if (!uid || !tournamentId || !eventName || !clientId) return;
  await supabase.from("events").insert([
    {
      user_id: uid.toString(),
      tournament_id: tournamentId.toString(),
      event_name: eventName.toString(),
      client_id: clientId.toString(),
    },
  ]);
}
