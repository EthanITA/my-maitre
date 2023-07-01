export default {
  home: "Home",
  menu: {
    label: "Menu",
    description:
      "Create menus for all your needs: daily menus, wine lists, lunch menus, dinner menus...",
    customize: "Customize",
    add: "Create new ",
    fields: {
      name: "Name",
      plates: "Number of plates",
      visibility: "Visibility to users",
      description: "Description",
      orderType: "Order type",
      hidePrice: "Hide prices",
      menuType: "Menu type",
      startTime: "Start time",
      endTime: "End time",
      days: "Days",
    },
    creation: {
      label: "Create menu",
      description:
        "Give a name to your menu, plan the visibility for your customers and finally compose it by selecting the dishes.",
      submit: "Create menu",
      error: "Name, Description and Menu type are mandatory!",
    },
    types: {
      standard: "Standard",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      roomService: "Room service",
    },
    visibilities: {
      everyday: "Everyday",
      weekdays: "Weekdays",
      days: "Specific days",
    },
  },
  table: {
    noData: "No data",
    actions: "Actions",
  },
  week: {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thurday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  },
  status: {
    ERR_NETWORK: "Network error",
    200: "Request completed successfully",
    201: "Resource created successfully",
    204: "Resource deleted successfully",
    400: "Invalid request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    500: "Internal server error",
    502: "Bad gateway",
    503: "Service unavailable",
  },
};
