(function () {
  "use strict";

  // Existing GBS tracking identifiers.
  const config = {
    metaPixelId: "362061730169532",
    linkedinPartnerId: "6162210"
  };

  // Diagnostic only. No advertising tags are loaded.
  console.info(
    "[GBS Tracking] Script loaded successfully.",
    {
      metaConfigured: Boolean(config.metaPixelId),
      linkedinConfigured: Boolean(config.linkedinPartnerId),
      advertisingTrackingActive: false
    }
  );
})();
