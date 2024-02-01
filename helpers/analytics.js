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
