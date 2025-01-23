import { useTranslation } from "react-i18next";

// sidebar icons
import { BiMessageRoundedDots } from "react-icons/bi";
import { MdOutlineAssignment } from "react-icons/md";
import { MdOutlinePlayLesson } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { PiNoteDuotone } from "react-icons/pi";
import { FaUserCheck } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { GrAnnounce } from "react-icons/gr";
import { PiStudent } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdSubject } from "react-icons/md";
import { PiExam } from "react-icons/pi";

import { ISidebarItems } from "@/interfaces/sidebar";

const useSidebarMenu = () => {
  const { t } = useTranslation();

  const items: ISidebarItems[] = [
    {
      _id: "1",
      label: t("app_sidebar.menu"),
      items: [
        {
          _id: "1-2",
          href: "/",
          label: t("app_sidebar.home"),
          icon: RxDashboard,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },

        {
          _id: "1-3",
          href: "/list/admins",
          label: t("app_sidebar.admins"),
          icon: GiTeacher,
          visible: ["admin", "super-admin"],
        },
        {
          _id: "1-4",
          href: "/list/teachers",
          label: t("app_sidebar.teachers"),
          icon: GiTeacher,
          visible: ["super-admin", "admin", "teacher"],
        },
        {
          _id: "1-5",
          href: "/list/students",
          label: t("app_sidebar.students"),
          icon: PiStudent,
          visible: ["super-admin", "admin", "teacher"],
        },
        {
          _id: "1-6",
          href: "/list/parents",
          label: t("app_sidebar.parents"),
          icon: IoPeopleOutline,
          visible: ["super-admin", "admin", "teacher"],
        },

        {
          _id: "1-7",
          href: "/list/subjects",
          label: t("app_sidebar.subjects"),
          icon: MdSubject,
          visible: ["admin"],
        },
        {
          _id: "1-8",
          href: "/list/classes",
          label: t("app_sidebar.classes"),
          icon: SiGoogleclassroom,
          visible: ["super-admin", "admin", "teacher"],
        },
        {
          _id: "1-9",
          href: "/list/lessons",
          label: t("app_sidebar.lessons"),
          icon: MdOutlinePlayLesson,
          visible: ["super-admin", "admin", "teacher"],
        },
        {
          _id: "1-10",
          href: "/list/exams",
          label: t("app_sidebar.exams"),
          icon: PiNoteDuotone,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-11",
          href: "/list/assignments",
          label: t("app_sidebar.assignments"),
          icon: MdOutlineAssignment,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-12",
          href: "/list/results",
          label: t("app_sidebar.results"),
          icon: PiExam,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-13",
          href: "/list/attendances",
          label: t("app_sidebar.attendance"),
          icon: FaUserCheck,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-14",
          href: "/list/events",
          label: t("app_sidebar.events"),
          icon: MdEventAvailable,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-15",
          href: "/list/messages",
          label: t("app_sidebar.messages"),
          icon: BiMessageRoundedDots,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-16",
          href: "/list/announcements",
          label: t("app_sidebar.announcements"),
          icon: GrAnnounce,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "1-16",
          href: "/list/subjects",
          label: t("app_sidebar.subjects"),
          icon: MdSubject,
          visible: ["super-admin", "admin"],
        },
      ],
    },
    {
      _id: "2",
      label: t("app_sidebar.others"),
      items: [
        {
          _id: "2-1",
          href: "/profile",
          label: t("app_sidebar.profile"),
          icon: CgProfile,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "2-2",
          href: "/settings",
          label: t("app_sidebar.settings"),
          icon: IoMdSettings,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
        {
          _id: "2-3",
          href: "/logout",
          label: t("app_sidebar.logout"),
          icon: RiLogoutCircleRLine,
          visible: ["super-admin", "admin", "teacher", "student", "parent"],
        },
      ],
    },
  ];

  return { items };
};

export default useSidebarMenu;
