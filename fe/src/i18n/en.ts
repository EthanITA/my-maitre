export default {
  home: "Home",
  menu: {
    label: "Menu",
    description:
      "Create menus for all your needs: daily menus, wine lists, lunch menus, dinner menus...",
    customize: "Customize",
    add: "Create new ",
    enable: "Enable",
    disable: "Disable",
    dishes: {
      label: "Add dishes for {name}",
      description:
        "Add dishes to the menu, you can search them by name or category. Drag them to add them to the menu.",
      available: "Available dishes",
      selected: "Selected dishes",
      submit: "Save dishes",
    },
    fields: {
      name: "Name",
      dishes: "Number of plates",
      visibility: "Visibility to users",
      description: "Description",
      orderType: "Order type",
      hidePrice: "Hide price",
      showPrice: "Show price",
      menuType: "Menu type",
      startTime: "Start time",
      endTime: "End time",
      days: "Days",
      openHours: "Hours",
    },
    creation: {
      label: "Create menu",
      description:
        "Give a name to your menu, plan the visibility for your customers and finally compose it by selecting the dishes.",
      submit: "Save menu",
      error: "Check Name, Description and time!",
    },
    types: {
      toApprove: "To approve",
      standard: "Standard",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      roomService: "Room service",
      umbrella: "Umbrella",
    },
    visibilities: {
      everyday: "Everyday",
      weekdays: "Weekdays",
      days: "Specific days",
    },
    error: "Error in reading the menu",
  },
  category: {
    label: "Categories",
    description: "Use categories to better organize your menu.",
    add: "Create category",
    creation: {
      submit: "Save category",
      error: "Name is mandatory!",
    },
    fields: {
      numberOfDishes: "Number of dishes",
      avgPrice: "Average price",
      minPrice: "Minimum price",
      maxPrice: "Maximum price",
    },
    missing: {
      title: "No categories present",
      description:
        "Create a new category to start creating the dishes of your menu.",
    },
  },
  dish: {
    label: "Dishes",
    add: "Create dish",
    addToCategory: "Add",
    uploadImage: "Upload image",
    deleteImage: "Delete image",
    allergen: {
      gluten: "Gluten",
      crustaceansAndDerivatives: "Crustaceans and derivatives",
      eggsAndDerivatives: "Eggs and derivatives",
      fishAndDerivatives: "Fish and derivatives",
      peanutsAndDerivatives: "Peanuts and derivatives",
      soyAndDerivatives: "Soy and derivatives",
      milkAndDerivatives: "Milk and derivatives",
      nutsAndDerivatives: "Nuts and derivatives",
      celeryAndDerivatives: "Celery and derivatives",
      mustardAndDerivatives: "Mustard and derivatives",
      sesameSeedsAndDerivatives: "Sesame seeds and derivatives",
      sulfurDioxideAndSulphites: "Sulfur dioxide and sulphites",
      lupinsAndDerivatives: "Lupins and derivatives",
      molluscsAndDerivatives: "Molluscs and derivatives",
    },
    characteristic: {
      vegan: "Vegan",
      vegetarian: "Vegetarian",
      spicy: "Spicy",
      zeroKm: "Zero km",
      frozenProduct: "Frozen product",
      bio: "Bio",
    },
    unitOfMeasure: {
      "€": "€",
      "€/l": "€/l",
      "€/kg": "€/kg",
      "€/hg": "€/hg",
      "€/chalice": "€/chalice",
    },
    fields: {
      name: "Name",
      image: "Image",
      description: "Description",
      price: "Price",
      category: "Category",
      allergens: "Allergens",
      characteristics: "Characteristics",
    },
    creation: {
      label: "Create dish",
      submit: "Save dish",
      error: "Name, Description and Price are mandatory!",
    },
  },
  order: {
    label: "Orders",
    description: "Manage orders and reservations.",
    settings: "Settings",
    add: "Create order",
  },
  hall: {
    label: "Hall",
    qr_code: {
      label: "Generate QR code",
      close: "Close",
      confirm: "Confirm",
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
    409: "Conflict",
    500: "Internal server error",
    502: "Bad gateway",
    503: "Service unavailable",
  },
};
