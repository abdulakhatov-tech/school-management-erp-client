import { useParams } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useRedux";
import { setUserFormModal } from "@/store/slices/user-form-modal";

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
  {
    _id: "4",
    name: "Vacation Reminder",
    description:
      "Don't forget to pack your essentials for your upcoming vacation. You'll be on call during the day.",
    bg: "bg-[rgba(255,194,117,0.3)]",
  },
  {
    _id: "5",
    name: "Class Schedule Update",
    description:
      "The school has updated the class schedule. Make sure to check your calendar for the most accurate information.",
    bg: "bg-[rgba(127,199,155,0.3)]",
  },
  {
    _id: "6",
    name: "Closing Day Announcement",
    description:
      "School is closing on Friday. All students will be required to wear their full uniform and have their badge with them.",
    bg: "bg-[rgba(255,125,125,0.3)]",
  },
];

const useTeacherProfileFeatures = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const handleEditUser = () => {
    dispatch(
      setUserFormModal({
        modalType: "teacher",
        actionType: "edit",
        dataId: params?.teacherId,
      })
    );
  };

  const handleDeleteUser = () => {
    dispatch(
      setUserFormModal({
        modalType: "teacher",
        actionType: "delete",
        dataId: params?.teacherId,
      })
    );
  };

  return { announcements, handleEditUser, handleDeleteUser };
};

export default useTeacherProfileFeatures;
