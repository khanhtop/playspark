import { supabase } from "./supabase";

export function sendEvent(context, data, eventName) {
  if (!data.demo && context?.profile?.companyName && window.gtag) {
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
  eventName,
  clientName,
  eventValue = null
) {
  if (!tournamentId || !eventName || !clientId) return;
  await supabase.from("events").insert([
    {
      user_id: uid?.toString() || null,
      tournament_id: tournamentId.toString(),
      event_name: eventName.toString(),
      client_id: clientId.toString(),
      client_name: clientName ?? null,
      event_value: eventValue ?? null,
    },
  ]);
}

export async function updateDwell(id, data) {
  if (!data.tournament_id || !data.event_name || !data.client_id) return;
  if (id) {
    await supabase
      .from("events")
      .update({
        ...data,
      })
      .eq("id", id);
    return;
  } else {
    const result = await supabase
      .from("events")
      .insert({
        ...data,
      })
      .select();
    return result?.data?.[0]?.id;
  }
}
