const announcements = [
  {
    _id: "1",
    name: "Picture Day Reminder",
    description:
      "School Picture Day is tomorrow! Don't forget to wear your full uniform and bring your best smile.",
    bg: "bg-[rgba(195,235,250,0.3)]",
  },
  {
    _id: "2",
    name: "New Staff Announcement",
    description:
      "The school is moving to a new building next week. All staff will be required to wear their uniform and have their badge with them.",
    bg: "bg-[rgba(250,227,124,0.3)]",
  },
  {
    _id: "3",
    name: "Test Schedule Update",
    description:
      "The school has updated the test schedule. Make sure to check your calendar for the most accurate information.",
    bg: "bg-[rgba(136,132,216,0.3)]",
  },
];

const AnnouncementsFeatures = () => {
  return { announcements };
};

export default AnnouncementsFeatures;
