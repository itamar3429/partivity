# client:

-  Create invite page for client event.
-  Become provider page
-  Let people confirm invitation.
-  Client dashboard - add more details about the party. attendance and more
-  Enrich header features/gestures.
-  Service/menu landing page(info about the service)
-  Admin - provider application review/reject/authorize.
-  Admin - suspend provider activity
   <!-- -  Add user menu (logout setting etc...) -->
   <!-- -  Add a booked events section for providers. -->
   <!-- -  Fix scheduler time difference - use dates libs to do it -->

# server:

-  Verify that a provider cant deleted a booked schedule date.
-  Deleted event services if they are using booked services (when a user tries to book an event).

# both (client/server):

-  Provider food menu (CRUD).
-  Verify event services dates are the same for all event services schedule.
-  Enable address for more services [/ coordinates and max radius]<br> (to act as location restriction, only for delivering services like food, music and more)
-  Delete event for user (if not booked yet)
