// Admin statuses
export type TAdminStatus =
  | "active"
  | "inactive"
  | "on-leave"
  | "retired"
  | "resigned"
  | "pending";

// Teacher statuses
export type TTeacherStatus =
  | "active"
  | "inactive"
  | "on-leave"
  | "retired"
  | "resigned"
  | "pending";

// Student statuses
export type TStudentStatus =
  | "enrolled"
  | "graduated"
  | "dropped-out"
  | "expelled"
  | "on-leave";

// Parent statuses
export type TParentStatus = "active" | "inactive" | "blocked";

export const UserGenderEnum = ["male", "female"];

export const AdminStatusEnum = [
  "active",
  "inactive",
  "on-leave",
  "retired",
  "resigned",
  "pending",
];

export const TeacherStatusEnum = [
  "active",
  "inactive",
  "on-leave",
  "retired",
  "resigned",
  "pending",
];

export const StudentStatusEnum = [
  "enrolled",
  "graduated",
  "dropped-out",
  "expelled",
  "on-leave",
];

export const ParentStatusEnum = ["active", "inactive", "blocked"];

// Admin Status:
//  active: The admin is currently active and performing duties.
//  inactive: The admin is temporarily inactive or not performing duties.
//  on-leave: The admin is temporarily absent but will return.
//  retired: The admin is no longer actively working.
//  resigned: The admin voluntarily left the role.

// Teacher Status:
//  active: The teacher is actively teaching.
//  inactive: The teacher is not currently teaching but remains on staff.
//  on-leave: The teacher is on leave but will return.
//  retired: The teacher is no longer teaching, either by choice or due to age.
//  resigned: The teacher has resigned from their position.

// Student Status:
//  enrolled: The student is currently enrolled and attending classes.
//  graduated: The student has completed their studies.
//  dropped-out: The student has left the school before completing their studies.
//  expelled: The student was expelled for disciplinary reasons.
//  on-leave: The student is temporarily away but will return.

// Parent Status:
//  active: The parent is engaged and active in the system.
//  inactive: The parent is registered but not actively involved.
//  blocked: The parent's account is restricted due to issues (e.g., violating policies).
